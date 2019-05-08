import React, { PureComponent } from 'react'
import { Link } from '@reach/router'
import Store from 'electron-store'
import Blockies from 'react-blockies'
import './Preferences.css'
import { AppContext } from '../store/createContext'

export default class Preferences extends PureComponent {
  static contextType = AppContext

  store = new Store()

  state = { accounts: [], input: '' }

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

    if (
      this.state.input !== '' &&
      !this.state.accounts.includes(this.state.input) // duplication check
    ) {
      const joined = [...this.state.accounts, this.state.input]

      this.store.set('accounts', joined)
      this.setState({ accounts: joined, input: '' })
      this.context.setBalances(joined)
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
    this.context.setBalances(array)
  }

  render() {
    return (
      <div className="preferences">
        <h1 className="preferences__title">Preferences</h1>{' '}
        <Link to="/">Close</Link>
        <div className="preference">
          <h2 className="preference__title">Accounts</h2>
          <ul className="preference__list">
            {this.state.accounts &&
              this.state.accounts.map(account => (
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
                value={this.state.input}
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
        </div>
      </div>
    )
  }
}
