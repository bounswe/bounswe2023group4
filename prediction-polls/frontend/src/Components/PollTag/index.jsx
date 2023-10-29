import React from "react";
import styles from "./PollTag.module.css";

function PollTag({ TagName }) {
  return <div className={styles.pollTag}>{TagName}</div>;
}

export default PollTag;
