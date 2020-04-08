import React from 'react'
import { Component } from 'react'
import Popup from 'components/UI/Popup/Popup'
import { showOverflow, hideOverflow } from 'constants.js'

const withPopup = WrappedComponent => class extends Component {

  state = {
    show: false,
    text: ''
  }

  handleShowPopup = text => {
    hideOverflow()
    this.setState({
      show: true,
      text: text
    })
  }

  handleHidePopup = () => {
    showOverflow()
    this.setState({
      show: false,
      text: ''
    })
  }

  render () {
    const { show, text } = this.state
    const newProps = {
      ...this.props,
      showPopup: text => this.handleShowPopup(text)
    }

    return (
      <>
        { show && <Popup hidePopup={ this.handleHidePopup } text={ text } /> }
        <WrappedComponent { ...newProps } />
      </>
    )
  }
}

export default withPopup