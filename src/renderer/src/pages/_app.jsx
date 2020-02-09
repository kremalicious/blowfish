import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { ipcRenderer } from 'electron'

import '../global.css'
import Layout from '../Layout'

//
// Disable zooming
//
// webFrame.setVisualZoomLevelLimits(1, 1)
// webFrame.setLayoutZoomLevelLimits(0, 0)

export default function App({ Component, pageProps }) {
  useEffect(() => {
    ipcRenderer.on('goTo', (evt, route) => {
      Router.push(route)
    })
  }, [])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

App.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.any.isRequired
}
