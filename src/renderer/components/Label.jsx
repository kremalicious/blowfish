import React from 'react'
import PropTypes from 'prop-types'
import styles from './Label.module.css'

const Label = ({ children, labelOnClick, ...props }) => (
  <span className={styles.label} onClick={labelOnClick} {...props}>
    {children}
  </span>
)

Label.propTypes = {
  labelOnClick: PropTypes.func,
  children: PropTypes.any.isRequired
}

export default Label
