import './Titlebar.css'
import React from 'react'
import pkg from '../../../package.json'

const Titlebar = () => (
  <header className="titlebar">
    <span className="header-title">{pkg.productName}</span>
  </header>
)

export default Titlebar
