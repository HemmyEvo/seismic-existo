import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const trimOrUndefined = (value?: string) => {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

export const logImageDownload = mutation({
  args: {
    projectSlug: v.string(),
    projectName: v.optional(v.string()),
    imageData: v.string(),
    generatedByName: v.optional(v.string()),
    generatedByHandle: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const slug = args.projectSlug.trim().toLowerCase();
    const fallbackName = slug
      .split("-")
      .filter(Boolean)
      .map((word) => word[0]?.toUpperCase() + word.slice(1))
      .join(" ");
    const name = trimOrUndefined(args.projectName) ?? (fallbackName || slug);

    const projects = await ctx.db.query("projects").collect();
    let project = projects.find((item) => item.slug === slug) ?? null;

    if (!project) {
      const projectId = await ctx.db.insert("projects", {
        slug,
        name,
        totalDownloads: 0,
        createdAt: now,
        updatedAt: now,
      });
      project = await ctx.db.get(projectId);
    }

    if (!project) {
      throw new Error("Could not create project record.");
    }

    await ctx.db.insert("projectGeneratedImages", {
      projectId: project._id,
      projectSlug: slug,
      imageData: args.imageData,
      downloadedAt: now,
      generatedByName: trimOrUndefined(args.generatedByName),
      generatedByHandle: trimOrUndefined(args.generatedByHandle),
    });

    const nextDownloads = project.totalDownloads + 1;
    await ctx.db.patch(project._id, {
      totalDownloads: nextDownloads,
      lastDownloadedAt: now,
      updatedAt: now,
      name,
    });

    return {
      projectId: project._id,
      projectSlug: slug,
      totalDownloads: nextDownloads,
    };
  },
});

export const getAdminDashboard = query({
  args: {
    imagePreviewLimit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const imagePreviewLimit = Math.min(Math.max(args.imagePreviewLimit ?? 25, 1), 200);

    const projects = await ctx.db.query("projects").collect();
    const rankedProjects = projects
      .sort((a, b) => b.totalDownloads - a.totalDownloads)
      .map((project) => ({
        id: project._id,
        slug: project.slug,
        name: project.name,
        totalDownloads: project.totalDownloads,
        lastDownloadedAt: project.lastDownloadedAt,
      }));

    const recentImages = (await ctx.db.query("projectGeneratedImages").collect())
      .sort((a, b) => b.downloadedAt - a.downloadedAt)
      .slice(0, imagePreviewLimit);

    return {
      totalProjects: rankedProjects.length,
      totalDownloads: rankedProjects.reduce((total, project) => total + project.totalDownloads, 0),
      projects: rankedProjects,
      recentImages,
    };
  },
});

export const getProjectImages = query({
  args: {
    projectSlug: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const slug = args.projectSlug.trim().toLowerCase();
    const limit = Math.min(Math.max(args.limit ?? 50, 1), 200);

    const projects = await ctx.db.query("projects").collect();
    const project = projects.find((item) => item.slug === slug) ?? null;

    if (!project) {
      return {
        project: null,
        images: [],
      };
    }

    const images = (await ctx.db.query("projectGeneratedImages").collect())
      .filter((image) => image.projectId === project._id)
      .sort((a, b) => b.downloadedAt - a.downloadedAt)
      .slice(0, limit);

    return {
      project: {
        id: project._id,
        slug: project.slug,
        name: project.name,
        totalDownloads: project.totalDownloads,
        lastDownloadedAt: project.lastDownloadedAt,
      },
      images,
    };
  },
});
