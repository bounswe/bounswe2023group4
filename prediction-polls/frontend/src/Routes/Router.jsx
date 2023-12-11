import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import SignIn from '../Pages/Auth/SignIn';
import SignUp from '../Pages/Auth/SignUp';
import Feed from '../Pages/Feed';
import Create from '../Pages/Create';
import Leaderboard from '../Pages/Leaderboard';
import Moderation from '../Pages/Moderation';
import Notifications from '../Pages/Notifications';
import Profile from '../Pages/Profile';
import Settings from '../Pages/Settings';
import Vote from '../Pages/Vote';
import PrivateRoute from '../Components/PrivateRoute';
import GoogleLogin from '../Pages/Auth/Google'
import EditProfile from '../Pages/EditProfile';
import ForgotPassword from '../Pages/Auth/ForgotPassword/ForgotPassword';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PrivateRoute><Home /></PrivateRoute>
        } />
        <Route path="/home" element={
          <Home />
        } />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/feed" element={
          <Feed />
        } />
        <Route path="/googleAuth" element={
          <GoogleLogin />
        } />
        <Route path="/create" element={
          <Create />
          //<PrivateRoute><Create /></PrivateRoute>
        } />
        <Route path="/leaderboard" element={
          <PrivateRoute><Leaderboard /></PrivateRoute>
        } />
        <Route path="/moderation" element={
          <PrivateRoute><Moderation /></PrivateRoute>
        } />
        <Route path="/notifications" element={
          <PrivateRoute><Notifications /></PrivateRoute>
        } />
        <Route path="/profile/:username" element={
         <Profile />
        } />
        <Route path="/settings" element={
          <PrivateRoute><Settings /></PrivateRoute>
        } />
        <Route path="/vote/:id" element={
          //<PrivateRoute><Vote /></PrivateRoute>
          <Vote/>
        } />
        <Route path="/editProfile/:username" element={
          //<PrivateRoute><EditProfile/></PrivateRoute>
          <EditProfile/>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
