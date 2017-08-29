import React from 'react'
import styles from '../css/Loading'

export default ({ example }) =>
  <div className={styles[example]}>
    <div className={styles.spinner}>
      <div />
    </div>
  </div>
