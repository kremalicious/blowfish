import React, { PureComponent } from 'react'
import { Consumer } from '../store/createContext'
import './Actions.css'

export default class Actions extends PureComponent {
  render() {
    return (
      <div className="actions">
        <Consumer>
          {({ toggleCurrencies }) => (
            <>
              <button onClick={() => toggleCurrencies('ocean')}>OCEAN</button>
              <button onClick={() => toggleCurrencies('eur')}>EUR</button>
              <button onClick={() => toggleCurrencies('usd')}>USD</button>
            </>
          )}
        </Consumer>
      </div>
    )
  }
}
