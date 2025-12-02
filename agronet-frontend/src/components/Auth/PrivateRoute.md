// src/components/PrivateRoute.tsx
// import { Navigate, Outlet } from 'react-router';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';

// const PrivateRoute = () => {
//   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

//   console.log("isAuthenticated:", isAuthenticated); // Debugging log

//   if (isAuthenticated === undefined) return null; // Prevents blank screen in case of Redux state delay

//   return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
// };

// export default PrivateRoute;


// import { useEffect, useState } from 'react';
// import { Navigate, Outlet } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../redux/store';
// import { refreshToken } from '../../redux/slices/authSlice';

// import { selectAuthToken, selectAuthLoading } from '../../redux/selectors/authSelectors';

// const PrivateRoute = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const token = useSelector(selectAuthToken);
//   const loading = useSelector(selectAuthLoading);
//   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
//   const [isChecking, setIsChecking] = useState(true);

//   useEffect(() => {
//     const checkToken = async () => {
//       if (token) {
//         try {
//           const decodedToken: any = JSON.parse(atob(token.split('.')[1])); // Decode JWT
//           const currentTime = Math.floor(Date.now() / 1000);

//           if (decodedToken.exp < currentTime) {
//             await dispatch(refreshToken()); // Refresh the token if expired
//           }
//         } catch (error) {
//           console.error("Error decoding token:", error);
//         }
//       }
//       setIsChecking(false);
//     };

//     checkToken();
//   }, [dispatch, token]);

//   console.log("isAuthenticated:", isAuthenticated); // Debugging log

//   if (isAuthenticated === undefined || loading || isChecking) return null; // Prevents blank screen during checks

//   return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
// };

// export default PrivateRoute;



import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { refreshToken } from '../../redux/slices/authSlice';
import { selectAuthToken, selectAuthLoading } from '../../redux/selectors/authSelectors';

const PrivateRoute = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectAuthToken);
  const loading = useSelector(selectAuthLoading);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          const decodedToken: any = JSON.parse(atob(token.split('.')[1])); // Decode JWT
          const currentTime = Math.floor(Date.now() / 1000);

          if (decodedToken.exp < currentTime) {
            await dispatch(refreshToken()); // Refresh token if expired
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
      setIsChecking(false);
    };

    checkToken();
  }, [dispatch, token]);

  console.log("isAuthenticated:", isAuthenticated, "User:", user); // Debugging log

  if (isAuthenticated === undefined || loading || isChecking) return null; // Prevents flicker during checks

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
