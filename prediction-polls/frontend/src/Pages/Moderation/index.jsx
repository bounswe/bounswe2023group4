// Moderation.js
import React, { useEffect } from "react";
import Menu from "../../Components/Menu";
import styles from "./Moderation.module.css";
import { Button } from "antd";
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
  const [message, setMessage] = useState(null);
  const [tags, setTags] = useState([]);

  const showMessage = (text) => {
    setMessage(text);

    // Automatically hide the message after a certain duration (e.g., 3000 milliseconds)
    setTimeout(() => {
      setMessage(null);
    }, 9000);
  };

  useEffect(() => {
    // Make a GET request to fetch available tags from the backend
    const fetchData = async () => {
      try {
        const response = await fetch(url + "/moderators/my-tags", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        setTags(result);
      } catch (error) {
        console.error('Error fetching tags:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleTagChange = (updatedTags) => {
    // This function will be called whenever a tag is selected/unselected
    // You can use the updatedTags array to track the current state of tags

    const selectedCount = updatedTags.reduce((count, tag) => (tag.isSelected ? count + 1 : count), 0);

    if (selectedCount === 0 || selectedCount > 5) {
      showMessage('Please select at least one tag and at most 5 tags.');
      return;
    }

    const updatedTagsWithNumbers = updatedTags.map((tag) => ({
      topic: tag.topic,
      isSelected: tag.isSelected ? 1 : 0,
    }));

     const postUpdatedTags = async () => {
       try {
         const response = await fetch(url + '/moderators/my-tags', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
           },
           body: JSON.stringify(updatedTagsWithNumbers),
         });

         if (!response.ok) {
           throw new Error('Network response was not ok');
         }

         // Handle success
       } catch (error) {
         console.error('Error updating tags:', error.message);
       }
     };

    postUpdatedTags();
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

  const isModerator = userData?.isMod;

  const handleBecomeModerator = () => {
    console.log("User wants to become a moderator");
    const fetchData = async () => {
      try {
        const response = await fetch(url + "/moderators/request-promotion", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        showMessage('Your application to become a moderator has been submitted successfully.');

      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    // Call the function to fetch data
    fetchData();
  };

  const handleBecomeJury = () => {
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
                    onClick={handleBecomeJury}
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
                initialTags={tags}
                onTagChange={handleTagChange}
              />
            </div>
          </div>
          {message && (
            <div className={styles.message2}>
              {message}
            </div>
          )}
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
          {message && (
            <div className={styles.message}>
              {message}
            </div>
          )}
          <PointsButton point={userData?.points ?? 0} />
        </>
      )}
    </div>
  );
}

export default Moderation;
