import React from 'react'
import styles from './PokedexCamera.module.scss'

const PokedexCamera = () => {
  return (
    <div className={ styles.PokedexCamera }>
      <div className={ styles.PokedexCameraItem }></div>
      <div className={ styles.PokedexLights }>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default PokedexCamera
