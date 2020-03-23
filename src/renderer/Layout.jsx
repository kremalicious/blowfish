import React from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import shortid from 'shortid'
import { defaultAnimation } from './components/Animations'
import Titlebar from './components/Titlebar'
import styles from './Layout.module.css'
import Update from './components/Update'

const Animation = posed.div(defaultAnimation)

export default function Layout({ children }) {
  return (
    <>
      {process.platform === 'darwin' && <Titlebar />}
      <div className={styles.app}>
        <Update />
        <PoseGroup animateOnMount>
          <Animation key={shortid.generate()}>{children}</Animation>
        </PoseGroup>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any.isRequired
}
