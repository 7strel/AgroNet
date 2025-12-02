import React from "react";

const CourseAchievements: React.FC = () => {
  return (
    <div className="p-6 bg-white max-w-2xl mt-4 mb-4 rounded-2xl shadow-md w-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">COURSE ACHIEVEMENTS</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-sm">
          <span className="text-green-500 text-2xl">🏆</span>
          <p className="text-lg font-bold">1 800</p>
          <p className="text-sm text-gray-500">points</p>
        </div>
        <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-sm">
          <span className="text-pink-500 text-2xl">🍼</span>
          <p className="text-lg font-bold">45.3%</p>
          <p className="text-sm text-gray-500">complete</p>
        </div>
        <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-sm">
          <span className="text-purple-500 text-2xl">🛡️</span>
          <p className="text-lg font-bold">+26</p>
          <p className="text-sm text-gray-500">level up</p>
        </div>
      </div>
    </div>
  );
};

export default CourseAchievements;