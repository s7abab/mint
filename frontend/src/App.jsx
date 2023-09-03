import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "../src/pages/auth/LoginPage";
import RegisterPage from "../src/pages/auth/RegisterPage";
import ApplicationsPage from "./pages/admin/ApplicationsPage";
import CategoryPage from "./pages/admin/CategoryPage";
import Application from "./pages/counselor/Application";
import ViewCounselors from "./pages/admin/ViewCounselors";
import ViewAllCounselors from "./pages/user/ViewAllCounselors";
import UserProfile from "./pages/user/UserProfile";
import CounselorProfile from "./pages/counselor/CounselorProfile";
import CounselorCounselor from "./components/counselorProfile/CounselorCounselor";
import ViewUsers from "./pages/admin/ViewUsers";
import CounselorProfileAdmin from "./components/counselorProfile/CounselorProfileAdmin";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import CounselorDashboard from "./pages/counselor/CounselorDashboard";
import PublicRoute from "./routes/PublicRoute";
import BookingSettings from "./components/counselorProfile/BookingSettings";
import BookingPage from "./pages/user/BookingPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomePage />} />

          {/* AUTH ROUTES */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/apply" element={<Application />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          {/* ADMIN ROUTES */}
          <Route path="/admin/category" element={<CategoryPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/applications" element={<ApplicationsPage />} />
          <Route
            path="/admin/applications/:counselorId"
            element={<CounselorProfile />}
          />

          {/* View all counselors */}
          <Route path="/admin/counselors" element={<ViewCounselors />} />
          {/* View single user */}
          <Route
            path="/admin/counselors/:counselorId"
            element={<CounselorProfileAdmin />}
          />
          {/* View all users */}
          <Route path="/admin/users" element={<ViewUsers />} />
          {/* View single user */}
          <Route path="/admin/users/:userId" element={<UserProfile />} />

          {/* USER ROUTES */}
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/counselors" element={<ViewAllCounselors />} />
          <Route
            path="/counselors/:counselorId"
            element={<CounselorProfile />}
          />
          <Route
            path="counselors/book-appoinment/:counselorId"
            element={<BookingPage />}
          />

          <Route path="/profile" element={<UserProfile />} />

          {/* COUNSELOR ROUTES */}
          <Route path="/counselor/dashboard" element={<CounselorDashboard />} />
          <Route path="/counselor/profile" element={<CounselorCounselor />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
