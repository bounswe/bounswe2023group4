import React from 'react'
import Menu from '../../Components/Menu'
import styles from './Settings.module.css'

function Settings() {
  return (
    <div className={styles.page}>
    <Menu currentPage="Settings" />
    <h1>Settings Page</h1>
 </div>
  )
}

export default Settings;