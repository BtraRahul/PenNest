import React, { useState } from "react";
import { register } from "../utils/auth";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await register(name, email, password, profilePic);
    if (error) {
      alert(error);
    }
  };

  return (
    <div className="container text-lg flex items-center justify-center p-5">
      <form
        onSubmit={handleSubmit}
        className="box register-form p-8 rounded shadow-lg w-3/4 md:w-1/2 lg:w-1/3"
      >
        <h2 className="text-3xl mb-6">Register</h2>
        <div>
          <label htmlFor="profileImage">Profile Picture</label>
          <input
            id="profileImage"
            type="file"
            className="dark:bg-gray-400 m-2 rounded-sm p-2 dark:text-black"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            value={name}
            className="dark:text-gray-600 block w-full p-3 mb-4 border rounded"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={email}
            className="block w-full dark:text-gray-600 p-3 mb-4 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Password:</label>
          <input
            type="password"
            value={password}
            className="block w-full dark:text-gray-600 p-3 mb-4 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-3 mt-4 rounded hover:bg-blue-700"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
