import React, { useState, useEffect } from "react";
import Menu from "../../Components/Menu";
import styles from "./Jury.module.css";
import getModerationRequests from "../../api/requests/getModerationRequests";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import PollTag from "../../Components/PollTag";
import PointsButton from "../../Components/PointsButton";
import getProfileMe from "../../api/requests/profileMe";
import Checkbox from "antd/lib/checkbox/Checkbox";
import useModal from "../../contexts/ModalContext/useModal";
import { ModalNames } from "../../contexts/ModalContext/ModalNames";

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
          console.log("req", requestData);
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

  const isReport = request?.request_type == "report";
  const isDiscrete = request?.request_type == "discrete";

  const handleResultOptionSelect = (index) => {
    setSelectedResultOption(index);
  };

  const handleResponseSelect = (response) => {
    setSelectedResponse(response);
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
                <button className={styles.optionStyle} key={index}>
                  {option.choice_text}
                </button>
              ))}
            </div>
          ) : (
            <div>
              <input
                className={`${styles.customInput} ${styles.disabled}`}
                type={request?.poll?.cont_poll_type}
                disabled
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
          {!isReport && (
            <>
              <p className={styles.text}>
                What is the result of the above survey?(If the event did not
                occur or the answer to the question is not in the options,
                please click none. ){" "}
              </p>
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
                  <button
                    className={`${styles.optionStyle} ${styles.clickable} ${
                      selectedResultOption === "none" ? styles.active : ""
                    }`}
                    onClick={() => handleResultOptionSelect("none")}
                  >
                    NONE
                  </button>
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
            </>
          )}
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
            <button className={styles.sendButton}>Send</button>
          </div>
        </div>
      </div>
      <PointsButton point={userData?.points ?? 0} />
    </div>
  );
}

export default Jury;
