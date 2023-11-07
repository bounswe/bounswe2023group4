import React from "react";
import ProfileIcon from "../../Assets/icons/ProfileIcon.jsx";
import FeedIcon from "../../Assets/icons/FeedIcon.jsx";
import VoteIcon from "../../Assets/icons/VoteIcon.jsx";
import CreateIcon from "../../Assets/icons/CreateIcon.jsx";
import ModerationIcon from "../../Assets/icons/ModerationIcon.jsx";
import LeaderboardIcon from "../../Assets/icons/LeaderboardIcon.jsx";
import NotificationsIcon from "../../Assets/icons/NotificationsIcon.jsx";
import SettingsIcon from "../../Assets/icons/SettingsIcon.jsx";
import { ReactComponent as Logo } from "../../Assets/Logo.svg";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import  logout  from "../../api/requests/logout.jsx";


const menuData = [
  { key: "Profile", Icon: ProfileIcon },
  { key: "Feed", Icon: FeedIcon },
  { key: "Vote", Icon: VoteIcon },
  { key: "Create", Icon: CreateIcon },
  { key: "Moderation", Icon: ModerationIcon },
  { key: "Leaderboard", Icon: LeaderboardIcon },
  { key: "Notifications", Icon: NotificationsIcon },
  { key: "Settings", Icon: SettingsIcon },
];

const SidebarMenuItem = ({
  currentPage,
  pageKey,
  Icon,
  label,
  navigate,
  to,
}) => {
  

  const isSelected = currentPage === pageKey;
  return (
    <div
      key={pageKey}
      className={`${styles.menuItem} ${
        isSelected ? styles.selectedMenuItem : ""
      }`}
      onClick={() => navigate(to)}
    >
      {Icon && (
        <Icon width={40} height={40} />
      )}
      <p className={styles.etxt}>{label || pageKey}</p>
    </div>
  );
};

const Sidebar = ({ currentPage, handlePageChange }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken'); 
    const isLoggedOut = await logout(refreshToken);
    if (isLoggedOut) {
      navigate("/auth/sign-in");
    }
  };

  return (
    <div className={styles.sidebar}>
      <Logo className={styles.logo} />
      {menuData.map((item) => (
        <SidebarMenuItem
          key={item.key}
          currentPage={currentPage}
          pageKey={item.key}
          Icon={item.Icon}
          navigate={navigate}
          to={`/${item.key.toLowerCase()}`}
        />
      ))}
      <button className={styles.logoutButton} onClick={handleLogout}>LOGOUT </button>
    </div>
  );
};

export default Sidebar;