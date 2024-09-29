"use client"
import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
        setModalOpen(true); // Open modal once suggestions are ready
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
      setError("An unexpected error occurred");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
        Upload Your Credit Report
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-100 p-6 rounded-lg cursor-pointer hover:bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11V8m0 4v7m4-7H8m8 0h4m-8 0H4"
            />
          </svg>
          <p className="text-gray-600">Drag & Drop or Click to Upload</p>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            accept="application/pdf"
            className="hidden"
          />
        </label>
        {file && (
          <p className="text-gray-500 mt-4 text-center">
            Selected file: {file.name}
          </p>
        )}
        <button
          type="submit"
          className="w-full py-3 mt-6 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-all"
        >
          Upload
        </button>
      </form>

      {loading && (
        <p className="mt-4 text-gray-700">Loading suggestions, please wait...</p>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[75vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800">AI Suggestions</h2>
            <div className="mt-4">
              <p className="text-gray-700">{suggestions}</p>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
