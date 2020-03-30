import React from 'react'
import Pokeball from 'components/UI/Pokeball/Pokeball'
import Logo from 'components/UI/Logo/Logo'
import { NAV } from 'constants.js'
import heroBg from 'assets/images/hero-bg.jpg'
import styles from './HomeHero.module.scss'

const Hero = () => {
  return (
    <div className={ styles.Hero } style={{ backgroundImage: `url(${ heroBg })` }}>
      <div className="wrapper">
        <div className={ styles.HeroLogo }>
          <Logo />
        </div>
        <div className={ styles.HeroWrapper }>
          { NAV.map(nav => <Pokeball key={ nav.id } link={ nav.link } text={ nav.text } color={ nav.color } />) }
        </div>
      </div>
    </div>
  )
}

export default Hero
