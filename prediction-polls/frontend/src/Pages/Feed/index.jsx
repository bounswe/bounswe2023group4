import React, { useState, useEffect } from "react";
import Menu from "../../Components/Menu";
import styles from "./Feed.module.css";
import PollCard from "../../Components/PollCard";
import PointsButton from "../../Components/PointsButton";
import pointData from "../../MockData/PointList.json";
import SearchBar from "../../Components/SearchBar";
import getProfileMe from "../../api/requests/profileMe.jsx";
import { useNavigate } from "react-router-dom";

function Feed() {
  const [pollData, setPollData] = useState({ pollList: [] });
  const [filteredPolls, setFilteredPolls] = useState(pollData.pollList);
  const [userData, setUserData] = useState({});

  React.useEffect(() => {
    const data = getProfileMe();
    data.then((result) => {
      setUserData(result);
    });
  }, []);
  const url = process.env.REACT_APP_BACKEND_LINK;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url + "/polls", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Received non-JSON response from server");
        }

        const data = await response.json();

        // Modify each poll in the data array
        const modifiedData = data.map((poll) => {
          if (poll.pollType === "discrete") {
            return { ...poll, isCustomPoll: false };
          } else {
            return { ...poll, isCustomPoll: true };
          }
        });
        const reversedData = [...modifiedData].reverse();
        setPollData({ pollList: reversedData });
        setFilteredPolls(reversedData);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    fetchData();
  }, []);



  const handleSearch = (searchText) => {
    if (!searchText.trim()) {
      setFilteredPolls(pollData.pollList);
      return;
    }

    const lowerCaseSearchText = searchText.toLowerCase();

    const filtered = pollData.pollList.filter((poll) => {
      const questionMatch = poll.question
        .toLowerCase()
        .includes(lowerCaseSearchText);
      const tagsMatch =
        poll.tags &&
        poll.tags.some((tag) =>
          tag.toLowerCase().includes(lowerCaseSearchText)
        );
      const creatorNameMatch =
        poll.creatorName &&
        poll.creatorName.toLowerCase().includes(lowerCaseSearchText);

      return questionMatch || tagsMatch || creatorNameMatch;
    });

    setFilteredPolls(filtered);
  };

  return (
    <div className={styles.page}>
      <Menu currentPage="Feed" />
      <div className={styles.pollList}>
        <SearchBar onSearch={handleSearch} />
        {filteredPolls.map((poll) => (
          <PollCard
            className={styles.pollCard}
            PollData={poll}
            key={poll.id}
          />
        ))}
      </div>
      <div className={styles.pointsButton}>
        <PointsButton point={userData?.points ?? 0} />
      </div>
    </div>
  );
}

export default Feed;
