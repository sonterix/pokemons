import React from 'react'
import { createPortal } from 'react-dom'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './ErrorMessage.module.scss'

const ErrorMessage = ({ history, text }) => {
  
  const handleGoBack = event => {
    event.preventDefault()
    history.goBack()
  }

  return (
    createPortal(
      <div className={ styles.ErrorMessage }>
        <div className={ styles.ErrorMessageModal }>
          <h3>Somethings went wrong..</h3>
          <span>{ text }</span>
          <p>
            <Link to="#" onClick={ handleGoBack }>Go back</Link> or <Link to="/contact">Contuct us</Link></p>
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
  text: 'Error..'
}

export default withRouter(ErrorMessage)
