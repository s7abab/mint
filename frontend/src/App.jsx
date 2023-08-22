import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "../src/pages/auth/LoginPage";
import RegisterPage from "../src/pages/auth/RegisterPage";
import Application from "./components/counselor/Application";
import ApplicationsPage from "./pages/admin/ApplicationsPage";
import ProtectedRoute from "./routes/protectedRoute";
import PublicRoute from "./routes/publicRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route path="/application" element={<Application />} />
        <Route path="/admin-applications" element={<ApplicationsPage />} />
      </Routes>
    </>
  );
};

export default App;
