"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isHomePage, setIsHomePage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      setIsHomePage(router.pathname === "/");
    }

    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [router.isReady, router.pathname]);

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <nav className=" bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 pt-1">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link href={"/"} className="text-3xl font-extrabold text-yellow-200">
          PennyWiseai
        </Link>
        <div className="space-x-4">
          {isLoggedIn ? (
            <button
              className="bg-yellow-500 rounded-2xl text-black py-3 px-7 font-bold hover:bg-yellow-400 transition-all"
              onClick={handleProfileClick}
            >
              Profile
            </button>
          ) : (
            <>
              <Link href="/Signup">
                <button className="underline text-black py-2 rounded-lg font-bold hover:bg-yellow-400 transition-all">
                  Sign Up
                </button>
              </Link>
              <Link href="/Login">
                <button className="bg-yellow-500 rounded-2xl text-black py-3 px-7 font-bold hover:bg-yellow-400 transition-all">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
