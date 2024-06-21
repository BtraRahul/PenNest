// /* eslint-disable no-unused-vars */
// import Spinner from "@/components/assets/icons/Spinner";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useNavigate } from "react-router-dom";
// import "../index.css";

// function CreateBlogs() {
//   const userData = JSON.parse(localStorage.getItem("user")); // Parse user data from local storage

//   const [loading, setLoading] = useState(false);
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState(userData ? userData.email : ""); // Set author to user email
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");

//   const [coverImage, setCoverImage] = useState(null);

//   const navigate = useNavigate();

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   const blog = {
//   //     title,
//   //     author,
//   //     description,
//   //     category,
//   //     coverImage,
//   //   };
//   //   console.log(userData);
//   //   setLoading(true);
//   //   axios
//   //     .post(`http://localhost:5555/blogs/`, blog)
//   //     .then(() => {
//   //       setLoading(false);
//   //       navigate("/");
//   //       console.log(e);
//   //     })
//   //     .catch((e) => {
//   //       console.log(e);
//   //       setLoading(false);
//   //     });
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !author || !description || !category) {
//       alert("All fields are required");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("author", author);
//     formData.append("description", description);
//     formData.append("category", category);
//     if (coverImage) {
//       formData.append("coverImage", coverImage);
//     }

//     setLoading(true);
//     try {
//       await axios.post("http://localhost:5555/blogs", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setLoading(false);
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };
//   return (
//     <>
//       <div className="container">
//         <div>
//           <h1 className="title text-4xl my-4 mx-auto">Create a new Blog</h1>
//           {loading ? (
//             <Spinner />
//           ) : (
//             <div className="box h-full w-full flex flex-col border-2 border-sky-400 rounded-xl p-4 mx-auto">
//               <div className="flex flex-col">
//                 <label htmlFor="">Cover Image</label>
//                 <input
//                   type="file"
//                   className="dark:bg-gray-400 m-2 rounded-sm p-2 dark:text-black"
//                   onChange={(e) => setCoverImage(e.target.files[0])}
//                 />
//                 {/* <label htmlFor="">Cover Image</label>
//               <input
//               type="file"
//               className="dark:bg-gray-400 m-2 rounded-sm p-2 dark:text-black"
//               onChange={(e) => setCoverImage(e.target.files[0])}
//             /> */}

//                 <label htmlFor="">Title</label>
//                 <input
//                   value={title}
//                   className="dark:bg-gray-400 rounded-sm m-2 p-2 dark:text-black"
//                   type="text"
//                   onChange={(e) => {
//                     setTitle(e.target.value);
//                   }}
//                 ></input>
//                 <label htmlFor="">Category</label>
//                 <input
//                   value={category}
//                   className="dark:bg-gray-400 m-2 rounded-sm p-2 dark:text-black"
//                   type="text"
//                   onChange={(e) => {
//                     setCategory(e.target.value);
//                   }}
//                 ></input>

//                 <label htmlFor="">Description</label>
//                 {/* <ReactQuill
//                 theme="snow"
//                 className="dark:bg-gray-400 rounded-sm p-2 m-2 dark:text-black resize-none textArea"
//                 value={description}
//                 onChange={setDescription}
//                 /> */}
//                 <textarea
//                   value={description}
//                   className="dark:bg-gray-400 rounded-sm p-2 m-2 dark:text-black resize-none h-20"
//                   onChange={(e) => {
//                     setDescription(e.target.value);
//                   }}
//                 ></textarea>
//               </div>
//               <button
//                 onClick={handleSubmit}
//                 className="w-full m-2 bg-sky-700 p-2 mx-2 border text-white rounded-sm hover:bg-sky-800"
//               >
//                 Create
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default CreateBlogs;
// CreateBlogs.jsx
import Spinner from "@/components/assets/icons/Spinner";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "../index.css";

function CreateBlogs() {
  const userData = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState(userData ? userData.email : "");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !description || !category) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.set("title", title);
    formData.set("author", author);
    formData.set("description", description);
    formData.set("category", category);
    if (coverImage) {
      formData.set("coverImage", coverImage);
    }

    console.log(coverImage);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    setLoading(true);
    try {

      // await fetch("http://localhost:5555/blogs",{
      //   method: "POST",
      //   body: formData,
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // })
      await axios.post("http://localhost:5555/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div>
        <h1 className="title text-4xl my-4 mx-auto">Create a new Blog</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="box h-full w-full flex flex-col border-2 border-sky-400 rounded-xl p-4 mx-auto">
            <div className="flex flex-col">
              <label htmlFor="coverImage">Cover Image</label>
              <input
                type="file"
                id="coverImage"
                className="dark:bg-gray-400 m-2 rounded-sm p-2 dark:text-black"
                onChange={(e) => setCoverImage(e.target.files[0])}
              />

              <label htmlFor="title">Title</label>
              <input
                value={title}
                id="title"
                className="dark:bg-gray-400 rounded-sm m-2 p-2 dark:text-black"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />

              <label htmlFor="category">Category</label>
              <input
                value={category}
                id="category"
                className="dark:bg-gray-400 m-2 rounded-sm p-2 dark:text-black"
                type="text"
                onChange={(e) => setCategory(e.target.value)}
              />

              <label htmlFor="description">Description</label>
              <textarea
                value={description}
                id="description"
                className="dark:bg-gray-400 rounded-sm p-2 m-2 dark:text-black resize-none h-20"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full m-2 bg-sky-700 p-2 mx-2 border text-white rounded-sm hover:bg-sky-800"
            >
              Create
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateBlogs;
