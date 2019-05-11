import React from 'react'
import { render } from 'react-dom'
import App from './App'

document.body.style.backgroundColor = '#141414'

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)

render(<App />, document.getElementById('root'))
