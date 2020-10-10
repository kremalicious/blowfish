import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import AppProvider from '../src/renderer/store/AppProvider'
import PriceProvider from '../src/renderer/store/PriceProvider'
import { PriceContext, AppContext } from '../src/renderer/store/createContext'
import { priceContext } from './__fixtures__/context'

describe('Providers', () => {
  describe('PriceProvider', () => {
    it('renders without crashing', async () => {
      const { getByText } = render(
        <PriceProvider>
          <PriceContext.Consumer>
            {({ priceChanges }) => JSON.stringify(priceChanges)}
          </PriceContext.Consumer>
        </PriceProvider>
      )
      expect(getByText(/eur/)).toBeInTheDocument()
    })
  })

  describe('AppProvider', () => {
    it('renders without crashing', async () => {
      const { getByText } = render(
        <PriceContext.Provider value={priceContext}>
          <AppProvider>
            <AppContext.Consumer>
              {({ toggleCurrencies }) => (
                <button onClick={() => toggleCurrencies('eur')}>Click</button>
              )}
            </AppContext.Consumer>
          </AppProvider>
        </PriceContext.Provider>
      )
      await waitFor(() => getByText('Click'))
      expect(getByText('Click')).toBeInTheDocument()

      fireEvent.click(getByText('Click'))
    })
  })
})
