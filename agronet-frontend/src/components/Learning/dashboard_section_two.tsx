import React from "react";

import CourseProgress from "./dashboard/CourseProgress";
import CourseList from "./CourseList";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Dashboard: React.FC = () => {

  const user = useSelector((state: RootState) => state.users.selectedUser);

  if (!user) return <div>Loading...</div>;

    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="bg-gray-100 p-6 rounded-lg flex items-center">
          <div>
            <h1 className="text-2xl font-bold">Hello {user.first_name}!</h1>
            <p className="text-gray-600">It's good to see you again.</p>
          </div>
          <div className="ml-auto">
            <img src="/images/Illustration.png" alt="Avatar" className="w-16 h-16" />
          </div>
        </div>


        <CourseProgress />
        <CourseList />
      </div>
    );
  };
  
  export default Dashboard;
  