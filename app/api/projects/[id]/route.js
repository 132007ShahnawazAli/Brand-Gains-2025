import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Project from "@/models/Project"

export async function GET(request, { params }) {
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

    return NextResponse.json({ success: true, data: project }, { status: 200 })
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch project", error: error.message },
      { status: 500 },
    )
  }
}

export async function PATCH(request, { params }) {
  try {
    await dbConnect()

    const { id } = params
    const body = await request.json()

    // If setting as featured, check featured count
    if (body.featured) {
      // Count existing featured projects excluding this one
      const featuredCount = await Project.countDocuments({ featured: true, _id: { $ne: id } })

      // If already 3 featured projects, return error
      if (featuredCount >= 3 && !body.featuredOrder) {
        return NextResponse.json(
          {
            success: false,
            message: "Maximum of 3 featured projects allowed. Please unfeatured an existing project first.",
          },
          { status: 400 },
        )
      }

      // If featuredOrder is provided, check if it's already in use
      if (body.featuredOrder) {
        const existingProject = await Project.findOne({
          featuredOrder: body.featuredOrder,
          _id: { $ne: id },
        })

        if (existingProject) {
          // Update the existing project to not be featured
          await Project.findByIdAndUpdate(existingProject._id, { featured: false, featuredOrder: 0 })
        }
      } else {
        // Assign next available order (1, 2, or 3)
        const existingOrders = await Project.distinct("featuredOrder", {
          featured: true,
          _id: { $ne: id },
        })

        const availableOrders = [1, 2, 3].filter((order) => !existingOrders.includes(order))
        body.featuredOrder = availableOrders[0] || 1
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true })

    if (!updatedProject) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: updatedProject }, { status: 200 })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json(
      { success: false, message: "Failed to update project", error: error.message },
      { status: 500 },
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect()

    const { id } = params
    const deletedProject = await Project.findByIdAndDelete(id)

    if (!deletedProject) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Project deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json(
      { success: false, message: "Failed to delete project", error: error.message },
      { status: 500 },
    )
  }
}
