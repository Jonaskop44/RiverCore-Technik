"use client";

import FilterTabs from "../../components/Admin/Users/FilterTabs";
import FilterAutocomplete from "../../components/Admin/Users/FilterAutocomplete";
import UserCards from "../../components/Admin/Users/UserCards";

const Users = () => {
  return (
    <>
      <div className="flex bg-white rounded-lg pb-4">
        <FilterTabs />
        <FilterAutocomplete />
      </div>
      <UserCards />
    </>
  );
};

export default Users;
