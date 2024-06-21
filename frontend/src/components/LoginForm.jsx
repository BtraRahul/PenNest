import React, { useState } from "react";
import { login } from "../utils/auth.js";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await login(email, password);
    
    if (error) {
      alert(error);
    }
  };

  return (
    <div className="container flex items-center justify-center pt-5 h-5/6">
      <form
        onSubmit={handleSubmit}
        className="box login-form p-6 rounded shadow-lg w-3/4 md:w-1/2 lg:w-1/3"
      >
        <h2 className="text-3xl mb-6">Login</h2>
        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={email}
            className="block w-full dark:text-gray-600 p-3 mb-4 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
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
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
