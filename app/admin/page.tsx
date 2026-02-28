"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface DashboardData {
  totalProjects: number;
  totalDownloads: number;
  projects: Array<{
    id: string;
    slug: string;
    name: string;
    totalDownloads: number;
    lastDownloadedAt?: number;
  }>;
  recentImages: Array<{
    _id: string;
    projectSlug: string;
    imageData: string;
    downloadedAt: number;
    generatedByName?: string;
    generatedByHandle?: string;
  }>;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/admin/dashboard?limit=40", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch dashboard data");
        const payload = await response.json();
        setData(payload);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const images = selectedProject === "all"
    ? data?.recentImages ?? []
    : (data?.recentImages ?? []).filter((image) => image.projectSlug === selectedProject);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-100 px-4 py-24">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl md:text-5xl font-extrabold">Admin Dashboard</h1>
          <Link href="/projects" className="px-4 py-2 rounded-full border border-white/20 text-sm">Back to projects</Link>
        </div>

        {loading && <p className="text-stone-300">Loading analytics...</p>}
        {error && <p className="text-red-300">{error}</p>}

        {data && (
          <>
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

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 overflow-x-auto">
              <h2 className="text-xl font-semibold mb-3">Project download counts</h2>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-stone-400">
                    <th className="py-2">Project</th>
                    <th className="py-2">Slug</th>
                    <th className="py-2">Downloads</th>
                    <th className="py-2">Last download</th>
                  </tr>
                </thead>
                <tbody>
                  {data.projects.map((project) => (
                    <tr key={project.id} className="border-t border-white/10">
                      <td className="py-2">{project.name}</td>
                      <td className="py-2">{project.slug}</td>
                      <td className="py-2">{project.totalDownloads}</td>
                      <td className="py-2">{project.lastDownloadedAt ? new Date(project.lastDownloadedAt).toLocaleString() : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="projectFilter" className="text-sm text-stone-300">Filter images:</label>
              <select
                id="projectFilter"
                value={selectedProject}
                onChange={(event) => setSelectedProject(event.target.value)}
                className="bg-black/40 border border-white/20 rounded-lg px-3 py-2"
              >
                <option value="all">All</option>
                {data.projects.map((project) => (
                  <option key={project.id} value={project.slug}>{project.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
                <div key={image._id} className="rounded-2xl border border-white/10 bg-white/5 p-3 space-y-2">
                  <img src={image.imageData} alt={`Generated for ${image.projectSlug}`} className="w-full h-44 object-cover rounded-lg" />
                  <p className="text-sm text-stone-200 font-semibold">{image.projectSlug}</p>
                  <p className="text-xs text-stone-400">{new Date(image.downloadedAt).toLocaleString()}</p>
                  {(image.generatedByName || image.generatedByHandle) && (
                    <p className="text-xs text-stone-300">
                      {image.generatedByName ?? "Unknown"}
                      {image.generatedByHandle ? ` (@${image.generatedByHandle})` : ""}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
