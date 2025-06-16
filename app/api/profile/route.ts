// app/api/profile/route.ts
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const data = await req.json();

  const filePath = path.join(process.cwd(), "uploads", "profile.json");
  await writeFile(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json({ success: true });
}
