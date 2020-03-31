import React from 'react'
import PropTypes from 'prop-types'
import styles from './Pagination.module.scss'

const Pagination = ({ prev, next, goPrev, goNext }) => {
  return (
    <div className={ styles.Pagination }>
      <button onClick={ goPrev } className={ styles.PaginationPrev } disabled={ prev === null ? true : false }></button>
      <button onClick={ goNext } className={ styles.PaginationNext } disabled={ next === null ? true : false }></button>
    </div>
  )
}

Pagination.propTypes = {
  prev: PropTypes.node,
  next: PropTypes.node,
  goPrev: PropTypes.func,
  goNext: PropTypes.func
}

Pagination.defaultProps = {
  prev: null,
  next: null,
  goPrev: () => {},
  goNext: () => {}
}

export default Pagination
