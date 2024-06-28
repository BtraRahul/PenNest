/* eslint-disable no-unused-vars */
// UserProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogSingleCard from "./BlogSingleCard";
import Spinner from "../assets/icons/Spinner";
import { API_BASE_URL } from "@/utils/config";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("user")); // Parse user data from local storage

  useEffect(() => {
    const fetchUserAndBlogs = async () => {
      try {
        setUser(userData);
        console.log(user);
        const blogsResponse = await axios.get(
          `${API_BASE_URL}/blogs/author/${userData.email}`
        );
        setBlogs(blogsResponse.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user or blogs:", error);
      }
    };
    fetchUserAndBlogs();
  }, [userData.email]);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <>
      <style>
        {` 
         .profile {
            padding: 1rem;
            background-color: rgba(255, 255, 255, 0.074);
            border: 1px solid rgba(255, 255, 255, 0.222);
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(20px);
            border-radius: 0.7rem;
            transition: all ease 0.3s;
          
            font-size: 2rem;
            font-weight: 500;
            letter-spacing: 0.1em;

            width: 500px;
          }
        
          .profile:hover {
            box-shadow: 0px 0px 20px 1px #ffbb763f;
            border: 1px solid rgba(255, 255, 255, 0.454);
          }
          }`}
      </style>
      <div className=" mx-auto py-10 shadow-md rounded-lg items-center justify-center">
        <div className="profile flex flex-row  items-center md:flex-row md:items-start">
          <img
            // src={`https://images.pexels.com/photos/20741814/pexels-photo-20741814/free-photo-of-woman-on-meadow-with-flowers-in-countryside.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}``
            src={`${API_BASE_URL}/${user.profilePicUrl}`}
            alt="Profile"
            className="h-40 w-40 object-cover rounded mb-4 md:mr-6"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
            <h3 className="text-lg text-gray-600 mb-4">{user.email}</h3>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Blogs by {user.name}
          </h2>
        </div>
        <div className="grid grid-cols-2  ">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogSingleCard
                // className="profile-card"
                key={blog._id}
                blog={blog}
                showComment={false}
                extraClass={"profile-card"}
              />
            ))
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
