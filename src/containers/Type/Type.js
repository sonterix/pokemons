import React, { Component } from 'react'
import { API } from 'constants.js'
import Hero from 'components/UI/Hero/Hero'
import withLoadingAndError from 'hoc/withLoadingAndError'
import pokemonImage from 'assets/images/pokemon-page-bg.jpg'
import PokemonsByChunks from 'containers/PokemonsByChunks/PokemonsByChunks'

class Type extends Component {

  state = {
    typeName: '',
    pokemons: []
  }

  handleGetTypePokemons = async typeId => {
    const { hideLoading } = this.props
    const { link, type } = API

    try {
      const pokemonsResponse = await fetch(`${ link }${ type }${ typeId }`)
      const pokemonsData = await pokemonsResponse.json()
      const { name: typeName, pokemon } = pokemonsData
      const pokemnons = pokemon.map(pok => {
        const { pokemon: currentPokemon } = pok
        return currentPokemon
      })

      this.setState ({
        typeName: typeName,
        pokemons: pokemnons
      }, hideLoading())
    } catch (error) {
      const { showError } = this.props

      hideLoading()
      showError('Error with getting current Type Pokemons data')
    }
  }

  componentDidMount = () => {
    const { location: { state: { typeId } } } = this.props
    this.handleGetTypePokemons(typeId)
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

export default withLoadingAndError(Type)