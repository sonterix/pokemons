import React from 'react'
import PropTypes from 'prop-types'
import styles from './Hero.module.scss'

const Hero = ({ text, backgroundImg }) => {
  return (
    <div className={ styles.Hero } style={{ backgroundImage: `url(${ backgroundImg })` }}>
      <div className="wrapper">
        <div className={ styles.HeroText }>{ text }</div>
      </div>
    </div>
  )
}

Hero.propTypes = {
  text: PropTypes.string,
  backgroundImg: PropTypes.string
}

Hero.defaultProps = {
  text: '',
  backgroundImg: ''
}

export default Hero
