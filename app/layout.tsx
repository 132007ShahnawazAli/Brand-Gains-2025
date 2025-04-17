import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Brand Gains',
  description: 'Your Digital Growth Partner',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
} 