"use client";
import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
    setSuggestions(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setSuggestions(data.suggestions);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 p-8">
      <h1 className="text-4xl font-bold text-yellow-200 mb-6 text-center">
        Upload Your Credit Report
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <input
          type="file"
          onChange={handleFileChange}
          accept="application/pdf"
          className="w-full p-4 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none mb-4"
        />
        {file && (
          <p className="text-yellow-300 text-center mb-4">
            Selected file: {file.name}
          </p>
        )}
        <button
          type="submit"
          className="w-full py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all"
        >
          Upload
        </button>
      </form>

      {loading && (
        <p className="mt-4 text-yellow-200">
          Loading suggestions, please wait...
        </p>
      )}
      {error && <p className="mt-4 text-white">{error}</p>}

      {suggestions && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-yellow-400">
            AI Suggestions:
          </h2>
          <p className="text-yellow-300">{suggestions}</p>
        </div>
      )}
    </div>
  );
}
