import React, { Component } from 'react'
import { API } from 'constants.js'
import Hero from 'components/UI/Hero/Hero'
import withLoadingAndError from 'hoc/withLoadingAndError'
import pokemonImage from 'assets/images/pokemon-page-bg.jpg'
import PokemonsByChunks from 'containers/PokemonsByChunks/PokemonsByChunks'

class Shape extends Component {

  state = {
    typeName: '',
    pokemons: []
  }

  handleGetShapePokemons = async shapeId => {
    const { hideLoading } = this.props
    const { link, shape } = API

    try {
      const pokemonsResponse = await fetch(`${ link }${ shape }${ shapeId }`)
      const pokemonsData = await pokemonsResponse.json()
      const { name: typeName, pokemon_species } = pokemonsData

      this.setState ({
        typeName: typeName,
        pokemons: pokemon_species
      }, hideLoading())
    } catch (error) {
      const { showError } = this.props

      hideLoading()
      showError('Error with getting current Shape Pokemons data')
    }
  }

  componentDidMount = () => {
    const { location: { state: { itemId } } } = this.props
    this.handleGetShapePokemons(itemId)
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

export default withLoadingAndError(Shape)