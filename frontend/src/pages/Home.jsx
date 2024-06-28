/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Spinner from "@/components/assets/icons/Spinner";
import BlogsCard from "@/components/home/BlogsCard";
import { API_BASE_URL } from "@/utils/config";
// import BlogsCard from "../components/home/BlogsCard.jsx";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/blogs/`)
      .then((res) => {
        console.log(res.data.data);
        setBlogs(res.data.data);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, []);
  return (
    <div className="px-4 pt-2 pb-12">
      <div className="flex justify-between items-center h-10">
        {/* <h1 className="text-4xl my-4 mx-auto">BlogIT</h1> */}
      </div>
      <div className="">
        {loading ? <Spinner /> : <BlogsCard blogs={blogs} />}
        <div>
          {/* <div className="box my-2">
            <h1 className="text-3xl p-3">Popular Blogs</h1>
            <li>1.</li>
            <li>2.</li>
            <li>3.</li>
          </div>
          <div className="box my-2">
            <h1 className="text-3xl p-3">Latest Blogs</h1>
            <li>1.</li>
            <li>2.</li>
            <li>3.</li>
          </div>

          <div className="box my-2">
            <h1 className="text-3xl p-3">Categories</h1>
            <li>1.</li>
            <li>2.</li>
            <li>3.</li>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
