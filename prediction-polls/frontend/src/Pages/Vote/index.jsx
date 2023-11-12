import React from "react";
import Menu from "../../Components/Menu";
import PollCard from "../../Components/PollCard";
import styles from "./Vote.module.css";
import pollData from "../../MockData/PollData.json"
import PointsButton from "../../Components/PointsButton";
import pointData from "../../MockData/PointList.json"
import { Button, Input} from 'antd';
import {useParams} from 'react-router-dom';


function Vote() {
  let {id} = useParams();
  let parsedID = parseInt(id);
  const [polldata, setPolldata] = React.useState(pollData.pollList[parsedID-1]);
  const [sentence, setSentence] = React.useState((polldata.isCustomPoll == true) ? "Please enter a suitable answer to the poll" : "Choose the option you want to vote for ");
  const [betPoint, setBetPoint] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState();
  const InputStyle = {
    marginTop: '40px',
    justifyContent: 'center',
    width: '60%',
    fontSize: '28px',
    fontWeight: '700',
    color: '#363A3D',
    borderColor: '#F0B041',
    borderWidth: '3px',
    paddingLeft: '10px'

  };
  const bottonStyle = {
    width: '50%',
    height: '100%',
    marginTop: '40px',
    justifyContent: 'center',
    backgroundColor: '#F0B041',
    color: '#FFFFFF',
    fontSize: '32px',
    fontWeight: '700',
    fontFamily: 'sans-serif'
  };
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
            <div className={styles.datepickerStyle}><Input
              id="bet"
              style={InputStyle}
              placeholder=""
              onChange={(e) => setBetPoint(e.target.value)}
            /></div>
            <div className={styles.buttonStyle}><Button
              style={bottonStyle}
              onClick={handleVoting}
            >Vote</Button></div>
            <div className={styles.messageStyle}>{message}</div>
          </div></div>
      </div>
    </div>
  );
}

export default Vote;
