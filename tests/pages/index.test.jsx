import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { AppContext } from '../../src/renderer/store/createContext'
import context from '../__fixtures__/context'
import Home from '../../src/renderer/pages/index'

describe('Home', () => {
  it('renders correctly', () => {
    const { container, getByText } = render(
      <AppContext.Provider value={context}>
        <Home />
      </AppContext.Provider>
    )
    expect(container.firstChild).toBeInTheDocument()
    fireEvent.click(getByText(/Ξ/))
    // fireEvent.click(getByText(/0x/))
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
