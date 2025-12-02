import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Course } from "./coursesSlice";

const baseURL = import.meta.env.VITE_BASE_URL;


// export interface CartItem extends Product {
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
//   total: number;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: CartState = {
//   items: [],
//   total: 0,
//   loading: false,
//   error: null,
// };

// 📦 New CartItem type (reflects your backend data)
export interface SavecourseItem {  
  created_time: string;
  id: number;
  item: Course; // Course lives inside 'item'
  type: string;
}

interface SavecourseState {
  items: SavecourseItem[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: SavecourseState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

// Helper to get auth token
const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("user_token") || '""');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 🔁 CRUD THUNKS
export const fetchSavecourse = createAsyncThunk<SavecourseItem[], void, { rejectValue: string }>(
  "saveCourse/fetchSaveCourse",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/learn/save/course/all/`, getAuthHeaders());
      return response.data.save_course;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// export const addCartItem = createAsyncThunk<CartItem, { product: Product; quantity: number }, { rejectValue: string }>(
//   "cart/addCartItem",
//   async ({ product, quantity }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${baseURL}/payments/cart/add/`, {
//         product: product.id,
//         quantity,
//       }, getAuthHeaders());
//       return { ...product, quantity: response.data.quantity };
//     } catch (err: any) {
//       return rejectWithValue(err.message);
//     }
//   }
// );
export const addSavecourseItem = createAsyncThunk<SavecourseItem, { course: Course; }, { rejectValue: string }>(
  "saveCourse/addSaveCourseItem",
  async ({ course }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/learn/save/course/add/`, {
        course: course.id,
      }, getAuthHeaders());

      return response.data.course; 
      // 👆 Make sure backend actually sends back the full CartItem object in response.data.cart_item
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);



export const updateCartItem = createAsyncThunk<SavecourseItem, { productId: number; quantity: number }, { rejectValue: string }>(
  "saveCourse/updateSaveCourseItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/cart/${productId}`, {
        quantity,
      }, getAuthHeaders());
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteCartItem = createAsyncThunk<number, number, { rejectValue: string }>(
  "saveCourse/deleteSaveCourseItem",
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/payments/cart/${productId}/`, getAuthHeaders());
      return productId;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// 🧠 Helper
// function calculateTotal(items: CartItem[]) {
//   return items.reduce((total, item) => total + item.price * item.quantity, 0);
// }

// function calculateTotal(items: WishlistItem[]) {
//   return items.reduce((total, cartItem) => total + (cartItem.item.price * cartItem.quantity), 0);
// }

// 🧩 Slice
const saveCourseSlice = createSlice({
  name: "saveCourse",
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🛒 Fetch Cart
      .addCase(fetchSavecourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavecourse.fulfilled, (state, action: PayloadAction<SavecourseItem[]>) => {
        state.loading = false;
        state.items = action.payload;
        // state.total = calculateTotal(action.payload);
      })
      .addCase(fetchSavecourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch saved courses";
      })

      // ➕ Add Item
      .addCase(addSavecourseItem.fulfilled, (state, action: PayloadAction<SavecourseItem>) => {
        const existing = state.items.find(item => item.id === action.payload.id);
        if (existing) {
          // existing.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
        // state.total = calculateTotal(state.items);
      })

      // 🔁 Update Quantity
      // .addCase(updateCartItem.fulfilled, (state, action: PayloadAction<WishlistItem>) => {
      //   const item = state.items.find(i => i.id === action.payload.id);
      //   if (item) {
      //     item.quantity = action.payload.quantity;
      //     state.total = calculateTotal(state.items);
      //   }
      // })

      // ❌ Delete Item
      .addCase(deleteCartItem.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(i => i.id !== action.payload);
        // state.total = calculateTotal(state.items);
      });
  },
});

export const { clearCart } = saveCourseSlice.actions;

export default saveCourseSlice.reducer;
