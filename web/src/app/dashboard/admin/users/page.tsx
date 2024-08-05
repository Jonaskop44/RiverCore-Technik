"use client";

import FilterTabs from "../../components/Admin/Users/FilterTabs";
import FilterAutocomplete from "../../components/Admin/Users/FilterAutocomplete";
import UserCards from "../../components/Admin/Users/UserCards";
import { useEffect, useState } from "react";
import ApiClient from "@/api";
import { User } from "@/types/user";

const Users = () => {
  const [users, setUsers] = useState<User>();
  const apiClient = new ApiClient();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await apiClient.user.helper.getAllUsers();
      console.log(data);
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex bg-white rounded-lg pb-4">
        <FilterTabs data={users} />
        <FilterAutocomplete data={users} />
      </div>
      <UserCards data={users} />
    </>
  );
};

export default Users;
