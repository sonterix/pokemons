import React from 'react'
import styles from './Page404.module.scss'
import sadPokemon from 'assets/images/sad-pokemon.png'
import BackButton from 'components/UI/BackButton/BackButton'

const Page404 = () => {
  return (
    <>
      <BackButton />
      <div className={ `wrapper ${ styles.Page404 }` }>
        <h1>Error 404!</h1>
        <h3>Page not found</h3>
        <img src={ sadPokemon } alt="Sad pokemon" />
      </div>
    </>
  )
}

export default Page404
