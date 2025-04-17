import Image from "next/image"
import Link from "next/link"

export default function Logo({ className = "", size = "default" }) {
  const sizes = {
    small: { width: 100, height: 50 },
    default: { width: 140, height: 70 },
    large: { width: 180, height: 90 },
  }

  const { width, height } = sizes[size] || sizes.default

  return (
    <Link href="/" className={`block relative ${className}`}>
      <Image src="/logo.png" alt="Brand Gains Logo" width={width} height={height} className="object-contain" priority />
    </Link>
  )
}
