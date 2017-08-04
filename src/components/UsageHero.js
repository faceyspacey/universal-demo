import React from 'react'
import styles from '../css/UsageHero'

export default ({ page }) =>
  <div className={styles.usageHero}>
    <img src='https://cdn.reactlandia.com/faceyspacey-white-logo.png' />

    <div>
      <h2>
        {'universal(props => import(`./${props.page}`))'}
      </h2>
      <h3>
        {"<UniversalComponent page='"}
        {page}
        {"' />"}
      </h3>
    </div>
  </div>
