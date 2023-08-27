import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  AiFillAppstore,
  AiOutlineForm,
  AiOutlineUser,
  AiOutlineBook,
} from "react-icons/ai";
import { MdPayment, MdOutlineCategory } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const role = useSelector((state) => state.auth.role);
  return (
    <>
      <Card className="mt-2 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Sidebar
          </Typography>
        </div>
        {role === "user" && (
          <List>
            <Link to={"/user/dashboard"}>
              <ListItem>
                <ListItemPrefix>
                  <AiFillAppstore className="h-5 w-5" />
                </ListItemPrefix>
                Dashboard
              </ListItem>
            </Link>
            <Link to={"/user/counselors"}>
              <ListItem>
                <ListItemPrefix>
                  <AiOutlineUser className="h-5 w-5" />
                </ListItemPrefix>
                Counselors
                <ListItemSuffix></ListItemSuffix>
              </ListItem>
            </Link>
            <Link to={"/user/bookings"}>
              <ListItem>
                <ListItemPrefix>
                  <AiOutlineBook className="h-5 w-5" />
                </ListItemPrefix>
                Bookings
                <ListItemSuffix></ListItemSuffix>
              </ListItem>
            </Link>
            <Link to={"/user/profile"}>
              <ListItem>
                <ListItemPrefix>
                  <BiUserCircle className="h-5 w-5" />
                </ListItemPrefix>
                Profile
                <ListItemSuffix></ListItemSuffix>
              </ListItem>
            </Link>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        )}
        {role === "admin" && (
          <List>
            <Link to={"/admin/dashboard"}>
              <ListItem>
                <ListItemPrefix>
                  <AiFillAppstore className="h-5 w-5" />
                </ListItemPrefix>
                Dashboard
              </ListItem>
            </Link>

            <Link to={"/admin/applications"}>
              <ListItem>
                <ListItemPrefix>
                  <AiOutlineForm className="h-5 w-5" />
                </ListItemPrefix>
                Applications
              </ListItem>
            </Link>
            <Link to={"/admin/counselors"}>
              <ListItem>
                <ListItemPrefix>
                  <AiOutlineUser className="h-5 w-5" />
                </ListItemPrefix>
                Counselors
                <ListItemSuffix></ListItemSuffix>
              </ListItem>
            </Link>
            <Link to={"/admin/users"}>
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Users
              </ListItem>
            </Link>
            <Link to={"/admin/payments"}>
              <ListItem>
                <ListItemPrefix>
                  <MdPayment className="h-5 w-5" />
                </ListItemPrefix>
                Payments
              </ListItem>
            </Link>
            <Link to={"/admin/category"}>
              <ListItem>
                <ListItemPrefix>
                  <MdOutlineCategory className="h-5 w-5" />
                </ListItemPrefix>
                Category
              </ListItem>
            </Link>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        )}
      </Card>
    </>
  );
};

export default Sidebar;
