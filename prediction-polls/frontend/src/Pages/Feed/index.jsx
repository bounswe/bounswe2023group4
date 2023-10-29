import React from "react";
import Menu from "../../Components/Menu";
import styles from "./Feed.module.css";
import pollData from "../../MockData/PollData.json"
import PollCard from "../../Components/PollCard";

function Feed() {
  return (
    <div className={styles.page}>
      <Menu currentPage="Feed" />
      <div className = {styles.pollList}>
      <h1>Feed Page</h1>
      
      {
        pollData.pollList.map((poll, index) => (
          <PollCard PollData={poll} key={index}/>
        ))
      }</div>
    </div>
  );
}

export default Feed;
