import React, { PureComponent } from 'react'
import posed, { PoseGroup } from 'react-pose'
import { AppContext } from '../store/createContext'
import { cryptoFormatter } from '../../utils'
import './Ticker.css'
import { fadeIn } from './Animations'

const Item = posed.div(fadeIn)

export default class Ticker extends PureComponent {
  static contextType = AppContext

  items = activeStyle =>
    Object.keys(this.context.prices).map((key, i) => (
      <Item key={i} className="number-unit">
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
          {cryptoFormatter(this.context.prices[key], key)}
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
