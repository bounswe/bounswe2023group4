import React, { useEffect } from "react";
import styles from "./PollCard.module.css";
import PollTag from "../PollTag";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CommentIcon } from "../../Assets/icons/Comment.svg";
import { ReactComponent as ShareIcon } from "../../Assets/icons/Share.svg";
import { ReactComponent as ReportIcon } from "../../Assets/icons/Warning.svg";
import PollOption from "../PollOption";
import { Input, DatePicker, TimePicker } from "antd";
import { useLocation } from "react-router-dom";
import ProfileIcon from "../../Assets/icons/ProfileIcon.jsx";
import getProfile from "../../api/requests/profile.jsx";
import moment from "moment";
import useModal from "../../contexts/ModalContext/useModal";
import { ModalNames } from "../../contexts/ModalContext/ModalNames.js";

function PollCard({ PollData, setAnswer, onClick, clickTextFunction }) {
  const [selectedArray, setSelectedArray] = React.useState(
    !PollData.isCustomPoll ? Array(PollData["options"].length).fill(false) : []
  );
  const [pollData, setPollData] = React.useState(
    JSON.parse(JSON.stringify(PollData))
  );
  const { openModal} = useModal();
  const [userData, setUserData] = React.useState({});
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isVotePath, setIsVotePath] = React.useState(
    /^\/vote\//.test(location.pathname)
  );


  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setIsLoggedIn(true);
    }
  }, []);


  useEffect(() => {
    const data = getProfile(PollData.creatorUsername);
    data.then((result) => {
      setUserData(result);
    });
  }, []);

  React.useEffect(() => {
    setIsVotePath(/^\/vote\//.test(location.pathname));
  }, [location.pathname]);

  const clickHandle = () => {
    navigate("/vote/" + PollData.id);
  };

  var totalPoints = !PollData.isCustomPoll
    ? PollData.options.reduce(
      (acc, curr) =>
        curr.voter_count == null ? acc : acc + curr.voter_count,
      0
    )
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

  const handleDateChange = (_, dateString) => {
    setSelectedDate(dateString);
    combineDateTime(dateString, selectedTime);
  };

  const handleTimeChange = (_, timeString) => {
    setSelectedTime(timeString);
    combineDateTime(selectedDate, timeString);
  };

  const combineDateTime = (date, time) => {
    if (date && time) {
      setAnswer(`${date}T${time}`);
    } else if (date) {
      setAnswer(`${date}T00:00:00`);
    } else if (time) {
      setAnswer(`0000-00-00T${time}`);
    }
  };

  const handleShare = () => {
    isLoggedIn ? openModal(ModalNames.ShareModal, PollData) : navigate("/auth/sign-in");

    
  };
  const handleComment = () => {
    isLoggedIn ?  openModal(ModalNames.CommentModal) : navigate("/auth/sign-in");
  };
  const handleReport = () => {
    isLoggedIn ? openModal(ModalNames.ReportModal) : navigate("/auth/sign-in"); 
  }


  const questionHTML = `<p>${PollData.question}</p>`;
  return (
    <div
      className={`${styles.card} ${pollData.isOpen ? styles.pollCardOpen : styles.pollCardClosed
        }`}
      onClick={onClick}
    >
      <div className={styles.question}>
        <div className={styles.tags}>
          {pollData.tags.map((tag, index) => (
            <PollTag TagName={tag} key={index} />
          ))}
        </div>
        <div className={styles.questionPoints}>
          <div className={styles.question}>
            <div
              onClick={clickTextFunction}
              onDoubleClick={clickTextFunction}
              dangerouslySetInnerHTML={{ __html: questionHTML }}
            ></div>
          </div>
        </div>
        {!pollData.isCustomPoll ? (
          <div className={styles.optionList}>
            {PollData.options.map((option, index) => {
              let widthPercentage = 0;
              if (totalPoints > 0) {
                widthPercentage = (option.voter_count / totalPoints) * 100;
              }
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
                  clickTextFunction={clickTextFunction}
                />
              );
            })}
          </div>
        ) : pollData.cont_poll_type == "date" ? (
          <div className={styles.customOptionWrapper}>
            <p className={styles.customOptionText}>Enter a date</p>
            <DatePicker
              required
              className={styles.customOption}
              type={PollData.optionType}
              onChange={handleDateChange}
              onClick={() => !isVotePath && clickHandle()}
            ></DatePicker>
            <TimePicker
              className={styles.customOption}
              format="HH:mm:ss"
              onChange={handleTimeChange}
              onClick={() => !isVotePath && clickHandle()}
            />
          </div>
        ) : (
          <div className={styles.customOptionWrapper}>
            <p className={styles.customOptionText}>Enter a number</p>
            <Input
              className={styles.customOption}
              type={PollData.optionType}
              onChange={(e) => setAnswer(e.target.value)}
              onClick={() => !isVotePath && clickHandle()}
            ></Input>
          </div>
        )}
        <div className={styles.actionButtons}>
          <div className={styles.buttonWrapper}>
            <button className={styles.commentButton}>
              <CommentIcon /> <p className={styles.buttonText} onClick={handleComment}>Comments</p>
            </button>
            <span className={styles.commentCount}>
              {`${PollData.comments.length} comment${PollData.comments.length > 1 ? "s" : ""
                }`}
            </span>
          </div>

          <div className={styles.buttonWrapper}>
            <button className={styles.shareButton} onClick={handleShare}>
              <ShareIcon /> <p className={styles.buttonText}>Share</p>
            </button>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.reportButton} onClick={handleReport}>
              <ReportIcon />
              <p className={styles.buttonText}>Report</p>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.creator}>
          <a href={`/profile/${PollData.creatorUsername}`}>
            {userData?.profile_picture == null ? (
              <div className={styles.creatorImagePlaceholder}>
                <ProfileIcon width={20} height={20} />
              </div>
            ) : (
              <img
                src={userData.profile_picture}
                alt="user"
                className={styles.creatorImage}
              />
            )}
          </a>
          <a href={`/profile/${PollData.creatorUsername}`}>
            <div className={styles.creatorName}>{PollData.creatorName}</div>
          </a>
        </div>
        {!PollData.isOpen && (
          <div className={styles.textGroup}>
            <p className={styles.pollClosed}>POLL CLOSED</p>
          </div>
        )}
        {PollData.isOpen && (
          <>
            <div className={styles.textGroup}>
              <p className={styles.textDescription}>Closing In</p>
              <p className={styles.textDetail}>
                {PollData.closingDate == null ? "Indefinite" : moment(PollData.closingDate).format("DD MMM YYYY")}
                {" "}
                {PollData.closingDate == null ? "" : moment(PollData.closingDate).format('HH:mm')}
              </p>
            </div>
            <div className={styles.textGroup}>
              <p className={styles.textDescription}>
                {PollData.closingDate == null ? " " : "Reject Votes In"}
              </p>
              <p className={styles.textDetail}>
                {PollData.closingDate == null ? " " : "Last"}{" "}
                {PollData.rejectVotes}
              </p>
            </div>{" "}
          </>
        )}
      </div>
    </div >
  );
}

export default PollCard;
