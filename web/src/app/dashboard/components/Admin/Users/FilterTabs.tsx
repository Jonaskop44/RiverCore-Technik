"use client";

import React, { useEffect, useState } from "react";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { FaUserGroup, FaBuildingUser, FaUserLarge } from "react-icons/fa6";
import { User } from "@/types/user";

interface FilterTabsProps {
  data: User[];
  onFilterChange: (filter: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ data, onFilterChange }) => {
  const [allCount, setAllCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [personCount, setPersonCount] = useState(0);
  const [isVertical, setIsVertical] = useState(false);

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

  useEffect(() => {
    setIsVertical(window.innerWidth < 768);
    const handleResize = () => {
      setIsVertical(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabChange = (key: string) => {
    onFilterChange(key);
  };

  return (
    <div className="flex flex-wrap gap-4 mt-[20px]">
      <Tabs
        variant="underlined"
        isVertical={isVertical}
        aria-label="Tabs variants"
        color="primary"
        onSelectionChange={handleTabChange}
      >
        <Tab
          key="All"
          title={
            <div className="flex items-center space-x-2">
              <FaUserGroup size={20} />
              <span className="dark:text-gray-200">Alle</span>
              <Chip
                size="sm"
                variant="faded"
                classNames={{
                  base: "dark:bg-blackho border-white/10",
                }}
              >
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
              <span className="dark:text-gray-200">Unternehmen</span>
              <Chip
                size="sm"
                variant="faded"
                classNames={{
                  base: "dark:bg-blackho border-white/10",
                }}
              >
                {companyCount}
              </Chip>
            </div>
          }
        />
        <Tab
          key="Person"
          title={
            <div className="flex items-center space-x-2">
              <FaUserLarge size={20} className="" />
              <span className="dark:text-gray-200">Privatperson</span>
              <Chip
                size="sm"
                variant="faded"
                classNames={{
                  base: "dark:bg-blackho border-white/10",
                }}
              >
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
