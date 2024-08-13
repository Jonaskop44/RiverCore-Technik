"use client";

import { useUserStore } from "@/data/userStore";

const Dashboard = () => {
  const { user } = useUserStore();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <h1>Hello World!</h1>
      <h1>{user.email}</h1>
    </div>
  );
};

export default Dashboard;
