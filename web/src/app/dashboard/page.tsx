"use client";

import { useUserStore } from "@/data/userStore";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <h1>Hello World!</h1>
    </div>
  );
};

export default Dashboard;
