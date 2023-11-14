import React from 'react'
import Menu from '../../Components/Menu'
import styles  from './Leaderboard.module.css'
import PointsButton from "../../Components/PointsButton";
import pointData from "../../MockData/PointList.json"

function Leaderboard() {
  return (
    <div className={styles.page}>
    <Menu currentPage="Leaderboard" />
    <h1>Leaderboard Page</h1>
    <PointsButton points={pointData.points}/>

 </div>
  )
}

export default Leaderboard;