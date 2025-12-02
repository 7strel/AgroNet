import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export interface Order {
  id: string;
  street: string;
  city: string;
  zip_code: string;
  country: string;
  phone_no: string;
  payment_mode: string;
  total_amount: number;
  order_items: any;
  card_name?: string;
  card_number?: string;
  expiry_date?: string;
  cvv?: string;
}


interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

// Helper function to get token
const getAuthToken = () => JSON.parse(localStorage.getItem('user_token') || '""');

// Fetch Orders
export const fetchOrders = createAsyncThunk<Order[], void, { rejectValue: string }>(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${baseURL}/orders/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create Order
export const createOrder = createAsyncThunk<Order, Omit<Order, 'id'>, { rejectValue: string }>(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(`${baseURL}/payments/orders/new/`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Order
export const updateOrder = createAsyncThunk<Order, Order, { rejectValue: string }>(
  'orders/updateOrder',
  async (order, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(`${baseURL}/orders/${order.id}/`, order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Order
export const deleteOrder = createAsyncThunk<string, string, { rejectValue: string }>(
  'orders/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      await axios.delete(`${baseURL}/orders/${orderId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return orderId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setSelectedOrder(state, action: PayloadAction<Order>) {
      state.selectedOrder = action.payload;
    },
    clearSelectedOrder(state) {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch orders';
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.orders.unshift(action.payload);
      })
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
      })
      .addCase(deleteOrder.fulfilled, (state, action: PayloadAction<string>) => {
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      });
  },
});

export const { setSelectedOrder, clearSelectedOrder } = orderSlice.actions;

export default orderSlice.reducer;
