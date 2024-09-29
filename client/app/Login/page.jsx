"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios({
      method: "post",
      url: "http://localhost:8080" + "/user/login",
      data: { email, password },
    }).then((res) => {
      localStorage.setItem("token", res.data.token);
      navigate("/Home");
    });
  };
  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-10 rounded-lg shadow-2xl max-w-md mx-auto mt-16">
      <h2 className="text-3xl text-yellow-400 font-bold mb-8 text-center">
        Login
      </h2>
      <form action="/login" method="post" className="space-y-6">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-4 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-4 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400"
          required
        />
        <button
          type="submit"
          className="w-full p-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 shadow-lg hover:shadow-yellow-500/50 transition-all"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default page;
