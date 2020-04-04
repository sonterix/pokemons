import React from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import styles from './ErrorMessage.module.scss'

const ErrorMessage = ({ text }) => {
  return (
    createPortal(
      <div className={ styles.ErrorMessage }>
        <div className={ styles.ErrorMessageModal }>
          <h3>Error</h3>
          <span>{ text }</span>
        </div>
      </div>,
      document.body
    )
  )
}

ErrorMessage.propTypes = {
  text: PropTypes.string
}

ErrorMessage.defaultProps = {
  text: 'Somethings went wrong..'
}

export default ErrorMessage
