import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Experience from "@/models/Experience";

export const runtime = "nodejs";

export async function GET() {
  try {
    await dbConnect();
    const items = await Experience.find().sort({ createdAt: -1 });
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch experiences";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const item = await Experience.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create experience";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ message: "Experience id is required" }, { status: 400 });
    }

    const item = await Experience.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update experience";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Experience id is required" }, { status: 400 });
    }

    await Experience.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete experience";
    return NextResponse.json({ message }, { status: 500 });
  }
}