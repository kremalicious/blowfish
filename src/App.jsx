import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Router, Location } from '@reach/router'
import { webFrame } from 'electron'
import posed, { PoseGroup } from 'react-pose'
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

const Animation = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 100,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 25,
      restDelta: 0.5,
      restSpeed: 10
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }
})

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <PoseGroup>
        <Animation key={location.key}>
          <Router location={location}>{children}</Router>
        </Animation>
      </PoseGroup>
    )}
  </Location>
)

PosedRouter.propTypes = {
  children: PropTypes.any.isRequired
}

export default class App extends PureComponent {
  render() {
    return (
      <AppProvider>
        <Titlebar />
        <div className="app">
          <PosedRouter>
            <Home path="/" default />
            <Preferences path="/preferences" />
          </PosedRouter>
        </div>
      </AppProvider>
    )
  }
}
