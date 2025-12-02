import CourseList from "../../components/Learning/CourseList";
import Sidebar from "../../components/Learning/Sidebar";
import CourseStatCard from "../../components/Learning/dashboard/CourseStatCard";
import LearnNav from "../../components/Learning/dashboard/LearnNav";
import SearchBar from "../../components/Learning/dashboard/SearchBar";
import CourseProgress from "../../components/Learning/dashboard/CourseProgress";

const CoursesPage = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar - Fixed Width */}
            <div className="w-64 bg-gray-200">
                <Sidebar />
            </div>
    
            {/* Dashboard - Takes Remaining Space */}
            <div className="flex-1 bg-white px-25">
                <div className="flex justify-end w-full">
                    <LearnNav />
                </div>
            
                <CourseStatCard />
                <div className="flex items-center justify-between w-full">
                    <div className="flex-1">
                        <SearchBar />
                    </div>
                    <div className="flex-1">
                        <CourseProgress />
                    </div>
                    
                </div>
                <CourseList />
            </div>
            {/* Dashboard - Takes Remaining Space
            <div className="flex-1 bg-white">
            <DashboardStats />
            </div> */}
      </div>
    );
}


export default CoursesPage;