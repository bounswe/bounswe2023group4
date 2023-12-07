// Moderation.js
import React from 'react';
import Menu from '../../Components/Menu';
import styles from './Moderation.module.css';
import { Button } from 'antd'; 

function Moderation() {
  const isModerator = false;

  const handleBecomeModerator = () => {
    console.log('User wants to become a moderator');
  };

  return (
    <div className={styles.page}>
      <Menu currentPage="Moderation" />
      {isModerator ? (
        <div>You are already a moderator.</div>
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