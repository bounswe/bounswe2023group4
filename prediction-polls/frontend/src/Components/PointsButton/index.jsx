import React, { useState } from "react";
import styles from "./PointsButton.module.css";
import { ReactComponent as ArrowDown } from "../../Assets/icons/ArrowDown.svg";
import { ReactComponent as ArrowUp } from "../../Assets/icons/ArrowUp.svg";

function PointsButton({ points }) {
  const [isOpen, setIsOpen] = useState(false);

  const GPValue = points.find((point) => "GP" in point).GP; 

  return (
    <div className={styles.pointsContainer}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.pointsButton}
      >
        {GPValue} GP <span>{isOpen ? <ArrowUp className={styles.iconStyle}/> : <ArrowDown className={styles.iconStyle}/>}</span>
      </button>
      {isOpen && (
        <div className={styles.pointsList}>
          {points.slice(1).map((point, index) => {
            const [category, value] = Object.entries(point)[0]; 
            return (
              <div className={styles.point} key={index}>
                {category}: {value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PointsButton;
