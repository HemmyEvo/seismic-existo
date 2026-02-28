import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projectById } from "@/lib/projects";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { id } = await params;
  const project = projectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-[#0a0a0a] text-stone-100 min-h-screen px-6 py-28">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/projects" className="inline-flex items-center gap-2 text-stone-300 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back to projects
        </Link>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-4">
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <p className="text-stone-300">{project.description}</p>
          <div className="flex gap-3 pt-2">
            <Link href={project.route} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b5a2b] text-white font-semibold">
              Open generator <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/admin" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-stone-200">
              View admin stats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
