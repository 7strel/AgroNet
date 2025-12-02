import React from "react";
import { Home, GraduationCap, User, Mail,  LogOut } from "lucide-react";
import { NavLink } from "react-router";
import {  useDispatch } from 'react-redux';
// import { RootState } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';

const Sidebar: React.FC = () => {

  const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  // const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };  

  return (
    <div className="h-screen w-20 bg-black text-white flex flex-col items-center py-6 rounded-3xl shadow-lg">
      {/* Logo */}
      <NavLink to="/" >
        <div className="mb-10 text-2xl font-bold"><img src="/images/commodity-white.png" className="cursor-pointer" width={50} height={50} /></div>
      </NavLink>

      {/* Navigation Icons */}
      <nav className="flex flex-col space-y-8 flex-grow">
        <NavLink to="/learning" >
          <SidebarIcon icon={<Home size={28} />} />
        </NavLink>
        <NavLink to="/courses" >
          <SidebarIcon icon={<GraduationCap size={28} />} />
        </NavLink>
        <NavLink to="/mail" >
          <SidebarIcon icon={<Mail size={28} />} />
        </NavLink>
        <NavLink to="/profile" >
          <SidebarIcon icon={<User size={28} />} />
        </NavLink>

        {/* <SidebarIcon icon={<Settings size={28} />} /> */}
      </nav>

      {/* Logout Icon */}
      <button onClick={handleLogout}>
        <SidebarIcon icon={<LogOut size={28} />} className="mb-2"  />
      </button>
    </div>
  );
};

interface SidebarIconProps {
  icon: React.ReactNode;
  className?: string;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ icon, className }) => {
  return (
    <div
      className={`p-2 rounded-lg hover:bg-teal-600 hover:bg-opacity-20 cursor-pointer transition ${className}`}
    >
      {icon}
    </div>
  );
};

export default Sidebar;
