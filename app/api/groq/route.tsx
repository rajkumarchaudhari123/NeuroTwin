import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import dbConnect from "@/lib/mongodb";
import ScanModel from "@/model/scan";
import Tesseract from "tesseract.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  await dbConnect();

  const buffer = await req.arrayBuffer();
  const tempFilePath = `./public/uploads/upload_${Date.now()}.jpg`;
  fs.writeFileSync(tempFilePath, Buffer.from(buffer));

  try {
    const {
      data: { text },
    } = await Tesseract.recognize(tempFilePath, "eng");

    await ScanModel.create({
      text,
      filename: tempFilePath,
    });

    return NextResponse.json({ success: true, text });
  } catch (error: unknown) {
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
