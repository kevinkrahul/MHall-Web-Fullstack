import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// ✅ DELETE API - Delete a question
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id); // Convert string ID to number

    // If id is NaN, return an error
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid question ID" }, { status: 400 });
    }

    // Check if the question exists before deleting
    const existingQuestion = await prisma.question.findUnique({ where: { id } });

    if (!existingQuestion) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    // Delete the question
    await prisma.question.delete({ where: { id } });

    return NextResponse.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json({ error: "Error deleting question" }, { status: 500 });
  }
}


// ✅ UPDATE API - Update a question
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id); // Convert string ID to number

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid question ID" }, { status: 400 });
    }

    const { text, answers } = await req.json(); // Extract data from request body

    // Check if the question exists before updating
    const existingQuestion = await prisma.question.findUnique({ where: { id } });

    if (!existingQuestion) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    // Update the question
    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: { text, answers },
    });

    return NextResponse.json({ message: "Question updated successfully", data: updatedQuestion });
  } catch (error) {
    console.error("Error updating question:", error);
    return NextResponse.json({ error: "Error updating question" }, { status: 500 });
  }
}
