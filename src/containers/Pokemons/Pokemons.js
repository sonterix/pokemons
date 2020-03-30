import React, { Component } from 'react'
import { API } from 'constants.js'
import Pokedex from './Pokedex/Pokedex'
import Hero from 'components/UI/Hero/Hero'
import pokemonBg1 from 'assets/images/pokemon-bg-1.png'
import pokemonBg2 from 'assets/images/pokemon-bg-2.png'
import pokemonBg3 from 'assets/images/pokemon-bg-3.png'
import pokemonImage from 'assets/images/pokemon-page-bg.jpg'
import styles from './Pokemons.module.scss'

export default class Heroes extends Component {

  state = {
    nextPage: null,
    prevPage: null,
    pokemons: []
  }

  handleGetPokemons = () => {
    const { link, pokemon } = API

    this.handleGetPokemon(`${ link }${ pokemon }`)
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
            pokemons: pokemons
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
    this.handleGetPokemons()
  }

  render () {
    const { pokemons } = this.state
    const pokemonBg = [pokemonBg1, pokemonBg2, pokemonBg3]
    
    return (
      <>
        <Hero backgroundImg={ pokemonImage } />
        <div className="wrapper">
          <div className={ styles.PokemonCards }>
            { pokemons.map(pokemon => <Pokedex key={ pokemon.id } pokemon={ pokemon } bg={ pokemonBg } />) }
          </div>
        </div>
      </>
    )
  }
}