import React from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import shortid from 'shortid'
import AppProvider from './store/AppProvider'
import PriceProvider from './store/PriceProvider'
import { defaultAnimation } from './components/Animations'
import Titlebar from './components/Titlebar'
import styles from './Layout.module.css'

const Animation = posed.div(defaultAnimation)

export default function Layout({ children }) {
  return (
    <PriceProvider>
      <AppProvider>
        {process.platform === 'darwin' && <Titlebar />}
        <div className={styles.app}>
          <PoseGroup animateOnMount>
            <Animation key={shortid.generate()}>{children}</Animation>
          </PoseGroup>
        </div>
      </AppProvider>
    </PriceProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.any.isRequired
}
