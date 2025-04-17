import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Providers } from "@/components/Providers"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata = {
  title: "Brand Gains - Expert Marketing & Short-Form Content Editing Agency",
  description:
    "We deliver Short-Form Edits that help clients grow their business and build an engaging online presence.",
  keywords: "short-form content, video editing, marketing agency, brand growth, social media content",
  openGraph: {
    title: "Brand Gains - Expert Marketing & Short-Form Content Editing Agency",
    description:
      "We deliver Short-Form Edits that help clients grow their business and build an engaging online presence.",
    url: "https://brandgains.com",
    siteName: "Brand Gains",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Brand Gains - Expert Marketing & Short-Form Content Editing Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand Gains - Expert Marketing & Short-Form Content Editing Agency",
    description:
      "We deliver Short-Form Edits that help clients grow their business and build an engaging online presence.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#021814" />
      </head>
      <body className={`${inter.className} bg-[#021814]`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>

        {/* GSAP for simpler animations */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="afterInteractive" />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}


import './globals.css'