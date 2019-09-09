import React from 'react'
import PropTypes from 'prop-types'
import { toDataUrl } from 'ethereum-blockies'
import posed, { PoseGroup } from 'react-pose'
import { fadeIn } from '../../../components/Animations'
import styles from './Saved.module.css'

const Item = posed.li(fadeIn)

const Saved = ({ accounts, handleDelete }) => (
  <PoseGroup>
    {accounts.map(account => {
      const identicon = account && toDataUrl(account)

      return (
        <Item key={account}>
          <div>
            <img className={styles.identicon} src={identicon} alt="Blockies" />
            {account}
          </div>

          <button
            className={styles.delete}
            onClick={e => handleDelete(e, account)}
            title="Remove account"
          >
            &times;
          </button>
        </Item>
      )
    })}
  </PoseGroup>
)

Saved.propTypes = {
  accounts: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Saved
