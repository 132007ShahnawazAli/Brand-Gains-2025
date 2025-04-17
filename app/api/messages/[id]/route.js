import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Message from "@/models/Message"

export async function PATCH(request, { params }) {
  try {
    await dbConnect()

    const { id } = params
    const body = await request.json()

    const updatedMessage = await Message.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true })

    if (!updatedMessage) {
      return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: updatedMessage }, { status: 200 })
  } catch (error) {
    console.error("Error updating message:", error)
    return NextResponse.json(
      { success: false, message: "Failed to update message", error: error.message },
      { status: 500 },
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect()

    const { id } = params

    const deletedMessage = await Message.findByIdAndDelete(id)

    if (!deletedMessage) {
      return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Message deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting message:", error)
    return NextResponse.json(
      { success: false, message: "Failed to delete message", error: error.message },
      { status: 500 },
    )
  }
}
