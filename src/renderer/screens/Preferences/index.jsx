import React from 'react'
import { Link } from '@reach/router'
import Accounts from './Accounts'
import './index.css'

const Preferences = () => (
  <div className="preferences">
    <h1 className="preferences__title">Preferences</h1>{' '}
    <Link className="preferences__close" title="Close Preferences" to="/">
      &times;
    </Link>
    <Accounts />
  </div>
)

export default Preferences
