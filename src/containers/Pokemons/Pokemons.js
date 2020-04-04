import React, { Component } from 'react'
import { API } from 'constants.js'
import Pokedex from './Pokedex/Pokedex'
import Hero from 'components/UI/Hero/Hero'
import Loading from 'components/UI/Loading/Loading'
import Pagination from 'components/UI/Pagination/Pagination'
import pokemonImage from 'assets/images/pokemon-page-bg.jpg'
import styles from './Pokemons.module.scss'

export default class Pokemons extends Component {

  state = {
    nextPage: null,
    prevPage: null,
    pokemons: [],
    loading: true,
    scrollToTop: false
  }

  handleLoadPokemons = () => {
    const { link, pokemon } = API
    this.handleGetPokemons(`${ link }${ pokemon }`)
  }

  handleLoadPrevPokemons = () => {
    const { prevPage } = this.state

    this.setState({
      loading: true
    })
    
    this.handleGetPokemons(prevPage)
  }

  handleLoadNextPokemons = () => {
    const { nextPage } = this.state

    this.setState({
      loading: true
    })
    
    this.handleGetPokemons(nextPage)
  }

  handleGetPokemons = link => {
    this.handleGetPokemon(link)
      .then(data => {
        const { next, previous, results } = data

        Promise.all(results.map(result => {
          const { url } = result
          return this.handleGetPokemon(url)
        }))
        .then(pokemons => {
          this.setState({
            nextPage: next,
            prevPage: previous,
            pokemons: pokemons,
            loading: false
          })
        })
      })
  }

   handleGetPokemon = url => {
    const response = fetch(url)
      .then(response => response.json())
      .catch(error => error)

    return response
  }

  componentDidMount = () => {
    this.handleLoadPokemons()
  }

  render () {
    const { prevPage, nextPage, pokemons, loading } = this.state
    
    return (
      <>
        { loading && <Loading /> }
        <Hero backgroundImg={ pokemonImage } text="Pokemons" />
        <div className="wrapper">
          <div className={ styles.PokemonCards }>
            { pokemons.map(pokemon => <Pokedex key={ pokemon.id } pokemon={ pokemon } />) }
          </div>
        </div>
        <Pagination
          prev={ prevPage }
          next={ nextPage }
          goPrev={ this.handleLoadPrevPokemons }
          goNext={ this.handleLoadNextPokemons }
        />
      </>
    )
  }
}