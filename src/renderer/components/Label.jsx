import React from 'react'
import PropTypes from 'prop-types'
import styles from './Label.module.css'

const Label = ({ children, ...props }) => (
  <span className={styles.label} {...props}>
    {children}
  </span>
)

Label.propTypes = {
  children: PropTypes.any.isRequired
}

export default Label
