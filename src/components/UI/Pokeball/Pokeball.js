import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './Pokeball.module.scss'

const Pokeball = ({ link, text, color }) => {
  return (
    <Link to={ link } className={ styles.Pokeball }>
      <div className={ styles.PokeballTop } style={{ backgroundColor: color }}></div>
      <div className={ styles.PokeballMiddle }></div>
      <div className={ styles.PokeballBottom }></div>
      <div className={ styles.PokeballText } style={{ color: color }}>{ text }</div>
    </Link>
  )
}

Pokeball.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string
}

Pokeball.defaultProps = {
  link: '/',
  text: 'Click',
  color: '#f04822'
}

export default Pokeball