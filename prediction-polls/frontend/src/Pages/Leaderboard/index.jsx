import React from 'react';
import { List, Avatar } from 'antd';
import Menu from '../../Components/Menu';
import styles from './Leaderboard.module.css';
import PointsButton from "../../Components/PointsButton";
import pointData from "../../MockData/PointList.json";
import leaderboardData from "../../MockData/LeaderboardList.json";
import { Select } from 'antd';

function Leaderboard() {
  const listData = Object.values(leaderboardData).flat();

  return (
    <div className={styles.page}>
      <Menu currentPage="Leaderboard" />
      <Select
        showSearch
        style={{
          width: 200,
          marginLeft: 20,
          marginTop: 40,
        }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={[
          {
            value: '1',
            label: 'E-Sport',
          },
          {
            value: '2',
            label: 'Technology',
          },
          {
            value: '3',
            label: 'Earthquake',
          },
          {
            value: '4',
            label: 'Science',
          },
          {
            value: '5',
            label: 'Art',
          },
          {
            value: '6',
            label: 'Politics',
          },
        ]}
      />
      <PointsButton points={pointData.points} />
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <div className={styles.rankHeader}>#</div>
          <div className={styles.usernameHeader}>USERNAME</div>
          <div className={styles.pointsHeader}>POINT</div>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={listData}
          renderItem={(item, index) => (
            <List.Item className={styles.listItem}>
              <div className={styles.rank}>{index + 1}</div>
              <Avatar className={styles.avatar}>
                {item.username[0].toLocaleUpperCase()}
              </Avatar>
              <span className={styles.username}>{item.username}</span>
              <span className={styles.points}>{item.point}</span>
            </List.Item>
          )}
          className={styles.leaderboardList}
        />
      </div>
    </div>
  );
}

export default Leaderboard;
