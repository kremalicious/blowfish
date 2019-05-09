import React from 'react'
import { Link } from '@reach/router'
import IconRocket from '../images/rocket.svg'
import './Welcome.css'

const Welcome = () => (
  <div className="welcome">
    <IconRocket />
    <Link to="preferences">Add your first address to get started.</Link>
  </div>
)

export default Welcome
