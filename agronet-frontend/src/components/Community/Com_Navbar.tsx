import { Home } from "@mui/icons-material";
import {  People,  Mail } from "@mui/icons-material";
import { NavLink } from "react-router";
import { Search,User } from "lucide-react";
import NotificationDropdown from "../Marketplace/Notification";

const Navbar = () => {
  return (
    <nav className="bg-white text-white flex items-center justify-between p-4">
        <NavLink to="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
          <img src="/images/commodity.png" width={50} height={50} alt="Logo" />
        </NavLink>
      <div className="flex items-center space-x-4">
        <NavLink to="/community">
          <Home className="text-2xl rounded text-gray-500 cursor-pointer" />
        </NavLink>
        <NavLink to="/users">
          <People className="text-2xl text-gray-500 cursor-pointer" />
        </NavLink>
        {/* <Headset className="text-2xl text-black cursor-pointer" /> */}
      </div>

      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 text-black rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <Search className="absolute right-3 text-gray-500 cursor-pointer" size={20} />
      </div>

      <div className="flex items-center space-x-4">
        <NavLink to="/community-chat">
          <Mail className="text-2xl text-gray-500 cursor-pointer" />
        </NavLink>
        <div className="relative">
          {/* <Notifications className="text-2xl text-gray-500 cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1">1</span> */}
          <NotificationDropdown />
        </div>
        <div className="flex items-center space-x-2">
        <NavLink to="/communityprofile">
          <User size={24} className="text-gray-500 cursor-pointer"/>
        </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
