export const ModuleLessons = () => {
    const sections = [
      { title: "Introduction", duration: "03 min, 24 sec" },
      { title: "Getting Started", duration: "07 min, 55 sec" },
      { title: "The Illustration", duration: "02 min, 48 sec" },
    ];
    const totalDuration = "82 min, 40 sec";
  
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Course Lessons</h1>
        
        <div className="divide-y divide-gray-200">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="flex justify-between items-center py-4"
            >
              <span className="text-gray-700 font-medium">{section.title}</span>
              <span className="text-gray-500 text-sm">{section.duration}</span>
            </div>
          ))}
        </div>
  
        <div className="mt-6 flex justify-end">
          <span className="text-gray-600 font-medium">{totalDuration}</span>
        </div>
      </div>
    );
  };