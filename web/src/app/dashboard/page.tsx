"use client";

import { useUserStore } from "@/data/userStore";

const Dashboard = () => {
  const { user } = useUserStore();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-4 rounded-md shadow-md">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-lg">
          Welcome, {user.firstName} {user.lastName}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
