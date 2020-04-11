import React, { PureComponent } from 'react'
import Sun from 'components/UI/Icons/Sun'
import Moon from 'components/UI/Icons/Moon'
import { setLS, getLS } from 'constants.js'
import styles from './ThemeSwitch.module.scss'

export default class ThemeSwitch extends PureComponent {

  constructor (props) {
    super(props)

    const theme = getLS('theme')
    
    switch (theme) {
      case 'moon':
        this.state = { theme: 'moon' }
        document.body.classList.add('moon')
        break
      
      case 'sun':
      default:
        this.state = { theme: 'sun' }
        break
    }
  }


  handleSwitchToMoon = () => {
    document.body.classList.add('moon')
    setLS('theme', 'moon')

    this.setState({
      theme: 'moon'
    })
  }

  handleSwitchToSun = () => {
    document.body.classList.remove('moon')
    setLS('theme', 'sun')

    this.setState({
      theme: 'sun'
    })
  }

  render() {
    const { theme } = this.state

    return (
      <div className={ styles.ThemeSwitch }>
        <div className={ `${ styles.Sun } ${ theme === 'sun' && styles.Active }` } onClick={ this.handleSwitchToMoon }>
          <Sun />
        </div>
        <div className={ `${ styles.Moon } ${ theme === 'moon' && styles.Active }` } onClick={ this.handleSwitchToSun }>
          <Moon />
        </div>
      </div>
    )
  }
}
