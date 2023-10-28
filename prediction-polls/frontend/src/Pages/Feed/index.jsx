import React from "react";
import Menu from "../../Components/Menu";
import styles from "./Feed.module.css";

function Feed() {
  return (
    <div className={styles.page}>
      <Menu currentPage="Feed" />
      <h1>Feed Page</h1>
    </div>
  );
}

export default Feed;
