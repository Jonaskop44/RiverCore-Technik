/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import FilterTabs from "../../components/Admin/Users/FilterTabs";
import FilterAutocomplete from "../../components/Admin/Users/FilterAutocomplete";
import UserCards from "../../components/Admin/Users/UserCards";
import { useEffect, useState } from "react";
import ApiClient from "@/api";
import { User } from "@/types/user";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { toast } from "sonner";

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

  const handleUserDelete = async (id: number) => {
    const response = await apiClient.user.helper.deleteUser(id);
    if (response.status) {
      toast.success("Benutzer erfolgreich gelöscht");
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } else {
      toast.error("Benutzer konnte nicht gelöscht werden");
    }
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

        <div className="flex bg-white dark:bg-blacksection rounded-lg pb-4 mb-10 sm:space-x-60 md:space-x-5 lg:space-x-60 shadow-md">
          <FilterTabs data={users} onFilterChange={handleFilterChange} />
          <FilterAutocomplete
            data={filteredUsers}
            onUserSelect={handleUserSelect}
          />
        </div>
        {Array.isArray(usersToShow) && (
          <UserCards data={usersToShow} onUserDelete={handleUserDelete} />
        )}
      </div>
    </>
  );
};

export default Users;
