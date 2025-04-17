import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Message from "@/models/Message"

export async function GET(request) {
  try {
    await dbConnect()

    const messages = await Message.find({}).sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: messages }, { status: 200 })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch messages", error: error.message },
      { status: 500 },
    )
  }
}
