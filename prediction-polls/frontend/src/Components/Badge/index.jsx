import React from "react";
import styles from "./Badge.module.css";

function Badge({ number, text }) {
  let badgeClass = styles.badge;
  
  if (number === 1) {
    badgeClass = `${styles.badge} ${styles.gold}`;
  }
  else if (number === 2) {
    badgeClass = `${styles.badge} ${styles.silver}`;
  } else if (number === 3) {
    badgeClass = `${styles.badge} ${styles.bronze}`;
  }
  
  return (
    <div className={badgeClass}>
      <p className={styles.badgeText}>{number}</p>
      <p className={styles.badgeText}>{text}</p>
    </div>
  );
}

export default Badge;
