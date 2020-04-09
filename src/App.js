import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Header from 'containers/Header/Header'
import Footer from 'components/Footer/Footer'

class App extends Component {

  state = {
    homePage: true
  }

  handleHomePageCheck = () => {
    const { location: { pathname } } = this.props
    const { homePage } = this.state

    if (pathname === '/' && !homePage) {
      this.setState({
        homePage: true
      })
    } else if (pathname !== '/' && homePage) {
      this.setState({
        homePage: false
      })
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.handleHomePageCheck()
    }, 1000);
  }

  componentDidUpdate = () => {
    this.handleHomePageCheck()
  }

  render () {
    const { children } = this.props
    const { homePage } = this.state
    
    return (
      <>
        { !homePage && <Header /> }
        { children }
        { !homePage && <Footer /> }
      </>
    )
  }
}

export default withRouter(App);
