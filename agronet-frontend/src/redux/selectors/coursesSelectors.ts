import { RootState } from "../store";
import { CoursesState, Course } from "../slices/coursesSlice";

export const selectCourses = (state: RootState): CoursesState => state.courses;
export const selectCoursesList = (state: RootState): Course[] => state.courses.courses;
export const selectCoursesLoading = (state: RootState): boolean => state.courses.loading;
export const selectCoursesError = (state: RootState): string | null => state.courses.error;