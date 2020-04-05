import React, { Component } from 'react'
import { API } from 'constants.js'
import Hero from 'components/UI/Hero/Hero'
import withLoadingAndError from 'hoc/withLoadingAndError'
import pokemonImage from 'assets/images/pokemon-page-bg.jpg'
import PokemonsByChunks from 'containers/PokemonsByChunks/PokemonsByChunks'

class Color extends Component {

  state = {
    typeName: '',
    pokemons: []
  }

  handleGetColorPokemons = async colorId => {
    const { hideLoading } = this.props
    const { link, color } = API

    try {
      const pokemonsResponse = await fetch(`${ link }${ color }${ colorId }`)
      const pokemonsData = await pokemonsResponse.json()
      const { name: typeName, pokemon_species } = pokemonsData

      this.setState ({
        typeName: typeName,
        pokemons: pokemon_species
      }, hideLoading())
    } catch (error) {
      const { showError } = this.props

      hideLoading()
      showError('Error with getting current Color Pokemons data')
    }
  }

  componentDidMount = () => {
    const { location: { state: { itemId } } } = this.props
    this.handleGetColorPokemons(itemId)
  }

  render() {
    const { typeName, pokemons } = this.state

    return (
      <>
        <Hero backgroundImg={ pokemonImage } text={ `${ typeName } Pokemons` } />
        { pokemons.length > 0 && <PokemonsByChunks pokemons={ pokemons } /> }
      </>
    )
  }
}

export default withLoadingAndError(Color)