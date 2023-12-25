import React, { useState } from 'react';
import { List, Avatar } from 'antd';
import Menu from '../../Components/Menu';
import styles from './Leaderboard.module.css';
import getProfile from "../../api/requests/profile.jsx";
import { Select } from 'antd';

function Leaderboard() {
  const [rankingList, setRankingList] = useState([]);
  const [selectedTag, setSelectedTag] = useState("Topic");
  const fetchRankings = async (value) => {
    const selected_topic = value;
    setSelectedTag(value);
    const url = `${process.env.REACT_APP_BACKEND_LINK}/profiles/leaderboard/${selected_topic}`;
    const response = await fetch(url);
    const result = await response.json();
    const result_list = result.userList
    result_list.map((user) => {
      const data = getProfile(user.username);
      result_list.image = data.profile_picture;
    })
    setRankingList(result_list);
  }

  const options =
  {
    options:
      [
        {
          value: 'Weather',
          label: 'Weather',
        },
        {
          value: 'Sports',
          label: 'Sports',
        },
        {
          value: 'Economy',
          label: 'Economy',
        },
        {
          value: 'Politics',
          label: 'Politics',
        },
        {
          value: 'Health',
          label: 'Health',
        },
        {
          value: 'Technology',
          label: 'Technology',
        },
        {
          value: 'Science',
          label: 'Science',
        },
        {
          value: 'Disaster',
          label: 'Disaster',
        },
        {
          value: 'Lifestyle',
          label: 'Lifestyle',
        },
        {
          value: 'Art',
          label: 'Art',
        },
        {
          value: 'Environment',
          label: 'Environment',
        },
        {
          value: 'Education',
          label: 'Education',
        },
        {
          value: 'Entertainment',
          label: 'Entertainment',
        },

      ]
  };

  return (
    <div className={styles.page} >
      <Menu currentPage="Leaderboard" />
      <div>
        <Select
          className={styles.selectionList}
          options={options.options}
          onChange={fetchRankings}
          value={selectedTag}
        >
          Tags
        </Select>
        <div className={styles.listContainer} >
          <div className={styles.listHeader}>
            <div className={styles.rankHeader}>Rank</div>
            <div className={styles.usernameHeader}>USERNAME</div>
            <div className={styles.pointsHeader}>POINT</div>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={rankingList}
            renderItem={(item, index) => (
              <List.Item className={styles.listItem}>
                <Avatar className={
                  index == 0 ? styles.rankGold : (index == 1 ? styles.rankSilver : (index == 2 ? styles.rankBronze : styles.rank))
                }>{index + 1}</Avatar>
                <Avatar className={styles.avatar}>
                  {item.username[0].toLocaleUpperCase()}
                </Avatar>
                <span className={styles.username}>{item.username}</span>
                <span className={styles.points}>{item.amount}</span>
              </List.Item>
            )}
            className={styles.leaderboardList}
          />
        </div >
      </div>

    </div >
  );
}

export default Leaderboard;
