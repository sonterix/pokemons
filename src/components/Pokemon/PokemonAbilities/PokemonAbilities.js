import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getIdFromUrl } from 'constants.js'
import styles from './PokemonAbilities.module.scss'

const PokemonAbilities = ({ abilities }) => {
  return (
    <div className={ styles.Abilities }>
      <h3>Abilities</h3>
      { abilities.map((ability, index) => {
        const { name, flavor_text_entries, pokemon } = ability
        const description = flavor_text_entries.find(element => element.language.name === 'en')
        const { flavor_text } = description

        return (
          <div key={ `${ index }_${ name }` } className={ styles.Ability }>
            <h4>{ name }</h4>
            <p>{ flavor_text }</p>
            <div className={ styles.PokemonWithAbility }>
              <span>Pokemons with the same ability:</span>
              { pokemon.map((pok, index) => {
                const { pokemon: { name, url } } = pok
                return <Link
                  key={ `${ index }_${ name }` }
                  to={{
                    pathname: `/pokemon/${ name }`,
                    state: {
                      pokemonId: getIdFromUrl(url)
                    }
                  }}
                >
                  { name }
                </Link>
              }) }
            </div>
          </div>
        )
      }) }
    </div>
  )
}

PokemonAbilities.propTypes = { 
  abilities: PropTypes.array
}

PokemonAbilities.defaultProps = {
  abilities: {}
}

export default PokemonAbilities
