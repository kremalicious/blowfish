import React from 'react'
import { render } from 'react-dom'
import AppProvider from './store/AppProvider'
import App from './App'
import pkg from '../../package.json'

document.body.style.backgroundColor = '#141414'

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)
document.title = pkg.productName

render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root')
)
