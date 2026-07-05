import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Certificate from "@/models/Certificate";

export const runtime = "nodejs";

export async function GET() {
  try {
    await dbConnect();
    const items = await Certificate.find().sort({ createdAt: -1 });
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch certificates";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const item = await Certificate.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create certificate";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ message: "Certificate id is required" }, { status: 400 });
    }

    const item = await Certificate.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update certificate";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Certificate id is required" }, { status: 400 });
    }

    await Certificate.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete certificate";
    return NextResponse.json({ message }, { status: 500 });
  }
}