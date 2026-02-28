import { ConvexHttpClient } from "convex/browser";
import type { FunctionReference } from "convex/server";
import { NextResponse } from "next/server";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const getAdminDashboardFn = "projects:getAdminDashboard" as unknown as FunctionReference<"query">;

export async function GET(request: Request) {
  if (!convexUrl) {
    return NextResponse.json({ error: "NEXT_PUBLIC_CONVEX_URL is not configured." }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? "25");

  const client = new ConvexHttpClient(convexUrl);
  const data = await client.query(getAdminDashboardFn, {
    imagePreviewLimit: Number.isFinite(limit) ? limit : 25,
  });

  return NextResponse.json(data);
}
