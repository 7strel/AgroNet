import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "./productsSlice";

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
export interface WishlistItem {  
  created_time: string;
  id: number;
  item: Product; // Product lives inside 'item'
  type: string;
}

interface WishlistState {
  items: WishlistItem[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
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
export const fetchWishlist = createAsyncThunk<WishlistItem[], void, { rejectValue: string }>(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/payments/wishlist/all/`, getAuthHeaders());
      return response.data.wishlist;
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
export const addWishlistItem = createAsyncThunk<WishlistItem, { product: Product; }, { rejectValue: string }>(
  "wishlist/addWishlistItem",
  async ({ product }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/payments/wishlist/add/`, {
        product: product.id,
      }, getAuthHeaders());

      return response.data.cart_item; 
      // 👆 Make sure backend actually sends back the full CartItem object in response.data.cart_item
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);



export const updateCartItem = createAsyncThunk<WishlistItem, { productId: number; quantity: number }, { rejectValue: string }>(
  "cart/updateCartItem",
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
  "cart/deleteCartItem",
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
const wishlistSlice = createSlice({
  name: "wishlist",
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
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action: PayloadAction<WishlistItem[]>) => {
        state.loading = false;
        state.items = action.payload;
        // state.total = calculateTotal(action.payload);
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cart";
      })

      // ➕ Add Item
      .addCase(addWishlistItem.fulfilled, (state, action: PayloadAction<WishlistItem>) => {
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

export const { clearCart } = wishlistSlice.actions;

export default wishlistSlice.reducer;
