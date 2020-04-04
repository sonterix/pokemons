import React, { Component } from 'react'
import { API } from 'constants.js'
import PokemonImages from 'components/Pokemon/PokemonImages/PokemonImages'
import PokemonStats from 'components/Pokemon/PokemonStats/PokemonStats'
import PokemonAbilities from 'components/Pokemon/PokemonAbilities/PokemonAbilities'
import PokemonSpecies from 'components/Pokemon/PokemonSpecies/PokemonSpecies'
import BackButton from 'components/UI/BackButton/BackButton'
import Loading from 'components/UI/Loading/Loading'
import styles from './Pokemon.module.scss'

export default class Pokemon extends Component {

  state = {
    pokemon: {},
    species: {},
    abilities: [],
    loading: true
  }

  handleGetPokemon = async pokemonId => {
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
        abilities: abilitiesData,
        loading: false
      })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount = () => {
    const { location: { state: { pokemonId } } } = this.props
    this.handleGetPokemon(pokemonId || 0)
  }

  componentDidUpdate = (prevProps) => {
    const { location: { state: { pokemonId } } } = this.props
    const { location: { state: { pokemonId: prevPokemonId } } } = prevProps

    if (pokemonId !== prevPokemonId) {
      this.setState({
        loading: true
      })
      this.handleGetPokemon(pokemonId || 0)
    }
  }

  render () {
    const { species, abilities, pokemon, pokemon: { sprites, types }, loading } = this.state

    return (
      <>
        { loading 
          ? <Loading /> 
          : <div className={ `wrapper ${ styles.Pokemon }` }>
            <div className={ styles.PokemonCard }>
              <BackButton link="/pokemons" text="Pokemons" />
              <PokemonImages sprites={ sprites } />
              <PokemonStats pokemon={ pokemon } />
              <PokemonSpecies species={ species } types={ types } />
              <PokemonAbilities abilities={ abilities } />
            </div>
          </div>
        }
      </>
    )
  }
}
