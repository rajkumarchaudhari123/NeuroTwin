import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import dbConnect from "@/lib/mongodb";
import ScanModel from "@/model/scan";
import Tesseract from "tesseract.js";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "No valid file uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(process.cwd(), "public", "uploads", file.name);
    await fs.writeFile(filePath, buffer);

    const {
      data: { text },
    } = await Tesseract.recognize(filePath, "eng");

    await ScanModel.create({ text, filename: file.name });

    return NextResponse.json({ success: true, text });
  } catch (error) {
    if (error instanceof Error) {
      console.error("OCR failed:", error);
      return NextResponse.json(
        { success: false, message: "OCR failed", error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Unexpected error during OCR." },
        { status: 500 }
      );
    }
  }
}
