import React from 'react'
import Menu from '../../Components/Menu'
import styles from './Profile.module.css'

function Profile() {
  return (
    <div className={styles.page}>
    <Menu currentPage="Profile" />
    <h1>Profile Page</h1>
 </div>
  )
}

export default Profile;