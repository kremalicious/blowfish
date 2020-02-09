import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import { AppContext } from '../../store/createContext'
import { cryptoFormatter } from '../../../../utils'
import stylesIndex from '../../pages/index.module.css'
import styles from './Ticker.module.css'
import { fadeIn } from '../Animations'

const Item = posed.div(fadeIn)

const Change = ({ currency }) => {
  const { priceChanges } = useContext(AppContext)
  const isNegative = JSON.stringify(priceChanges[currency]).startsWith('-')
  let classes = isNegative ? styles.negative : styles.positive

  return (
    <span className={classes} title="24hr change">
      {!isNegative && '+'}
      {Number(priceChanges[currency]).toFixed(1)}%
    </span>
  )
}

Change.propTypes = {
  currency: PropTypes.string.isRequired
}

const Items = () => {
  const {
    prices,
    needsConfig,
    currency,
    toggleCurrencies,
    accentColor
  } = useContext(AppContext)

  const activeStyle = {
    backgroundColor: accentColor,
    color: '#fff',
    borderColor: accentColor
  }

  // convert Map to array first, cause for...of or forEach returns
  // undefined, so it cannot be mapped to a collection of elements
  return [...prices.entries()].map(([key, value]) => (
    <Item key={key} className={styles.number}>
      <button
        className={key === currency ? styles.labelActive : styles.label}
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

const Ticker = props => (
  <footer className={styles.ticker} {...props}>
    <div className={stylesIndex.balanceWrap}>
      <PoseGroup animateOnMount>
        <Items key="items" />
      </PoseGroup>
    </div>
  </footer>
)

export default Ticker
