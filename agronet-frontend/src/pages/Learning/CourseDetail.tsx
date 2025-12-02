import TutorCard from "../../components/Learning/course-detail/TutorCard";
import CourseDescription from "../../components/Learning/course-detail/CourseDescription";
import { ModuleLessons} from "../../components/Learning/course-detail/ModuleLessons";
import { CourseModules } from "../../components/Learning/course-detail/CourseModules";
import CourseAchievements from "../../components/Learning/course-detail/CourseAchievements";
import { CourseFeatures } from "../../components/Learning/course-detail/CourseFeatures";
import Sidebar from "../../components/Learning/Sidebar";
import { useAppSelector } from "../../redux/hooks/hooks";



const CourseDetail = () => {
    const course = useAppSelector((state) => state.courses.selectedCourse)
  
    if (!course) return <p>No product selected.</p>
    return (
      <div className="flex h-screen">
        {/* Sidebar - Fixed Width */}
        <div className="w-64 bg-gray-200">
          <Sidebar />
        </div>
  
        {/* Dashboard - Takes Remaining Space */}
        <div className="flex-1 bg-white">
            <div className="p-6 max-w-3xl mx-auto">
      
                <TutorCard   name={course.instructor.email} role="Course Tutor" imageUrl={course.avatar} course={course}/>
                <CourseDescription title={course.title} description={course.description}/>
                <CourseAchievements />
                <CourseFeatures />
            </div>
        </div>
        {/* Dashboard - Takes Remaining Space */}
        <div className="flex-1 bg-white">
          {/* <DashboardStats /> */}
          <CourseModules />
          <ModuleLessons />
        </div>
      </div>
    );
  };
  
  export default CourseDetail;