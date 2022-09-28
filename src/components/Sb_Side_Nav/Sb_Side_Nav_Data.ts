import {
  faQuestion,
  faUsers,
  faSignOutAlt,
  faThLarge,
  faBuilding,
  faPlusSquare,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface SideNavData {
  id: number;
  title: string;
  icon: IconProp;
  path: string;
}

const navData1: SideNavData = {
  id: 1,
  title: "Dashboard",
  icon: faThLarge,
  path: "/dashboard"
};

const navData2: SideNavData = {
  id: 2,
  title: "Accounts",
  icon: faBuilding,
  path: "/dashboard/accounts"
};

const navData3: SideNavData = {
  id: 3,
  title: "Admins",
  icon: faUsers,
  path: "/dashboard/admins"
};

const navData4: SideNavData = {
  id: 4,
  title: "Requests",
  icon: faPlusSquare,
  path: "/dashboard/requests"
};

const navData5: SideNavData = {
  id: 5,
  title: "View",
  icon: faEye,
  path: "/dashboard/view"
};

const navData6: SideNavData = {
  id: 6,
  title: "Log Out",
  icon: faSignOutAlt,
  path: "/login"
};

export const NavData = [
  navData1,
  navData2,
  navData3,
  navData4,
  navData5,
  navData6
];
