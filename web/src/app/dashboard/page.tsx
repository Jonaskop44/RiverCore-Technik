"use client";

import { useUserStore } from "@/data/userStore";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <h1>Hello World!</h1>
      <h2>{user.email}</h2>
    </div>
  );
};

export default Dashboard;
