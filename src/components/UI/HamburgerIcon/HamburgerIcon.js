import React from 'react'
import PropTypes from 'prop-types'
import styles from './HamburgerIcon.module.scss'

const HamburgerIcon = ({ click, isOpen }) => {
  return (
    <div className={ `${ styles.HamburgerIcon } ${ isOpen ? styles.Active : '' }` } onClick={ click }>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

HamburgerIcon.propTypes = {
  click: PropTypes.func,
  isOpen: PropTypes.bool
}

HamburgerIcon.defaultProps = {
  click: () => {},
  isOpen: false
}

export default HamburgerIcon
