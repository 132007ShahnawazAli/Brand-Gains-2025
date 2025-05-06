"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FiSave, FiLoader, FiArrowLeft } from "react-icons/fi"

export default function EditProjectPage({ params }) {
  const { id } = params
  const [formData, setFormData] = useState({
    title: "",
    type: "EDIT",
    thumbnail: "",
    mediaType: "image",
    videoUrl: "",
    description: "",
    client: "",
    date: new Date().getFullYear().toString(),
    link: "",
    featured: false,
    featuredOrder: 1,
    views: 0,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem("isAdminAuthenticated")
    if (auth === "true") {
      setIsAuthenticated(true)
      fetchProject()
    } else {
      router.push("/admin")
    }
  }, [router])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${id}`)

      if (!response.ok) {
        throw new Error("Failed to fetch project")
      }

      const data = await response.json()
      setFormData(data.data)
      setError("")
    } catch (error) {
      console.error("Error fetching project:", error)
      setError("Failed to load project. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError("")

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }

      router.push("/admin/projects")
    } catch (error) {
      console.error("Error updating project:", error)
      setError(error.message || "Failed to update project. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (!isAuthenticated) {
    return null // Will redirect to admin login
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark pt-28 pb-16 flex items-center justify-center">
        <FiLoader className="animate-spin text-[#bafc50]" size={32} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-monument-regular text-white">Edit Project</h1>
          <Link
            href="/admin/projects"
            className="flex items-center gap-2 bg-dark-2 text-white px-4 py-2 rounded-lg hover:bg-dark-3 transition-colors duration-300"
          >
            <FiArrowLeft size={18} />
            Back to Projects
          </Link>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-lg mb-6">{error}</div>
        )}

        <div className="bg-dark-2 rounded-xl p-6 border border-white/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-white font-metropolis-bold mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-dark-3 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bafc50]"
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-white font-metropolis-bold mb-2">
                  Project Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-dark-3 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bafc50]"
                  required
                >
                  <option value="EDIT">EDIT</option>
                  <option value="MOTION">MOTION</option>
                  <option value="CAMPAIGN">CAMPAIGN</option>
                  <option value="NARRATIVE">NARRATIVE</option>
                  <option value="COMMERCIAL">COMMERCIAL</option>
                </select>
              </div>

              <div>
                <label htmlFor="thumbnail" className="block text-white font-metropolis-bold mb-2">
                  Thumbnail URL *
                </label>
                <input
                  type="url"
                  id="thumbnail"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  className="w-full bg-dark-3 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bafc50]"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div>
                <label htmlFor="mediaType" className="block text-white font-metropolis-bold mb-2">
                  Media Type *
                </label>
                <select
                  id="mediaType"
                  name="mediaType"
                  value={formData.mediaType}
                  onChange={handleChange}
                  className="w-full bg-dark-3 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bafc50]"
                  required
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>

              {formData.mediaType === "video" && (
                <div className="md:col-span-2">
                  <label htmlFor="videoUrl" className="block text-white font-metropolis-bold mb-2">
                    Video URL *
                  </label>
                  <input
                    type="url"
                    id="videoUrl"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    className="w-full bg-dark-3 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bafc50]"
                    placeholder="https://example.com/video.mp4"
                    required={formData.mediaType === "video"}
                  />
                </div>
              )}

              <div>
                <label htmlFor="client" className="block text-white font-metropolis-bold mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  className="w-full bg-dark-3 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bafc50]"
                  placeholder="Enter client name"
                  required
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-white font-metropolis-bold mb-2">
                  Project Date *
                </label>
                <input
                  type="text"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-dark-3 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bafc50]"
                  placeholder="2023"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="link" className="block text-white font-metropolis-bold mb-2">
                  External Link
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="w-full bg-dark-3 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bafc50]"
                  placeholder="https://example.com/project"
                />
              </div>

              <div>
                <label htmlFor="views" className="block text-white font-metropolis-bold mb-2">
                  Views / Results
                </label>
                <input
                  type="number"
                  id="views"
                  name="views"
                  value={formData.views}
                  onChange={handleChange}
                  className="w-full bg-dark-3 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bafc50]"
                  placeholder="0"
                  min="0"
                />
                <p className="text-white/60 text-sm mt-1">
                  Enter the number of views or results this project has achieved
                </p>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-white font-metropolis-bold mb-2">
                  Project Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full bg-dark-3 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bafc50] resize-none"
                  placeholder="Enter project description"
                  required
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-5 h-5 bg-dark-3 border border-white/10 rounded text-[#bafc50] focus:ring-[#bafc50] focus:ring-opacity-25"
                  />
                  <label htmlFor="featured" className="ml-2 text-white">
                    Feature this project on the home page
                  </label>
                </div>
              </div>

              {formData.featured && (
                <div>
                  <label htmlFor="featuredOrder" className="block text-white font-metropolis-bold mb-2">
                    Featured Position
                  </label>
                  <select
                    id="featuredOrder"
                    name="featuredOrder"
                    value={formData.featuredOrder}
                    onChange={handleChange}
                    className="w-full bg-dark-3 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bafc50]"
                  >
                    <option value="1">Position 1</option>
                    <option value="2">Position 2</option>
                    <option value="3">Position 3</option>
                  </select>
                  <p className="text-white/60 text-sm mt-1">
                    Note: If this position is already taken, the existing project will be unfeatured.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#bafc50] text-black px-6 py-3 rounded-lg font-metropolis-bold hover:bg-[#c5ff6b] transition-colors duration-300 flex items-center gap-2"
              >
                {saving ? <FiLoader className="animate-spin" size={18} /> : <FiSave size={18} />}
                {saving ? "Saving..." : "Update Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
