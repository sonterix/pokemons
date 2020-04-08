import React, { Component } from 'react'
import { API } from 'constants.js'
import Hero from 'components/UI/Hero/Hero'
import NoFound from 'components/UI/NotFound/NotFound'
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
    const { location } = this.props

    try {
      const { state: { typeId } } = location
      this.handleGetTypePokemons(typeId || 0)
    } catch(error) {
      const { hideLoading, showError } = this.props
      hideLoading()
      showError('Error with getting Type data')
    }
  }

  render() {
    const { typeName, pokemons } = this.state

    return (
      <>
        <Hero backgroundImg={ pokemonImage } text={ `${ typeName } Pokemons` } />
        { pokemons.length > 0 ? <PokemonsByChunks pokemons={ pokemons } /> : <NoFound /> }
      </>
    )
  }
}

export default withLoadingAndError(Type)