import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {useSelector } from "react-redux";

const Header = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.user);

  const token = localStorage.getItem("token");

  //HandleLogout
  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      localStorage.clear()
      navigate("/login");
    } catch (error) {
      console.log(error)
      
    }
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );
  return (
    <>
      <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
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
              onClick={handleLogout}
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
            {isAuth ? (
              <Button onClick={handleLogout} variant="gradient" size="sm" fullWidth className="mb-2">
                <span>Logout </span>
              </Button>
            ) : (
              <Button onClick={()=> navigate("/login")} variant="gradient" size="sm" fullWidth className="mb-2">
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
