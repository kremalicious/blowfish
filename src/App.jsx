import React, { PureComponent } from 'react'
import {
  Router,
  createMemorySource,
  createHistory,
  LocationProvider
} from '@reach/router'
import { webFrame } from 'electron'
import AppProvider from './store/AppProvider'
import Titlebar from './components/Titlebar'
import Home from './screens/Home'
import Preferences from './screens/Preferences'
import './App.css'

//
// Disable zooming
//
webFrame.setVisualZoomLevelLimits(1, 1)
webFrame.setLayoutZoomLevelLimits(0, 0)

// https://github.com/reach/router/issues/25
const source = createMemorySource('/')
const history = createHistory(source)

export default class App extends PureComponent {
  render() {
    return (
      <AppProvider>
        <Titlebar />
        <div className="app">
          <LocationProvider history={history}>
            <Router>
              <Home path="/" default />
              <Preferences path="preferences" />
            </Router>
          </LocationProvider>
        </div>
      </AppProvider>
    )
  }
}
