import React, { PureComponent } from 'react'
import Loading from 'containers/UI/Loading/Loading'
import ErrorMessage from 'components/UI/ErrorMessage/ErrorMessage'
import { showOverflow, hideOverflow } from 'constants.js'

const withLoadingAndError = WrappedComponent => class extends PureComponent {

  state = {
    loading: true,
    error: {
      errorStatus: false,
      errorMessage: ''
    }
  }

  handleShowLoading = () => {
    hideOverflow()
    this.setState({ 
      loading: true
    })
  }

  handleHideLoading = () => {
    showOverflow()
    this.setState({ 
      loading: false
    })
  }

  handleShowError = (text = '') => {
    hideOverflow()
    this.setState({ 
      error: {
        errorStatus: true,
        errorMessage: text
      }
    })
  }

  handleHideError = () => {
    showOverflow()
    this.setState({ 
      error: {
        errorStatus: false,
        errorMessage: ''
      }
    })
  }

  componentDidMount = () => {
    hideOverflow()
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