// src/app/api/home/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Profile from "@/models/Home";

export const runtime = "nodejs";

export async function GET() {
  try {
    await dbConnect();
    const profile = await Profile.findOne().sort({ createdAt: -1 }).lean();
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch profile";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const profile = await Profile.create(body);
    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create profile";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ message: "Profile id is required" }, { status: 400 });
    }

    const profile = await Profile.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update profile";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Profile id is required" }, { status: 400 });
    }

    await Profile.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete profile";
    return NextResponse.json({ message }, { status: 500 });
  }
}