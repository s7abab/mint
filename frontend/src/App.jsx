import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "../src/pages/auth/LoginPage";
import RegisterPage from "../src/pages/auth/RegisterPage";
import ApplicationsPage from "./pages/admin/ApplicationsPage";
import CategoryPage from "./pages/admin/CategoryPage";
import Application from "./pages/counselor/Application";
import ViewCounselors from "./pages/admin/ViewCounselors";
import ProtectedRoute from "./routes/ProtectedRoute";
import ViewAllCounselors from "./pages/user/ViewAllCounselors";
import UserProfile from "./pages/user/UserProfile";
import CounselorProfile from "./pages/counselor/CounselorProfile";
import CounselorCounselor from "./components/counselorProfile/CounselorCounselor";
import ViewUsers from "./pages/admin/ViewUsers";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* AUTH ROUTES */}
        <Route
          path="/login"
          element={
              <LoginPage />
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/apply" element={<Application />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/category"
          element={
            <ProtectedRoute>
              <CategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute>
              <ApplicationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applications/:counselorId"
          element={
            <ProtectedRoute>
              <CounselorProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applications/:counselorId"
          element={
            <ProtectedRoute>
              <CounselorProfile />
            </ProtectedRoute>
          }
        />
        {/* View counselors */}
        <Route
          path="/admin/counselors"
          element={
            <ProtectedRoute>
              <ViewCounselors />
            </ProtectedRoute>
          }
        />
        {/* Block counselors */}
        <Route
          path="/admin/counselors/:counselorId"
          element={
            <ProtectedRoute>
              <CounselorProfile />
            </ProtectedRoute>
          }
        />
        {/* View users */}
         <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <ViewUsers />
            </ProtectedRoute>
          }
        />
        {/* Block users */}
        <Route
          path="/admin/users/:userId"
          element={
            <ProtectedRoute>
              <CounselorProfile />
            </ProtectedRoute>
          }
        />

        {/* USER ROUTES */}
        <Route
          path="/user/counselors"
          element={
            <ProtectedRoute>
              <ViewAllCounselors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/counselors/:counselorId"
          element={
            <ProtectedRoute>
              <CounselorProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* COUNSELOR ROUTES */}
        <Route
          path="/counselor/profile"
          element={
            <ProtectedRoute>
              <CounselorCounselor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
