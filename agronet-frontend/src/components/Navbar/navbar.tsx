import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import { User } from "lucide-react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  // const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };
  

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <NavLink to="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
          <img src="/images/commodity.png" width={80} height={80} alt="Logo" />
          <p>AgroNet</p>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className="text-black-600 font-bold">
            Home
          </NavLink>
          <NavLink to="/learning" className="text-black-600 font-bold">
            Learning
          </NavLink>
          <NavLink to="/ai" className="text-black-600 font-bold">
            Artificial Intelligence
          </NavLink>
          <NavLink to="/marketplace" className="text-black-600 font-bold">
            Marketplace
          </NavLink>
          <NavLink to="/community" className="text-black-600 font-bold">
            Community
          </NavLink>
          <div className="ml-6 flex space-x-4">
              {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    {/* User Icon - Click to Open Profile */}
                    <NavLink to="/profile" className="text-gray-800 hover:text-teal-600">
                      <User size={32} />
                    </NavLink>

                    {/* Logout Button */}
                    <button 
                      onClick={handleLogout} 
                      className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <NavLink 
                      to="/signin" 
                      className="px-4 py-2 border border-black-600 text-black-600 rounded-lg hover:bg-teal-600 hover:text-white transition"
                    >
                      Sign In
                    </NavLink>
                    <NavLink 
                      to="/signup" 
                      className="px-4 py-2 bg-black-600 border border-black-600 text-black-600 rounded-lg hover:bg-teal-600 hover:text-white transition"
                    >
                      Sign Up
                    </NavLink>
                  </>
                )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white shadow-md p-4 space-y-2"
        >
          <NavLink to="/" className="block hover:text-blue-600" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/learning" className="block hover:text-blue-600" onClick={() => setIsOpen(false)}>Learning</NavLink>
          <NavLink to="/ai" className="block hover:text-blue-600" onClick={() => setIsOpen(false)}>Artificial Intelligence</NavLink>
          <NavLink to="/marketplace" className="block hover:text-blue-600" onClick={() => setIsOpen(false)}>Marketplace</NavLink>
          <NavLink to="/community" className="block hover:text-blue-600" onClick={() => setIsOpen(false)}>Community</NavLink>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
