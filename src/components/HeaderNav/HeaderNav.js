import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { NAV } from 'constants.js'
import styles from './HeaderNav.module.scss'

const HeaderNav = ({ click, isOpen }) => {
  return (
    <nav className={ `${ styles.Nav } ${ isOpen ? styles.Active : '' }` }>
      <ul>
        { NAV.map(nav => {
          const { id, link, text } = nav
          return ( 
            <li key={ id }>
              <Link to={ link } onClick={ click }>
                { text }
              </Link>
            </li>
          )
        }) }
      </ul>
    </nav>
  )
}

HeaderNav.propTypes = {
  click: PropTypes.func,
  isOpen: PropTypes.bool
}

HeaderNav.defaultProps = {
  click: () => {},
  isOpen: false
}

export default HeaderNav
