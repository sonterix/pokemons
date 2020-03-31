import React from 'react'
import styles from './Loading.module.scss'

const Loading = () => {
  return (
    <div className={ styles.Loading }>
      <div className={ styles.Pokeball }>
        <div className={ styles.PokeballTop }></div>
        <div className={ styles.PokeballMiddle }></div>
        <div className={ styles.PokeballBottom }></div>
      </div>
    </div>
  )
}

export default Loading
