"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const page = () => {
  // const api = useApi();
  const router = useRouter();
  const usertoken = localStorage.getItem("token");
  const [user, setUser] = useState(usertoken);
  useEffect(() => {
    if (!usertoken) {
      router.push("/Login"); // Navigate to the login page
    } else {
      setUser(usertoken); // Set the user state with the token (or user data)
    }
  }, [usertoken, router]);

  if (!user) {
    return null; // Optionally, return a loading state or nothing while navigating
  }
  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const response = await api.get("/user/profile");
  //       setUser(response.data.user);
  //     } catch (error) {
  //       console.error("Error fetching user profile:", error);
  //     }
  //   };

  //   fetchUserProfile();
  // }, [api]);

  return (
    <div>
      <h1>Profile</h1>
      {/* <p>Name: {user.name}</p>
        <p>Email: {user.email}</p> */}
    </div>
  );
};

export default page;
