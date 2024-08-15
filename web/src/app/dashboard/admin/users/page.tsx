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

  const fetchUsers = async () => {
    const data = await apiClient.user.helper.getAllUsers();
    setUsers(data);
  };

  useEffect(() => {
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
      await fetchUsers();
    } else {
      toast.error("Benutzer konnte nicht gelöscht werden");
    }
  };

  const handleUserUpdate = async () => {
    await fetchUsers();
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

        <div className="block justify-between bg-white dark:bg-blacksection rounded-lg pb-4 px-6 mb-10 md:flex shadow-md">
          <FilterTabs data={users} onFilterChange={handleFilterChange} />
          <FilterAutocomplete
            data={filteredUsers}
            onUserSelect={handleUserSelect}
          />
        </div>
        {Array.isArray(usersToShow) && (
          <UserCards
            data={usersToShow}
            onUserDelete={handleUserDelete}
            onUserUpdate={handleUserUpdate}
          />
        )}
      </div>
    </>
  );
};

export default Users;
