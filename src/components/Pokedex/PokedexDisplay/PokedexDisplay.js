import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './PokedexDisplay.module.scss'

const PokedexDisplay = ({ info, name, types, abilities, image, background }) => {
  const generateRandomId = () => Math.random().toString(36).substr(2, 9)

  const typesItems = types.map(pokemonType => {
    const { type: { name } } = pokemonType
    return <span key={ `${ name }-${ generateRandomId }` }>{ name }</span>
  })

  const abilitiesItems = abilities.map(pokemonAbilities => {
    const { ability: { name } } = pokemonAbilities
    return <span key={ `${ name }-${ generateRandomId }` }>{ name }</span>
  })

  return (
    <div className={ styles.PokedexDisplay }>
      <div className={ styles.DisplayLights }>
        <span></span>
        <span></span>
      </div>
      { info ? 
        <div className={ styles.PokedexInfo }>
          <div className={ styles.TypeInfo }>
            <h3>Type</h3>
            { typesItems }
          </div>
          <div className={ styles.AbilitiesInfo }>
            <h3>Abilities</h3>
            { abilitiesItems }
          </div>
        </div>
      :
        <div className={ styles.PokedexImage } style={{ backgroundImage: `url(${ background })` }}>
          { image ? <img src={ image } alt={ name } /> : <span>?</span> }
        </div> }
      <div className={ styles.DisplayIndicator }></div>
      <div className={ styles.DisplayDynamic }>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

PokedexDisplay.propTypes = {
  info: PropTypes.bool,
  name: PropTypes.string,
  types: PropTypes.array,
  abilities: PropTypes.array,
  image: PropTypes.string,
  background: PropTypes.string,
}

PokedexDisplay.defaultProps = {
  info: true,
  name: 'Pokemon',
  types: [],
  abilities: [],
  image: '',
  background: '',
}

export default memo(PokedexDisplay)
