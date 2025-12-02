'use client';
import React, { useEffect} from "react";
import { Card, CardContent } from "@mui/material";
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchCourses, setSelectedCourse } from "../../redux/slices/coursesSlice";
import { selectCoursesList, selectCoursesLoading, selectCoursesError } from "../../redux/selectors/coursesSelectors"; 
import { AppDispatch } from "../../redux/store";
import { useDispatch } from 'react-redux';


const CourseList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>(); 
    const courses = useSelector(selectCoursesList); // Get products from Redux state
    const isLoading = useSelector(selectCoursesLoading); // Check if loading
    const error = useSelector(selectCoursesError); // Check for errors 
    const navigate = useNavigate();



    const handleViewDetails = (course:any, id:any) => {
        dispatch(setSelectedCourse(course))
        navigate(`/course/${id}`)
    }
    

        // **Fetch products when component mounts**
    useEffect(() => {
      dispatch(fetchCourses());
    }, [dispatch]);

    console.log(courses);

    if (isLoading) {
        return <p className="text-center text-white-500">Loading products...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }





    return(
    <>
    <h2 className="text-xl font-bold my-4">Courses</h2>
    <div>
      {courses.map((course, index) => (
        <Card key={index} className="mb-4 flex items-center p-4">
          <img src={course.avatar} alt={course.title} className="w-10 h-10 mr-4" />
          <CardContent className="flex-1">
            <h3 className="font-bold">{course.title}</h3>
            <p className="text-sm text-gray-600">by {course.instructor.email}</p>
          </CardContent>
          <div className="flex items-center text-gray-600">
            <AccessAlarmOutlinedIcon className="mr-1" />
            {/* {course.duration} */}
          </div>
          <div className="flex items-center ml-4 text-gray-600">
            <LocalFireDepartmentOutlinedIcon className="mr-1 text-red-500" />
            {/* {course.rating} */}
          </div>
          <div className="flex items-center ml-4 text-gray-600">
            <AddCardOutlinedIcon className="mr-1 text-teal-600" />
            {course.price}
          </div>
            <button
              className="mt-2 bg-black text-white px-4 py-2 rounded-lg cursor-pointer ml-4"
              onClick={() => handleViewDetails(course, course.id)}
            
            >View course</button>
        </Card>
      ))}
    </div>
    </> 
    );      
}


export default CourseList;