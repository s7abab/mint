import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { logout } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = ({className}) => {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      <Navbar className={"mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 z-50 left-[50%]"}>
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
            onClick={() => navigate("/")}
          >
            MINt
          </Typography>
          <div className="hidden lg:block">{navList}</div>

          {token ? (
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
            >
              <span>Logout</span>
            </Button>
          ) : (
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
              onClick={() => navigate("/login")}
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
          <div className="container mx-auto">
            {navList}
            {token ? (
              <Button
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
                variant="gradient"
                size="sm"
                fullWidth
                className="mb-2"
              >
                <span>Logout </span>
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                variant="gradient"
                size="sm"
                fullWidth
                className="mb-2"
              >
                <span>Login </span>
              </Button>
            )}
          </div>
        </Collapse>
      </Navbar>
    </>
  );
};

export default Header;
