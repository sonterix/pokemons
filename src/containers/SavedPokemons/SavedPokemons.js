import React, { Component } from 'react'
import { getLS, removeLS } from 'constants.js'
import SavedPokemonsActions from 'components/SavedPokemonsActions/SavedPokemonsActions'
import PokemonsByChunks from 'containers/PokemonsByChunks/PokemonsByChunks'
import NoFound from 'components/UI/NotFound/NotFound'
import styles from './SavedPokemons.module.scss'

export default class SavedPokemons extends Component {
  
  constructor (props) {
    super(props)

    const savedPokemons = getLS('savedPokemons')

    if (savedPokemons && savedPokemons.length > 0) {
      const pokemonsLikeFromAPI = JSON.parse(savedPokemons).map(pokemonId => {
        return { url: `/${ pokemonId }/` }
      })

      this.state = {
        pokemons: pokemonsLikeFromAPI
      }
    } else {
      this.state = {
        pokemons: []
      }
    }
  }

  handleRemoveAll = () => {
    removeLS('savedPokemons')

    this.setState({
      pokemons: []
    })
  }

  render () {
    const { pokemons } = this.state

    return (
      <div className={ styles.SavedPokemons }>
        <div className="wrapper">
          <SavedPokemonsActions removeAll={ this.handleRemoveAll } disabled={ pokemons.length === 0 } />
        </div>
        { pokemons.length > 0 ? <PokemonsByChunks pokemons={ pokemons } /> : <NoFound /> }
      </div>
    )
  }
}
