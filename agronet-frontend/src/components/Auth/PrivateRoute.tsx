// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  console.log("isAuthenticated:", isAuthenticated); // Debugging log

  if (isAuthenticated === undefined) return null; // Prevents blank screen in case of Redux state delay

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
