import React from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import styles from './Popup.module.scss'

const Popup = ({ hidePopup, text }) => {
  return (
    createPortal (
      <div className={ styles.Popup }>
        <div className={ styles.Overlay } onClick={ hidePopup }></div>
        <div className={ styles.Content }>{ text }</div>
      </div>,
      document.body
    )
  )
}

Popup.propTypes = {
  hidePopup: PropTypes.func,
  text: PropTypes.string
}

Popup.defaultProps = {
  hidePopup: () => {},
  text: ''
}

export default Popup
