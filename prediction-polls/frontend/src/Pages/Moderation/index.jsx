// Moderation.js
import React from 'react';
import Menu from '../../Components/Menu';
import styles from './Moderation.module.css';
import { Button } from 'antd';
import SearchBar from "../../Components/SearchBar";
import { useNavigate } from "react-router-dom";
import PollTag from "../../Components/PollTag";

function Moderation() {
  const isModerator = true;

  const handleBecomeModerator = () => {
    console.log('User wants to become a moderator');
  };

  const handleSearch = (searchTerm) => {
    console.log('User wants to search for', searchTerm);
  }

  const mockPosts = [
    {
      userId: 1,
      poll_id: 1,
      request_type: "poll",
      question_text: "Which country will win Eurovision this year?",
      poll_tags: ["eurovision", "music"],
    },
    {
      userId: 2,
      poll_id: 2,
      request_type: "report",
      question_text: "When will the protests in France end?",
      poll_tags: ["France", "Politics"],
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
                
                <div className={styles.tags}>
                  {mockPost?.poll_tags.map((tag, index) => (<PollTag TagName={tag} key={index} />
                  ))}
                </div>
                <p className={styles.text}>{mockPost.question_text}</p>

                <Button className={styles.btn} type="primary" onClick={handleBecomeModerator}>
                  Accept
                </Button>

              </div>
            ))}


          </div>
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