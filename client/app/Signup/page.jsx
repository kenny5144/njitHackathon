"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignupPage = () => {
  const router = useRouter(); // Initialize the router
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/user/register", {
        email,
        password,
        name,
      });
      localStorage.setItem("token", res.data.token);
      router.push("/Home");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-8">
          Sign Up
        </h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
