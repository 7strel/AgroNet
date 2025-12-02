export const CourseModules = () => {
    const lessons = [
      { title: "LESSON ONE NAME", duration: "💹 13H" },
      { title: "LESSON TWO NAME", duration: "💹 13H" },
      { title: "LESSON THREE NAME", duration: "💹 13H" },
      { title: "LESSON FOUR NAME", duration: "💹 13H" },
      { title: "LESSON FIVE NAME", duration: "💹 13H" },
      { title: "LESSON SIX NAME", duration: "💹 13H" },
    ];
  
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-6 uppercase tracking-wide">
          COURSE MODULES
        </h2>
  
        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="flex justify-between items-center hover:bg-gray-50 p-3 rounded transition-colors"
            >
              <span className="text-gray-700 font-medium">{lesson.title}</span>
              <span className="text-gray-500 text-sm">{lesson.duration}</span>
            </div>
          ))}
        </div>
  
        <div className="mt-8 pt-6 border-t-2 border-gray-100">
          <div className="flex justify-between items-center p-3">
            <span className="text-gray-700 font-medium">ABOUT COURSE</span>
          </div>
        </div>
      </div>
    );
  };