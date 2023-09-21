import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { Loading } from "./components/Loading";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("../src/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../src/pages/auth/RegisterPage"));
const ApplicationsPage = lazy(() => import("./pages/admin/ApplicationsPage"));
const CategoryPage = lazy(() => import("./pages/admin/CategoryPage"));
const Application = lazy(() => import("./pages/counselor/Application"));
const ViewCounselors = lazy(() => import("./pages/admin/ViewCounselors"));
const ViewAllCounselors = lazy(() => import("./pages/user/ViewAllCounselors"));
const UserProfile = lazy(() => import("./pages/user/UserProfile"));
const CounselorProfile = lazy(() =>
  import("./pages/counselor/CounselorProfile")
);
const CounselorCounselor = lazy(() =>
  import("./components/counselorProfile/CounselorCounselor")
);
const ViewUsers = lazy(() => import("./pages/admin/ViewUsers"));
const CounselorProfileAdmin = lazy(() =>
  import("./components/counselorProfile/CounselorProfileAdmin")
);
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const UserDashboard = lazy(() => import("./pages/user/UserDashboard"));
const CounselorDashboard = lazy(() =>
  import("./pages/counselor/CounselorDashboard")
);
const BookingPage = lazy(() => import("./pages/user/BookingPage"));
const SlotsPage = lazy(() => import("./pages/counselor/SlotsPage"));
const Bookings = lazy(() => import("./pages/user/Bookings"));
const CounselorBookings = lazy(() =>
  import("./pages/counselor/CounselorBookings")
);
const MyPatients = lazy(() => import("./pages/counselor/MyPatients"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const RoomPage = lazy(() => import("./pages/RoomPage"));
const PaymentsAdmin = lazy(() => import("./pages/admin/PaymentsAdmin"));
const MessagePage = lazy(() => import("./pages/MessagePage"));
const ChatScreen = lazy(() => import("./pages/ChatScreen"));

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                {" "}
                <HomePage />{" "}
              </Suspense>
            }
          />
          {/* AUTH ROUTES */}
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loading />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<Loading />}>
                <RegisterPage />
              </Suspense>
            }
          />
          <Route
            path="/apply"
            element={
              <Suspense fallback={<Loading />}>
                <Application />
              </Suspense>
            }
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/room/:roomId" element={<RoomPage />} />
          {/* ADMIN ROUTES */}
          <Route
            path="/admin/category"
            element={
              <Suspense fallback={<Loading />}>
                <CategoryPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <AdminDashboard />
              </Suspense>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <Suspense fallback={<Loading />}>
                <ApplicationsPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/applications/:counselorId"
            element={
              <Suspense fallback={<Loading />}>
                <CounselorProfile />
              </Suspense>
            }
          />
          <Route
            path="/admin/counselors"
            element={
              <Suspense fallback={<Loading />}>
                <ViewCounselors />
              </Suspense>
            }
          />
          <Route
            path="/admin/counselors/:counselorId"
            element={
              <Suspense fallback={<Loading />}>
                <CounselorProfileAdmin />
              </Suspense>
            }
          />
          <Route
            path="/admin/users"
            element={
              <Suspense fallback={<Loading />}>
                <ViewUsers />
              </Suspense>
            }
          />
          <Route
            path="/admin/users/:userId"
            element={
              <Suspense fallback={<Loading />}>
                <UserProfile />
              </Suspense>
            }
          />
          <Route
            path="/admin/payments"
            element={
              <Suspense fallback={<Loading />}>
                <PaymentsAdmin />
              </Suspense>
            }
          />
          {/* USER ROUTES */}
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <UserDashboard />
              </Suspense>
            }
          />
          <Route
            path="/bookings"
            element={
              <Suspense fallback={<Loading />}>
                <Bookings />
              </Suspense>
            }
          />
          <Route
            path="/counselors"
            element={
              <Suspense fallback={<Loading />}>
                <ViewAllCounselors />
              </Suspense>
            }
          />
          <Route
            path="/counselors/:counselorId"
            element={
              <Suspense fallback={<Loading />}>
                <CounselorProfile />
              </Suspense>
            }
          />
          <Route
            path="counselors/book-appointment/:counselorId"
            element={
              <Suspense fallback={<Loading />}>
                <BookingPage />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<Loading />}>
                <UserProfile />
              </Suspense>
            }
          />
          <Route
            path="/payments"
            element={
              <Suspense fallback={<Loading />}>
                <PaymentPage />
              </Suspense>
            }
          />
          <Route
            path="/messages"
            element={
              <Suspense fallback={<Loading />}>
                <MessagePage />
              </Suspense>
            }
          />
          <Route
            path="/messages/:id"
            element={
              <Suspense fallback={<Loading />}>
                <ChatScreen />
              </Suspense>
            }
          />
          {/* COUNSELOR ROUTES */}
          <Route
            path="/counselor/dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <CounselorDashboard />
              </Suspense>
            }
          />
          <Route
            path="/counselor/bookings"
            element={
              <Suspense fallback={<Loading />}>
                <CounselorBookings />
              </Suspense>
            }
          />
          <Route
            path="/counselor/slots"
            element={
              <Suspense fallback={<Loading />}>
                <SlotsPage />
              </Suspense>
            }
          />
          <Route
            path="/counselor/patients"
            element={
              <Suspense fallback={<Loading />}>
                <MyPatients />
              </Suspense>
            }
          />
          <Route
            path="/counselor/profile"
            element={
              <Suspense fallback={<Loading />}>
                <CounselorCounselor />
              </Suspense>
            }
          />
          <Route
            path="/counselor/payments"
            element={
              <Suspense fallback={<Loading />}>
                <PaymentPage />
              </Suspense>
            }
          />
          <Route
            path="/counselor/messages"
            element={
              <Suspense fallback={<Loading />}>
                <MessagePage />
              </Suspense>
            }
          />
          <Route
            path="/counselor/messages/:id"
            element={
              <Suspense fallback={<Loading />}>
                <ChatScreen />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
