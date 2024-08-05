"use client";

import React from "react";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { CiMail } from "react-icons/ci";
import { FaUserGroup, FaBuildingUser, FaUserLarge } from "react-icons/fa6";

const FilterTabs = () => {
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
                9
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
                5
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
                4
              </Chip>
            </div>
          }
        />
      </Tabs>
    </div>
  );
};

export default FilterTabs;