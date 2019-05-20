import React, { PureComponent } from 'react'
import posed, { PoseGroup } from 'react-pose'
import { AppContext } from '../store/createContext'
import { cryptoFormatter } from '../../utils'
import './Ticker.css'
import { fadeIn } from './Animations'

const Item = posed.div(fadeIn)

export default class Ticker extends PureComponent {
  static contextType = AppContext

  render() {
    const {
      toggleCurrencies,
      needsConfig,
      currency,
      prices,
      accentColor
    } = this.context

    const activeStyle = {
      backgroundColor: accentColor,
      color: '#fff',
      borderColor: accentColor
    }

    return (
      <footer className="number-unit-wrap ticker" {...this.props}>
        <PoseGroup animateOnMount>
          {Object.keys(prices).map((key, i) => (
            <Item key={i} className="number-unit">
              <button
                className="label label--price"
                onClick={() => toggleCurrencies(key)}
                disabled={needsConfig}
                style={key === currency && !needsConfig ? activeStyle : {}}
              >
                {cryptoFormatter(prices[key], key)}
              </button>
            </Item>
          ))}
        </PoseGroup>
      </footer>
    )
  }
}
