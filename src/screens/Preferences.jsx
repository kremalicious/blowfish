import React, { PureComponent } from 'react'
import { Link } from '@reach/router'
import Store from 'electron-store'
import './Preferences.css'

export default class Preferences extends PureComponent {
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
      this.setState({ accounts: joined })
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
  }

  render() {
    return (
      <div className="preferences">
        Hello Preferences <Link to="/">Close</Link>
        <div>
          {this.state.accounts &&
            this.state.accounts.map(account => (
              <div key={account}>
                {account}
                <button onClick={e => this.handleDelete(e, account)}>
                  &times;
                </button>
              </div>
            ))}
        </div>
        <form>
          <input
            type="text"
            placeholder="0xxxxxxxx"
            value={this.state.input}
            onChange={this.handleInputChange}
          />
          <button onClick={e => this.handleSave(e)}>Add</button>
        </form>
      </div>
    )
  }
}
