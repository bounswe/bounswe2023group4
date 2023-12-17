// Moderation.js
import React, { useEffect } from "react";
import Menu from '../../Components/Menu';
import styles from './Moderation.module.css';
import { Button } from 'antd';
import SearchBar from "../../Components/SearchBar";
import { useNavigate } from "react-router-dom";
import PollTag from "../../Components/PollTag";
import PointsButton from "../../Components/PointsButton";
import getProfileMe from "../../api/requests/profileMe";
import { useState } from "react";

function Moderation() {
  const isModerator = true;
  const [userData, setUserData] = useState({}); 

  useEffect(() => {
    const data = getProfileMe();
    data.then((result) => {
      setUserData(result);
    });
  }, []);

  const handleBecomeModerator = () => {
    console.log('User wants to become a moderator');
  };

  const handleBecomeJury = () => {
    console.log('User wants to become a jury');
  };

  const handleSearch = (searchTerm) => {
    console.log('User wants to search for', searchTerm);
  }

  const handleReject = () => {
    // Implement your logic for rejecting the poll
  };

  const mockPosts = [
    {
      "request_id": 0,
      "request_type": "discrete",
      "poll": {
        "id": 0,
        "question": "Which country will win Eurovision this year?",
        "tags": [
          "eurovision", "music"
        ],
        "creatorName": "string",
        "creatorUsername": "string",
        "creatorImage": "string",
        "pollType": "string",
        "closingDate": "string",
        "rejectVotes": "string",
        "isOpen": true,
        "cont_poll_type": "string",
        "comments": [
          {
            "id": 0,
            "content": "string"
          }
        ],
        "options": [
          {
            "id": 0,
            "choice_text": "string",
            "poll_id": 0,
            "voter_count": 0
          }
        ]
      }
    }
    ,
    {
      "request_id": 0,
      "request_type": "report",
      "poll": {
        "id": 0,
        "question": "When will the protests in France end?",
        "tags": [
          "France", "Politics"
        ],
        "creatorName": "string",
        "creatorUsername": "string",
        "creatorImage": "string",
        "pollType": "string",
        "closingDate": "string",
        "rejectVotes": "string",
        "isOpen": true,
        "cont_poll_type": "string",
        "comments": [
          {
            "id": 0,
            "content": "string"
          }
        ],
        "options": [
          {
            "id": 0,
            "choice_text": "string",
            "poll_id": 0,
            "voter_count": 0
          }
        ]
      }
    }
  ];
  return (
    <div className={styles.page}>
      <Menu currentPage="Moderation" />
      {isModerator ? (
        <>
          <div className={styles.pollList}>
            <SearchBar onSearch={handleSearch} />

            {mockPosts.map((mockPost) => (

              <div className={styles.questionCard}>

                <p className={styles.text}>
                  {mockPost.request_type === 'report'
                    ? 'Would you like to be on the jury to resolve a report about the following poll?'
                    : 'Would you like to be on the jury to end the following poll?'}
                </p>


                <div className={styles.tags}>
                  {mockPost?.poll.tags.map((tag, index) => (<PollTag TagName={tag} key={index} />
                  ))}
                </div>

                <p className={styles.text}>{mockPost.poll.question}</p>

                <div className={styles.buttonContainer}>
                    <Button className={styles.btn} type="primary" onClick={handleBecomeJury}>
                      Accept
                    </Button>
                    <Button className={styles.btn} type="danger" style={{ backgroundColor: 'red', color: 'white' }} onClick={handleReject}>
                      Reject
                    </Button>
                  </div>
              </div>

            ))}
          </div>
          <PointsButton point={userData?.points ?? 0} /> 
        </>
      ) : (
        <>
          <div className={styles.questionCard}>
            <p className={styles.text}>Would you like to apply to become a moderator?</p>
            <Button className={styles.btn} type="primary" onClick={handleBecomeModerator}>
              Apply
            </Button>
          </div>

        </>

      )}
    </div>
  );
}

export default Moderation;