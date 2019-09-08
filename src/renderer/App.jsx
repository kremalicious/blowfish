import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Router,
  createMemorySource,
  createHistory,
  LocationProvider,
  navigate
} from '@reach/router'
import { webFrame, ipcRenderer } from 'electron'
import posed, { PoseGroup } from 'react-pose'
import Titlebar from './components/Titlebar'
import { defaultAnimation } from './components/Animations'
import Home from './screens/Home'
import Preferences from './screens/Preferences'
import styles from './App.module.css'

//
// Disable zooming
//
webFrame.setVisualZoomLevelLimits(1, 1)
webFrame.setLayoutZoomLevelLimits(0, 0)

const Animation = posed.div(defaultAnimation)

// Fix reach-router in packaged Electron
// https://github.com/reach/router/issues/25#issuecomment-394003652
let source = createMemorySource('/')
let history = createHistory(source)

const PosedRouter = ({ children }) => (
  <LocationProvider history={history}>
    {({ location }) => (
      <PoseGroup animateOnMount>
        <Animation key={location.key}>
          <Router location={location}>{children}</Router>
        </Animation>
      </PoseGroup>
    )}
  </LocationProvider>
)

PosedRouter.propTypes = {
  children: PropTypes.any.isRequired
}

export default class App extends PureComponent {
  componentDidMount() {
    ipcRenderer.on('goTo', (evt, route) => {
      navigate(route)
    })
  }

  render() {
    return (
      <>
        {process.platform === 'darwin' && <Titlebar />}
        <div className={styles.app}>
          <PosedRouter>
            <Home path="/" default />
            <Preferences path="/preferences" />
          </PosedRouter>
        </div>
      </>
    )
  }
}
