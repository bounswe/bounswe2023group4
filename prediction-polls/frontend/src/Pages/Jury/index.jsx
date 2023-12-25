import React, { useState, useEffect } from "react";
import Menu from "../../Components/Menu";
import styles from "./Jury.module.css";
import getModerationRequests from "../../api/requests/getModerationRequests";
import { useParams } from "react-router-dom";
import PollTag from "../../Components/PollTag";
import PointsButton from "../../Components/PointsButton";
import getProfileMe from "../../api/requests/profileMe";
import Checkbox from "antd/lib/checkbox/Checkbox";
import useModal from "../../contexts/ModalContext/useModal";
import { ModalNames } from "../../contexts/ModalContext/ModalNames";
import sendJuryAnswer from "../../api/requests/sendJuryAnswer";
import { useNavigate } from "react-router-dom";

function Jury() {
  const { id } = useParams();
  const [requestList, setRequestList] = useState([]);
  const [request, setRequest] = useState({});
  const [userData, setUserData] = useState({});
  const [selectedResultOption, setSelectedResultOption] = useState(null);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [customAnswer, setCustomAnswer] = useState(null);
  useEffect(() => {
    const data = getProfileMe();
    data.then((result) => {
      setUserData(result);
    });
  }, []);

  const { openModal, juryCheckboxState, setJuryCheckboxState } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    const getRequests = async () => {
      try {
        const response = await getModerationRequests();
        console.log("respp", response);
        if (response) {
          setRequestList(response);
          const requestData = response.find(
            (request) => request.request_id == id
          );
  
          setRequest(requestData);
        } else {
          console.log("Failed to fetch requests or no requests available");
        }
      } catch (error) {
        console.error("Failed to fetch moderation requests", error);
      }
    };

    getRequests();
  }, []);

  useEffect(() => {
    const requestData = requestList.find((request) => request.request_id == id);
    setRequest(requestData);
  }, [requestList]);

  const requestMessage =
    request?.request_type == "report"
      ? "Does this poll contain content that should be removed from the platform?"
      : "Did the above event happened?";

  const isDiscrete = request?.request_type == "discrete";


  const handleResultOptionSelect = (index) => {
    setSelectedResultOption(index);
  };

  const handleResponseSelect = (response) => {
    setSelectedResponse(response);
  };


  const handleSend = async () => {
    let choice;

    if (request?.request_type === 'discrete') {
      choice = request?.poll?.options[selectedResultOption]?.id; 
    } else if (request?.request_type === 'continuous') {
      choice = customAnswer; 
    } else if (request?.request_type === 'report') {
      choice = selectedResponse === "yes"; 
    }

    const JuryAnswer = {
      request_id: id, 
      choice: choice
    };

    const response = await sendJuryAnswer(JuryAnswer);
    if (response) {
      console.log("Response sent successfully", response);
      navigate("/moderation"); 
    } else {
      console.error("Failed to send response");
    }
  };

  return (
    <div className={styles.page}>
      <Menu currentPage="Moderation" />
      <div className={styles.cardWrapper}>
        <div className={styles.questionCard}>
          <div className={styles.tags}>
            {request?.poll?.tags.map((tag, index) => (
              <PollTag TagName={tag} key={index} />
            ))}
          </div>
          <p className={styles.text}>{request?.poll?.question}</p>
          {isDiscrete ? (
            <div className={styles.options}>
              {request?.poll?.options.map((option, index) => (
                    <button
                      className={`${styles.optionStyle} ${styles.clickable} ${
                        selectedResultOption === index ? styles.active : ""
                      } `}
                      onClick={() => handleResultOptionSelect(index)}
                      key={index}
                    >
                      {option.choice_text}
                    </button>
                  ))}
            </div>
          ) : (
            <div>
               <input
                    className={styles.customInput}
                    type={request?.poll?.cont_poll_type}
                    onChange={(e) => setCustomAnswer(e.target.value)}
                  />
            </div>
          )}

          <p className={styles.text}>{requestMessage}</p>
          <div className={styles.requestResponseContainer}>
            <button
              className={`${styles.requestResponse} ${styles.clickable} ${
                selectedResponse === "yes" ? styles.active : ""
              }`}
              onClick={() => handleResponseSelect("yes")}
            >
              Yes
            </button>
            <button
              className={`${styles.requestResponse} ${styles.clickable} ${
                selectedResponse === "no" ? styles.active : ""
              }`}
              onClick={() => handleResponseSelect("no")}
            >
              No
            </button>
          </div>
          
          <div className={styles.checkboxContainer}>
            <Checkbox
              checked={juryCheckboxState}
              onChange={() => setJuryCheckboxState(!juryCheckboxState)}
            />
            <p className={styles.checkboxText}>
              I agree to the{" "}
              <button
                className={styles.juryRules}
                onClick={() => openModal(ModalNames.JuryTermsModal)}
              >
                Jury Rules
              </button>{" "}
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.sendButton} onClick={handleSend} >Send</button>
          </div>
        </div>
      </div>
      <PointsButton point={userData?.points ?? 0} />
    </div>
  );
}

export default Jury;
