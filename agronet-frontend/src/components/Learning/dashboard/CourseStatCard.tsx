




const CourseStatCard = () => {
    return(
        <>
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6 mt-4">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-3xl font-bold">11</h2>
            <p className="text-gray-600">Courses completed</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-3xl font-bold">4</h2>
            <p className="text-gray-600">Courses in progress</p>
          </div>
        </div>
        </>
    );
}



export default CourseStatCard;