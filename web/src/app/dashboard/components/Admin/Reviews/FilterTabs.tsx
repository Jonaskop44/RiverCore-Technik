"use client";

import React, { useEffect, useState } from "react";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { Review } from "@/types/reviews";
import { IoMdStopwatch } from "react-icons/io";
import { GoShieldCheck, GoShieldSlash, GoShieldX } from "react-icons/go";
import { motion } from "framer-motion";

interface FilterTabsProps {
  data: Review[];
  onFilterChange: (filter: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ data, onFilterChange }) => {
  const [pendingCount, setPendingCount] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [isVertical, setIsVertical] = useState(false);

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

  useEffect(() => {
    setIsVertical(window.innerWidth < 520);
    const handleResize = () => {
      setIsVertical(window.innerWidth < 520);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          x: -20,
        },

        visible: {
          opacity: 1,
          x: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
      className={
        isVertical
          ? "flex flex-wrap gap-4 mt-[20px] mx-auto"
          : "flex flex-wrap gap-4 mt-[20px]"
      }
    >
      <Tabs
        variant="underlined"
        isVertical={isVertical}
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
    </motion.div>
  );
};

export default FilterTabs;
