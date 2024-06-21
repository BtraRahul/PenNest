/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiComment, BiCommentAdd, BiUserCircle } from "react-icons/bi";
import { useEffect, useState } from "react";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import DropdownMenu from "./DropdownMenu";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

const BlogSingleCard = ({ blog, showComment = true, extraClass = {} }) => {
  const userData = JSON.parse(localStorage.getItem("user")); // Parse user data from local storage

  const [likes, setLikes] = useState(blog.likes);
  const [hasLiked, setHasLiked] = useState(false); // One user, one like

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5555/blogs/${blog._id}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    try {
      const response = await axios.post(
        `http://localhost:5555/blogs/${blog._id}/comments`,
        {
          author: userData.email, // Replace with actual user data
          text: newComment,
        }
      );
      setComments(response.data);
      setNewComment("");
      navigate(`/blogs/${blog._id}`);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLike = async () => {
    if (!hasLiked) {
      try {
        const response = await axios.put(
          `http://localhost:5555/blogs/${blog._id}/like`
        );
        setLikes(response.data.likes);
        setHasLiked(true); // Prevent multiple likes from the same user
      } catch (error) {
        console.error("Error liking the blog:", error);
      }
    } else {
      try {
        const response = await axios.put(
          `http://localhost:5555/blogs/${blog._id}/unlike`
        );
        setLikes(response.data.likes);
        setHasLiked(false);
      } catch (error) {
        console.error("Error unliking the blog:", error);
      }
    }
  };

  return (
    <>
      <style>{`
  .profile-card{
    height: 500px; /* Fixed height for the card */
   
   border: 1px solid #e2e8f0;
   border-radius: 8px;
   padding: 16px;
   background-color: #fff;
   overflow: hidden; /* Hide overflow content */
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   transition: box-shadow 0.3s ease;
}
`}</style>
      <div className="container">
        <div
          id="card"
          key={blog._id}
          className={`${extraClass} box blog-card flex flex-col justify-between border-2 border-gray-200 rounded-lg shadow-md hover:shadow-xl p-6 m-4`}
        >
          {blog.coverImageUrl ? (
            <img
              src={`http://localhost:5555/${blog.coverImageUrl}`}
              alt="Cover"
              className="w-full h-64 object-cover mb-4 rounded-lg"
            />
          ) : (
            <img
              src={`http://localhost:5555/uploads/Batra-27.jpg`}
              alt="Cover"
              className="w-full h-80 object-cover mb-4 rounded-lg"
            />
          )}
          <div className="flex justify-between">
            <div className="flex items-center mb-1">
              <PiBookOpenTextLight className="text-yellow-700 text-4xl mr-2" />
              <Link
                to={`/blogs/${blog._id}`}
                className="text-yellow-700 text-4xl mr-2"
              >
                <h2 className="title text-2xl font-bold">{blog.title}</h2>
              </Link>
              {/* <h2 className="title text-2xl font-bold">{blog.title}</h2> */}
            </div>
            <div className="">
              <DropdownMenu blogId={blog._id} blogAuthor={blog.author} />
            </div>
          </div>

          <div>
            <div className="flex ml-5 items-center mb-4 mt-0 pt-0 text-gray-500">
              <BiUserCircle className="text-yellow-700 text-1xl mr-2" />
              <h2 className="text-sm font-small">{blog.author}</h2>
            </div>

            <p className="p-1 text-gray-400 mb-4 blog-description">
              {blog.description}
            </p>

            <div className="flex justify-between items-center mb-4">
              <div className="bg-yellow-800 text-white rounded-lg px-3 py-1">
                {blog.category}
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <button onClick={handleLike} className="flex items-center">
                    {hasLiked ? (
                      <HeartFilledIcon className="text-red-600 text-3xl" />
                    ) : (
                      <HeartIcon className="text-red-600 text-3xl" />
                    )}
                    <span>{likes}</span>
                  </button>
                </div>
                <div className="flex items-center space-x-1">
                  <BiComment />
                  <div className="flex items-center space-x-1">
                    <span>{comments.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showComment && (
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
            </div>
          )}

          <div className="flex justify-end space-x-4"></div>
        </div>
      </div>
    </>
  );
};

export default BlogSingleCard;
