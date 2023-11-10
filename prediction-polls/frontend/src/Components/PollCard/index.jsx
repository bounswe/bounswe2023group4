import React from "react";
import styles from "./PollCard.module.css";
import PollTag from "../PollTag";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CommentIcon } from "../../Assets/icons/Comment.svg";
import { ReactComponent as ShareIcon } from "../../Assets/icons/Share.svg";
import { ReactComponent as ReportIcon } from "../../Assets/icons/Warning.svg";
import PollOption from "../PollOption";

function PollCard({ PollData }) {
  const [selectedArray, setSelectedArray] = React.useState(!PollData.isCustomPoll? Array(PollData['options'].length).fill(false): []);
  const [pollData, setPollData] = React.useState(JSON.parse(JSON.stringify(PollData)));
  var totalPoints = !PollData.isCustomPoll
    ? PollData.options.reduce((acc, curr) => acc + curr.votes, 0)
    : 0;
  const handleSelect = (newList) => {
    setSelectedArray(newList);
    var newPoll = JSON.parse(JSON.stringify(PollData));
    for (let i = 0; i < PollData['options'].length; i++) {
      if (newList[i] == true){
        newPoll['options'][i]['votes'] =  newPoll['options'][i]['votes'] + 1;
        break;
      }
    } 
    setPollData(JSON.parse(JSON.stringify(newPoll)));
    totalPoints = !PollData.isCustomPoll
    ? PollData.options.reduce((acc, curr) => acc + curr.votes, 0)
    : 0;
  };
  const navigate = useNavigate();
  const clickHandle = (e)=>{
    e.preventDefault();
    navigate("/vote/"+pollData.id);
  }
  return (
    <div className={styles.card} onClick={clickHandle}>
      <div className={styles.question}>
        <div className={styles.tags}>
          {pollData.tags.map((tag, index) => (
            <PollTag TagName={tag} key={index} />
          ))}
        </div>
        <div className={styles.questionPoints}>
          <div className={styles.question}>
            <p>{pollData.question}</p>
          </div>

        </div>
        {!pollData.isCustomPoll ? (
          <div className={styles.optionList}>
            {pollData.options.map((option, index) => {
              const widthPercentage = (option.votes / totalPoints) * 100;
              return (
                <PollOption
                  widthPercentage={widthPercentage}
                  navigate={navigate}
                  option={option}
                  isSelected={selectedArray[index]}
                  index={index}
                  arrayLength={PollData['options'].length}
                  key={index}
                  selectOption={handleSelect}
                />
              );
            })}
          </div>
        ) : (
          <div className={styles.customOptionWrapper}>
            <p className={styles.customOptionText}>
              Enter a {PollData.optionType}
            </p>
            <input
              className={styles.customOption}
              type={PollData.optionType}
              onClick={() => navigate("/vote")}
            ></input>
          </div>
        )}
        <div className={styles.actionButtons}>
          <div className={styles.buttonWrapper}>
            <button className={styles.commentButton}>
              <CommentIcon /> Comments
            </button>
            <span className={styles.commentCount}>
              {`${PollData.comments.length} comment${PollData.comments.length > 1 ? "s" : ""
                }`}
            </span>
          </div>

          <div className={styles.buttonWrapper}>
            <button className={styles.shareButton}>
              <ShareIcon /> Share
            </button>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.reportButton}>
              <ReportIcon />
              Report
            </button>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.creator}>
          <img
            src={PollData.creatorImage}
            alt="user"
            className={styles.creatorImage}
          />
          <div className={styles.creatorName}>{PollData.creatorName}</div>
        </div>
        <div className={styles.textGroup}>
          <p className={styles.textDescription}>Closing In</p>
          <p className={styles.textDetail}>{PollData.closingDate}</p>
        </div>
        <div className={styles.textGroup}>
          <p className={styles.textDescription}>Reject Votes In</p>
          <p className={styles.textDetail}>Last {PollData.rejectVotes}</p>
        </div>
      </div>
    </div>
  );
}

export default PollCard;
