// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";




// const data = [
//     { day: "mon", hours: 0 },
//     { day: "tue", hours: 1.5 },
//     { day: "wed", hours: 2.5 },
//     { day: "thu", hours: 1 },
//     { day: "fri", hours: 4 },
//     { day: "sat", hours: 3 },
//     { day: "sun", hours: 2 },
//   ];


// const LearningChart = () => {
//     return(
//         <>
//         {/* Statistics Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Your statistics</h2>
//             <div className="flex justify-between items-center mb-4">
//                 <div className="space-x-6">
//                     <button className="font-semibold border-b-2 border-black pb-1">Learning Hours</button>
//                     <button className="text-gray-500">My Courses</button>
//                 </div>
//                   <button className="bg-gray-200 px-4 py-2 rounded-lg">Weekly ▼</button>
//             </div>
        
//             {/* Chart */}
//             <ResponsiveContainer width="100%" height={200}>
//                 <LineChart data={data}>
//                 <XAxis dataKey="day" />
//                 <YAxis domain={[0, 5]} />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="hours" stroke="#000" strokeWidth={2} dot={{ r: 5 }} />
//                 </LineChart>
//                 </ResponsiveContainer>
//             </div>
//         </>
//     );
// }


// export default LearningChart;


import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { fetchSavecourse } from "../../../redux/slices/saveCourseSlice";
import { selectSaveCourseItems, selectSaveCourseLoading, selectSaveCourseError } from "../../../redux/selectors/saveCourseSelector";

const data = [
  { day: "mon", hours: 0 },
  { day: "tue", hours: 1.5 },
  { day: "wed", hours: 2.5 },
  { day: "thu", hours: 1 },
  { day: "fri", hours: 4 },
  { day: "sat", hours: 3 },
  { day: "sun", hours: 2 },
];

const LearningChart = () => {
  const [activeTab, setActiveTab] = useState<"chart" | "courses">("chart");

  const dispatch = useDispatch<AppDispatch>();
  const courses = useSelector(selectSaveCourseItems);
  const isLoading = useSelector(selectSaveCourseLoading);
  const error = useSelector(selectSaveCourseError);

    useEffect(()=>{
      dispatch(fetchSavecourse());
    },[dispatch])
  
    console.log(courses);
  
    if (isLoading) {
        return <p className="text-center text-white-500">Loading products...</p>;
    }
  
    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

  return (
    <>
      {/* Statistics Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your statistics</h2>
        <div className="flex justify-between items-center mb-4">
          <div className="space-x-6">
            <button
              className={`font-semibold pb-1 ${
                activeTab === "chart" ? "border-b-2 border-black" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("chart")}
            >
              Learning Hours
            </button>
            <button
              className={`font-semibold pb-1 ${
                activeTab === "courses" ? "border-b-2 border-black" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("courses")}
            >
              My Courses
            </button>
          </div>
          <button className="bg-gray-200 px-4 py-2 rounded-lg">Weekly ▼</button>
        </div>

        {/* Conditional Content */}
        {activeTab === "chart" ? (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="day" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="hours" stroke="#000" strokeWidth={2} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ul className="space-y-2">
            {courses.map((course) => (
              <li key={course.id} className="p-3 border rounded-lg shadow-sm bg-gray-50">
                {course.item.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default LearningChart;
