import React, { useState, useEffect } from "react";
import Menu from "../../Components/Menu";
import styles from "./Jury.module.css";
import getModerationRequests from "../../api/requests/getModerationRequests";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import PollTag from "../../Components/PollTag";

function Jury() {
  const { id } = useParams();
  const [requestList, setRequestList] = useState([]);
  const [request, setRequest] = useState({});

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

  return (
    <div className={styles.page}>
      <Menu currentPage="Moderation" />
      <div className={styles.questionCard}>
        <p className={styles.text}>{request?.poll?.question}</p>
        <div className={styles.tags}></div>
      </div>
    </div>
  );
}

export default Jury;
