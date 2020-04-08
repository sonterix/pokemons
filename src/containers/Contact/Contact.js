import React, { Component } from 'react'
import Hero from 'components/UI/Hero/Hero'
import contactBg from 'assets/images/contact-bg.png'
import styles from './Contact.module.scss'
import withPopup from 'hoc/withPopup'

class Contact extends Component {
  state = {
    name: '',
    nameError: false,
    phone: '',
    email: '',
    emailError: false,
    text: '',
    textError: false,
    submitDdisabled: true
  }

  handleName = event => {
    const { target: { value } } = event

    if (value.length > 1) {
      this.setState({
        name: value,
        nameError: false
      }, this.handleSubmitStatus())
    } else {
      this.setState({
        name: value,
        nameError: true
      }, this.handleSubmitStatus())
    }
  }
  
  handlePhone = event => {
    const { target: { value } } = event

    if (!/[^0-9+]/g.test(value)) {
      this.setState({
        phone: value
      })
    }
  }
  
  handleEmail = event => {
    const { target: { value } } = event

    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      this.setState({
        email: value,
        emailError: false
      }, this.handleSubmitStatus())
    } else {
      this.setState({
        email: value,
        emailError: true
      }, this.handleSubmitStatus())
    }
  }
  
  handleText = event => {
    const { target: { value } } = event

    if (value.length > 5) {
      this.setState({
        text: value,
        textError: false
      }, this.handleSubmitStatus())
    } else {
      this.setState({
        text: value,
        textError: true
      }, this.handleSubmitStatus())
    }
  }

  handleSubmitStatus = () => {
    const { name, nameError, email, emailError, text, textError } = this.state
    const fieldsError = nameError || emailError || textError
    const fieldsLengthError = name.length === 0 || email.length === 0 || text.length === 0

    if (fieldsError || fieldsLengthError) {
      this.setState({ 
        submitDdisabled: true
      })
    } else {
      this.setState({ 
        submitDdisabled: false
      })
    }
  }

  handleSubmited = event => {
    event.preventDefault()

    this.setState({
      name: '',
      nameError: false,
      phone: '',
      email: '',
      emailError: false,
      text: '',
      textError: false,
      submitDdisabled: true
    }, () => {
      const { showPopup } = this.props
      showPopup('Successfully submitted!')
    })
  }

  render () {
    const { name, nameError, phone, email, emailError, text, textError, submitDdisabled } = this.state

    return (
      <>
        <Hero text="Contact us" backgroundImg={ contactBg } />
        <div className={ `wrapper ${ styles.ContactForm }` }>
          <form action="/contact/submit" method="POST">
            <label className={ nameError ? styles.Error : '' }>
              <span>Name</span>
              <input type="text" name="name" value={ name } onChange={ this.handleName } />
            </label>
            <label>
              <span>Phone</span>
              <input type="tel" name="phone" value={ phone } onChange={ this.handlePhone } />
            </label>
            <label className={ emailError ? styles.Error : '' }>
              <span>Email</span>
              <input type="email" name="email" value={ email } onChange={ this.handleEmail } />
            </label>
            <label className={ textError ? styles.Error : '' }>
              <span>What a deal?</span>
              <textarea rows="5" name="text" value={ text } onChange={ this.handleText } />
            </label>
            <button type="submit" className="btn" disabled={ submitDdisabled } onClick={ this.handleSubmited }>Submit</button>
          </form>
        </div>
      </>
    )
  }
}

export default withPopup(Contact)