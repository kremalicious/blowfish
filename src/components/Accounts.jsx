import React, { PureComponent } from 'react'
import { Consumer } from '../store/createContext'
import Total from './Total'
import Account from './Account'
import './Accounts.css'

export default class Accounts extends PureComponent {
  state = {
    isNativeShown: false
  }

  toggleBalances = () => {
    this.setState({ isNativeShown: !this.state.isNativeShown })
  }

  render() {
    return (
      <main className="main">
        <Total />

        <div
          className="number-unit-wrap number-unit-wrap--accounts"
          onClick={this.toggleBalances}
        >
          <Consumer>
            {({ accounts }) =>
              accounts.map((account, i) => (
                <Account
                  key={i}
                  account={account}
                  isNativeShown={this.state.isNativeShown}
                />
              ))
            }
          </Consumer>
        </div>
      </main>
    )
  }
}
