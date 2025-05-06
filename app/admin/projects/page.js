"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FiEdit2, FiTrash2, FiEye, FiStar, FiLoader, FiPlus } from "react-icons/fi"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem("isAdminAuthenticated")
    if (auth === "true") {
      setIsAuthenticated(true)
      fetchProjects()
    } else {
      router.push("/admin")
    }
  }, [router])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/projects")

      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }

      const data = await response.json()
      setProjects(data.data)
      setError("")
    } catch (error) {
      console.error("Error fetching projects:", error)
      setError("Failed to load projects. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete project")
      }

      // Update local state
      setProjects(projects.filter((project) => project._id !== id))
    } catch (error) {
      console.error("Error deleting project:", error)
      setError("Failed to delete project")
    }
  }

  const toggleFeatured = async (project) => {
    try {
      const updatedProject = { ...project, featured: !project.featured }

      // If removing from featured, reset featuredOrder
      if (!updatedProject.featured) {
        updatedProject.featuredOrder = 0
      }

      const response = await fetch(`/api/projects/${project._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to update project")
      }

      const data = await response.json()

      // Update local state
      setProjects(projects.map((p) => (p._id === project._id ? data.data : p)))
    } catch (error) {
      console.error("Error updating project:", error)
      setError(error.message || "Failed to update project")
    }
  }

  const updateFeaturedOrder = async (project, order) => {
    try {
      const updatedProject = { ...project, featuredOrder: order, featured: true }

      const response = await fetch(`/api/projects/${project._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to update project order")
      }

      const data = await response.json()

      // Update local state
      setProjects(
        projects.map((p) => {
          if (p._id === project._id) return data.data
          // If another project had this order, it's been reset in the backend
          if (p.featuredOrder === order && p.featured) {
            return { ...p, featured: false, featuredOrder: 0 }
          }
          return p
        }),
      )
    } catch (error) {
      console.error("Error updating project order:", error)
      setError(error.message || "Failed to update project order")
    }
  }

  if (!isAuthenticated) {
    return null // Will redirect to admin login
  }

  return (
    <div className="min-h-screen bg-dark pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-monument-regular text-white">Projects</h1>
          <div className="flex gap-4">
            <Link
              href="/admin"
              className="bg-dark-2 text-white px-4 py-2 rounded-lg hover:bg-dark-3 transition-colors duration-300"
            >
              Back to Admin
            </Link>
            <Link
              href="/admin/projects/new"
              className="bg-[#bafc50] text-black px-4 py-2 rounded-lg hover:bg-[#c5ff6b] transition-colors duration-300 flex items-center gap-2"
            >
              <FiPlus size={18} />
              Add Project
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-lg mb-6">{error}</div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FiLoader className="animate-spin text-[#bafc50]" size={32} />
          </div>
        ) : (
          <div>
            <div className="bg-dark-2 rounded-xl p-6 border border-white/5 mb-8">
              <h2 className="text-xl font-metropolis-bold text-white mb-4">Featured Projects</h2>
              <p className="text-white/60 mb-4">
                Featured projects will appear on the home page. You can feature up to 3 projects and set their display
                order.
              </p>

              {projects.filter((p) => p.featured).length === 0 ? (
                <p className="text-white/60 italic">No featured projects yet. Star a project below to feature it.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((order) => {
                    const project = projects.find((p) => p.featured && p.featuredOrder === order)

                    return (
                      <div key={order} className="bg-dark-3 rounded-lg p-4 border border-white/10">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-white font-metropolis-bold">Position {order}</h3>
                          {project && (
                            <button
                              onClick={() => toggleFeatured(project)}
                              className="text-[#bafc50] hover:text-[#c5ff6b]"
                              title="Remove from featured"
                            >
                              <FiStar size={18} fill="#bafc50" />
                            </button>
                          )}
                        </div>

                        {project ? (
                          <div>
                            <div className="aspect-video relative mb-2 rounded-lg overflow-hidden">
                              <Image
                                src={project.thumbnail || "/placeholder.svg"}
                                alt={project.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <p className="text-white truncate">{project.title}</p>
                          </div>
                        ) : (
                          <div className="aspect-video bg-dark-2 rounded-lg flex items-center justify-center">
                            <p className="text-white/40">Empty slot</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="bg-dark-2 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-dark-3">
                      <th className="text-left p-4 text-white font-metropolis-bold">Project</th>
                      <th className="text-left p-4 text-white font-metropolis-bold">Type</th>
                      <th className="text-left p-4 text-white font-metropolis-bold">Client</th>
                      <th className="text-left p-4 text-white font-metropolis-bold">Date</th>
                      <th className="text-left p-4 text-white font-metropolis-bold">Views</th>
                      <th className="text-left p-4 text-white font-metropolis-bold">Featured</th>
                      <th className="text-left p-4 text-white font-metropolis-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="p-4 text-white/60 text-center">
                          No projects found. Add your first project!
                        </td>
                      </tr>
                    ) : (
                      projects.map((project) => (
                        <tr key={project._id} className="border-t border-white/5">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 relative rounded overflow-hidden">
                                <Image
                                  src={project.thumbnail || "/placeholder.svg"}
                                  alt={project.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span className="text-white">{project.title}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-1 bg-[#bafc50]/10 text-[#bafc50] rounded-full text-xs">
                              {project.type}
                            </span>
                          </td>
                          <td className="p-4 text-white/80">{project.client}</td>
                          <td className="p-4 text-white/80">{project.date}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <FiEye size={16} className="text-[#bafc50]" />
                              <span className="text-white font-metropolis-bold">{project.views}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            {project.featured ? (
                              <div className="flex items-center gap-2">
                                <FiStar size={18} className="text-[#bafc50]" fill="#bafc50" />
                                <select
                                  value={project.featuredOrder}
                                  onChange={(e) => updateFeaturedOrder(project, Number.parseInt(e.target.value))}
                                  className="bg-dark-3 text-white border border-white/10 rounded p-1"
                                >
                                  <option value="1">Position 1</option>
                                  <option value="2">Position 2</option>
                                  <option value="3">Position 3</option>
                                </select>
                              </div>
                            ) : (
                              <button
                                onClick={() => toggleFeatured(project)}
                                className="text-white/60 hover:text-[#bafc50]"
                                title="Add to featured"
                              >
                                <FiStar size={18} />
                              </button>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Link
                                href={`/admin/projects/edit/${project._id}`}
                                className="p-2 bg-blue-500/20 text-blue-500 rounded hover:bg-blue-500/30 transition-colors"
                                title="Edit Project"
                              >
                                <FiEdit2 size={16} />
                              </Link>
                              <button
                                onClick={() => deleteProject(project._id)}
                                className="p-2 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30 transition-colors"
                                title="Delete Project"
                              >
                                <FiTrash2 size={16} />
                              </button>
                              <Link
                                href={`/portfolio?project=${project._id}`}
                                target="_blank"
                                className="p-2 bg-green-500/20 text-green-500 rounded hover:bg-green-500/30 transition-colors"
                                title="View Project"
                              >
                                <FiEye size={16} />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
