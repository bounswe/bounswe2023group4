import React, { useEffect } from "react";
import ProfileIcon from "../../Assets/icons/ProfileIcon.jsx";
import FeedIcon from "../../Assets/icons/FeedIcon.jsx";
import VoteIcon from "../../Assets/icons/VoteIcon.jsx";
import CreateIcon from "../../Assets/icons/CreateIcon.jsx";
import ModerationIcon from "../../Assets/icons/ModerationIcon.jsx";
import LeaderboardIcon from "../../Assets/icons/LeaderboardIcon.jsx";
import NotificationsIcon from "../../Assets/icons/NotificationsIcon.jsx";
import SettingsIcon from "../../Assets/icons/SettingsIcon.jsx";
import { ReactComponent as Logo } from "../../Assets/RectNewLogo.svg";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import logout from "../../api/requests/logout.jsx";
import { Link } from "react-router-dom";

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
    <Link
      key={pageKey}
      className={`${styles.menuItem} ${
        isSelected ? styles.selectedMenuItem : ""
      }`}
      to={to}
    >
      {Icon && <Icon width={40} height={40} />}
      <p className={styles.etxt}>{label || pageKey}</p>
    </Link>
  );
};

const Sidebar = ({ currentPage, handlePageChange }) => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState(
    localStorage.getItem("username")
  );
  const [profileLink, setProfileLink] = React.useState("auth/sign-in");

  useEffect(() => {
    const username = localStorage.getItem("username");
    setUsername(username);
  }, []);

  useEffect(() => {
    const link = username == null ? "auth/sign-in" : `profile/${username}`;
    setProfileLink(link);
  }, [username]);

  const menuData = [
    { key: "Profile", Icon: ProfileIcon, to: profileLink },
    { key: "Feed", Icon: FeedIcon, to: "feed" },
    { key: "Vote", Icon: VoteIcon, to: "vote" },
    { key: "Create", Icon: CreateIcon, to: "create" },
    { key: "Moderation", Icon: ModerationIcon, to: "moderation" },
    { key: "Leaderboard", Icon: LeaderboardIcon, to: "leaderboard" },
   // { key: "Notifications", Icon: NotificationsIcon, to: "notifications" },
     //{ key: "Settings", Icon: SettingsIcon, to: "settings" },
  ];

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const isLoggedOut = await logout(refreshToken);
    if (isLoggedOut) {
      navigate("/auth/sign-in");
    }
  };

  const handleLogin = () => {
    navigate("/auth/sign-in");
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
          to={`/${item.to}`}
        />
      ))}
      {username == null ? 
      <button className={styles.loginButton} onClick={handleLogin}>
      LOGIN
    </button> : 
      <button className={styles.logoutButton} onClick={handleLogout}>
      LOGOUT{" "}
    </button>
      }
    </div>
  );
};

export default Sidebar;
