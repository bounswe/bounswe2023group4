// Moderation.js
import React, { useEffect } from "react";
import Menu from "../../Components/Menu";
import styles from "./Moderation.module.css";
import { Button } from "antd";
import SearchBar from "../../Components/SearchBar";
import { useNavigate } from "react-router-dom";
import PollTag from "../../Components/PollTag";
import PointsButton from "../../Components/PointsButton";
import TagSelection from "../../Components/TagSelection";
import getProfileMe from "../../api/requests/profileMe";
import { useState } from "react";

function Moderation() {
  const url = process.env.REACT_APP_BACKEND_LINK;
  const [userData, setUserData] = useState({});
  const [moderatorPosts, setModeratorPosts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();

  const handleTagChange = (tags) => {
    setSelectedTags(tags);
  };

  useEffect(() => {
    const data = getProfileMe();
    data.then((result) => {
      setUserData(result);
    });

    const fetchData = async () => {
      try {
        const response = await fetch(url + "/moderators/my-requests", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setModeratorPosts(result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    // Call the function to fetch data
    fetchData();
  }, []);

  const isModerator = true;

  const handleBecomeModerator = () => {
    console.log("User wants to become a moderator");
  };

  const handleBecomeJury = (requestId) => {
    navigate(`/moderation/jury/${requestId}`)
    console.log("User wants to become a jury");
  };

  return (
    <div className={styles.page}>
      <Menu currentPage="Moderation" />
      {isModerator ? (
        <>
          <div className={styles.pollList}>
            {moderatorPosts.map((mockPost) => (
              <div className={styles.questionCard}>
                <p className={styles.text}>
                  {mockPost.request_type === "report"
                    ? "Would you like to be on the jury to resolve a report about the following poll?"
                    : "Would you like to be on the jury to end the following poll?"}
                </p>
                <div className={styles.tags}>
                  {mockPost?.poll.tags.map((tag, index) => (
                    <PollTag TagName={tag} key={index} />
                  ))}
                </div>

                <p className={styles.text}>{mockPost.poll.question}</p>

                <div className={styles.buttonContainer}>
                  <Button
                    className={styles.btn}
                    type="primary"
                    onClick={() => handleBecomeJury(mockPost.request_id)}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.tagContainer}>
            <div className={styles.selectedTags}>
              <TagSelection
                selectedTags={selectedTags}
                onTagChange={handleTagChange}
              />
            </div>
          </div>
          <PointsButton point={userData?.points ?? 0} />
        </>
      ) : (
        <>
          <div className={styles.questionCard2}>
            <p className={styles.text}>
              Would you like to apply to become a moderator?
            </p>
            <Button
              className={styles.btn}
              type="primary"
              onClick={handleBecomeModerator}
            >
              Apply
            </Button>
          </div>
          <PointsButton point={userData?.points ?? 0} />
        </>
      )}
    </div>
  );
}

export default Moderation;
