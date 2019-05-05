import React, { PureComponent } from 'react'
import { webFrame } from 'electron'
import AppProvider from './store/AppProvider'
import { Consumer } from './store/createContext'
import Titlebar from './components/Titlebar'
import Total from './components/Total'
import Account from './components/Account'
import Actions from './components/Actions'
import './App.css'

//
// Disable zooming
//
webFrame.setVisualZoomLevelLimits(1, 1)
webFrame.setLayoutZoomLevelLimits(0, 0)

export default class App extends PureComponent {
  render() {
    return (
      <AppProvider>
        <Titlebar />
        <div className="app__content">
          <main className="main">
            <Actions />
            <Total />

            <div className="number-unit-wrap number-unit-wrap--accounts">
              <Consumer>
                {({ accounts }) =>
                  accounts.map((account, i) => (
                    <Account key={i} account={account} />
                  ))
                }
              </Consumer>
            </div>
          </main>
        </div>
      </AppProvider>
    )
  }
}
