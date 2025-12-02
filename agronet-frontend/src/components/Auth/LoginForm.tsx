import React from "react";
import { NavLink, Navigate } from "react-router";
import { SyntheticEvent, useState } from "react"
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';

import axios from "axios";

const LoginForm: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch()


const baseURL = import.meta.env.VITE_BASE_URL;

  const handleLogin = (userData: any) => {
    dispatch(setUser(userData));  // Dispatch user info on login
  };

  const submit = async (e:SyntheticEvent) => {
    e.preventDefault();
    const response = await axios.post(`${baseURL}/login/`,{
        email,
        password
    })

    if(localStorage.getItem("user_token")){
        localStorage.removeItem("user_token")
    }

    localStorage.setItem("user_token", JSON.stringify(response.data["token"]))

    handleLogin(response.data);

    setRedirect(true);
  }

  if(redirect){
    return <Navigate to="/" />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 direction-vertical">
        <NavLink to="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
          <img src="/images/commodity-white.png" width={80} height={80} alt="Logo" />
        </NavLink>
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-2xl shadow-lg mt-4">
        <h2 className="text-2xl font-bold text-center text-white">Log in to AgroNet</h2>
        <div className="space-y-4">
          <form onSubmit={submit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 text-white bg-gray-700 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={e => setPassword(e.target.value)} 
            />
            <div className="text-right">
              <NavLink to="/forgot" className="text-white">
                Forgot your password?
              </NavLink>
            </div>
            <button className="w-full p-3 font-bold text-gray-900 bg-white rounded-lg hover:bg-gray-200 cursor-pointer">
              Log in
            </button>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-3 text-gray-400">or continue with</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>
            <button className="flex items-center justify-center w-full p-3 space-x-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer">
              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
              <span>Log in</span>
            </button>
            <button className="flex items-center justify-center w-full p-3 space-x-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/600px-2023_Facebook_icon.svg.png?20231011122028" alt="Facebook" className="w-5 h-5" />
              <span>Log in</span>
            </button>
          </form>
        </div>
        <p className="mt-4 text-sm text-center text-gray-400">
          Don't have an account? <NavLink to="/signup">Sign up</NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
