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
      const isNegative = JSON.stringify(priceChanges[currency]).startsWith('-')
      let classes = isNegative ? 'change--negative' : 'change--positive'

      return (
        <span className={`change ${classes}`} title="24hr change">
          {!isNegative && '+'}
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

  items = () => {
    const {
      prices,
      needsConfig,
      currency,
      toggleCurrencies,
      accentColor
    } = this.context

    const activeStyle = {
      backgroundColor: accentColor,
      color: '#fff',
      borderColor: accentColor
    }

    // convert Map to array first, cause for...of or forEach returns
    // undefined, so it cannot be mapped to a collection of elements
    return [...prices.entries()].map(([key, value]) => (
      <Item key={key} className="number-unit">
        <button
          className={`label label--price ${key === currency && 'active'}`}
          onClick={() => toggleCurrencies(key)}
          disabled={needsConfig}
          style={key === currency && !needsConfig ? activeStyle : {}}
        >
          {cryptoFormatter(value, key)}
          {key !== 'ocean' && <Change currency={key} />}
        </button>
      </Item>
    ))
  }

  render() {
    return (
      <footer className="ticker" {...this.props}>
        <div className="number-unit-wrap">
          <PoseGroup animateOnMount>{this.items()}</PoseGroup>
        </div>
      </footer>
    )
  }
}
