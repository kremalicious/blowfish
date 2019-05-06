import React, { PureComponent } from 'react'
import { Consumer } from '../store/createContext'
import './Actions.css'

export default class Actions extends PureComponent {
  render() {
    return (
      <div className="actions">
        <Consumer>
          {({ toggleCurrencies, accounts }) => (
            <>
              {accounts.length > 0 &&
                Object.keys(accounts[0].balance).map(currency => (
                  <button
                    key={currency}
                    onClick={() => toggleCurrencies(currency)}
                  >
                    {currency}
                  </button>
                ))}
            </>
          )}
        </Consumer>
      </div>
    )
  }
}
