import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  author: String,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      ref: "User",
      required: true,
    },
    datePublished: {
      type: Date,
      default: Date.now,
    },
    dateUpdated: {
      type: Date,
      default: Date.now,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
    category: {
      type: String,
      default: "",
    },
    // coverImage: {
    //   type: HTMLImageElement,
    //   required: false,
    //   default:
    //     "https://images.pexels.com/photos/20741814/pexels-photo-20741814/free-photo-of-woman-on-meadow-with-flowers-in-countryside.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    // },
    coverImageUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.model("Blog", blogSchema);
