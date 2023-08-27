import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Protected({ children }) {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
}

export default Protected;