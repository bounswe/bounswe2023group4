import Menu from "../../Components/Menu";
import PollCard from "../../Components/PollCard";
import styles from "./Vote.module.css";
import PointsButton from "../../Components/PointsButton";
import pointData from "../../MockData/PointList.json"
import { Button, Input } from 'antd';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import getProfileMe from "../../api/requests/profileMe.jsx";



function Vote() {
  let { id } = useParams();
  let parsedID = parseInt(id);
  const [userData, setUserData] =  useState({})

  React.useEffect( () => {
    const data = getProfileMe();
     data.then((result) => {
       setUserData(result);
     });
 },[])
  const retrievePoll = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        },
      };
      let url = `${process.env.REACT_APP_BACKEND_LINK}/polls/${parsedID}`
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (response.status === 200 && data) {
        if (data.pollType == "discrete") {
          data.isCustomPoll = false;
        }
        else {
          data.isCustomPoll = true;
        }
        if (data.closingDate != null) {
          data.closingDate = data.closingDate.slice(0, 10);
        }
        return data;
      }
      else {
        navigate("/feed");
      }
    }
    catch (error) {
      navigate("/feed");
    }
  };
  const fetchData = async () => {
    try {
      const result = await retrievePoll();
      setPolldata(result);
      setSentence((result.isCustomPoll) ? "Please enter a suitable answer to the poll" : "Choose the option you want to vote for");
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoaded(true);
    }
  };


  const navigate = useNavigate();
  const [polldata, setPolldata] = React.useState(null);
  const [sentence, setSentence] = React.useState(null);
  const [betPoint, setBetPoint] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState();
  const [isLoaded, setLoaded] = React.useState(false);
  const [answer, setAnswer] = React.useState(null);

  useEffect(() => {
    fetchData();
  }, []);


  const handleVoting = async () => {
    try {
      console.log("isOpen");
      console.log(polldata.isOpen);
      if (polldata.isOpen == true) {
        if (polldata.pollType == "discrete" && /^[0-9]*$/.test(betPoint) == true) {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({
              choiceId: answer,
              points: parseInt(betPoint)
            })
          };
          let url = `${process.env.REACT_APP_BACKEND_LINK}/polls/discrete/${parsedID}/vote`
          const response = await fetch(url, requestOptions);
          if (response.status === 200) {
            setMessage("Voted successfully!");
          }
          else {
            setMessage("An error has occurred!");
          }
        }
        else if (polldata.pollType == "continuous" && /^[0-9]*$/.test(betPoint) == true) {
          if (polldata.cont_poll_type == "date") {
            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
              },
              body: JSON.stringify({
                choice: answer,
                points: parseInt(betPoint)
              })
            };
            let url = `${process.env.REACT_APP_BACKEND_LINK}/polls/continuous/${parsedID}/vote`
            const response = await fetch(url, requestOptions);
            if (response.status === 200) {
              setMessage("Voted successfully!");
            }
            else {
              setMessage("An error has occurred!");
            }
          }
          else {
            if (/^[0-9]*$/.test(answer) == true) {
              const requestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                  choice: answer,
                  points: parseInt(betPoint)
                })
              };
              let url = `${process.env.REACT_APP_BACKEND_LINK}/polls/continuous/${parsedID}/vote`
              const response = await fetch(url, requestOptions);
              if (response.status === 200) {
                setMessage("Voted successfully!");
              }
              else {
                setMessage("An error has occurred!");
              }
            }
            else {
              setMessage("The response should be numeric!");
            }
          }
        }
        else {
          setMessage("The bet points should be integer numbers!");
        }
      }
      else {
        setMessage("The poll isn't open for voting!");
      }
    }
    catch (error) {
      navigate("/feed");
    }
  };

  if (isLoaded == true) {
    return (
      <div className={styles.page}>
        <Menu currentPage="Vote" />
        <div className={styles.page_row}>
          <div className={styles.poll}>
            <PollCard PollData={polldata} setAnswer={setAnswer} />
          </div>
          <div className={styles.choice_column}>
          <PointsButton point={userData?.points ?? 0}/> 
            <div className={styles.infoText}><div>{sentence}</div>
              <div id="statement" className={styles.chooseText}>How many points do you want to place?</div>
              <div><Input
                id="bet"
                className={styles.inputStyle}
                placeholder=""
                onChange={(e) => setBetPoint(e.target.value)}
              /></div>
              <div className={styles.buttonDivStyle}><Button
                id="submitButton"
                className={styles.bottonStyle}
                onClick={handleVoting}
              >Vote</Button></div>
              <div className={styles.messageStyle}>{message}</div>
            </div></div>
        </div>
      </div>
    );
  }
}

export default Vote;
