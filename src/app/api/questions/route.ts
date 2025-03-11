import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { text, answers } = await req.json();
    if (!text || !answers) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const addque = await prisma.question.create({
      data: { text, answers },
    });

    return NextResponse.json({ message: "Question added", data: addque });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
    try {
      const questions = await prisma.question.findMany();
      return NextResponse.json(questions);
    } catch (error) {
      return NextResponse.json({ error: "Error fetching questions" }, { status: 500 });
    }
  }