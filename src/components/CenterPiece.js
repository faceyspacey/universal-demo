import React from 'react'
import styles from '../css/CenterPiece'

export default ({ page }) => (
  <div className={styles.centerPiece}>
    <img src='https://cdn.reactlandia.com/faceyspacey-white-logo.png' />

    <div>
      <h2>{'universal(props => import(`./${props.page}`))'}</h2>
      <h3>{"<UniversalComponent page='"}{page}{"' />"}</h3>
    </div>
  </div>
)
