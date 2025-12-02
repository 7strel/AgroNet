'use client';

import React, {useEffect} from "react";
import { NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { Home,Search, ShoppingCart, User, Heart} from "lucide-react";
import NotificationDropdown from "./Notification";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../redux/selectors/cartSelector";
import { fetchCart } from "../../redux/slices/cartSlice";

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(selectCartItems);
  

  useEffect(()=>{
      dispatch(fetchCart());
  },[dispatch])

  console.log(items);

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <NavLink to="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
          <img src="/images/commodity.png" width={50} height={50} alt="Logo" />
        </NavLink>

            <div className="flex items-center space-x-4">
              <NavLink to="/marketplace">
                <Home className="text-2xl rounded text-gray-500 cursor-pointer" />
              </NavLink>
              <NavLink to="/wishlist">
                <Heart className="text-2xl text-gray-500 cursor-pointer" />
              </NavLink>
              {/* <Headset className="text-2xl text-black cursor-pointer" /> */}
            </div>
      {/* Search Bar */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 text-black rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <Search className="absolute right-3 text-gray-500 cursor-pointer" size={20} />
      </div>
      
      {/* Language Switch */}
      {/* <button className="flex items-center border rounded-full px-3 py-1 text-yellow-600">
        <Globe size={18} className="mr-1" /> ES
      </button> */}
      
      {/* Icons */}
      <div className="flex items-center space-x-6">
        {/* Cart Icon with Badge */}
        <div className="relative">
          <NavLink to="/cart">
            <ShoppingCart size={24} className="text-gray-500 cursor-pointer"/>
          </NavLink>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">{items.length}</span>
        </div>
        
        {/* Notification Icon with Badge */}
        <div className="relative">
          {/* <Bell size={24} className="text-gray-500 cursor-pointer"/> */}
          <NotificationDropdown />
          {/* <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs px-2 rounded-full">2</span> */}
        </div>
        
        {/* User Icon */}
        <NavLink to="/marketprofile">
          <User size={24} className="text-gray-500 cursor-pointer"/>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
