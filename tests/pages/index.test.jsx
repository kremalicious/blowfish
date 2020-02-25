import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import {
  AppContext,
  PriceContext
} from '../../src/renderer/store/createContext'
import { appContext, priceContext } from '../__fixtures__/context'
import Home from '../../src/renderer/pages/index'

describe('Home', () => {
  it('renders correctly', () => {
    const { container, getByText } = render(
      <PriceContext.Provider value={priceContext}>
        <AppContext.Provider value={appContext}>
          <Home />
        </AppContext.Provider>
      </PriceContext.Provider>
    )
    expect(container.firstChild).toBeInTheDocument()
    fireEvent.click(getByText(/Ξ/))
    // fireEvent.click(getByText(/0x/))
  })

  it('renders Welcome without config', () => {
    const { container } = render(
      <PriceContext.Provider value={priceContext}>
        <AppContext.Provider value={{ ...appContext, needsConfig: true }}>
          <Home />
        </AppContext.Provider>
      </PriceContext.Provider>
    )
    expect(container.firstChild).toHaveTextContent(
      'Add your first address to get started.'
    )
  })
})
