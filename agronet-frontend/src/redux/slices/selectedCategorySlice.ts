import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; 

interface SelectedCategoryState {
  selectedCategoryId: number | null;
}

const initialState: SelectedCategoryState = {
  selectedCategoryId: null, 
};

const selectedCategorySlice = createSlice({
  name: "selectedCategory",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategoryId = action.payload;
    },
  },
});

export const { setSelectedCategory } = selectedCategorySlice.actions;

// Selector to get the selected category ID
export const selectSelectedCategoryId = (state: RootState) => state.selectedCategory.selectedCategoryId;

export default selectedCategorySlice.reducer;
