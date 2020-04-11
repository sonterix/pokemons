import React from 'react'
import PropTypes from 'prop-types'
import styles from './SavedPokemonsActions.module.scss'

const SavedPokemonsActions = ({ removeAll, disabled }) => {
  return (
    <div className={ styles.SavedPokemonsActions }>
      <button className={ `btn` } onClick={ removeAll } disabled={ disabled }>Remove All</button>
      <hr/>
    </div>
  )
}

SavedPokemonsActions.propTypes = {
  removeAll: PropTypes.func,
  disabled: PropTypes.bool
}

SavedPokemonsActions.defaultProps = {
  removeAll: () => {},
  disabled: true
}

export default SavedPokemonsActions
