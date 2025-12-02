import { RootState } from "../store";
import { CategoriesState, Category } from "../slices/categorySlice";


export const selectCategories = (state: RootState): CategoriesState => state.categories;
export const selectCategoriesList = (state: RootState): Category[] => state.categories.categories;
export const selectCategoriesLoading = (state: RootState): boolean => state.categories.loading;
export const selectCategoriesError = (state: RootState): string | null => state.categories.error;