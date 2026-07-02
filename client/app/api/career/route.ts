import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Career from "@/models/Career";

export async function GET() {
  await dbConnect();
  const items = await Career.find().sort({ createdAt: -1 });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const item = await Career.create(body);
  return NextResponse.json(item, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const { id, ...data } = body;
  const item = await Career.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { id } = await req.json();
  await Career.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}