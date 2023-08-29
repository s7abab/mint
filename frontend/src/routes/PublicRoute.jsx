import { useNavigate } from "react-router-dom";

function PublicRoute({ children }) {
  const navigate = useNavigate();

  if (!localStorage.getItem("token")) {
      return children;
    navigate("/login", { replace: true });
  } else {
  }
}

export default PublicRoute;
