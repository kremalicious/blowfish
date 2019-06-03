import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import { AppContext } from '../store/createContext'
import { cryptoFormatter } from '../../utils'
import './Ticker.css'
import { fadeIn } from './Animations'

const Item = posed.div(fadeIn)

const Change = ({ currency }) => (
  <AppContext.Consumer>
    {({ priceChanges }) => {
      let classes = JSON.stringify(priceChanges[currency]).startsWith('+')
        ? 'change--positive'
        : 'change--negative'

      return (
        <span className={`change ${classes}`}>
          {Number(priceChanges[currency]).toFixed(1)}%
        </span>
      )
    }}
  </AppContext.Consumer>
)

Change.propTypes = {
  currency: PropTypes.string.isRequired
}

export default class Ticker extends PureComponent {
  static contextType = AppContext

  items = activeStyle =>
    // convert Map to array first, cause for...of or forEach returns undefined,
    // so it cannot be mapped to a collection of elements
    [...this.context.prices.entries()].map(([key, value]) => (
      <Item key={key} className="number-unit">
        <button
          className="label label--price"
          onClick={() => this.context.toggleCurrencies(key)}
          disabled={this.context.needsConfig}
          style={
            key === this.context.currency && !this.context.needsConfig
              ? activeStyle
              : {}
          }
        >
          {cryptoFormatter(value, key)}
          {key !== 'ocean' && <Change currency={key} />}
        </button>
      </Item>
    ))

  render() {
    const { accentColor } = this.context

    const activeStyle = {
      backgroundColor: accentColor,
      color: '#fff',
      borderColor: accentColor
    }

    return (
      <footer className="number-unit-wrap ticker" {...this.props}>
        <PoseGroup animateOnMount>{this.items(activeStyle)}</PoseGroup>
      </footer>
    )
  }
}
