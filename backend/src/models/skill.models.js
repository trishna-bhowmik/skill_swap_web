import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    default: "",
  },
  owners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ]
}, { timestamps: true });

export const Skill = mongoose.model("Skill", skillSchema);
