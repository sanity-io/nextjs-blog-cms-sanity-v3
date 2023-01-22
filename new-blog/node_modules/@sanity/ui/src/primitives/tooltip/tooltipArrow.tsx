import React, {forwardRef} from 'react'
import styled from 'styled-components'

const Root = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  fill: none;

  :empty + & {
    display: none;
  }

  & > svg {
    &:not([hidden]) {
      display: block;
    }
    transform-origin: 7.5px 7.5px;
  }

  [data-popper-placement^='top'] > div > & {
    bottom: -15px;
  }

  [data-popper-placement^='right'] > div > & {
    left: -15px;

    & > svg {
      transform: rotate(90deg);
    }
  }

  [data-popper-placement^='left'] > div > & {
    right: -15px;

    & > svg {
      transform: rotate(-90deg);
    }
  }

  [data-popper-placement^='bottom'] > div > & {
    top: -15px;

    & > svg {
      transform: rotate(180deg);
    }
  }
`

const Border = styled.path`
  fill: var(--card-shadow-outline-color);
`

const Shape = styled.path`
  fill: var(--card-bg-color);
`

interface TooltipArrowProps {}

export const TooltipArrow = forwardRef(function TooltipArrow(
  props: TooltipArrowProps & Omit<React.HTMLProps<HTMLDivElement>, 'as'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {...restProps} = props

  return (
    <Root {...restProps} ref={ref}>
      <svg width="15" height="15" viewBox="0 0 15 15">
        <Border d="M11.5266 1C11.032 1.32802 10.5837 1.73105 10.1995 2.20057L9.04792 3.6081C8.24771 4.58614 6.7523 4.58614 5.95209 3.6081L4.80047 2.20057C4.41632 1.73105 3.96796 1.32802 3.47341 1H0.156727C1.65639 1 3.07687 1.67313 4.02651 2.83381L5.17813 4.24134C6.37844 5.70839 8.62156 5.70839 9.82187 4.24134L10.9735 2.83381C11.9231 1.67313 13.3436 1 14.8433 1H11.5266Z" />
        <Shape d="M0.156725 0C1.95632 0 3.66089 0.80776 4.80047 2.20057L5.95209 3.6081C6.75229 4.58614 8.24771 4.58614 9.04791 3.6081L10.1995 2.20057C11.3391 0.80776 13.0437 0 14.8433 0H15H0H0.156725Z" />
      </svg>
    </Root>
  )
})
