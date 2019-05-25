import React, { PureComponent } from 'react'
import { Link } from '@reach/router'

import './index.css'

import Accounts from './Accounts'

export default class Preferences extends PureComponent {
  render() {
    return (
      <div className="preferences">
        <h1 className="preferences__title">Preferences</h1>{' '}
        <Link className="preferences__close" title="Close Preferences" to="/">
          &times;
        </Link>
        <Accounts />
      </div>
    )
  }
}
