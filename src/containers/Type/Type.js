import React, { Component } from 'react'
import { API } from 'constants.js'
import Loading from 'components/UI/Loading/Loading'
import Hero from 'components/UI/Hero/Hero'
import Pokedex from 'containers/Pokemons/Pokedex/Pokedex'
import pokemonImage from 'assets/images/pokemon-page-bg.jpg'
import Pagination from 'components/UI/Pagination/Pagination'
import styles from './Type.module.scss'

export default class Type extends Component {

  state = {
    pokemonsAll: [],
    pokemonsChunks: [],
    pokemons: [],
    prevPage: null,
    currentPage: 0,
    nextPage: null,
    loading: true
  }

  handleDevideToChunks = array => {
    const chunkSize = 20
    const chunksArray = []

    while (array.length) {
      chunksArray.push(array.splice(0, chunkSize))
    }

    return chunksArray
  }

  handleGetTypePokemons = async typeId => {
    const { currentPage } = this.state
    const { link, type } = API

    try {
      const pokemonsResponse = await fetch(`${ link }${ type }${ typeId }`)
      const pokemonsData = await pokemonsResponse.json()
      const { pokemon } = pokemonsData
      const pokemonsChunks = this.handleDevideToChunks(pokemon)
      const pokemons = await this.handleGetCurrentPokemonsChunk(pokemonsChunks, currentPage)

      this.setState({
        pokemonsAll: pokemon,
        pokemonsChunks: pokemonsChunks,
        pokemons: pokemons,
        nextPage: pokemonsChunks.length > 0 && 1,
        loading: false
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleGetCurrentPokemonsChunk = async (pokemonsChunks, chunk) => {
    try {
      const pokemonsResponse = await Promise.all(pokemonsChunks[chunk].map(pokemon => {
        const { pokemon: { url } } = pokemon
        return fetch(url)
      }))
      const pokemonsData = await Promise.all(pokemonsResponse.map(pokemonResponse => pokemonResponse.json()))

      return pokemonsData
    } catch (error) {
      console.log(error)
      return []
    }
  }

  handlePagination = async action => {
    const { pokemonsChunks, prevPage, currentPage, nextPage } = this.state

    switch (action) {
      case ('prev'):
        if (prevPage !== null) {
          this.setState({
            loading: true
          })
      
          const prev = prevPage === 0 ? null : prevPage - 1
          const current = currentPage - 1
          const next = nextPage === null ? pokemonsChunks.length - 1 : nextPage - 1
          const pokemons = await this.handleGetCurrentPokemonsChunk(pokemonsChunks, current)
      
          this.setState({
            pokemons: pokemons,
            prevPage: prev,
            currentPage: current,
            nextPage: next,
            loading: false
          })
        }
        
        break

      case ('next'):
        if (nextPage !== null) {
          this.setState({
            loading: true
          })
      
          const prev = prevPage === null ? 0 : prevPage + 1
          const current = currentPage + 1
          const next = pokemonsChunks.length === nextPage ? null : nextPage + 1
          const pokemons = await this.handleGetCurrentPokemonsChunk(pokemonsChunks, current)
      
          this.setState({
            pokemons: pokemons,
            prevPage: prev,
            currentPage: current,
            nextPage: next,
            loading: false
          })
        }

        break
        
      default:
        break
    }
  }

  componentDidMount = () => {
    const { location: { state: { typeId } } } = this.props
    this.handleGetTypePokemons(typeId)
  }

  render() {
    const { loading, pokemons, prevPage, nextPage } = this.state
    const { location: { state: { type } } } = this.props

    return (
      <>
      { loading
      ? <Loading />
      : <>
        <Hero backgroundImg={ pokemonImage } text={ `${ type } Pokemons` } />
        <div className="wrapper">
          <div className={ styles.TypePokemonCards }>
            { pokemons.map(pokemon => <Pokedex key={ pokemon.id } pokemon={ pokemon } />) }
          </div>
        </div>
        <Pagination
          prev={ prevPage }
          next={ nextPage }
          goPrev={ () => this.handlePagination('prev') }
          goNext={ () => this.handlePagination('next') }
        />
      </>
      }
      </>
    )
  }
}
