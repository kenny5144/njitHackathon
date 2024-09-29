"use client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import from react-router-dom

const ProtectedLayout = ({ children }) => {
  const navigate = useNavigate(); // Use useNavigate instead of useRouter

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // Use navigate instead of router.push
    }
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedLayout;
