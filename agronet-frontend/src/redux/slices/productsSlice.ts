import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "./store";
import axios from "axios";


const baseURL = import.meta.env.VITE_BASE_URL;

// Define Product type
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  images: string;
  category: number[];
}

// Define the state type
export interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};



// Async thunk to fetch products
export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("user_token") || '""');
      const response = await axios.get(`${baseURL}/marketplace/products/`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the request
        },        
      });
      return response.data.products;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async  (id: number) => {
    try {
      const token = JSON.parse(localStorage.getItem("user_token") || '""');
      const response = await axios.get(`${baseURL}/marketplace/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the request
        },        
      });
      return response.data.products;
    } catch (error: any) {
      return error.message;
    }
  }
);



// Slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      }) 
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string  || "Failed to fetch product";
      });
  },
});


export const { setSelectedProduct } = productsSlice.actions

export default productsSlice.reducer;



