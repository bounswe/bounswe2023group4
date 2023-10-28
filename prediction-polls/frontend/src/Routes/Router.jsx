import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import SignIn from "../Pages/Auth/SignIn";
import SignUp from "../Pages/Auth/SignUp";
import Feed from "../Pages/Feed";
import Create from "../Pages/Create";
import Leaderboard from "../Pages/Leaderboard";
import Moderation from "../Pages/Moderation";
import Notifications from "../Pages/Notifications";
import Profile from "../Pages/Profile";
import Settings from "../Pages/Settings";
import Vote from "../Pages/Vote";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/create" element={<Create />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/moderation" element={<Moderation />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/vote" element={<Vote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
