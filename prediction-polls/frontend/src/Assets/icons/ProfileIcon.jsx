import styles from "./Icon.module.css";
const ProfileIcon = ({ width, height }) => (
  <svg
    width={width ?? "50"}
    height={height ?? "50"}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={styles.iconStroke}
      d="M41.6667 43.75C41.6667 37.997 34.2048 33.3333 25 33.3333C15.7953 33.3333 8.33337 37.997 8.33337 43.75M25 27.0833C19.2471 27.0833 14.5834 22.4196 14.5834 16.6667C14.5834 10.9137 19.2471 6.25 25 6.25C30.753 6.25 35.4167 10.9137 35.4167 16.6667C35.4167 22.4196 30.753 27.0833 25 27.0833Z"
      stroke="#464B4F"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
export default ProfileIcon;
