// ProtectedRoute.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../redux/features/auth/authActions";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const tokenRedux = useSelector((state) => state.auth.token);

  // Get current user's data
  const dispatch = useDispatch();
  useEffect(() => {
    if (token && tokenRedux) {
      dispatch(getCurrentUser());
    } else {
      navigate("/login");
    }
  }, [token, dispatch]);

  //
  if (!token && !tokenRedux) {
    return (
      <div className="unauthorized">
        <h1 className="font-bold">Unauthorized :</h1>
        <span>
          <NavLink to="/login">Login</NavLink> to gain access
        </span>
      </div>
    );
  }
  return <Outlet />;
};
export default ProtectedRoute;
