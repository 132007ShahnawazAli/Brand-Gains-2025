import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a project title"],
    trim: true,
  },
  type: {
    type: String,
    required: [true, "Please provide a project type"],
    enum: ["EDIT", "MOTION", "CAMPAIGN", "NARRATIVE", "COMMERCIAL"],
  },
  thumbnail: {
    type: String,
    required: [true, "Please provide a thumbnail URL"],
  },
  mediaType: {
    type: String,
    enum: ["image", "video"],
    default: "image",
  },
  videoUrl: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    required: [true, "Please provide a project description"],
  },
  client: {
    type: String,
    required: [true, "Please provide a client name"],
  },
  date: {
    type: String,
    required: [true, "Please provide a project date"],
  },
  link: {
    type: String,
    default: "",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  featuredOrder: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema)
