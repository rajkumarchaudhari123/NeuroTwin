import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import dbConnect from "@/lib/mongodb";
import ScanModel from "@/model/scan";
import Tesseract from "tesseract.js";

// Ensure upload directory exists
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: "File must be an image" },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const tempFilePath = path.join(UPLOAD_DIR, `upload_${Date.now()}.jpg`);
    fs.writeFileSync(tempFilePath, buffer);

    // Run OCR
    const {
      data: { text },
    } = await Tesseract.recognize(tempFilePath, "eng", {
      logger: (m) => console.log(m), // Optional: log progress
    });

    // Save to database
    const scan = await ScanModel.create({
      text,
      filename: path.basename(tempFilePath),
      createdAt: new Date(),
    });

    // Optionally delete temp file after processing
    // fs.unlinkSync(tempFilePath);

    return NextResponse.json({ 
      success: true, 
      text,
      id: scan._id 
    });
  } catch (error: unknown) {
    console.error("OCR Error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "OCR failed unexpectedly",
      },
      { status: 500 }
    );
  }
}