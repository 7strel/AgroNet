import { Bell, Star, Users, Hash } from "lucide-react";
import { NavLink } from "react-router";

const SideMenu = () => {
  return (
    <div className="w-64 bg-gray-900 text-white p-4 rounded-lg space-y-4">
      <div className="bg-gray-800 p-3 rounded-lg flex items-center gap-3">
        <Bell className="text-green-400" size={20} />
        <NavLink to="/recent/newest">
        <div>
          <h3 className="text-sm font-semibold">Newest and Recent</h3>
          <p className="text-xs text-gray-400">Find the latest update</p>
        </div>
        </NavLink>
      </div>
      <div className="bg-gray-800 p-3 rounded-lg flex items-center gap-3">
        <Star className="text-yellow-400" size={20} />
        <div>
          <h3 className="text-sm font-semibold">Popular of the day</h3>
          <p className="text-xs text-gray-400">Shots featured today by curators</p>
        </div>
      </div>
      <div className="bg-gray-800 p-3 rounded-lg flex items-center gap-3 relative">
        <Users className="text-orange-400" size={20} />
        <div>
          <h3 className="text-sm font-semibold">Following</h3>
          <p className="text-xs text-gray-400">Explore from your favorite person</p>
        </div>
        <span className="absolute right-3 bg-red-500 text-xs px-2 py-1 rounded-full">24</span>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-sm font-semibold mb-3">Popular Tags</h3>
        <ul className="space-y-2">
          {["fish-farming", "viticulture", "organic-farming", "innovation", "tutorial", "business"].map(tag => (
            <li key={tag} className="flex items-center gap-2 text-xs text-gray-400">
              <Hash className="text-blue-400" size={16} />#{tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
