import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './BackButton.module.scss'

const BackButton = ({ link, text }) => <Link to={ link } className={ styles.BackButton }>{ text }</Link>

BackButton.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string
}

BackButton.defaultProps = {
  link: '/',
  text: 'Back'
}

export default BackButton
