
import { NavLink } from "react-router";

const Footer: React.FC = () => {
    return (
    
      <footer className="py-8 bg-gray-900 text-white text-center w-full">
        <h4 className="text-xl font-semibold">AgroNet</h4>
        <p className="mt-2">Bringing innovation to agriculture.</p>
        <div className="flex justify-center gap-4 mt-4">
        <NavLink to="/" className="text-blue-600 font-bold">
            Home
          </NavLink>
          <NavLink to="/learning" className="text-blue-600 font-bold">
            Learning
          </NavLink>
          <NavLink to="/ai" className="text-blue-600 font-bold">
            Artificial Intelligence
          </NavLink>
          <NavLink to="/marketplace" className="text-blue-600 font-bold">
            Marketplace
          </NavLink>
          <NavLink to="/community" className="text-blue-600 font-bold">
            Community
        </NavLink>
        </div>
      </footer>
  
    );
  };
  
  export default Footer;