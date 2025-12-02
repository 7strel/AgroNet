export const CourseFeatures = () => {
    const features = [
      { label: "Duration", value: "3 hrs" },
      { label: "Lessons", value: "12" },
      { label: "Quizzes", value: "4" },
      { label: "Time Frame", value: "20 days" },
      { label: "Enrollments", value: "55" },
      { label: "Max Retakes", value: "2" },
    ];
  
    return (
      <div className="max-w-2xl mt-4 mb-4 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-6 uppercase tracking-wide">
          Course Features
        </h2>
  
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded"
            >
              <span className="text-gray-600 font-medium">{feature.label}</span>
              <span className="text-gray-800 font-semibold">{feature.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };