import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import withPokemonBg from 'hoc/withPokemonBg'
import PokedexCamera from 'components/Pokedex/PokedexCamera/PokedexCamera'
import PokedexDisplay from 'components/Pokedex/PokedexDisplay/PokedexDisplay'
import PokedexControls from 'components/Pokedex/PokedexControls/PokedexControls'
import styles from './Pokedex.module.scss'

class Pokedex extends PureComponent {

  state = {
    showInfo: false,
    image: {
      front: '',
      back: '',
      activeImage: 'front'
    },
    background: {
      backgrounds: [],
      activeBg: 0
    }
  }

  static propTypes = {
    pokemon: PropTypes.object,
    bg: PropTypes.array
  }

  static defaultProps = {
    pokemon: {},
    bg: ['']
  }

  static getDerivedStateFromProps = (props, state) => {
    const { bg, pokemon: { sprites: { front_default, back_default } } } = props
    const { image, background } = state
    const imageObj = { ...image }
    const backgroundObj = { ...background }

    imageObj.front = front_default
    imageObj.back = back_default
    backgroundObj.backgrounds = bg

    return {
      image: imageObj,
      background: backgroundObj
    }
  }

  handleSwitchImage = () => {
    const { image, image: { activeImage } } = this.state
    const imageObj = { ...image }

    switch (activeImage) {
      case 'front':
        imageObj.activeImage = 'back'

        this.setState({
          image: imageObj
        })
        break
      case 'back':
        imageObj.activeImage = 'front'

        this.setState({
          image: imageObj
        })
        break
      default:
        break
    }
  }

  handleSwitchUpBg = () => {
    const { background, background: { backgrounds, activeBg } } = this.state
    const backgroundObj = { ...background }
    const backgroundsLength = backgrounds.length - 1

    if (activeBg >= backgroundsLength) {
      backgroundObj.activeBg = 0
      this.setState({
        background: backgroundObj
      })
    } else {
      this.setState(prevState => {
        backgroundObj.activeBg = prevState.background.activeBg++

        return {
          background: backgroundObj
        }
      })
    }
  }

  handleSwitchDownBg = () => {
    const { background, background: { backgrounds, activeBg } } = this.state
    const backgroundObj = { ...background }
    const backgroundsLength = backgrounds.length - 1

    if (activeBg > 0) {
      this.setState(prevState => {
        backgroundObj.activeBg = prevState.background.activeBg--

        return {
          background: backgroundObj
        }
      })
    } else {
      backgroundObj.activeBg = backgroundsLength

      this.setState({
        background: backgroundObj
      })
    }
  }

  handleSwitchDisplay = () => {
    this.setState(prevProps => {
      return { showInfo: !prevProps.showInfo }
    })
  }

  render () {
    const { pokemon: { id, name, types, abilities } } = this.props
    const { showInfo, image: { front, back, activeImage }, background: { backgrounds, activeBg } } = this.state

    return (
      <div className={ styles.Pokedex }>
        <PokedexCamera />
        <PokedexDisplay
          info={ showInfo }
          name={ name }
          types={ types }
          abilities={ abilities }
          image={ activeImage === 'front' ? front : back }
          background={ backgrounds[activeBg] }
        />
        <PokedexControls
          pokemonId={ id }
          name={ name }
          switchDisplay={ this.handleSwitchDisplay }
          switchImage={ this.handleSwitchImage }
          switchBackgroundUp={ this.handleSwitchUpBg }
          switchBackgroundDown={ this.handleSwitchDownBg }
        />
      </div>
    )
  }
}

export default withPokemonBg(Pokedex)