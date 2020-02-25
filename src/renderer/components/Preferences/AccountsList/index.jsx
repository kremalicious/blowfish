import React, { PureComponent } from 'react'
import ethereum_address from 'ethereum-address'
import Store from 'electron-store'
import { AppContext } from '../../../store/createContext'
import Saved from './Saved'
import New from './New'
import styles from './index.module.css'

export default class AccountsList extends PureComponent {
  static contextType = AppContext

  store = process.env.NODE_ENV === 'test' ? new Store() : global.store

  state = { accounts: [], input: '', error: '' }

  componentDidMount() {
    if (this.store.has('accounts')) {
      this.setState({ accounts: this.store.get('accounts') })
    }
  }

  handleInputChange = e => {
    this.setState({ input: e.target.value })
  }

  handleSave = e => {
    e.preventDefault()

    const { accounts, input } = this.state

    const isEmpty = input === ''
    const isDuplicate = accounts.includes(input)
    const isAddress = ethereum_address.isAddress(input)

    if (isEmpty) {
      this.setState({ error: 'Please enter an address.' })
      return
    } else if (isDuplicate) {
      this.setState({ error: 'Address already added. Try another one.' })
      return
    } else if (!isAddress) {
      this.setState({
        error: 'Not an Ethereum address. Try another one.'
      })
      return
    } else {
      const joined = [...accounts, input]

      this.store.set('accounts', joined)
      this.setState({ accounts: joined, input: '', error: '' })
      this.context.setBalances()
    }
  }

  handleDelete = (e, account) => {
    e.preventDefault()

    let array = this.state.accounts
    array = array.filter(item => account !== item)

    const index = array.indexOf(account)
    if (index > -1) {
      array.splice(index, 1)
    }

    this.store.set('accounts', array)
    this.setState({ accounts: array })
    this.context.setBalances()
  }

  render() {
    const { accentColor } = this.context
    const { accounts, input, error } = this.state

    return (
      <div className={styles.preference}>
        <h2 className={styles.title}>Accounts</h2>
        <p className={styles.help}>
          Add Ethereum account addresses holding Ocean Tokens.
        </p>
        <ul className={styles.list}>
          <Saved accounts={accounts} handleDelete={this.handleDelete} />

          <New
            input={input}
            handleInputChange={this.handleInputChange}
            accentColor={accentColor}
            handleSave={this.handleSave}
          />
        </ul>
        {error !== '' && <div className={styles.error}>{error}</div>}
      </div>
    )
  }
}
