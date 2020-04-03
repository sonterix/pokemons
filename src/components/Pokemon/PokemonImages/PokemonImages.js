import React from 'react'
import PropTypes from 'prop-types'
import styles from './PokemonImages.module.scss'

const PokemonImages = ({ sprites }) => {
  const { front_default, front_female } = sprites

  return (
    <div className={ styles.PokemonImages }>
      <div className={ styles.ImageItem }>
        <img src={ front_default } alt="pokemon" />
        { front_female && <p className={ styles.PokemonMale }>Male</p> }
      </div>
      { front_female && 
        <div className={ styles.ImageItem }>
          <img src={ front_female } alt="pokemon-female" />
          <p className={ styles.PokemonFemale }>Female</p>
        </div>
      }
    </div>
  )
}

PokemonImages.propTypes = {
  sprites: PropTypes.object
}

PokemonImages.defaultProps = {
  sprites: {}
}

export default PokemonImages
