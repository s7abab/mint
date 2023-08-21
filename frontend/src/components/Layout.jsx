import React from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/SideBar";
import Footer from "./layout/Footer";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <>
      <div>
        <Header />
          {isAuth && <Sidebar />}
          <Toaster />
          {children}
        <div className="bottom-0 ">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
