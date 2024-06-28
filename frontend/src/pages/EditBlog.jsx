/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "@/components/ui/BackButton";
import Spinner from "@/components/assets/icons/Spinner";
import { API_BASE_URL } from "@/utils/config";

const EditBlog = () => {
  const userData = JSON.parse(localStorage.getItem("user")); // Parse user data from local storage

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState(userData ? userData.email : "");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/blogs/${id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleEdit = (e) => {
    const blog = {
      title,
      author,
      description,
    };
    setLoading(true);
    axios
      .put(`${API_BASE_URL}/blogs/${id}`, blog)
      .then(setLoading(false), navigate("/"))
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  return (
    <div className="container p-4 w-full h-full">
      <h1 className="title text-4xl my-4 mx-auto">Edit</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="box h-full w-full flex flex-col border-2 border-sky-400 rounded-xl p-4 mx-auto">
          <div className="flex flex-col">
            <label htmlFor="">Title</label>
            <input
              value={title}
              className="dark:bg-gray-400 rounded-sm m-2 p-2 dark:text-black"
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            {/* <label htmlFor="">Author</label>
            <input
              value={author}
              className="dark:bg-gray-400 m-2 rounded-sm p-2 dark:text-black"
              type="text"
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            /> */}
            <label htmlFor="">Description</label>
            <textarea
              value={description}
              className="dark:bg-gray-400 rounded-sm p-2 m-2 dark:text-black resize-none h-20"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <button
            onClick={handleEdit}
            className="w-full m-2 bg-sky-700 p-2 mx-2 border text-white rounded-sm hover:bg-sky-800"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBlog;
