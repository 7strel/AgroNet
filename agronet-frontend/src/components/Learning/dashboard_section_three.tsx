import React from "react";
import TopNavigation from "./dashboard/TopNavigation";
import CourseStatCard from "./dashboard/CourseStatCard";
import LearningChart from "./dashboard/LearningChart";



  
  const DashboardStats: React.FC = () => {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">

        <TopNavigation />
        <CourseStatCard />
        <LearningChart />
  

        {/* Go Premium Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 flex items-center space-x-4">
          <div>
            <h3 className="text-lg font-semibold">Learn even more!</h3>
            <p className="text-gray-600">Unlock premium features only for $9.99 per month.</p>
            <button className="mt-2 bg-black text-white px-4 py-2 rounded-lg cursor-pointer">Go Premium</button>
          </div>
          <div>
            <img
              src="/images/online-education.png"
              alt="Premium"
              className="w-16"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default DashboardStats;
  