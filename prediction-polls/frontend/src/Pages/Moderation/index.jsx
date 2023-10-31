import React from 'react'
import Menu from '../../Components/Menu'
import styles from './Moderation.module.css'

function Moderation() {
  return (
    <div className={styles.page}>
    <Menu currentPage="Moderation" />
    <h1>Moderation Page</h1>
 </div>
  )
}

export default Moderation;