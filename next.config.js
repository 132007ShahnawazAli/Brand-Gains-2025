/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["placehold.co", "randomuser.me", "images.pexels.com"],
  },
  env: {
    MONGODB_URI: "mongodb+srv://Shahnawaz:Dccl5cImrrDzSd4h@brandgains.uyuhw9j.mongodb.net/",
  },
}

module.exports = nextConfig
