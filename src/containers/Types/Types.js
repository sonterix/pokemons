import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { API, getIdFromUrl } from 'constants.js'
import Hero from 'components/UI/Hero/Hero'
import Loading from 'containers/Loading/Loading'
import pokemonImage from 'assets/images/pokemon-page-bg.jpg'
import typesSprite from 'assets/images/types-sprite.png'
import styles from './Types.module.scss'

export default class Types extends Component {

  state = {
    types: [],
    loading: true
  }

  handleGetTypes = async () => {
    const { link, type } = API
    const typesResponse = await fetch(`${ link }${ type }`)
    const typesData = await typesResponse.json()
    const { results } = typesData

    this.setState({
      types: results,
      loading: false
    })
  }

  componentDidMount = () => {
    this.handleGetTypes()
  }

  render() {
    const { types, loading } = this.state

    return (
      <>
        { loading
          ? <Loading />
          : <>
            <Hero text="Types" backgroundImg={ pokemonImage } />
            <div className={ `wrapper ${ styles.Types }` }>
              { types.map((type, index) => {
                const { name, url } = type
                return (
                  <Link
                    key={ `${ index }_${ name }` }
                    to={{
                      pathname: `/type/${ name }`,
                      state: {
                        typeId: getIdFromUrl(url),
                      }
                    }}
                    className={ styles.Type }
                  >
                    <div className={ `${ styles.TypeImage } sprite-type sprite-type-${ name }` } style={{ backgroundImage: `url(${ typesSprite })` }}></div>
                    <span>{ name }</span>
                  </Link>
                )
              }) }
            </div>
          </>
        }

        
      </>
    )
  }
}
