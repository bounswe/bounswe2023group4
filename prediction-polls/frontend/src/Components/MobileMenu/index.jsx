import React, { useState } from "react";
import styles from "./MobileMenu.module.css";
import { MenuOutlined, RightOutlined } from "@ant-design/icons";
import ProfileIcon from "../../Assets/icons/ProfileIcon.jsx";
import FeedIcon from "../../Assets/icons/FeedIcon.jsx";
import VoteIcon from "../../Assets/icons/VoteIcon.jsx";
import CreateIcon from "../../Assets/icons/CreateIcon.jsx";
import ModerationIcon from "../../Assets/icons/ModerationIcon.jsx";
import LeaderboardIcon from "../../Assets/icons/LeaderboardIcon.jsx";
import NotificationsIcon from "../../Assets/icons/NotificationsIcon.jsx";
import SettingsIcon from "../../Assets/icons/SettingsIcon.jsx";
import { ReactComponent as Logo } from "../../Assets/Logo.svg";
import { useNavigate } from "react-router-dom";

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

const MobileMenuItem = ({ pageKey, Icon, label, navigate, to, theme }) => {
  return (
    <div key={pageKey} className={styles.menuItem} onClick={() => navigate(to)}>
      {Icon && (
        <Icon width={30} height={30} />
      )}
      {label || pageKey}
    </div>
  );
};

const MobileMenu = () => {
  const [menuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <>
      {!menuActive && (
        <MenuOutlined
          className={styles.mobileMenuButton}
          onClick={toggleMenu}
        />
      )}
      {menuActive && (
        <div className={styles.wrapper} onClick={() => setMenuActive(false)}>
          <div
            className={styles.mobileMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <Logo className={styles.logo} />
            <button className={styles.point}>
              <p>335 GP </p>
              <RightOutlined />
            </button>
            {menuData.map((item) => (
              <MobileMenuItem
                key={item.key}
                pageKey={item.key}
                Icon={item.Icon}
                navigate={navigate}
                to={`/${item.key.toLowerCase()}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
