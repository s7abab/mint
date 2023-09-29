import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Card,
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
  AiOutlineMessage,
} from "react-icons/ai";
import { MdPayment, MdOutlineCategory } from "react-icons/md";
import { BiUserCircle, BiTimeFive } from "react-icons/bi";

import { logout } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Header = ({ className }) => {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6"></ul>
  );
  return (
    <>
      <Navbar
        className={
          "mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 z-50 sticky left-16 top-0 bg-green-opacity"
        }
      >
        <div className="container flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
            onClick={() => navigate("/")}
          >
            MINt
          </Typography>
          <div className="hidden lg:block">{navList}</div>

          {!token && (
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
              onClick={() => window.location.replace("/login")}
            >
              <span>Login</span>
            </Button>
          )}

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <div className="">
            {navList}
            {!token && (
              <Button
                onClick={() => navigate("/login")}
                variant="gradient"
                size="sm"
                fullWidth
                className="mb-2"
              >
                <span>Login</span>
              </Button>
            )}
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
          </div>
        </Collapse>
      </Navbar>
    </>
  );
};

export default Header;
