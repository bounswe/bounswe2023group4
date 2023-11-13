import React from "react";
import styles from "./PollOption.module.css";

function PollOption({ widthPercentage, isSelected, navigate, option, index, arrayLength , selectOption}) {
  const updatePollColor = ()=>{
    selectOption(Array.from({length : arrayLength}, (_, i) => i == index? true: false));
  };
  return (
    <div className={isSelected == true? styles.selectedOptionText: styles.optionText} onClick={updatePollColor}>
      <div
        className={isSelected == true?styles.selectedBackgroundDiv :styles.backgroundDiv}
        style={{ width: `${widthPercentage}%` }}
      ></div>
      <div className={styles.textDiv}>{option.title}</div>
      <div className={styles.optionPoints}>
        <p>{option.votes}</p>
      </div>
    </div>
  );
}

export default PollOption;
