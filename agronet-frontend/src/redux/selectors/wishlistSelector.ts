import { RootState } from "../store"; // Adjust path based on your project structure

export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export const selectWishlistTotal = (state: RootState) => state.wishlist.total;
export const selectWishlistLoading = (state: RootState) => state.wishlist.loading;
export const selectWishlistError = (state: RootState) => state.wishlist.error;
