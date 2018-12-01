import React from 'react'
// @ts-ignore
import styles from '../css/Loading'

export default ({ page }) => (
  <div className={styles[page]}>
    <div className={styles.spinner}>
      <div />
    </div>
  </div>
)
