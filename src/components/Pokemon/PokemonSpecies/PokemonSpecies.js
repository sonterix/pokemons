import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './PokemonSpecies.module.scss'

const PokemonSpecies = ({ species }) => {
  const { flavor_text_entries, color, generation, shape, habitat } = species

  const description = flavor_text_entries.find(element => element.language.name === 'en')
  const { flavor_text } = description

  const pokemonData = [
    { ...color, title: 'color' },
    { ...habitat, title: 'habitat' },
    { ...generation, title: 'generation' },
    { ...shape, title: 'shape' }
  ]

  return (
    <>
      <div className={ styles.PokemonDescription }>
        { flavor_text }
      </div>
      <div className={ styles.PokemonLinks }>
        { pokemonData.map((data, index) => {
          const { title, name, url } = data
          return (
            <div key={ `${ index }_${ title }_${ name }` } className={ styles.PokemonLink }>
              <span>{ title }</span>
              <Link to={{ pathname: `/${ title }/${ name }`, state: {
                  link: url
                }
              }} className={ styles[name] }>
                { name || 'No Info' }
              </Link>
            </div>
          )
        }) }
      </div>
      
    </>
  )
}

PokemonSpecies.propTypes = {
  species: PropTypes.object
}

PokemonSpecies.defaultProps = {
  species: {}
}

export default PokemonSpecies
