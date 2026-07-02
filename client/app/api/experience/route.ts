import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Experience from "@/models/Experience";

export async function GET() {
  await dbConnect();
  const items = await Experience.find().sort({ createdAt: -1 });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const item = await Experience.create(body);
  return NextResponse.json(item, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const { id, ...data } = body;
  const item = await Experience.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { id } = await req.json();
  await Experience.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}