import React, { Component } from 'react'
import { API } from 'constants.js'
import Hero from 'components/UI/Hero/Hero'
import withLoadingAndError from 'hoc/withLoadingAndError'
import pokemonImage from 'assets/images/pokemon-page-bg.jpg'
import PokemonsByChunks from 'containers/PokemonsByChunks/PokemonsByChunks'

class Habitat extends Component {

  state = {
    typeName: '',
    pokemons: []
  }

  handleGetHabitatPokemons = async habitatId => {
    const { hideLoading } = this.props
    const { link, habitat } = API

    try {
      const pokemonsResponse = await fetch(`${ link }${ habitat }${ habitatId }`)
      const pokemonsData = await pokemonsResponse.json()
      const { name: typeName, pokemon_species } = pokemonsData

      this.setState ({
        typeName: typeName,
        pokemons: pokemon_species
      }, hideLoading())
    } catch (error) {
      const { showError } = this.props

      hideLoading()
      showError('Error with getting current Habitat Pokemons data')
    }
  }

  componentDidMount = () => {
    const { location } = this.props

    try {
      const { state: { itemId } } = location
      this.handleGetHabitatPokemons(itemId || 0)
    } catch(error) {
      const { hideLoading, showError } = this.props
      hideLoading()
      showError('Error with getting Habitat data')
    }
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

export default withLoadingAndError(Habitat)