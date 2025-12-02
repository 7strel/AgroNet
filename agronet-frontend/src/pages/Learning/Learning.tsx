

// import Sidebar from "../../components/Learning/Sidebar";
// import Dashboard from "../../components/Learning/dashboard_section_two";
// import DashboardStats from "../../components/Learning/dashboard_section_three";


// const Learning = () => {
//     return (
//       <div className="flex h-screen">
//         {/* Sidebar - Fixed Width */}
//         <div className="w-64 bg-gray-200">
//           <Sidebar />
//         </div>
  
//         {/* Dashboard - Takes Remaining Space */}
//         <div className="flex-1 bg-white">
//           <Dashboard />
//         </div>
//         {/* Dashboard - Takes Remaining Space */}
//         <div className="flex-1 bg-white">
//           <DashboardStats />
//         </div>
//       </div>
//     );
//   };
  
//   export default Learning;
  


import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserDetails } from "../../redux/slices/userSlice";
import type { AppDispatch } from "../../redux/store";
import Sidebar from "../../components/Learning/Sidebar";
import Dashboard from "../../components/Learning/dashboard_section_two";
import DashboardStats from "../../components/Learning/dashboard_section_three";

const Learning = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200">
        <Sidebar />
      </div>

      {/* Dashboard */}
      <div className="flex-1 bg-white">
        <Dashboard />
      </div>

      {/* Stats */}
      <div className="flex-1 bg-white">
        <DashboardStats />
      </div>
    </div>
  );
};

export default Learning;
