import { ConvexHttpClient } from "convex/browser";
import type { FunctionReference } from "convex/server";
import { NextResponse } from "next/server";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const getProjectImagesFn = "projects:getProjectImages" as unknown as FunctionReference<"query">;

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!convexUrl) {
    return NextResponse.json({ error: "NEXT_PUBLIC_CONVEX_URL is not configured." }, { status: 500 });
  }

  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? "50");

  const client = new ConvexHttpClient(convexUrl);
  const data = await client.query(getProjectImagesFn, {
    projectSlug: id,
    limit: Number.isFinite(limit) ? limit : 50,
  });

  return NextResponse.json(data);
}
