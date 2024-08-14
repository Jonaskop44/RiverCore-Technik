"use client";

import React, { useEffect, useState } from "react";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { Review } from "@/types/reviews";
import { IoMdStopwatch } from "react-icons/io";
import { GoShieldCheck, GoShieldSlash, GoShieldX } from "react-icons/go";

interface FilterTabsProps {
  data: Review[];
  onFilterChange: (filter: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ data, onFilterChange }) => {
  const [pendingCount, setPendingCount] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  useEffect(() => {
    if (data) {
      setPendingCount(
        data.filter((review: Review) => review.status === "PENDING").length
      );
      setAcceptedCount(
        data.filter((review: Review) => review.status === "ACCEPTED").length
      );
      setRejectedCount(
        data.filter((review: Review) => review.status === "REJECTED").length
      );
    }
  }, [data]);

  const handleTabChange = (key: string) => {
    onFilterChange(key);
  };

  return (
    <div className="flex flex-wrap gap-4 mt-[20px]">
      <Tabs
        variant="underlined"
        aria-label="Tabs variants"
        color="primary"
        onSelectionChange={handleTabChange}
      >
        <Tab
          key="Pending"
          title={
            <div className="flex items-center space-x-2">
              <IoMdStopwatch size={20} />
              <span className="dark:text-gray-200">Ausstehend</span>
              <Chip
                size="sm"
                variant="faded"
                classNames={{
                  base: "dark:bg-blackho border-white/10",
                }}
              >
                {pendingCount}
              </Chip>
            </div>
          }
        />
        <Tab
          key="Accepted"
          title={
            <div className="flex items-center space-x-2">
              <GoShieldCheck size={20} />
              <span className="dark:text-gray-200">Akzeptiert</span>
              <Chip
                size="sm"
                variant="faded"
                classNames={{
                  base: "dark:bg-blackho border-white/10",
                }}
              >
                {acceptedCount}
              </Chip>
            </div>
          }
        />
        <Tab
          key="Rejected"
          title={
            <div className="flex items-center space-x-2">
              <GoShieldX size={20} className="" />
              <span className="dark:text-gray-200">Abgelehnt</span>
              <Chip
                size="sm"
                variant="faded"
                classNames={{
                  base: "dark:bg-blackho border-white/10",
                }}
              >
                {rejectedCount}
              </Chip>
            </div>
          }
        />
      </Tabs>
    </div>
  );
};

export default FilterTabs;
