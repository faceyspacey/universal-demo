import React from 'react'
import styles from '../css/Error'

export default ({ error }) =>
  <div className={styles.container}>
    <span>
      ERROR!! -- {error.message}
    </span>
  </div>
