"use client";

import React, { useEffect, useState } from "react";
import { Tabs, Tab, Chip, Card, CardBody } from "@nextui-org/react";
import { FaUserGroup, FaBuildingUser, FaUserLarge } from "react-icons/fa6";
import { User } from "@/types/user";

interface FilterTabsProps {
  data: User[];
}

const FilterTabs: React.FC<FilterTabsProps> = ({ data }) => {
  const [allCount, setAllCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [personCount, setPersonCount] = useState(0);

  useEffect(() => {
    if (data) {
      setAllCount(data.length);
      setCompanyCount(
        data.filter((user: User) => user.designation === "COMPANY").length
      );
      setPersonCount(
        data.filter((user: User) => user.designation === "PERSON").length
      );
    }
  }, [data]);

  return (
    <div className="flex flex-wrap gap-4 mt-[20px]">
      <Tabs variant="underlined" aria-label="Tabs variants" color="primary">
        <Tab
          key="All"
          title={
            <div className="flex items-center space-x-2">
              <FaUserGroup size={20} />
              <span>Alle</span>
              <Chip size="sm" variant="faded">
                {allCount}
              </Chip>
            </div>
          }
        />
        <Tab
          key="Company"
          title={
            <div className="flex items-center space-x-2">
              <FaBuildingUser size={20} />
              <span>Unternehmen</span>
              <Chip size="sm" variant="faded">
                {companyCount}
              </Chip>
            </div>
          }
        />
        <Tab
          key="Person"
          title={
            <div className="flex items-center space-x-2">
              <FaUserLarge size={20} />
              <span>Privatperson</span>
              <Chip size="sm" variant="faded">
                {personCount}
              </Chip>
            </div>
          }
        />
      </Tabs>
    </div>
  );
};

export default FilterTabs;
