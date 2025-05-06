"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FiMail, FiGrid, FiPlus, FiLogOut } from "react-icons/fi"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem("isAdminAuthenticated")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const authenticate = (e) => {
    e.preventDefault()
    // Simple authentication for demo purposes
    // In production, use a proper authentication system
    if (password === "admin123") {
      setIsAuthenticated(true)
      localStorage.setItem("isAdminAuthenticated", "true")
    } else {
      setError("Invalid password")
    }
  }

  const logout = () => {
    localStorage.removeItem("isAdminAuthenticated")
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto p-8 rounded-2xl bg-dark-2 border border-white/5">
            <h1 className="text-2xl font-monument-regular text-white mb-6">Admin Login</h1>

            <form onSubmit={authenticate} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-white font-metropolis-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark-3 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bafc50]"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-lg">{error}</div>
              )}

              <button
                type="submit"
                className="w-full bg-[#bafc50] text-black font-metropolis-bold py-3 rounded-lg hover:bg-[#c5ff6b] transition-colors duration-300"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-monument-regular text-white">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-dark-2 text-white px-4 py-2 rounded-lg hover:bg-dark-3 transition-colors duration-300"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/messages"
            className="bg-dark-2 rounded-xl p-6 border border-white/5 hover:border-[#bafc50]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#bafc50]/5"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#bafc50]/10 flex items-center justify-center text-[#bafc50]">
                <FiMail size={24} />
              </div>
              <div>
                <h2 className="text-xl font-metropolis-bold text-white">Messages</h2>
                <p className="text-white/60">View and manage contact messages</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/projects"
            className="bg-dark-2 rounded-xl p-6 border border-white/5 hover:border-[#bafc50]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#bafc50]/5"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#bafc50]/10 flex items-center justify-center text-[#bafc50]">
                <FiGrid size={24} />
              </div>
              <div>
                <h2 className="text-xl font-metropolis-bold text-white">Projects</h2>
                <p className="text-white/60">Manage your portfolio projects</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/projects/new"
            className="bg-dark-2 rounded-xl p-6 border border-white/5 hover:border-[#bafc50]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#bafc50]/5"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#bafc50]/10 flex items-center justify-center text-[#bafc50]">
                <FiPlus size={24} />
              </div>
              <div>
                <h2 className="text-xl font-metropolis-bold text-white">Add Project</h2>
                <p className="text-white/60">Create a new portfolio project</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
