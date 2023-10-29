import styles from "./Icon.module.css";
const FeedIcon = ({width, height }) => (
  <svg
    width={width ?? "50"}
    height={height ?? "50"}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
    className={styles.iconStroke}
      d="M41.6667 35.4169V23.8587C41.6667 22.7455 41.6658 22.1886 41.5304 21.6706C41.4104 21.2115 41.2135 20.7771 40.9471 20.3845C40.6464 19.9416 40.2283 19.5742 39.3905 18.8412L29.3905 10.0912C27.8351 8.73017 27.0573 8.05001 26.1821 7.79117C25.4109 7.5631 24.5888 7.5631 23.8176 7.79117C22.943 8.04982 22.1664 8.72933 20.6133 10.0883L10.61 18.8412C9.77221 19.5742 9.35429 19.9416 9.05359 20.3845C8.78711 20.7771 8.58868 21.2115 8.46873 21.6706C8.33337 22.1886 8.33337 22.7455 8.33337 23.8587V35.4169C8.33337 37.3583 8.33337 38.3287 8.65054 39.0944C9.07343 40.1153 9.88404 40.9274 10.905 41.3503C11.6707 41.6675 12.6414 41.6675 14.5828 41.6675C16.5243 41.6675 17.496 41.6675 18.2618 41.3503C19.2827 40.9274 20.0931 40.1155 20.516 39.0946C20.8332 38.3288 20.8334 37.3581 20.8334 35.4167V33.3334C20.8334 31.0322 22.6989 29.1667 25 29.1667C27.3012 29.1667 29.1667 31.0322 29.1667 33.3334V35.4167C29.1667 37.3581 29.1667 38.3288 29.4839 39.0946C29.9068 40.1155 30.7174 40.9274 31.7383 41.3503C32.504 41.6675 33.4747 41.6675 35.4162 41.6675C37.3576 41.6675 38.3294 41.6675 39.0951 41.3503C40.116 40.9274 40.9264 40.1153 41.3493 39.0944C41.6665 38.3287 41.6667 37.3583 41.6667 35.4169Z"
      stroke="#464B4F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default FeedIcon;
