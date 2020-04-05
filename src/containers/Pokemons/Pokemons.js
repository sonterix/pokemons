import React, { Component } from 'react'
import { API } from 'constants.js'
import Pokedex from './Pokedex/Pokedex'
import Hero from 'components/UI/Hero/Hero'
import Pagination from 'components/UI/Pagination/Pagination'
import pokemonImage from 'assets/images/pokemon-page-bg.jpg'
import withLoadingAndError from 'hoc/withLoadingAndError'
import styles from './Pokemons.module.scss'

class Pokemons extends Component {

  state = {
    nextPage: null,
    prevPage: null,
    pokemons: [],
    scrollToTop: false
  }

  handleLoadPokemons = () => {
    const { link, pokemon } = API
    this.handleGetPokemons(`${ link }${ pokemon }`)
  }

  handlePagination = action => {
    const { nextPage, prevPage } = this.state
    const { showLoading } = this.props

    showLoading()

    switch (action) {
      case ('prev'):
        this.handleGetPokemons(prevPage)
        break

      case ('next'):
        this.handleGetPokemons(nextPage)
        break

      default: 
        break
    }
  }

  handleGetPokemons = async link => {
    const { hideLoading } = this.props

    try {
      const pokemonNamesResponse = await fetch(link)
      const pokemonNamesData = await pokemonNamesResponse.json()

      const { next, previous, results } = pokemonNamesData
      const pokemonsResponse = await Promise.all(results.map(result => {
        const { url } = result
        return fetch(url)
      }))
      const pokemonsData = await Promise.all(pokemonsResponse.map(pokemonResponse => pokemonResponse.json()))
      
      this.setState({
        nextPage: next,
        prevPage: previous,
        pokemons: pokemonsData
      }, hideLoading())
    } catch (error) {
      hideLoading()

      const { showError } = this.props
      showError('Error with getting Pokemons data')
    }
  }

  componentDidMount = () => {
    this.handleLoadPokemons()
  }

  render () {
    const { prevPage, nextPage, pokemons } = this.state
    
    return (
      <>
        <Hero backgroundImg={ pokemonImage } text="Pokemons" />
        <div className="wrapper">
          <div className={ styles.PokemonCards }>
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
    )
  }
}

export default withLoadingAndError(Pokemons)