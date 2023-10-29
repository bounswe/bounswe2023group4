import React from "react";
import styles from "./PollCard.module.css";
import PollTag from "../PollTag";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CommentIcon } from "../../Assets/icons/Comment.svg";
import { ReactComponent as ShareIcon } from "../../Assets/icons/Share.svg";
import { ReactComponent as ReportIcon } from "../../Assets/icons/Warning.svg";
import PollOption from "../PollOption";

function PollCard({ PollData }) {
  const totalPoints = !PollData.isCustomPoll
    ? PollData.options.reduce((acc, curr) => acc + curr.votes, 0)
    : 0;

  const navigate = useNavigate();
  return (
    <div className={styles.card}>
      <div className={styles.question}>
        <div className={styles.tags}>
          {PollData.tags.map((tag, index) => (
            <PollTag TagName={tag} key={index} />
          ))}
        </div>
        <div className={styles.questionPoints}>
          <div className={styles.question}>
            <p>{PollData.question}</p>
          </div>
          {!PollData.isCustomPoll ? (
            <div className={styles.pointsPlaced}>
              <p>Points Placed:</p>
            </div>
          ) : (
            ""
          )}
        </div>
        {!PollData.isCustomPoll ? (
          <div className={styles.optionList}>
            {PollData.options.map((option, index) => {
              const widthPercentage = (option.votes / totalPoints) * 100;
              return (
                <PollOption
                  widthPercentage={widthPercentage}
                  navigate={navigate}
                  option={option}
                  index={index}
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
              {`${PollData.comments.length} comment${
                PollData.comments.length > 1 ? "s" : ""
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
