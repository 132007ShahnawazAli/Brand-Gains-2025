import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Project from "@/models/Project"

export async function GET(request) {
  try {
    await dbConnect()

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")

    const query = {}

    // If featured parameter is present, filter by featured
    if (featured === "true") {
      query.featured = true
    }

    const projects = await Project.find(query).sort({ featuredOrder: 1, createdAt: -1 })

    return NextResponse.json({ success: true, data: projects }, { status: 200 })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch projects", error: error.message },
      { status: 500 },
    )
  }
}

export async function POST(request) {
  try {
    await dbConnect()

    const body = await request.json()

    // Check if this is a featured project
    if (body.featured) {
      // Count existing featured projects
      const featuredCount = await Project.countDocuments({ featured: true })

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
        const existingProject = await Project.findOne({ featuredOrder: body.featuredOrder })
        if (existingProject) {
          // Update the existing project to not be featured
          await Project.findByIdAndUpdate(existingProject._id, { featured: false, featuredOrder: 0 })
        }
      } else {
        // Assign next available order (1, 2, or 3)
        const existingOrders = await Project.distinct("featuredOrder", { featured: true })
        const availableOrders = [1, 2, 3].filter((order) => !existingOrders.includes(order))
        body.featuredOrder = availableOrders[0] || 1
      }
    }

    const newProject = await Project.create(body)

    return NextResponse.json(
      { success: true, message: "Project created successfully", data: newProject },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json(
      { success: false, message: "Failed to create project", error: error.message },
      { status: 500 },
    )
  }
}
