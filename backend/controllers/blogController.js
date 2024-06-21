import { Blog } from "../models/blogModel.js";

export const searchBlogs = async (req, res) => {
  try {
    const { query } = req.query;
    console.log(query);
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const blogs = await Blog.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });

    if (blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
