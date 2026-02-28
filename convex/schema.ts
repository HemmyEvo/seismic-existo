import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    slug: v.string(),
    name: v.string(),
    totalDownloads: v.number(),
    lastDownloadedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_total_downloads", ["totalDownloads"]),

  projectGeneratedImages: defineTable({
    projectId: v.id("projects"),
    projectSlug: v.string(),
    imageData: v.string(),
    downloadedAt: v.number(),
    generatedByName: v.optional(v.string()),
    generatedByHandle: v.optional(v.string()),
  })
    .index("by_project", ["projectId"])
    .index("by_project_slug", ["projectSlug"])
    .index("by_downloaded_at", ["downloadedAt"]),
});
