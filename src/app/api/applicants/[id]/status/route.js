import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Applicant from "@/models/Applicant";

export async function PATCH(req, { params }) {
  await dbConnect();

  const { id } = params;
  const { status } = await req.json();

  if (!["admitted", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const applicant = await Applicant.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!applicant) {
      return NextResponse.json({ error: "Applicant not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Status updated", applicant });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}