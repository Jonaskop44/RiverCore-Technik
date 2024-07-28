"use client";

import { useUserStore } from "@/data/userStore";

const Dashboard = () => {
  const { user } = useUserStore((state: any) => state.user);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1>Hello World!</h1>
    </div>
  );
};

export default Dashboard;
