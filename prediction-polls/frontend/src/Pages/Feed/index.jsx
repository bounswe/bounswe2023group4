import React from "react";
import Menu from "../../Components/Menu";
import styles from "./Feed.module.css";
import pollData from "../../MockData/PollData.json"
import PollCard from "../../Components/PollCard";
import PointsButton from "../../Components/PointsButton";
import pointData from "../../MockData/PointList.json"

function Feed() {
  return (
    <div className={styles.page}>
      <Menu currentPage="Feed" />
      <div className = {styles.pollList}>     
      {
        pollData.pollList.map((poll, index) => (
          <PollCard PollData={poll} key={index}/>
        ))
      }</div>
     <div className={styles.pointsButton}>
      <PointsButton points={pointData.points}/></div> 
    </div>
  );
}

export default Feed;
