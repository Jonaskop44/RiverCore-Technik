/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import FilterTabs from "../../components/Admin/Users/FilterTabs";
import FilterAutocomplete from "../../components/Admin/Users/FilterAutocomplete";
import UserCards from "../../components/Admin/Users/UserCards";
import { useEffect, useState } from "react";
import ApiClient from "@/api";
import { User } from "@/types/user";
import Breadcrumb from "@/components/Common/Breadcrumb";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [selectedUser, setSelectedUser] = useState<User>(null);
  const apiClient = new ApiClient();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await apiClient.user.helper.getAllUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const filteredUsers = users.filter((user) => {
    if (selectedFilter === "All") return user;
    if (selectedFilter === "Company") return user.designation === "COMPANY";
    if (selectedFilter === "Person") return user.designation === "PERSON";
  });

  const usersToShow = selectedUser ? [selectedUser] : filteredUsers;

  return (
    <>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Benutzerverwaltung" />

        <div className="flex bg-white rounded-lg pb-4 mb-10 sm:space-x-60 md:space-x-5 lg:space-x-60">
          <FilterTabs data={users} onFilterChange={handleFilterChange} />
          <FilterAutocomplete
            data={filteredUsers}
            onUserSelect={handleUserSelect}
          />
        </div>
        {Array.isArray(usersToShow) && <UserCards data={usersToShow} />}
      </div>
    </>
  );
};

export default Users;
