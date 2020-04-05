import React, { Component } from 'react'
import Loading from 'containers/Loading/Loading'
import ErrorMessage from 'components/UI/ErrorMessage/ErrorMessage'

const withLoadingAndError = WrappedComponent => class extends Component {

  state = {
    loading: true,
    error: {
      errorStatus: false,
      errorMessage: ''
    }
  }

  handleShowOverflow = () => {
    document.body.style.overflow = 'visible';
  }

  handleHideOverflow = () => {
    document.body.style.overflow = 'hidden';
  }

  handleShowLoading = () => {
    this.handleHideOverflow()
    this.setState({ 
      loading: true
    })
  }

  handleHideLoading = () => {
    this.handleShowOverflow()
    this.setState({ 
      loading: false
    })
  }

  handleShowError = (text = '') => {
    this.handleHideOverflow()
    this.setState({ 
      error: {
        errorStatus: true,
        errorMessage: text
      }
    })
  }

  handleHideError = () => {
    this.handleShowOverflow()
    this.setState({ 
      error: {
        errorStatus: false,
        errorMessage: ''
      }
    })
  }

  componentDidMount = () => {
    this.handleHideOverflow()
  }

  render () {
    const { loading, error: { errorStatus, errorMessage } } = this.state
    const newProps = {
      ...this.props,
      showLoading: this.handleShowLoading,
      hideLoading: this.handleHideLoading,
      showError: text => this.handleShowError(text),
      hideError: this.handleHideError
    }

    return (
      <>
        { loading && <Loading /> }
        { errorStatus && <ErrorMessage text={ errorMessage } /> }
        <WrappedComponent { ...newProps } />
      </>
    )
  }
}

export default withLoadingAndError