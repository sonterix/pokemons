import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './PokedexControls.module.scss'

const PokedexControls = ({ pokemonId, name, switchDisplay, switchImage, switchBackgroundUp, switchBackgroundDown }) => {
  return (
    <div className={ styles.PokedexControls }>
      <div className={ styles.PokedexButtons }>
        <button className={ styles.PokedexInfo } onClick={ switchDisplay }>Info</button>
        <Link to={{
          pathname: `/pokemon/${ name }`,
          state: {
            pokemonId: pokemonId
          }
        }} className={ styles.PokedexName }>
          { name }
        </Link>
      </div>
      <div className={ styles.PokedexControl }>
        <span>
          <span className={ styles.ControlArrow } onClick={ switchImage }></span>
          <span className={ styles.ControlArrow } onClick={ switchImage }></span>
        </span>
        <span>
          <span className={ styles.ControlArrow } onClick={ switchBackgroundUp }></span>
          <span className={ styles.ControlArrow } onClick={ switchBackgroundDown }></span>
        </span>
      </div>
    </div>
  )
}

PokedexControls.propTypes = {
  pokemonId: PropTypes.number,
  name: PropTypes.string,
  switchImage: PropTypes.func,
  switchBackgroundUp: PropTypes.func,
  switchBackgroundDown: PropTypes.func
}

PokedexControls.defaultProps = {
  pokemonId: 1,
  name: 'Pokemon',
  switchImage: () => {},
  switchBackgroundUp: () => {},
  switchBackgroundDown: () => {}
}

export default PokedexControls
