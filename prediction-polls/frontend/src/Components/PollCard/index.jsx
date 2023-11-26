import React from "react";
import styles from "./PollCard.module.css";
import PollTag from "../PollTag";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CommentIcon } from "../../Assets/icons/Comment.svg";
import { ReactComponent as ShareIcon } from "../../Assets/icons/Share.svg";
import { ReactComponent as ReportIcon } from "../../Assets/icons/Warning.svg";
import PollOption from "../PollOption";
import { Input,DatePicker } from 'antd';


function PollCard({ PollData ,setAnswer}) {
  const [selectedArray, setSelectedArray] = React.useState(
    !PollData.isCustomPoll ? Array(PollData["options"].length).fill(false) : []
  );
  const [pollData, setPollData] = React.useState(
    JSON.parse(JSON.stringify(PollData))
  );
  var totalPoints = !PollData.isCustomPoll
    ? PollData.options.reduce((acc, curr) => acc + curr.votes, 0)
    : 0;
  const handleSelect = (newList) => {
    setSelectedArray(newList);
    var newPoll = JSON.parse(JSON.stringify(PollData));
    for (let i = 0; i < PollData["options"].length; i++) {
      if (newList[i] == true) {
        setAnswer(PollData["options"][i].id);
        newPoll["options"][i]["votes"] = newPoll["options"][i]["votes"] + 1;
        break;
      }
    }
    setPollData(JSON.parse(JSON.stringify(newPoll)));
    totalPoints = !PollData.isCustomPoll
      ? PollData.options.reduce((acc, curr) => acc + curr.votes, 0)
      : 0;
  };
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
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
                  id={PollData.id}
                  option={option}
                  isSelected={selectedArray[index]}
                  index={index}
                  arrayLength={PollData["options"]?.length || 0}
                  key={index}
                  selectOption={handleSelect}
                />
              );
            })}
          </div>
        ) :pollData.cont_poll_type == "date"? (
          <div className={styles.customOptionWrapper}>
            <p className={styles.customOptionText}>
              Enter a date
            </p>
            <DatePicker
              className={styles.customOption}
              type={PollData.optionType}
              onChange={(_, dateString) => setAnswer(dateString)}
            ></DatePicker>
          </div>
        ):(<div className={styles.customOptionWrapper}>
          <p className={styles.customOptionText}>
            Enter a number
          </p>
          <Input
            className={styles.customOption}
            type={PollData.optionType}
            onChange={(e) => setAnswer(e.target.value)}
          ></Input>
        </div>)}
        <div className={styles.actionButtons}>
          <div className={styles.buttonWrapper}>
            <button className={styles.commentButton}>
              <CommentIcon /> <p className={styles.buttonText}>Comments</p>
            </button>
            <span className={styles.commentCount}>
              {`${PollData.comments.length} comment${
                PollData.comments.length > 1 ? "s" : ""
              }`}
            </span>
          </div>

          <div className={styles.buttonWrapper}>
            <button className={styles.shareButton}>
              <ShareIcon /> <p className={styles.buttonText}>Share</p>
            </button>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.reportButton}>
              <ReportIcon />
              <p className={styles.buttonText}>Report</p>
              
            </button>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.creator}>
          <a href={`/profile/${PollData.creatorUsername}`}>
            <img
              src={PollData.creatorImage}
              alt="user"
              className={styles.creatorImage}
            />
          </a>
          <a href={`/profile/${PollData.creatorUsername}`}>
            <div className={styles.creatorName}>{PollData.creatorName}</div>
          </a>
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
