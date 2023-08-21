import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "../src/pages/auth/LoginPage";
import RegisterPage from "../src/pages/auth/RegisterPage";
import Application from "./components/counselor/Application";
import ApplicationsPage from "./pages/admin/ApplicationsPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/application" element={<Application />} />
        <Route path="/admin-applications" element={<ApplicationsPage />} />
      </Routes>
    </>
  );
};

export default App;
