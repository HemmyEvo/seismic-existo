import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export async function POST(request: Request) {
  if (!convexUrl) {
    return NextResponse.json({ error: "NEXT_PUBLIC_CONVEX_URL is not configured." }, { status: 500 });
  }

  const body = await request.json();

  if (!body?.projectSlug || !body?.imageData) {
    return NextResponse.json({ error: "projectSlug and imageData are required." }, { status: 400 });
  }

  const client = new ConvexHttpClient(convexUrl);
  const result = await client.mutation("projects:logImageDownload", {
    projectSlug: body.projectSlug,
    projectName: body.projectName,
    imageData: body.imageData,
    generatedByName: body.generatedByName,
    generatedByHandle: body.generatedByHandle,
  });

  return NextResponse.json(result);
}
