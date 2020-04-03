import React from 'react'
import PropTypes from 'prop-types'
import styles from './PokemonStats.module.scss'

const PokemonStats = ({ pokemon }) => {
  const { height, weight, name, base_experience } = pokemon

  return (
    <div className={ styles.PokemonStats }>
      <div className={ styles.PokemonStat }>Name: <span>{ name }</span></div>
      <div className={ styles.PokemonStat }>Experience: <span>{ base_experience }</span></div>
      <div className={ styles.PokemonStat }>Height: <span>{ height }</span>dm</div>
      <div className={ styles.PokemonStat }>Weight: <span>{ weight }</span>hg</div>
    </div>
  )
}

PokemonStats.propTypes = {
  pokemon: PropTypes.object
}

PokemonStats.defaultProps = {
  pokemon: {}
}

export default PokemonStats
