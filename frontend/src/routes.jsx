import React, { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const NotFoundPage = lazy(() => import("./pages/NotFound.jsx.jsx"));
const ApplyAsCounselor = lazy(() =>
  import("./pages/counselor/ApplyAsCounselor")
);

const ApplicationsPage = lazy(() => import("./pages/admin/Applications"));
const CategoryPage = lazy(() => import("./pages/admin/Category"));
const ViewCounselors = lazy(() => import("./pages/admin/ViewCounselors"));
const UserViewCounselors = lazy(() => import("./pages/user/ViewCounselors"));
const UserProfile = lazy(() => import("./pages/user/Profile"));
const CounselorProfile = lazy(() =>
  import("./pages/counselor/Profile")
);
const CounselorCounselor = lazy(() =>
  import("./components/counselorProfile/CounselorCounselor")
);
const ViewUsers = lazy(() => import("./pages/admin/ViewUsers"));
const CounselorProfileAdmin = lazy(() =>
  import("./components/counselorProfile/CounselorProfileAdmin")
);
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const KycPage = lazy(() => import("./pages/admin/Kyc"));
const CounselorDashboard = lazy(() =>
  import("./pages/counselor/Dashboard")
);
const AppointmentBooking = lazy(() => import("./pages/user/AppointmentBooking.jsx"));
const Slots = lazy(() => import("./pages/counselor/Slots"));
const Bookings = lazy(() => import("./pages/user/Bookings"));
const CounselorBookings = lazy(() =>
  import("./pages/counselor/Bookings")
);
const Payment = lazy(() => import("./pages/Payment"));
const RoomPage = lazy(() => import("./pages/Room"));
const PaymentsAdmin = lazy(() => import("./pages/admin/Payments"));
const Message = lazy(() => import("./pages/Message"));
const ChatScreen = lazy(() => import("./components/message/ChatScreen"));

export const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/apply",
    element: <ApplyAsCounselor />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  { path: "/room/:id", element: <RoomPage /> },
];

 export const privateRoutes = [
  // ADMIN ROUTES
  { path: "/admin/category", element: <CategoryPage /> },
  { path: "/admin/dashboard", element: <AdminDashboard /> },
  { path: "/admin/applications", element: <ApplicationsPage /> },
  { path: "/admin/applications/:counselorId", element: <CounselorProfile /> },
  { path: "/admin/counselors", element: <ViewCounselors /> },
  {
    path: "/admin/counselors/:counselorId",
    element: <CounselorProfileAdmin />,
  },
  { path: "/admin/users", element: <ViewUsers /> },
  { path: "/admin/users/:userId", element: <UserProfile /> },
  { path: "/admin/payments", element: <PaymentsAdmin /> },
  { path: "/admin/kyc", element: <KycPage /> },

  // USER ROUTES
  { path: "/bookings", element: <Bookings /> },
  { path: "/counselors", element: <UserViewCounselors /> },
  { path: "/counselors/:counselorId", element: <CounselorProfile /> },
  { path: "/book-appointment/:counselorId", element: <AppointmentBooking /> },
  { path: "/profile", element: <UserProfile /> },
  { path: "/payments", element: <RoomPage /> },
  { path: "/messages", element: <Message /> },
  { path: "/messages/:id", element: <ChatScreen /> },

  // COUNSELOR ROUTES
  { path: "/counselor/dashboard", element: <CounselorDashboard /> },
  { path: "/counselor/bookings", element: <CounselorBookings /> },
  { path: "/counselor/slots", element: <Slots /> },
  { path: "/counselor/profile", element: <CounselorCounselor /> },
  { path: "/counselor/payments", element: <RoomPage /> },
  { path: "/counselor/messages", element: <Message /> },
  { path: "/counselor/messages/:id", element: <ChatScreen /> },
];
