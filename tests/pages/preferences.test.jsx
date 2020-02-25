import React from 'react'
import { render } from '@testing-library/react'
import { AppContext } from '../../src/renderer/store/createContext'
import Preferences from '../../src/renderer/pages/preferences'

describe('Preferences', () => {
  it('renders correctly', () => {
    const { container } = render(
      <AppContext.Provider value={{ accentColor: '#0a5fff' }}>
        <Preferences />
      </AppContext.Provider>
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
