import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  chatName: {
    type: String,
    trim: true,
  },
  isGroupChat: {
    type: Boolean,
    default: false,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 🔴 this is crucial
    },
  ],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message", // if you have a Message model
  },
}, {
  timestamps: true,
});

export const Chat = mongoose.model("Chat", chatSchema);
