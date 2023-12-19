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
  clickTextFunction
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

  const optionHTML = `<p>${option.choice_text}</p>`;
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
        dangerouslySetInnerHTML={{ __html: optionHTML }}
        className={styles.textDiv}
        onClick={clickTextFunction}></div>
      {option.voter_count == null ? <div className={styles.optionPoints_hidden}>
        <p>{"1"}</p>
      </div> : <div className={styles.optionPoints}>
        <p>{option.voter_count}</p>
      </div>}

    </div>
  );
}

export default PollOption;
