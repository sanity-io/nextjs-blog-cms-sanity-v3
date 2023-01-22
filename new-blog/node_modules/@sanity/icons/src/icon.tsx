import {createElement, forwardRef} from 'react'
import {icons} from './icons'
import type {IconSymbol} from './icons'

/**
 * @public
 */
export interface IconProps {
  symbol: IconSymbol
}

/**
 * @public
 */
export const Icon = forwardRef(function Icon(
  props: IconProps & Omit<React.SVGProps<SVGSVGElement>, 'ref'>,
  ref: React.Ref<SVGSVGElement>
) {
  const {symbol, ...restProps} = props
  const iconComponent = icons[symbol]

  if (!iconComponent) {
    return null
  }

  return createElement(iconComponent, {...restProps, ref})
})
