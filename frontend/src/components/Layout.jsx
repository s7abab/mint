import React from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/SideBar";
import Footer from "./layout/Footer";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, sidebar }) => {
  return (
    <div>
      <Header />
      <div className="flex">
        {!sidebar && <Sidebar />}
        <Toaster />
        {children}
      </div>
      <div className="bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
