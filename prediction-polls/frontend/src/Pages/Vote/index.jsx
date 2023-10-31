import React from "react";
import Menu from "../../Components/Menu";
import styles from "./Vote.module.css";

function Vote() {
  return (
    <div className={styles.page}>
      <Menu currentPage="Vote" />
      <h1>Vote Page</h1>
    </div>
  );
}

export default Vote;
