import React, { useEffect } from "react";
import styles from "./PollCard.module.css";
import PollTag from "../PollTag";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CommentIcon } from "../../Assets/icons/Comment.svg";
import { ReactComponent as ShareIcon } from "../../Assets/icons/Share.svg";
import { ReactComponent as ReportIcon } from "../../Assets/icons/Warning.svg";
import PollOption from "../PollOption";
import { Input, DatePicker, Dropdown } from "antd";
import { useLocation } from "react-router-dom";
import ProfileIcon from "../../Assets/icons/ProfileIcon.jsx";
import getProfile from "../../api/requests/profile.jsx";
import AddModal from "../Modals/AddModal.jsx";
import ViewModal from "../Modals/ViewModal.jsx";
import SuccessModal from "../Modals/SuccessModal.jsx";

function PollCard({ PollData, setAnswer, onClick }) {
  const [selectedArray, setSelectedArray] = React.useState(
    !PollData.isCustomPoll ? Array(PollData["options"].length).fill(false) : []
  );
  const [pollData, setPollData] = React.useState(
    JSON.parse(JSON.stringify(PollData))
  );
  const [userData, setUserData] = React.useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [isVotePath, setIsVotePath] = React.useState(
    /^\/vote\//.test(location.pathname)
  );
  const [openAddAnnotate, setOpenAddAnnotate] = React.useState(false);
  const [openViewAnnotate, setOpenViewAnnotate] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [contentHTML, setcontentHTML] = React.useState(null);
  const showAddAnnotateModal = () => {
    setOpenAddAnnotate(true);
  };
  const showViewAnnotateModal = () => {
    setOpenViewAnnotate(true);
  };

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
      (acc, curr) => (curr.votes == null ? acc : acc + curr.votes),
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
  const itemList = [{ key: "View Annotations", value: showViewAnnotateModal }, { key: "Add Annotation", value: showAddAnnotateModal }]
  const items = itemList.map((item) => {
    return { label: <div className={styles.contextMenuOption} onClick={item.value}>{item.key}</div>, key: item.key }
  });
  React.useEffect(() => {
    setcontentHTML(document.getElementById("poll_content").innerHTML);
  }, []);

  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={['contextMenu']}
    >
      <div>
        <div id="poll_content">
          <div className={styles.card}
          >
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
                    let widthPercentage = 0;
                    if (totalPoints > 0) {
                      widthPercentage = (option.votes / totalPoints) * 100;
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
                      />
                    );
                  })}
                </div>
              ) : pollData.cont_poll_type == "date" ? (
                <div className={styles.customOptionWrapper}>
                  <p className={styles.customOptionText}>Enter a date</p>
                  <DatePicker
                    className={styles.customOption}
                    type={PollData.optionType}
                    onChange={(_, dateString) => setAnswer(dateString)}
                    onClick={() => !isVotePath && clickHandle()}
                  ></DatePicker>
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
                    <CommentIcon /> <p className={styles.buttonText}>Comments</p>
                  </button>
                  <span className={styles.commentCount}>
                    {`${PollData.comments.length} comment${PollData.comments.length > 1 ? "s" : ""
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
                  {userData?.profile_picture == null ? (
                    <div className={styles.creatorImagePlaceholder} ><ProfileIcon width={20} height={20} /></div>
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
              <div className={styles.textGroup}>
                <p className={styles.textDescription}>Closing In</p>
                <p className={styles.textDetail}>
                  {PollData.closingDate == null ? "Indefinite" : PollData.closingDate}
                </p>
              </div>
              <div className={styles.textGroup}>
                <p className={styles.textDescription}>
                  {PollData.closingDate == null ? " " : "Reject Votes In"}
                </p>
                <p className={styles.textDetail}>
                  {PollData.closingDate == null ? " " : "Last"} {PollData.rejectVotes}
                </p>
              </div>
            </div>
          </div>
        </div>
        <AddModal open={openAddAnnotate} setOpen={setOpenAddAnnotate} expressions={(PollData.isCustomPoll ? [PollData.question.slice(0, -1)] : [...(PollData.options.map(option => { return option.choice_text; })), PollData.question.slice(0, -1)])} setShowSuccessModal={setOpenSuccess} />
        <ViewModal open={openViewAnnotate} setOpen={setOpenViewAnnotate} pollContent={contentHTML} />
        <SuccessModal open={openSuccess} setOpen={setOpenSuccess} />
      </div>
    </Dropdown>
  );
}

export default PollCard;