import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { useUserStore } from "@/data/userStore";
import { handleLogout } from "@/hooks/user";

const DropdownUser = () => {
  const { user, profilePicture } = useUserStore();

  const handleDesignation = (designation: string) => {
    switch (designation) {
      case "COMPANY":
        return "Unternehmen";
      case "PERSON":
        return "Privatperson";
      default:
        return "User";
    }
  };

  return (
    <Dropdown
      backdrop="blur"
      showArrow
      radius="sm"
      classNames={{
        base: "before:bg-default-200",
        content:
          "p-0 border-small border-divider bg-background dark:bg-blacksection",
      }}
    >
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: false,
            src: profilePicture,
          }}
          className="transition-transform"
          // classNames={{
          //   name: "hidden sm:block lg:block md:block",
          //   description: "hidden sm:block lg:block md:block",
          // }}
          description={handleDesignation(user?.designation)}
          name={user?.firstName + " " + user?.lastName}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        disabledKeys={["profile"]}
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-white/10",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem
            isReadOnly
            key="profile"
            className="h-14 gap-2 opacity-100"
          >
            <User
              name={user?.firstName + " " + user?.lastName}
              description={user?.email}
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              avatarProps={{
                size: "sm",
                src: profilePicture,
              }}
            />
          </DropdownItem>
          <DropdownItem key="dashboard">Dashboard</DropdownItem>
          <DropdownItem key="settings" href="/dashboard/user/settings">
            Einstellungen
          </DropdownItem>
          <DropdownItem key="new_project">New Project</DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback">Hilfe & Feedback</DropdownItem>
          <DropdownItem key="logout" onPress={handleLogout}>
            Abmelden
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownUser;
