/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DeleteBlog() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(true);
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/blogs/${id}`)
      .then((res) => {
        setLoading(false), navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        // navigate("/");
      });
  }, []);

  return <div className="p-4"></div>;
}

export default DeleteBlog;
