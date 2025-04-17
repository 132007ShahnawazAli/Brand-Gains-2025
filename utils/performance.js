// Performance optimization utilities

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} - The debounced function
 */
export function debounce(func, wait = 100) {
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

/**
 * Throttle function to limit the rate at which a function can fire
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - The throttled function
 */
export function throttle(func, limit = 100) {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Lazy load images when they come into view
 * @param {string} selector - CSS selector for images to lazy load
 */
export function lazyLoadImages(selector = "img[data-src]") {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return

  const images = document.querySelectorAll(selector)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          const src = img.getAttribute("data-src")
          if (src) {
            img.setAttribute("src", src)
            img.removeAttribute("data-src")
          }
          observer.unobserve(img)
        }
      })
    },
    {
      rootMargin: "50px 0px",
      threshold: 0.1,
    },
  )

  images.forEach((img) => observer.observe(img))
}

/**
 * Preload critical assets
 * @param {Array<string>} urls - URLs of assets to preload
 */
export function preloadAssets(urls = []) {
  if (typeof window === "undefined") return

  urls.forEach((url) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.href = url

    if (url.endsWith(".js")) {
      link.as = "script"
    } else if (url.endsWith(".css")) {
      link.as = "style"
    } else if (/\.(jpe?g|png|gif|svg|webp)$/i.test(url)) {
      link.as = "image"
    } else if (/\.(woff2?|ttf|otf|eot)$/i.test(url)) {
      link.as = "font"
      link.crossOrigin = "anonymous"
    }

    document.head.appendChild(link)
  })
}

/**
 * Initialize performance optimizations
 */
export function initPerformanceOptimizations() {
  if (typeof window === "undefined") return

  // Lazy load images when they come into view
  lazyLoadImages()

  // Preload critical fonts
  preloadAssets([
    "/fonts/monument_extended/PPMonumentExtended-Regular.otf",
    "/fonts/metropolis/Metropolis-Medium.otf",
    "/fonts/metropolis/Metropolis-Bold.otf",
  ])

  // Add event listener for page visibility changes to optimize background tab behavior
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      // Page is hidden (in background tab)
      document.body.classList.add("page-hidden")
    } else {
      // Page is visible
      document.body.classList.remove("page-hidden")
    }
  })
}
