import { FaHome, FaUsers } from "react-icons/fa";
import { FaRegPaperPlane } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { BiSupport } from "react-icons/bi";

export interface MenuItem {
  icon: React.ReactNode;
  label: string;
  route: string;
  roles?: string[];
  children?: { label: string; route: string }[];
}

export interface SidebarGroup {
  name: string;
  menuItems: MenuItem[];
}

const sidebarData: SidebarGroup[] = [
  {
    name: "Hauptmenü",
    menuItems: [
      {
        icon: <FaHome />,
        label: "Startseite",
        route: "#",
      },
      {
        icon: <MdOutlineRateReview size={25} />,
        label: "Bewertung",
        route: "user/reviews",
      },
      {
        icon: <BiSupport size={25} />,
        label: "Support",
        route: "#",
        children: [
          { label: "Drucker", route: "user/support/printer" },
          { label: "Netzwerk", route: "user/support/network" },
          { label: "Kassen", route: "user/support/payment" },
        ],
      },
    ],
  },
  {
    name: "Administration",
    menuItems: [
      {
        icon: <FaUsers size={25} />,
        label: "Benutzer",
        route: "admin/users",
        roles: ["ADMIN"],
      },
      {
        icon: <FaRegPaperPlane size={25} />,
        label: "Newsletter",
        route: "admin/newsletter",
        roles: ["ADMIN"],
      },
      {
        icon: <MdOutlineRateReview size={25} />,
        label: "Bewertungen",
        route: "admin/reviews",
        roles: ["ADMIN"],
      },
    ],
  },
];

export default sidebarData;
