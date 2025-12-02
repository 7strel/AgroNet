import { RootState } from "../store"; // Adjust path based on your project structure

export const selectSaveCourseItems = (state: RootState) => state.saveCourses.items;
export const selectSaveCourseTotal = (state: RootState) => state.saveCourses.total;
export const selectSaveCourseLoading = (state: RootState) => state.saveCourses.loading;
export const selectSaveCourseError = (state: RootState) => state.saveCourses.error; 