import {configureStore} from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import productsSlice from "./slices/productsSlice";
import coursesSlice from "./slices/coursesSlice";
import chatReducer from "./slices/chatSlice";
import categorySlice from "./slices/categorySlice";
import setSelectedCategory  from "./slices/selectedCategorySlice";
import cartSlice from "./slices/cartSlice";
import chatbotSlice from './slices/AIChatSlice';
import postSlice from './slices/postsSlice';
import questionSlice from './slices/questionSlice';
import commentSlice from './slices/commentSlice';
import userSlice from './slices/userSlice';
import wishlistSlice from "./slices/wishlistSlice";
import saveCourseSlice from "./slices/saveCourseSlice";
import orderSlice from "./slices/orderSlice";
import followSlice from "./slices/followSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsSlice,
    categories: categorySlice,
    selectedCategory: setSelectedCategory,
    courses: coursesSlice,
    chat: chatReducer,
    cart: cartSlice,
    chatbot: chatbotSlice,
    posts: postSlice,
    questions: questionSlice,
    comments: commentSlice,
    users: userSlice,
    wishlist: wishlistSlice,
    saveCourses: saveCourseSlice,
    orders: orderSlice,
    follow: followSlice
  },
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


