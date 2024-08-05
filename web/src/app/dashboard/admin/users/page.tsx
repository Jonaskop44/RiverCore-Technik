/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import FilterTabs from "../../components/Admin/Users/FilterTabs";
import FilterAutocomplete from "../../components/Admin/Users/FilterAutocomplete";
import UserCards from "../../components/Admin/Users/UserCards";
import { useEffect, useState } from "react";
import ApiClient from "@/api";
import { User } from "@/types/user";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const apiClient = new ApiClient();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await apiClient.user.helper.getAllUsers();
      console.log("Fetched data:", data);
      setUsers(data);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    console.log("Updated users:", users);
  }, [users]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const filteredUsers = users.filter((user) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Company") return user.designation === "COMPANY";
    if (selectedFilter === "Person") return user.designation === "PERSON";
    return true;
  });

  return (
    <>
      <div className="flex bg-white rounded-lg pb-4">
        <FilterTabs data={users} onFilterChange={handleFilterChange} />
        <FilterAutocomplete data={users} />
      </div>
      {Array.isArray(users) && <UserCards data={filteredUsers} />}
    </>
  );
};

export default Users;
