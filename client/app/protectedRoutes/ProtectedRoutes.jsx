"use client";
import { useEffect, useReducer } from "react";
import { useRouter } from "next/router";

const ProtectedRoutes = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoutes;
