import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names and resolves Tailwind CSS conflicts
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Format date to a readable string
 */
export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/**
 * Truncate text to a specific length
 */
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return emailRegex.test(email)
}

/**
 * Generate a random ID
 */
export function generateId(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2)
}

/**
 * Debounce function to limit how often a function can be called
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
