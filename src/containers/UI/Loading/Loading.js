import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import styles from './Loading.module.scss'

export default class Loading extends Component {
  handleScrollToTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  componentWillUnmount () {
    this.handleScrollToTop()
  }

  render () {
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
}
