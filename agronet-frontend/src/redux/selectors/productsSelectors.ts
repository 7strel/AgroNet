import { RootState } from "../store";
import { ProductsState, Product } from "../slices/productsSlice";

export const selectProducts = (state: RootState): ProductsState => state.products;
export const selectProductsList = (state: RootState): Product[] => state.products.products;
export const selectProductsLoading = (state: RootState): boolean => state.products.loading;
export const selectProductsError = (state: RootState): string | null => state.products.error;


// Product Details
// export const selectedProduct = (state: RootState): string | null => state.products.selectedProduct;

// export const selectProductsByCategory = (categoryName: string) => (state: RootState) =>
//     state.products.products.filter(product => product.category.title === categoryName);