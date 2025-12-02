import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from 'react-redux';
import {store} from "./redux/store.ts";

import './index.css'
import App from './App.tsx'
import Learning from './pages/Learning/Learning.tsx';
import AI from './pages/AI/AI.tsx';
import Community from './pages/Community/Community.tsx';
import Marketplace from './pages/Marketplace/Marketplace.tsx';
import SignIn from './pages/Auth/SignIn.tsx';
import Signup from './pages/Auth/Signup.tsx';
import CoursesPage from './pages/Learning/CoursesPage.tsx';
import Mail from './pages/Learning/Mail.tsx';
import CommunityChat from './pages/Community/CommunityChat.tsx';
import ProfilePage from './pages/Learning/ProfilePage.tsx';
import MarketProfilePage from './pages/Marketplace/MarketProfilePage.tsx';
import CommunityProfilePage from './pages/Community/CommunityProfilePage.tsx';
import CartPage from './pages/Marketplace/CartPage.tsx';
import WishlistPage from './pages/Marketplace/WishlistPage.tsx';
import ForgotPassword from './pages/Auth/ForgotPassword.tsx';
import ProductDetailPage from './pages/Marketplace/ProductDetailPage.tsx';
import PrivateRoute from './components/Auth/PrivateRoute.tsx';
import CourseDetail from './pages/Learning/CourseDetail.tsx';
import PostDetailPage from './pages/Community/PostDetailPage.tsx';
import UserListPage from './pages/Community/UserListPage.tsx';
import RecentAndNewestPage from './pages/Community/RecentAndNewestPage.tsx';
import AIProfilePage from './pages/AI/AIProfilePage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        
        
        {/* Authentication Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/forgot' element={<ForgotPassword/>} />

        {/*Artificial Intelligence Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/ai" element={<AI />} />
          <Route path="/ai/profile" element={<AIProfilePage />} />
        </Route>

        {/*Marketplace Routes*/}
        <Route element={<PrivateRoute />}>
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketprofile" element={<MarketProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Route>

        {/*Learning Routes*/}
        <Route element={<PrivateRoute />}>
          <Route path="/learning" element={<Learning />} />
          <Route path='/courses' element={<CoursesPage />} />
          <Route path='/mail' element={<Mail />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/course/:id' element={<CourseDetail />} />
        </Route>

        {/*Community Routes*/}
        <Route element={<PrivateRoute />}>
          <Route path="/community" element={<Community />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path='/community-chat' element={<CommunityChat />}/>
          <Route path='/communityprofile' element={<CommunityProfilePage />}/>
          <Route path='/users' element={<UserListPage />} />
          <Route path='/recent/newest' element={<RecentAndNewestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
