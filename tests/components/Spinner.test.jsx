import React from 'react'
import { render } from '@testing-library/react'
import Spinner from '../../src/renderer/components/Spinner'

describe('Spinner', () => {
  it('renders correctly', () => {
    const { container } = render(<Spinner />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
