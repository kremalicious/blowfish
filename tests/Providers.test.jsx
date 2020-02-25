import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import AppProvider from '../src/renderer/store/AppProvider'
import PriceProvider from '../src/renderer/store/PriceProvider'
import { PriceContext } from '../src/renderer/store/createContext'
import { priceContext } from './__fixtures__/context'

describe('Providers', () => {
  it('PriceProvider', async () => {
    const { getByText } = render(<PriceProvider>Hello</PriceProvider>)
    await waitForElement(() => getByText('Hello'))
  })

  it('AppProvider', async () => {
    const { getByText } = render(
      <PriceContext.Provider value={priceContext}>
        <AppProvider>Hello</AppProvider>
      </PriceContext.Provider>
    )
    await waitForElement(() => getByText('Hello'))
  })
})
