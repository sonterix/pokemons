import React, { PureComponent } from 'react'
import { API } from 'constants.js'
import SavePokemon from 'containers/UI/SavePokemon/SavePokemon'
import PokemonImages from 'components/Pokemon/PokemonImages/PokemonImages'
import PokemonStats from 'components/Pokemon/PokemonStats/PokemonStats'
import PokemonAbilities from 'components/Pokemon/PokemonAbilities/PokemonAbilities'
import PokemonSpecies from 'components/Pokemon/PokemonSpecies/PokemonSpecies'
import BackButton from 'components/UI/BackButton/BackButton'
import withLoadingAndError from 'hoc/withLoadingAndError'
import styles from './Pokemon.module.scss'

class Pokemon extends PureComponent {

  state = {
    pokemon: {},
    species: {},
    abilities: []
  }

  handleGetPokemon = async pokemonId => {
    const { hideLoading } = this.props
    const { link, pokemon } = API

    try {
      const pokemonResponse = await fetch(`${ link }${ pokemon }${ pokemonId }`)
      const pokemonData = await pokemonResponse.json()

      const { species: { url }, abilities } = pokemonData

      const [speciesResponse, abilitiesResponses] = await Promise.all([
        fetch(url),
        await Promise.all(abilities.map(ability => {
          const { ability: { url } } = ability
          return fetch(url)
        })
      )])

      const [speciesData, abilitiesData] = [
        await speciesResponse.json(),
        await Promise.all(abilitiesResponses.map(abilitiesResponse => abilitiesResponse.json()))
      ]

      this.setState({
        pokemon: pokemonData,
        species: speciesData,
        abilities: abilitiesData
      }, hideLoading())
    } catch (error) {
      hideLoading()

      const { showError } = this.props
      showError('Error with getting Pokemon data')
    }
  }

  componentDidMount = () => {
    const { location } = this.props

    try {
      const { state: { pokemonId } } = location
      this.handleGetPokemon(pokemonId || 0)
    } catch(error) {
      const { hideLoading, showError } = this.props
      hideLoading()
      showError('Error with getting Pokemon data')
    }
  }

  componentDidUpdate = prevProps => {
    const { showLoading, location } = this.props

    try {
      const { state: { pokemonId } } = location
      const { location: { state: { pokemonId: prevPokemonId } } } = prevProps

      if (pokemonId !== prevPokemonId) {
        showLoading()
        this.handleGetPokemon(pokemonId || 0)
      }
    } catch(error) {
      const { hideLoading } = this.props
      hideLoading()
    }
  }

  render () {
    const { species, abilities, pokemon, pokemon: { id, sprites, types } } = this.state

    return (
      <div className={ `wrapper ${ styles.Pokemon }` }>
        <BackButton />
        <div className={ styles.PokemonCard }>
          <SavePokemon pokemonId={ id } />
          <PokemonImages sprites={ sprites } />
          <PokemonStats pokemon={ pokemon } />
          <PokemonSpecies species={ species } types={ types } />
          <PokemonAbilities abilities={ abilities } />
        </div>
      </div>
    )
  }
}

export default withLoadingAndError(Pokemon)