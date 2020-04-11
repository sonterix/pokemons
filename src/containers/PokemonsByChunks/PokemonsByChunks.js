import React, { Component } from 'react'
import { API, getIdFromUrl } from 'constants.js'
import Pokedex from 'containers/Pokemons/Pokedex/Pokedex'
import Pagination from 'components/UI/Pagination/Pagination'
import withLoadingAndError from 'hoc/withLoadingAndError'
import styles from './PokemonsByChunks.module.scss'

class PokemonsByChunks extends Component {
  
  state = {
    pokemonsChunks: [],
    pokemonsOnPage: [],
    prevPage: null,
    currentPage: 0,
    nextPage: null
  }

  handleDevideToChunks = array => {
    const chunkSize = 20
    const chunksArray = []

    while (array.length) {
      chunksArray.push(array.splice(0, chunkSize))
    }

    return chunksArray
  }

  handleGetCurrentPokemonsChunk = async (pokemonsChunks, chunk) => {
    try {
      const pokemonsResponse = await Promise.all(pokemonsChunks[chunk].map(pok => {
        const { link, pokemon } = API
        const { url } = pok
        const pokemonId = getIdFromUrl(url)
        
        return fetch(`${ link }${ pokemon }${ pokemonId }`)
      }))
      const pokemonsData = await Promise.all(pokemonsResponse.map(pokemonResponse => pokemonResponse.json()))

      return pokemonsData
    } catch (error) {
      const { showError } = this.props
      showError('Error with current Pokemons page')
      return []
    }
  }

  handleGetPokemons = async pokemons => {
    const { currentPage } = this.state
    const { hideLoading, showError } = this.props

    try {
      const pokemonsChunks = this.handleDevideToChunks(pokemons)
      const pokemonsOnPage = await this.handleGetCurrentPokemonsChunk(pokemonsChunks, currentPage)

      this.setState({
        pokemonsChunks: pokemonsChunks,
        pokemonsOnPage: pokemonsOnPage,
        nextPage: pokemonsChunks.length > 1 ? 1 : null
      }, hideLoading())
    } catch (error) {
      hideLoading()
      showError('Error with getting current Type Pokemons data')
    }
  }

  handlePagination = async action => {
    const { pokemonsChunks, prevPage, currentPage, nextPage } = this.state
    const { showLoading, hideLoading } = this.props

    switch (action) {
      case ('prev'):
        if (prevPage !== null) {
          showLoading()
      
          const prev = prevPage === 0 ? null : prevPage - 1
          const current = currentPage - 1
          const next = nextPage === null ? pokemonsChunks.length - 1 : nextPage - 1
          const pokemonsOnPage = await this.handleGetCurrentPokemonsChunk(pokemonsChunks, current)
      
          this.setState({
            pokemonsOnPage: pokemonsOnPage,
            prevPage: prev,
            currentPage: current,
            nextPage: next
          }, hideLoading())
        }
        break

      case ('next'):
        if (nextPage !== null) {
          showLoading()
      
          const prev = prevPage === null ? 0 : prevPage + 1
          const current = currentPage + 1
          const next = pokemonsChunks.length === nextPage ? null : nextPage + 1
          const pokemonsOnPage = await this.handleGetCurrentPokemonsChunk(pokemonsChunks, current)
      
          this.setState({
            pokemonsOnPage: pokemonsOnPage,
            prevPage: prev,
            currentPage: current,
            nextPage: next
          }, hideLoading())
        }
        break
        
      default:
        break
    }
  }

  componentDidMount = () => {
    const { pokemons } = this.props
    this.handleGetPokemons(pokemons)
  }

  render() {
    const { pokemonsOnPage, prevPage, nextPage } = this.state

    return (
      <>
        <div className="wrapper">
          <div className={ styles.PokemonCards }>
            { pokemonsOnPage.map(pokemon => <Pokedex key={ pokemon.id } pokemon={ pokemon } />) }
          </div>
        </div>
        <Pagination
          prev={ prevPage }
          next={ nextPage }
          goPrev={ () => this.handlePagination('prev') }
          goNext={ () => this.handlePagination('next') }
        />
      </>
    )
  }
}

export default withLoadingAndError(PokemonsByChunks)