import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthToken, selectAuthLoading, selectAuthError } from '../selectors/authSelectors';
import  {refreshToken}  from '../slices/authSlice';
import { AppDispatch } from "../store"; 

const useTokenRefresh = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectAuthToken);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (!token) return;

      // Example: Check if token is close to expiration
      const expirationTime = 3600; // 1 hour
      const currentTime = Math.floor(Date.now() / 1000);
      const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
      
      if (decodedToken.exp < currentTime + expirationTime) {
        dispatch(refreshToken());
      }
    };

    checkTokenExpiration();
  }, [dispatch, token]);

  return { loading, error };
};

export default useTokenRefresh;
