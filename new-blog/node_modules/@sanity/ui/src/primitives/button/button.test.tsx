import {AddIcon} from '@sanity/icons'
import {screen} from '@testing-library/react'
import {axe} from 'jest-axe'
import React from 'react'
import {render} from '../../../test'
import {Button, ButtonProps} from './button'

describe('atoms/button', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(<Button icon={AddIcon} text="Label" tone="positive" />, {
      scheme: 'light',
    })

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<Button icon={AddIcon} text="Label" tone="positive" />, {
      scheme: 'dark',
    })

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render text', () => {
    render(<Button text="Button text" />)

    expect(screen.getByText('Button text')).toBeInTheDocument()
  })

  it('should wrap button', () => {
    function WrappedButton({button: buttonProps}: {button: ButtonProps}) {
      return <Button {...buttonProps} />
    }

    const buttonProps: ButtonProps = {
      text: 'Button text',
    }

    render(<WrappedButton button={buttonProps} />)

    expect(screen.getByText('Button text')).toBeInTheDocument()
  })
})
