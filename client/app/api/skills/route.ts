import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Skill from "@/models/Skill";

export const runtime = "nodejs";

export async function GET() {
  try {
    await dbConnect();
    const items = await Skill.find().sort({ createdAt: -1 });
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch skills";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const item = await Skill.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create skill";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ message: "Skill id is required" }, { status: 400 });
    }

    const item = await Skill.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update skill";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Skill id is required" }, { status: 400 });
    }

    await Skill.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete skill";
    return NextResponse.json({ message }, { status: 500 });
  }
}