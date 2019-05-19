import React from 'react'
import { Link } from '@reach/router'
import IconRocket from '../images/rocket.svg'
import './Welcome.css'
import { AppContext } from '../store/createContext'

const Welcome = () => (
  <div className="welcome">
    <IconRocket />
    <AppContext.Consumer>
      {context => (
        <Link style={{ color: context.accentColor }} to="preferences">
          Add your first address to get started.
        </Link>
      )}
    </AppContext.Consumer>
  </div>
)

export default Welcome
