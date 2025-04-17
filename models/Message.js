import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
  },
  message: {
    type: String,
    required: [true, "Please provide a message"],
  },
  status: {
    type: String,
    enum: ["unread", "read", "replied"],
    default: "unread",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Message || mongoose.model("Message", MessageSchema)
