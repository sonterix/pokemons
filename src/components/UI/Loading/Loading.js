import React from 'react'
import { createPortal } from 'react-dom'
import styles from './Loading.module.scss'

const Loading = () => {
  return (
    createPortal (
      <div className={ styles.Loading }>
        <div className={ styles.Pokeball }>
          <div className={ styles.PokeballTop }></div>
          <div className={ styles.PokeballMiddle }></div>
          <div className={ styles.PokeballBottom }></div>
        </div>
      </div>,
      document.body
    )
  )
}

export default Loading
