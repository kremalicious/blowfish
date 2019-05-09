import React, { PureComponent } from 'react'
import { Link } from '@reach/router'
import Store from 'electron-store'
import Blockies from 'react-blockies'
import ethereum_address from 'ethereum-address'
import { AppContext } from '../store/createContext'
import './Preferences.css'

export default class Preferences extends PureComponent {
  static contextType = AppContext

  store = new Store()

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
      this.setState({ error: 'Not an Ethereum address. Try another one.' })
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
    const { accounts, input, error } = this.state

    return (
      <div className="preferences">
        <h1 className="preferences__title">Preferences</h1>{' '}
        <Link className="preferences__close" title="Close Preferences" to="/">
          &times;
        </Link>
        <div className="preference">
          <h2 className="preference__title">Accounts</h2>
          <p className="preference__help">
            Add Ethereum account addresses holding Ocean Tokens.
          </p>
          <ul className="preference__list">
            {accounts &&
              accounts.map(account => (
                <li key={account}>
                  <div>
                    <Blockies seed={account} size={10} scale={3} />
                    {account}
                  </div>

                  <button
                    className="delete"
                    onClick={e => this.handleDelete(e, account)}
                    title="Remove account"
                  >
                    &times;
                  </button>
                </li>
              ))}
            <li>
              <input
                type="text"
                placeholder="0xxxxxxxx"
                value={input}
                onChange={this.handleInputChange}
                className="preference__input"
              />
              <button
                className="preference__input__add"
                onClick={e => this.handleSave(e)}
              >
                Add
              </button>
            </li>
          </ul>
          {error !== '' && <div className="preference__error">{error}</div>}
        </div>
      </div>
    )
  }
}
