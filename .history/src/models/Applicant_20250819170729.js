import mongoose from "mongoose";

const ApplicantSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  program: String,
  results: Object,
  status: {
    type: String,
    enum: ["pending", "admitted", "rejected"],
    default: "pending",
  },
});