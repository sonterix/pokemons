import React, { Component } from 'react'
import Sun from 'components/UI/Icons/Sun'
import Moon from 'components/UI/Icons/Moon'
import { setLS, getLS } from 'constants.js'
import styles from './ThemeSwitch.module.scss'

export default class ThemeSwitch extends Component {

  constructor (props) {
    super(props)

    this.theme = getLS('theme')

    switch (this.theme) {
      case 'moon':
        this.state = {
          sun: false,
          moon: true
        }
        this.handleSwitchToMoon()
        break
      
      case 'sun':
        this.state = {
          sun: true,
          moon: false
        }
        this.handleSwitchToSun()
        break
      
      default:
        this.state = {
          sun: true,
          moon: false
        }
        break
    }
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
