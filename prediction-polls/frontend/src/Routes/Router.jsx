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

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PrivateRoute><Home /></PrivateRoute>
        } />
        <Route path="/home" element={
          <PrivateRoute><Home /></PrivateRoute>
        } />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/feed" element={
          <Feed />
        } />
        <Route path="/create" element={
          <PrivateRoute><Create /></PrivateRoute>
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
        <Route path="/profile" element={
          <PrivateRoute><Profile /></PrivateRoute>
        } />
        <Route path="/settings" element={
          <PrivateRoute><Settings /></PrivateRoute>
        } />
        <Route path="/vote/:id" element={
          //<PrivateRoute><Vote /></PrivateRoute>
          <Vote/>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
