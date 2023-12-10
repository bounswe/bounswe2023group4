import React, { useEffect } from "react";
import styles from "./PollOption.module.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function PollOption({
  widthPercentage,
  isSelected,
  id,
  option,
  index,
  arrayLength,
  selectOption,
  page,
  pollID
}) {
  const updatePollColor = () => {
    selectOption(
      Array.from({ length: arrayLength }, (_, i) => (i == index ? true : false))
    );
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [isVotePath, setIsVotePath] = React.useState(
    /^\/vote\//.test(location.pathname)
  );

  useEffect(() => {
    setIsVotePath(/^\/vote\//.test(location.pathname));
  }, [location.pathname]);

  const clickHandle = () => {
    navigate("/vote/" + id);
  };

  return (
    <div
      className={
        isSelected == true ? styles.selectedOptionText : styles.optionText
      }
      onClick={() => (isVotePath ? updatePollColor() : clickHandle())}
    >
      <div
        className={
          isSelected == true
            ? styles.selectedBackgroundDiv
            : styles.backgroundDiv
        }
        style={{ width: `${widthPercentage}%` }}
      ></div>
      <div
        className={styles.textDiv}><p name={`annotatable_Text${pollID}`}>{option.choice_text}</p></div>
      {option.voter_count == null ? <div className={styles.optionPoints_hidden}>
        <p>{"1"}</p>
      </div> : <div className={styles.optionPoints}>
        <p>{option.voter_count}</p>
      </div>}

    </div>
  );
}

export default PollOption;
