// app/api/career/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Career from "@/models/Career";

export const runtime = "nodejs";

export async function GET() {
  await dbConnect();
  const item = await Career.findOne().sort({ createdAt: -1 }).lean();
  return NextResponse.json(item);
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const careerEducation = Array.isArray(body.careerEducation)
    ? body.careerEducation
    : [];

  const item = await Career.findOneAndUpdate(
    {},
    { careerEducation },
    { new: true, upsert: true }
  );

  return NextResponse.json(item, { status: 200 });
}

export async function DELETE() {
  await dbConnect();
  await Career.deleteOne({});
  return NextResponse.json({ success: true });
}