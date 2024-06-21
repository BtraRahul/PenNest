import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const logout = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5555/blogs/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login"; // Redirect to login page
    } else {
      console.error("Failed to log out");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5555/blogs/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      // to enable this, enable this in cors also
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log(data.user);
      window.location.href = "/"; // Redirect to home page
    } else {
      console.error("Failed to log in");
      return "Failed to log in";
    }
  } catch (error) {
    console.error("Error:", error);
    return "Error logging in";
  }
};

export const register = async (name, email, password, profilePic) => {
  if (!name || !email || !password) {
    alert("All fields are required");
    return;
  }

  const formData = new FormData();
  formData.set("name", name);
  formData.set("email", email);
  formData.set("password", password);
  if (profilePic) {
    formData.set("profilePic", profilePic);
  }
  console.log(profilePic);
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  try {
    const response = await axios.post(
      "http://localhost:5555/blogs/auth/register",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    //incase i want to use fetch req
    // const response = await fetch("http://localhost:5555/blogs/auth/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name, email, password }),
    // });

    // console.log(response);
    // if (response.ok) {
    //   console.log("hello");
    //   localStorage.setItem("token", response.token);
    //   localStorage.setItem("user", JSON.stringify(response.user));
    //   // window.location.href = "/"; // Redirect to home page
    // } else {
    //   console.error("Failed to register");
    //   return "Failed to register";
    // }

    console.log(response);

    if (response.statusText === "OK") {
      console.log("hello");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      window.location.href = "/"; // Redirect to home page
    } else {
      console.error("Failed to register");
      return "Failed to register";
    }
  } catch (error) {
    console.error("Error:", error);
    return "Error registering";
  }
};
