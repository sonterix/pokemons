import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getIdFromUrl } from 'constants.js'
import typesSprite from 'assets/images/types-sprite.png'
import styles from './PokemonSpecies.module.scss'

const PokemonSpecies = ({ species, types }) => {
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
      <div className={ styles.PokemonTypes }>
        { types.map((type, index) => {
          const { type: { name, url } } = type
          return <Link
                    to={{ pathname: `/type/${ name }`, state: {
                      typeId: getIdFromUrl(url)
                    } }}
                    key={ `${ index }_${ name }` }
                    className={ `sprite-type sprite-type-${ name }` }
                    style={{ backgroundImage: `url(${ typesSprite })` }}
                  ></Link>
        }) }
      </div>
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
  species: PropTypes.object,
  types: PropTypes.array
}

PokemonSpecies.defaultProps = {
  species: {},
  types: []
}

export default PokemonSpecies
