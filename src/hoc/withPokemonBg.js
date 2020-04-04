import React from 'react'
import pokemonBg1 from 'assets/images/pokemon-bg-1.png'
import pokemonBg2 from 'assets/images/pokemon-bg-2.png'
import pokemonBg3 from 'assets/images/pokemon-bg-3.png'

const withPokemonBg = WrappedComponent => props => {
  const propsWithBg = {...props, bg: [pokemonBg1, pokemonBg2, pokemonBg3] }
  return <WrappedComponent { ...propsWithBg } />
}

export default withPokemonBg