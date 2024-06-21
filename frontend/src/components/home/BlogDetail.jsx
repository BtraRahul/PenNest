import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../assets/icons/Spinner";
import DropdownMenu from "./DropdownMenu";
import { BiComment, BiCommentAdd } from "react-icons/bi";
import { HeartFilledIcon } from "@radix-ui/react-icons";

const BlogDetail = () => {
  const userData = JSON.parse(localStorage.getItem("user")); // Parse user data from local storage

  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/blogs/${id}`);
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the blog:", error);
      }
    };
    fetchBlog();
    // fetchComments();
  }, [id]);

  //fetching the comments

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5555/blogs/${id}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5555/blogs/${blog._id}/comments/${commentId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    try {
      const response = await axios.post(
        `http://localhost:5555/blogs/${id}/comments`,
        {
          author: userData.email, // Replace with actual user data
          text: newComment,
        }
      );
      setComments(response.data);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <>
      <style>{`
      .comment{
        backdrop-filter: blur(10px);
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
      }
      `}</style>

      <div className="container py-20">
        {blog.coverImageUrl ? (
          <img
            src={`http://localhost:5555/${blog.coverImageUrl}`}
            alt="Cover"
            className="w-full h-72 object-cover mb-4 rounded-lg"
          />
        ) : (
          <img
            src={`http://localhost:5555/uploads/Batra-27.jpg`}
            alt="Cover"
            className="w-full h-90 object-cover mb-4 rounded-lg"
          />
        )}

        <div className="flex justify-between">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <DropdownMenu blogId={blog._id} blogAuthor={blog.author} />
        </div>
        <p className="text-gray-500 mb-4">
          {new Date(blog.createdAt).toLocaleString()}
        </p>
        <p className="mb-4">{blog.description}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="bg-yellow-800 text-white rounded-lg px-3 py-1">
            {blog.category}
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {/* <button onClick={handleLike} className="flex items-center">
              {hasLiked ? ( */}
              <HeartFilledIcon className="text-red-600 text-3xl" />
              {/* ) : (
                <HeartIcon className="text-red-600 text-3xl" />
              )} */}
              <span>{blog.likes}</span>
              {/* </button> */}
            </div>
            <div className="flex items-center space-x-1">
              <BiComment />
              <div className="flex items-center space-x-1">
                <span>{comments.length}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <form onSubmit={handleCommentSubmit} className="flex space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="search border rounded p-2 flex-grow"
              placeholder="Add a comment..."
            />
            <button
              type="submit"
              className=" box items-center text-white rounded px-4 py-2"
            >
              <BiCommentAdd className="text-2xl stroke-black" />
              {/* Submit */}
            </button>
          </form>
          <h3 className="text-lg font-bold pt-2 mb-2">Comments</h3>
          <div className="flex flex-col space-y-2 mb-4">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="comment flex p-4 mb-0 h-30 flex-col justify-between items-start border rounded-lg "
              >
                {/* <div className="flex flex-col justify-between items-center mb-1"> */}
                <p className="font-bold text-gray-400">{comment.author}</p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
                {/* </div> */}
                <div className="pt-5 items-start">
                  <p>{comment.text}</p>
                </div>
                {/* <div className="flex space-x-2">
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
