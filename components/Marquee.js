"use client"
import { useRef, useEffect } from "react"

export default function Marquee() {
  const videoRefs = useRef([])

  useEffect(() => {
    // Ensure videos play on mobile by adding playsinline attribute
    videoRefs.current.forEach((video) => {
      if (video) {
        video.setAttribute("playsinline", "")
        video.play().catch((error) => console.log("Video play error:", error))
      }
    })
  }, [])

  const addToRefs = (el) => {
    if (el && !videoRefs.current.includes(el)) {
      videoRefs.current.push(el)
    }
  }

  const marqueeItems = [
    { text: "EXPERIENCE", videoUrl: "https://cdn.cuberto.com/cb/hello/overview/1.mp4" },
    { text: "CONTENT", videoUrl: "https://cdn.cuberto.com/cb/hello/overview/3.webm" },
    { text: "INSPIRATION", videoUrl: "https://cdn.cuberto.com/cb/hello/overview/1.mp4" },
  ]

  return (
    <div className="bg-[#255e45] text-white font-black whitespace-nowrap text-3xl sm:text-6xl md:text-8xl py-4 overflow-hidden">
      <div className="flex">
        <div className="animate-marquee flex items-center">
          {[...Array(2)].map((_, dupeIndex) => (
            <div key={dupeIndex} className="flex items-center">
              {marqueeItems.map((item, index) => (
                <div key={`${dupeIndex}-${index}`} className="flex items-center">
                  <h2 className="mx-2">{item.text}</h2>
                  <div className="w-16 h-12 sm:w-24 sm:h-16 md:w-32 md:h-20 bg-[#171919] rounded-full mx-6 overflow-hidden relative shadow-lg">
                    <video
                      ref={addToRefs}
                      src={item.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
