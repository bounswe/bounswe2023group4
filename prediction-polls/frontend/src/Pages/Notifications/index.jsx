import React from 'react'
import Menu from '../../Components/Menu'
import styles from './Notifications.module.css'
function Notifications() {
  return (
    <div className={styles.page}>
    <Menu currentPage="Notifications" />
    <h1>Notifications Page</h1>
 </div>
  )
}

export default Notifications;