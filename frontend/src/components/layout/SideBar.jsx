import React, { useEffect, useState } from "react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { UserCircleIcon, PowerIcon } from "@heroicons/react/24/solid";
import {
  AiFillAppstore,
  AiOutlineForm,
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineMessage,
  AiOutlineIdcard,
} from "react-icons/ai";
import { MdPayment, MdOutlineCategory } from "react-icons/md";
import { BiUserCircle, BiTimeFive } from "react-icons/bi";
import { logout } from "../../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Sidebar = () => {
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="hidden-custom ">
      <Card
        className={
          "mt-2 h-[100vh]  p-4 shadow-xl shadow-blue-gray-900/5 sticky top-0 pt-10"
        }
      >
        <div className="mb-2 p-4"></div>
        {role === "user" && (
          <List>
            <Link to={"/counselors"}>
              <ListItem>
                <ListItemPrefix>
                  <AiOutlineUser className="h-5 w-5" />
                </ListItemPrefix>
                Counselors
              </ListItem>
            </Link>
            <Link to={"/bookings"}>
              <ListItem>
                <ListItemPrefix>
                  <AiOutlineBook className="h-5 w-5" />
                </ListItemPrefix>
                Bookings
              </ListItem>
            </Link>
            <Link to={"/messages"}>
              <ListItem>
                <ListItemPrefix>
                  <AiOutlineMessage className="h-5 w-5" />
                </ListItemPrefix>
                Messages
              </ListItem>
            </Link>
            <Link to={"/payments"}>
              <ListItem>
                <ListItemPrefix>
                  <MdPayment className="h-5 w-5" />
                </ListItemPrefix>
                Payments
              </ListItem>
            </Link>
            <Link to={"/profile"}>
              <ListItem>
                <ListItemPrefix>
                  <BiUserCircle className="h-5 w-5" />
                </ListItemPrefix>
                Profile
              </ListItem>
            </Link>
            <ListItem
              onClick={() => {
                dispatch(logout());
                toast.success("Logout successfully");
                navigate("/");
              }}
            >
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        )}
        {role === "counselor" && (
          <List>
            <Link to={"/counselor/dashboard"}>
              <ListItem>
                <ListItemPrefix>
                  <AiFillAppstore className="h-5 w-5" />
                </ListItemPrefix>
                Dashboard
              </ListItem>
            </Link>

            <Link to={"/counselor/bookings"}>
              <ListItem>
                <ListItemPrefix>
                  <AiOutlineBook className="h-5 w-5" />
                </ListItemPrefix>
                Bookings
              </ListItem>
            </Link>
            <Link to={"/counselor/slots"}>
              <ListItem>
                <ListItemPrefix>
                  <BiTimeFive className="h-5 w-5" />
                </ListItemPrefix>
                Assign Your Time
              </ListItem>
            </Link>
            <Link to={"/counselor/messages"}>
              <ListItem>
                <ListItemPrefix>
                  <AiOutlineMessage className="h-5 w-5" />
                </ListItemPrefix>
                Messages
              </ListItem>
            </Link>
            <Link to={"/counselor/payments"}>
              <ListItem>
                <ListItemPrefix>
                  <MdPayment className="h-5 w-5" />
                </ListItemPrefix>
                Payments
              </ListItem>
            </Link>
            <Link to={"/counselor/profile"}>
              <ListItem>
                <ListItemPrefix>
                  <BiUserCircle className="h-5 w-5" />
                </ListItemPrefix>
                Profile
              </ListItem>
            </Link>
            <ListItem
              onClick={() => {
                dispatch(logout());
                toast.success("Logout successfully");
                navigate("/");
              }}
            >
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
            <Link to={"/admin/kyc"}>
              <ListItem>
                <ListItemPrefix>
                  <AiOutlineIdcard className="h-5 w-5" />
                </ListItemPrefix>
                KYC
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
            <ListItem
              onClick={() => {
                dispatch(logout());
                toast.success("Logout successfully");
                navigate("/");
              }}
            >
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        )}
      </Card>
    </div>
  );
};

export default Sidebar;
