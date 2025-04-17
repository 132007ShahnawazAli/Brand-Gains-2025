import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.warn("Please define the MONGODB_URI environment variable")
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (!MONGODB_URI) {
    return Promise.resolve(null)
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    }

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("Connected to MongoDB")
        return mongoose
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error)
        throw error
      })
  }

  try {
    cached.conn = await cached.promise
    return cached.conn
  } catch (e) {
    cached.promise = null
    throw e
  }
}

export default dbConnect
