import './App.css'
import React, { PureComponent } from 'react'
import { webFrame } from 'electron'
import AppProvider from './store/AppProvider'
import Titlebar from './components/Titlebar'
import Accounts from './components/Accounts'

//
// Disable zooming
//
webFrame.setVisualZoomLevelLimits(1, 1)
webFrame.setLayoutZoomLevelLimits(0, 0)

class App extends PureComponent {
  render() {
    return (
      <AppProvider>
        <Titlebar />
        <div className="app__content">
          <Accounts />
        </div>
      </AppProvider>
    )
  }
}

export default App
