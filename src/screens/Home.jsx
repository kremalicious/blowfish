import React, { PureComponent } from 'react'
import { Link } from '@reach/router'
import { AppContext } from '../store/createContext'
import Total from '../components/Total'
import Account from '../components/Account'
import Ticker from '../components/Ticker'
import Spinner from '../components/Spinner'
import './Home.css'

export default class Home extends PureComponent {
  static contextType = AppContext

  render() {
    const { isLoading, accounts, needsConfig } = this.context

    return (
      <>
        <Link to="preferences">Preferences</Link>
        <main className="main">
          {needsConfig ? (
            'Needs config'
          ) : isLoading ? (
            <Spinner />
          ) : (
            <>
              <Total />

              <div className="number-unit-wrap number-unit-wrap--accounts">
                {accounts.map((account, i) => (
                  <Account key={i} account={account} />
                ))}
              </div>
            </>
          )}
        </main>

        <Ticker style={isLoading ? { opacity: 0 } : null} />
      </>
    )
  }
}
