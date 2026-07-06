// app/api/career/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Career from "@/models/Career";

export const runtime = "nodejs";

export async function GET() {
  try {
    await dbConnect();
    const item = await Career.findOne().sort({ updatedAt: -1, createdAt: -1 }).lean();
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch career details";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const careerEducation = Array.isArray(body.careerEducation)
      ? body.careerEducation
      : [];

    await Career.deleteMany({});
    const item = await Career.create({ careerEducation });

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save career details";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await dbConnect();
    await Career.deleteOne({});
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete career details";
    return NextResponse.json({ message }, { status: 500 });
  }
}
