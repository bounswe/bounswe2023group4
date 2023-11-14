import React from 'react'
import Menu from '../../Components/Menu'
import styles  from './EditProfile.module.css'

function EditProfile() {
  return (
    <div className={styles.page}>
    <Menu currentPage="Profile" />
    <h1>Edit Profile Page</h1>
 </div>
  )
}

export default EditProfile;