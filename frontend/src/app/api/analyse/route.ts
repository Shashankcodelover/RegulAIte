import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const backendRes = await fetch(`${BACKEND_URL}/analyse`, {
      method: "POST",
      body: formData,
      signal: AbortSignal.timeout(60000),
    });
    if (!backendRes.ok) {
      return NextResponse.json({ error: "Backend error" }, { status: backendRes.status });
    }
    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch {
    // Backend unavailable — return 503 so client falls back to mock
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }
}
