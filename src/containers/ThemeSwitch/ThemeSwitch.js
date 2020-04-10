import React, { PureComponent } from 'react'
import Sun from 'components/UI/Icons/Sun'
import Moon from 'components/UI/Icons/Moon'
import { setLS, getLS } from 'constants.js'
import styles from './ThemeSwitch.module.scss'

export default class ThemeSwitch extends PureComponent {

  state = {
    sun: true,
    moon: false
  }

  handleSwitchToMoon = () => {
    document.body.classList.add('moon')
    setLS('theme', 'moon')

    this.setState({
      sun: false,
      moon: true
    })
  }

  handleSwitchToSun = () => {
    document.body.classList.remove('moon')
    setLS('theme', 'sun')

    this.setState({
      sun: true,
      moon: false
    })
  }

  componentDidMount = () => {
    const theme = getLS('theme')

    switch (theme) {
      case 'moon':
        this.handleSwitchToMoon()
        break
      
      case 'sun':
      default:
        this.handleSwitchToSun()
        break
    }
  }

  render() {
    const { sun, moon } = this.state

    return (
      <div className={ styles.ThemeSwitch }>
        <div className={ `${ styles.Sun } ${ sun && styles.Active }` } onClick={ this.handleSwitchToMoon }>
          <Sun />
        </div>
        <div className={ `${ styles.Moon } ${ moon && styles.Active }` } onClick={ this.handleSwitchToSun }>
          <Moon />
        </div>
      </div>
    )
  }
}
