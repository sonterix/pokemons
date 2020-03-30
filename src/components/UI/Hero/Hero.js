import React from 'react'
import PropTypes from 'prop-types'
import styles from './Hero.module.scss'

const Hero = ({ backgroundImg }) => {
  return (
    <div className={ styles.Hero } style={{ backgroundImage: `url(${ backgroundImg })` }}>
      
    </div>
  )
}

Hero.propTypes = {
  backgroundImg: PropTypes.string
}

Hero.defaultProps = {
  backgroundImg: ''
}

export default Hero
