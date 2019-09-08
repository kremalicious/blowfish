import React from 'react'
import PropTypes from 'prop-types'
import styles from './New.module.css'

const New = ({ input, handleInputChange, handleSave, accentColor }) => (
  <li>
    <input
      type="text"
      placeholder="0xxxxxxxx"
      value={input}
      onChange={e => handleInputChange(e)}
      className={styles.input}
    />

    <button
      className={styles.button}
      onClick={e => handleSave(e)}
      style={{ color: accentColor }}
    >
      Add
    </button>
  </li>
)

New.propTypes = {
  input: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  accentColor: PropTypes.string.isRequired
}

export default New
