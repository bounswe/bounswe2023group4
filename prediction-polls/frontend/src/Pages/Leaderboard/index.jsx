import React from 'react'
import Menu from '../../Components/Menu'
import styles  from './Leaderboard.module.css'

function Leaderboard() {
  return (
    <div className={styles.page}>
    <Menu currentPage="Leaderboard" />
    <h1>Leaderboard Page</h1>
 </div>
  )
}

export default Leaderboard;