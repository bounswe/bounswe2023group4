import React, { useState } from "react";
import Menu from "../../Components/Menu";
import styles from "./Feed.module.css";
import pollData from "../../MockData/PollData.json"
import PollCard from "../../Components/PollCard";
import PointsButton from "../../Components/PointsButton";
import pointData from "../../MockData/PointList.json";
import SearchBar from "../../Components/SearchBar"
import getProfileMe from "../../api/requests/profileMe.jsx";

function Feed() {
  const [filteredPolls, setFilteredPolls] = useState(pollData.pollList);
  const [userData, setUserData] =  useState({})

  React.useEffect( () => {
    const data = getProfileMe();
     data.then((result) => {
       setUserData(result);
     });
 },[])

  const handleSearch = (searchText) => {
    if (!searchText.trim()) {
      setFilteredPolls(pollData.pollList);
      return;
    }

    const lowerCaseSearchText = searchText.toLowerCase();

    const filtered = pollData.pollList.filter(poll => {
      const questionMatch = poll.question.toLowerCase().includes(lowerCaseSearchText);
      const tagsMatch = poll.tags && poll.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchText));
      const creatorNameMatch = poll.creatorName && poll.creatorName.toLowerCase().includes(lowerCaseSearchText);

      return questionMatch || tagsMatch || creatorNameMatch;
    });

    setFilteredPolls(filtered);
  };

  return (
    <div className={styles.page}>
      <Menu currentPage="Feed" />   
      <div className = {styles.pollList}>  
       <SearchBar onSearch={handleSearch} />
       {filteredPolls.map((poll) => (
          <PollCard PollData={poll} key={poll.id} />
        ))}</div>
     <div className={styles.pointsButton}>
     <PointsButton point={userData.points}/> </div> 
    </div>
  );
}

export default Feed;
