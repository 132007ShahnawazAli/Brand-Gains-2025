import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Project from "@/models/Project"

export async function POST(request, { params }) {
  try {
    await dbConnect()

    const { id } = params
    const project = await Project.findById(id)

    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 })
    }

    // Increment view count
    project.views += 1
    await project.save()

    return NextResponse.json({ success: true, data: { views: project.views } }, { status: 200 })
  } catch (error) {
    console.error("Error incrementing view count:", error)
    return NextResponse.json(
      { success: false, message: "Failed to increment view count", error: error.message },
      { status: 500 },
    )
  }
}
