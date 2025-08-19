import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Applicant from "@/models/Applicant";

export async function GET() {
  await dbConnect();
  const applicants = await Applicant.find({});
  return NextResponse.json(applicants);
}