import React, { Component } from 'react'
import ThemeSwitch from 'containers/ThemeSwitch/ThemeSwitch'
import HamburgerIcon from 'components/UI/HamburgerIcon/HamburgerIcon'
import HeaderNav from 'components/HeaderNav/HeaderNav'
import styles from './Header.module.scss'

export default class Header extends Component {

  state = {
    showHerader: false,
    navOpen: false
  }

  handleNavToggle = () => {
    this.setState((prevProps) => {
      return { navOpen: !prevProps.navOpen }
    })
  }

  handleNavClose = () => {
    this.setState({
      navOpen: false
    })
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        showHerader: true,
      })
    }, 1000);
  }

  render () {
    const { showHerader, navOpen } = this.state

    return (
      <header className={ showHerader ? styles.Active : '' }>
        <div className={ `${ styles.FloatingHeader } ${ navOpen ? styles.Active : '' }` }>
          <HamburgerIcon click={ this.handleNavToggle } isOpen={ navOpen } />
          <ThemeSwitch />
        </div>
        <HeaderNav click={ this.handleNavClose } isOpen={ navOpen } />
      </header>
    )
  }
}