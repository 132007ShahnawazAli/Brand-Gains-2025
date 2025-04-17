// Default metadata for the site
export const defaultMetadata = {
  title: "Brand Gains - Expert Marketing & Short-Form Content Editing Agency",
  description:
    "We deliver Short-Form Edits that help clients grow their business and build an engaging online presence.",
  keywords: "short-form content, video editing, marketing agency, brand growth, social media content",
}

// Generate Open Graph metadata
export function generateOpenGraph(
  title = defaultMetadata.title,
  description = defaultMetadata.description,
  imagePath = "/og-image.jpg",
) {
  return {
    title,
    description,
    url: "https://brandgains.com",
    siteName: "Brand Gains",
    images: [
      {
        url: imagePath,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: "en_US",
    type: "website",
  }
}

// Generate Twitter metadata
export function generateTwitterMetadata(
  title = defaultMetadata.title,
  description = defaultMetadata.description,
  imagePath = "/og-image.jpg",
) {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [imagePath],
  }
}

// Generate full metadata for a page
export function generateMetadata(title, description, keywords = defaultMetadata.keywords, imagePath = "/og-image.jpg") {
  const pageTitle = title ? `${title} | Brand Gains` : defaultMetadata.title
  const pageDescription = description || defaultMetadata.description

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords,
    openGraph: generateOpenGraph(pageTitle, pageDescription, imagePath),
    twitter: generateTwitterMetadata(pageTitle, pageDescription, imagePath),
  }
}
