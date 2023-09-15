import React, { useEffect } from "react";
import Layout from "../components/Layout";

import Section1 from "../components/homePage/Section1";
import Section2 from "../components/homePage/Section2";
import Section3 from "../components/homePage/Section3";
import { useSelector } from "react-redux";

const HomePage = () => {
  
  return (
    <>
      <Layout sidebar={true}>
        <div className="w-screen">
        <Section1 />
        <Section2 />
        <Section3 />
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
