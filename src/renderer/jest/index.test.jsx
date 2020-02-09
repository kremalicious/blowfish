import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { AppContext } from '../store/createContext'
import context from './__fixtures__/context'
import Home from '.'

describe('Home', () => {
  it('renders correctly', () => {
    const { container, getByText } = render(
      <AppContext.Provider value={context}>
        <Home />
      </AppContext.Provider>
    )
    expect(container.firstChild).toBeInTheDocument()
    fireEvent.click(getByText(/Ξ/))
  })

  it('renders Welcome without config', () => {
    const { container } = render(
      <AppContext.Provider value={{ ...context, needsConfig: true }}>
        <Home />
      </AppContext.Provider>
    )
    expect(container.firstChild).toHaveTextContent(
      'Add your first address to get started.'
    )
  })
})
