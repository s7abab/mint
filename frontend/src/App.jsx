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
import BookingPage from "./pages/user/BookingPage";
import SlotsPage from "./pages/counselor/SlotsPage";
import Bookings from "./pages/user/Bookings";
import CounselorBookings from "./pages/counselor/CounselorBookings";
import MyPatients from "./pages/counselor/MyPatients";
import PaymentPage from "./pages/PaymentPage";
import RoomPage from "./pages/RoomPage";
import PaymentsAdmin from "./pages/admin/PaymentsAdmin";

const App = () => {
  return (
    <>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/room/:roomId" element={<RoomPage />} />
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
            <Route path="/admin/counselors" element={<ViewCounselors />} />
            <Route
              path="/admin/counselors/:counselorId"
              element={<CounselorProfileAdmin />}
            />
            <Route path="/admin/users" element={<ViewUsers />} />
            <Route path="/admin/users/:userId" element={<UserProfile />} />
            <Route path="/admin/payments" element={<PaymentsAdmin />} />
            {/* USER ROUTES */}
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/counselors" element={<ViewAllCounselors />} />
            <Route
              path="/counselors/:counselorId"
              element={<CounselorProfile />}
            />
            <Route
              path="counselors/book-appointment/:counselorId"
              element={<BookingPage />}
            />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/payments" element={<PaymentPage />} />

            {/* COUNSELOR ROUTES */}
            <Route
              path="/counselor/dashboard"
              element={<CounselorDashboard />}
            />
            <Route path="/counselor/bookings" element={<CounselorBookings />} />
            <Route path="/counselor/slots" element={<SlotsPage />} />
            <Route path="/counselor/patients" element={<MyPatients />} />
            <Route path="/counselor/profile" element={<CounselorCounselor />} />
            <Route path="/counselor/payments" element={<PaymentPage />} />
          </Route>
        </Routes>
    </>
  );
};

export default App;
