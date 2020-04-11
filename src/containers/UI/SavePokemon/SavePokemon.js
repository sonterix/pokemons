import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { setLS, getLS } from 'constants.js'
import styles from './SavePokemon.module.scss'

export default class SavePokemon extends PureComponent {

  constructor (props) {
    super(props)

    const { pokemonId } = props
    const pokemonSaved = this.handleCheckForSavedPokemon(pokemonId)
    this.state = { saved: pokemonSaved }
  }

  static propTypes = {
    pokemonId: PropTypes.number
  }

  static defaultProps = {
    pokemonId: 0
  }

  handleCheckForSavedPokemon = id => {
    if (id !== 0) {
      const savedPokemons = getLS('savedPokemons')
      let pokemonSaved = false

      if (savedPokemons) {
        pokemonSaved = JSON.parse(savedPokemons).includes(id)
      }

      return pokemonSaved
    }
  }

  handleSavePokemon = id => {
    if (id !== 0) {
      const savedPokemons = getLS('savedPokemons')

      if (savedPokemons) {
        const jsonPokemons = JSON.parse(savedPokemons)
        jsonPokemons.push(id)
        setLS('savedPokemons', JSON.stringify(jsonPokemons))
      } else {
        const jsonPokemons = [id]
        setLS('savedPokemons', JSON.stringify(jsonPokemons))
      }

      this.setState({
        saved: true
      })
    }
  }

  handleRemovePokemon = id => {
    if (id !== 0) {
      const savedPokemons = getLS('savedPokemons')
      
      if (savedPokemons) {
        const jsonPokemons = JSON.parse(savedPokemons).filter(element => element !== id)
        setLS('savedPokemons', JSON.stringify(jsonPokemons))
      }

      this.setState({
        saved: false
      })
    }
  }

  componentDidUpdate = prevProps => {
    const { pokemonId: prevPokemonId } = prevProps
    const { pokemonId } = this.props

    if (pokemonId !== prevPokemonId) {
      this.setState({
        saved: this.handleCheckForSavedPokemon(pokemonId)
      })
    }
  }

  render () {
    const { saved } = this.state
    const { pokemonId } = this.props

    return (
      <>
        { saved 
          ? <button className={ `btn ${ styles.SavePokemon } ${ styles.Remove }` } onClick={ () => this.handleRemovePokemon(pokemonId) }>Remove</button>
          : <button className={ `btn ${ styles.SavePokemon } ${ styles.Save }` } onClick={ () => this.handleSavePokemon(pokemonId) }>Save</button>
        }
      </>
    )
  }
}
