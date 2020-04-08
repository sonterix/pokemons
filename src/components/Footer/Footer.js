import React from 'react'
import { Link } from 'react-router-dom'
import Logo from 'components/UI/Logo/Logo'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={ styles.Footer }>
      <div className="wrapper">
        <div className={ styles.FooterWrapper }>
          <Link to="/" className={ styles.FooterLogo }>
            <Logo />
          </Link>
          <div className={ styles.Copyright }>
            Copyright © 2020 - Based on
            <a href="https://pokeapi.co/docs/v2.html" target="_blank" rel="noopener noreferrer">
              Pokemon API
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
