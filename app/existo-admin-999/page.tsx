/* eslint-disable @next/next/no-img-element */
"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";
import { useState } from "react";

export default function AdminDashboardPage() {
  const [selectedProject, setSelectedProject] = useState<string>("all");
  
  // Pointing to the projects.ts file and using imagePreviewLimit
  const data = useQuery(api.projects.getAdminDashboard, { imagePreviewLimit: 40 });

  // Handle Convex loading state
  if (data === undefined) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-stone-100 flex items-center justify-center">
        <p className="text-xl">Loading dashboard...</p>
      </div>
    );
  }

  // Filter images based on the selected project dropdown
  const images = selectedProject === "all"
    ? data.recentImages
    : data.recentImages.filter((image) => image.projectSlug === selectedProject);
  const handleDownload = async (imageUrl: string, filename: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed, falling back to direct link:", error);
    // Fallback if fetch fails (e.g., due to strict CORS)
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-100 px-4 py-24">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl md:text-5xl font-extrabold">Admin Dashboard</h1>
          <Link href="/projects" className="px-4 py-2 rounded-full border border-white/20 text-sm hover:bg-white/10 transition">
            Back to projects
          </Link>
        </div>

        {/* Top-level Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-stone-400">Tracked projects</p>
            <p className="text-3xl font-bold">{data.totalProjects}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-stone-400">Total downloads</p>
            <p className="text-3xl font-bold">{data.totalDownloads}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-stone-400">Recent images loaded</p>
            <p className="text-3xl font-bold">{data.recentImages.length}</p>
          </div>
        </div>

        {/* Projects Table */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-3">Project download counts</h2>
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-stone-400 border-b border-white/10">
                <th className="py-3 pr-4">Project</th>
                <th className="py-3 pr-4">Slug</th>
                <th className="py-3 pr-4">Downloads</th>
                <th className="py-3">Last download</th>
              </tr>
            </thead>
            <tbody>
              {data.projects.map((project) => (
                <tr key={project.id} className="border-b border-white/5 last:border-0">
                  <td className="py-3 pr-4">{project.name}</td>
                  <td className="py-3 pr-4">{project.slug}</td>
                  <td className="py-3 pr-4">{project.totalDownloads}</td>
                  <td className="py-3">
                    {project.lastDownloadedAt ? new Date(project.lastDownloadedAt).toLocaleString() : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Filter Controls */}
        <div className="flex gap-2 items-center mt-8">
          <label htmlFor="projectFilter" className="text-sm text-stone-300">Filter images:</label>
          <select
            id="projectFilter"
            value={selectedProject}
            onChange={(event) => setSelectedProject(event.target.value)}
            className="bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white/50"
          >
            <option value="all">All</option>
            {data.projects.map((project) => (
              <option key={project.id} value={project.slug}>{project.name}</option>
            ))}
          </select>
        </div>

        {/* Image Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {images.length > 0 ? (
    images.map((image) => (
      <div key={image._id} className="rounded-2xl border border-white/10 bg-white/5 p-3 space-y-2 flex flex-col">
        {/* Note: Ensure image.imageData is a valid URL or base64 string */}
        <img 
          src={image.imageData} 
          alt={`Generated for ${image.projectSlug}`} 
          className="w-full h-44 object-cover rounded-lg bg-black/50" 
        />
        
        <div className="flex-1 flex flex-col justify-between mt-2">
          <div className="space-y-1">
            <p className="text-sm text-stone-200 font-semibold">{image.projectSlug}</p>
            <p className="text-xs text-stone-400">{new Date(image.downloadedAt).toLocaleString()}</p>
            {(image.generatedByName || image.generatedByHandle) && (
              <p className="text-xs text-stone-300 truncate">
                {image.generatedByName ?? "Unknown"}
                {image.generatedByHandle ? ` (@${image.generatedByHandle})` : ""}
              </p>
            )}
          </div>

          {/* Download Button */}
          <button
            onClick={() => handleDownload(image.imageData, `${image.projectSlug}-image.png`)}
            className="mt-4 flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 text-sm font-medium transition-colors border border-white/5"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-stone-500 text-sm py-4">No images found for this project.</p>
  )}
</div>

      </div>
    </div>
  );
}