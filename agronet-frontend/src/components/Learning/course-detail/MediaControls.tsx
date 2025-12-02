export const MediaControls = () => {
    return (
      <div className="max-w-3xl mx-auto p-4 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          {/* Back button */}
          <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
            <span className="text-base font-medium">Back</span>
          </button>
  
          {/* Time display */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 text-sm font-medium">01:54</span>
            <span className="text-gray-400 text-sm">/</span>
            <span className="text-gray-400 text-sm">09:35</span>
          </div>
        </div>
      </div>
    );
  };