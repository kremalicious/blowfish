import React from 'react'
import { render } from '@testing-library/react'
import AppProvider from './store/AppProvider'
import App from './App'

describe('App', () => {
  it('renders correctly', () => {
    const { container } = render(
      <AppProvider>
        <App />
      </AppProvider>
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
