import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './BackButton.module.scss'

const BackButton = ({ history, link, text }) => {

  const handleGoBack = event => {
    if (link === '#') {
      event.preventDefault()
      history.goBack()
    }
  }

  return <Link to={ link } className={ styles.BackButton } onClick={ handleGoBack }>{ text }</Link>
}

BackButton.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string
}

BackButton.defaultProps = {
  link: '#',
  text: 'Back'
}

export default withRouter(BackButton)
