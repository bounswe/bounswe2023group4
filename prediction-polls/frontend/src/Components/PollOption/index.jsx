import React from "react";
import styles from "./PollOption.module.css";

function PollOption({ widthPercentage, navigate, option, index }) {
  return (
    <div className={styles.option} key={index}>
      <div className={styles.optionText} onClick={() => navigate("/vote")}>
        <div
          className={styles.backgroundDiv}
          style={{ width: `${widthPercentage}%` }}
        ></div>
        <div className={styles.textDiv}>{option.title}</div>
      </div>
      <div className={styles.optionPoints}>
        <p>{option.votes}</p>
      </div>
    </div>
  );
}

export default PollOption;
