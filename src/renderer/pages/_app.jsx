import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
// import { ipcRenderer } from 'electron'
import AppProvider from '../store/AppProvider'
import PriceProvider from '../store/PriceProvider'
import Layout from '../Layout'

import '../global.css'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    global.ipcRenderer.on('goTo', (evt, route) => {
      Router.push(route)
    })
  }, [])

  return (
    <PriceProvider>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </PriceProvider>
  )
}

App.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.any.isRequired
}
