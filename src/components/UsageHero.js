import React from 'react'
import styles from '../css/UsageHero'

export default ({ example }) =>
  <div className={styles.usageHero}>
    <img src='https://cdn.reactlandia.com/faceyspacey-white-logo.png' />

    <div>
      <h2>
        {'universal(props => import(`./examples/${props.example}`))'}
      </h2>
      <h3>
        {"<UniversalComponent example='"}
        {example}
        {"' />"}
      </h3>
    </div>
  </div>
