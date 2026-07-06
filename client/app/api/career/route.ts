// app/api/career/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Career from "@/models/Career";

export const runtime = "nodejs";

export async function GET() {
  try {
    await dbConnect();
    const items = await Career.find().sort({ createdAt: -1 });
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch career details";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    if (Array.isArray(body.careerEducation)) {
      await Career.deleteMany({});
      const items = body.careerEducation.length > 0
        ? await Career.insertMany(body.careerEducation)
        : [];

      return NextResponse.json(items, { status: 200 });
    }

    const item = await Career.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save career details";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ message: "Career id is required" }, { status: 400 });
    }

    const item = await Career.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update career details";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Career id is required" }, { status: 400 });
    }

    await Career.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete career details";
    return NextResponse.json({ message }, { status: 500 });
  }
}
