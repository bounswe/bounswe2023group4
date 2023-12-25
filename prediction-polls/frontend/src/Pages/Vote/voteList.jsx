import React, { useEffect, useState } from 'react';
import PollCard from "../../Components/PollCard";
import Menu from "../../Components/Menu";
import styles from './VoteList.module.css'; 
import getPollsVotedMe from '../../api/requests/getPollsVotedMe';
import PointsButton from '../../Components/PointsButton';
import getProfileMe from '../../api/requests/profileMe';


function VoteList() {
  const [polls, setPolls] = useState([]);
  const [userData, setUserData] = useState({});

  React.useEffect(() => {
    const data = getProfileMe();
    data.then((result) => {
      setUserData(result);
    });
  }, []);

  useEffect(() => {
   const fetchData = async () => {
    const pollData = await getPollsVotedMe();
    const data = pollData;
    const modifiedData = data.map((poll) => {
      if (poll.closingDate != null) {
        poll.closingDate = poll.closingDate.slice(0, 10);
      }
      return poll.pollType === "discrete"
        ? { ...poll, isCustomPoll: false }
        : { ...poll, isCustomPoll: true };
    });
    setPolls(modifiedData);
  }
  fetchData();
  }, []);

  return (
    <div className={styles.page}>
    <Menu currentPage="Vote" />
    <div className={styles.pollList}>

      {polls?.map((poll) => (
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

export default VoteList;