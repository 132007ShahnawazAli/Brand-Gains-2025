import { generateMetadata } from "@/app/meta"
import PortfolioPageClient from "./PortfolioPageClient"

// Generate metadata for this page
export const metadata = generateMetadata(
  "Portfolio",
  "Browse our selected projects showcasing our expertise in creating engaging short-form content that drives results.",
)

export default function PortfolioPage() {
  return <PortfolioPageClient />
}
