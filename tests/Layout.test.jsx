import React from 'react'
import { render, wait } from '@testing-library/react'
import Layout from '../src/renderer/Layout'

describe('Layout', () => {
  it('renders correctly', async () => {
    const { container } = render(<Layout>Hello</Layout>)
    await wait()
    expect(container.firstChild).toBeInTheDocument()
  })
})
