import React from "react";
interface CourseDescriptionProps {
  title: string;
  description: string;
}



const CourseDescription: React.FC<CourseDescriptionProps> = ({title, description}) => {
  return (
    <div className="max-w-2xl mt-4 mb-4 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 uppercase tracking-wide">
          {title}
        </h2>
      <p className="text-gray-700">
        {description}
      </p>

    </div>
  );
};

export default CourseDescription;