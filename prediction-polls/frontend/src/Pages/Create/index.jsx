import React from 'react'
import Menu from '../../Components/Menu'
import styles from './Create.module.css'

function Create() {
  return (
    <div className={styles.page}>
       <Menu currentPage="Create" />
       <h1>Create Page</h1>
    </div>
  )
}

export default Create;