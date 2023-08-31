import React, { useEffect } from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/SideBar";
import Footer from "./layout/Footer";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ children, sidebar }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.role);

  return (
    <>
      <div>
        <Header />
        <div className="flex">
          {!sidebar && <Sidebar />}
          <Toaster />
          {children}
        </div>
        <div className="bottom-0 ">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
