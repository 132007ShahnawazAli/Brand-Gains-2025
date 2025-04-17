import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Message from "@/models/Message"

export async function POST(request) {
  try {
    const db = await dbConnect()

    // If MongoDB connection failed but we're in production, return an error
    if (!db && process.env.NODE_ENV === "production") {
      return NextResponse.json({ success: false, message: "Database connection failed" }, { status: 500 })
    }

    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "Please provide all required fields" }, { status: 400 })
    }

    // If we're in development and don't have MongoDB, mock the response
    if (!db) {
      console.log("Development mode: Mocking message submission")
      return NextResponse.json(
        {
          success: true,
          message: "Message sent successfully (Development mode)",
          data: { name, email, message, createdAt: new Date() },
        },
        { status: 201 },
      )
    }

    const newMessage = await Message.create({
      name,
      email,
      message,
    })

    return NextResponse.json({ success: true, message: "Message sent successfully", data: newMessage }, { status: 201 })
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return NextResponse.json({ success: false, message: "Something went wrong", error: error.message }, { status: 500 })
  }
}
