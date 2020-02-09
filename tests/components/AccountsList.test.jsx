import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { StateMock } from '@react-mock/state'
import { AppContext } from '../../src/renderer/store/createContext'
import Accounts from '../../src/renderer/components/AccountsList'

describe('Accounts', () => {
  const ui = (
    <AppContext.Provider value={{ accentColor: '#0a5fff' }}>
      <StateMock state={{ accounts: ['xxx'], input: '', error: '' }}>
        <Accounts />
      </StateMock>
    </AppContext.Provider>
  )

  it('renders correctly', () => {
    const { container } = render(ui)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('Address can be removed', () => {
    const { getByTitle } = render(ui)
    fireEvent.click(getByTitle('Remove account'))
  })

  it('New address can be added', () => {
    const { getByPlaceholderText, getByText } = render(ui)

    // error: empty
    fireEvent.click(getByText('Add'))

    // success
    fireEvent.change(getByPlaceholderText('0xxxxxxxx'), {
      target: { value: '0x139361162Fb034fa021d347848F0B1c593D1f53C' }
    })
    fireEvent.click(getByText('Add'))

    // error: duplicate
    fireEvent.change(getByPlaceholderText('0xxxxxxxx'), {
      target: { value: '0x139361162Fb034fa021d347848F0B1c593D1f53C' }
    })
    fireEvent.click(getByText('Add'))

    // error: not an ETH address
    fireEvent.change(getByPlaceholderText('0xxxxxxxx'), {
      target: { value: '0x000' }
    })
    fireEvent.click(getByText('Add'))
  })
})
