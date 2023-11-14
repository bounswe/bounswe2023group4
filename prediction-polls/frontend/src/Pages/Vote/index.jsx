import React from "react";
import Menu from "../../Components/Menu";
import PollCard from "../../Components/PollCard";
import styles from "./Vote.module.css";
import pollData from "../../MockData/PollData.json"
import PointsButton from "../../Components/PointsButton";
import pointData from "../../MockData/PointList.json"
import { Button, InputNumber} from 'antd';
import {useParams} from 'react-router-dom';


function Vote() {
  let {id} = useParams();
  let parsedID = parseInt(id);
  const [polldata, setPolldata] = React.useState(pollData.pollList[parsedID-1]);
  const [sentence, setSentence] = React.useState((polldata.isCustomPoll == true) ? "Please enter a suitable answer to the poll" : "Choose the option you want to vote for ");
  const [betPoint, setBetPoint] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState();
  
  const handleVoting = () =>{

  };
  const retrievePoll = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: parsedID,
        })
      };
      const response = await fetch(process.env.REACT_APP_BACKEND_LINK+'/vote', requestOptions);
      const data = await response.json();
    
    if (response.status === 200 && data.poll ) {
    } 
    }
    catch (error) {
    }
  };
  
  return (
    <div className={styles.page}>
      <Menu currentPage="Vote" />
      <div className={styles.page_row}>
        <div className={styles.poll}>
          <PollCard PollData={polldata} />
        </div>
        <div className={styles.choice_column}>
          <PointsButton points={pointData.points} />
          <div className={styles.infoText}><div>{sentence}</div>
            <div className={styles.chooseText}>How many points do you want to place?</div>
            <div><InputNumber
              id="bet"
              className={styles.inputStyle}
              placeholder=""
              onChange={(e) => setBetPoint(e.target.value)}
            /></div>
            <div className={styles.buttonDivStyle}><Button
              className={styles.bottonStyle}
              onClick={handleVoting}
            >Vote</Button></div>
            <div className={styles.messageStyle}>{message}</div>
          </div></div>
      </div>
    </div>
  );
}

export default Vote;
