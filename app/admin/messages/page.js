"use client"
import { useState, useEffect } from "react"
import { FiEye, FiCheck, FiLoader, FiTrash2 } from "react-icons/fi"

export default function MessagesPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedMessage, setSelectedMessage] = useState(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/messages")

      if (!response.ok) {
        throw new Error("Failed to fetch messages")
      }

      const data = await response.json()
      setMessages(data.data)
      setError("")
    } catch (error) {
      console.error("Error fetching messages:", error)
      setError("Failed to load messages. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const updateMessageStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error("Failed to update message status")
      }

      // Update local state
      setMessages(messages.map((msg) => (msg._id === id ? { ...msg, status } : msg)))

      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage({ ...selectedMessage, status })
      }
    } catch (error) {
      console.error("Error updating message:", error)
      setError("Failed to update message status")
    }
  }

  const deleteMessage = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete message")
      }

      // Update local state
      setMessages(messages.filter((msg) => msg._id !== id))

      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error("Error deleting message:", error)
      setError("Failed to delete message")
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="min-h-screen bg-dark pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-monument-regular text-white">Messages</h1>
          <a
            href="/admin"
            className="bg-dark-2 text-white px-4 py-2 rounded-lg hover:bg-dark-3 transition-colors duration-300"
          >
            Back to Admin
          </a>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-lg mb-6">{error}</div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FiLoader className="animate-spin text-[#bafc50]" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1 bg-dark-2 rounded-2xl border border-white/5 p-4 h-[calc(100vh-200px)] overflow-y-auto">
              <h2 className="text-xl font-metropolis-bold text-white mb-4">Inbox</h2>

              {messages.length === 0 ? (
                <p className="text-white/60 text-center py-8">No messages found</p>
              ) : (
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message._id}
                      className={`p-4 rounded-lg cursor-pointer transition-colors duration-300 ${
                        selectedMessage && selectedMessage._id === message._id
                          ? "bg-[#bafc50]/10 border border-[#bafc50]/30"
                          : "bg-dark-3 hover:bg-dark-3/70 border border-white/5"
                      } ${message.status === "unread" ? "border-l-4 border-l-[#bafc50]" : ""}`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-metropolis-bold text-white">{message.name}</h3>
                        <span className="text-xs text-white/50">{formatDate(message.createdAt)}</span>
                      </div>
                      <p className="text-white/70 text-sm truncate">{message.message}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-white/50">{message.email}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            message.status === "unread"
                              ? "bg-[#bafc50]/20 text-[#bafc50]"
                              : message.status === "read"
                                ? "bg-blue-500/20 text-blue-500"
                                : "bg-green-500/20 text-green-500"
                          }`}
                        >
                          {message.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2 bg-dark-2 rounded-2xl border border-white/5 p-6 h-[calc(100vh-200px)] overflow-y-auto">
              {selectedMessage ? (
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-metropolis-bold text-white">{selectedMessage.name}</h2>
                      <p className="text-[#bafc50]">{selectedMessage.email}</p>
                      <p className="text-white/50 text-sm mt-1">{formatDate(selectedMessage.createdAt)}</p>
                    </div>
                    <div className="flex gap-2">
                      {selectedMessage.status === "unread" && (
                        <button
                          onClick={() => updateMessageStatus(selectedMessage._id, "read")}
                          className="bg-blue-500/20 text-blue-500 p-2 rounded-lg hover:bg-blue-500/30 transition-colors duration-300"
                          title="Mark as Read"
                        >
                          <FiEye size={18} />
                        </button>
                      )}
                      {selectedMessage.status !== "replied" && (
                        <button
                          onClick={() => updateMessageStatus(selectedMessage._id, "replied")}
                          className="bg-green-500/20 text-green-500 p-2 rounded-lg hover:bg-green-500/30 transition-colors duration-300"
                          title="Mark as Replied"
                        >
                          <FiCheck size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(selectedMessage._id)}
                        className="bg-red-500/20 text-red-500 p-2 rounded-lg hover:bg-red-500/30 transition-colors duration-300"
                        title="Delete Message"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-dark-3 rounded-xl p-6 border border-white/10">
                    <h3 className="text-white/70 mb-2 font-metropolis-bold">Message:</h3>
                    <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-white font-metropolis-bold mb-3">Quick Reply</h3>
                    <textarea
                      className="w-full bg-dark-3 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bafc50] resize-none"
                      rows="5"
                      placeholder="Type your reply here..."
                    ></textarea>
                    <div className="flex justify-end mt-3">
                      <button className="bg-[#bafc50] text-black px-6 py-2 rounded-lg font-metropolis-bold hover:bg-[#c5ff6b] transition-colors duration-300">
                        Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-white/50">
                  <p className="text-xl">Select a message to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
