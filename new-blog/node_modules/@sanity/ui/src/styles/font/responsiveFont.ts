import {CSSObject} from 'styled-components'
import {ThemeFontSize, ThemeFontKey} from '../../theme'
import {getResponsiveProp, rem, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveFontStyleProps} from './types'

/**
 * A utility function getting responsive font styles.
 * @internal
 */
export function responsiveFont(
  fontKey: ThemeFontKey,
  props: ResponsiveFontStyleProps & ThemeProps
): CSSObject[] {
  const {$size, $weight, theme} = props
  const {fonts, media} = theme.sanity
  const {family, sizes, weights} = fonts[fontKey]
  const fontWeight = ($weight && weights[$weight]) || weights.regular

  // @todo: make this configurable
  const defaultSize = sizes[2]

  const base: CSSObject = {
    position: 'relative',
    fontFamily: family,
    fontWeight,
    padding: '1px 0',
    margin: 0,

    '&:before': {
      content: '""',
      display: 'block',
      height: 0,
    },

    '&:after': {
      content: '""',
      display: 'block',
      height: 0,
    },

    '& > code, & > span': {
      display: 'block',
    },

    '&:not([hidden])': {
      display: 'block',
    },
  }

  const resp = responsive(media, getResponsiveProp($size), (sizeIndex) =>
    fontSize(sizes[sizeIndex] || defaultSize)
  )

  return [base, ...resp]
}

export function fontSize(size: ThemeFontSize): CSSObject {
  const {ascenderHeight, descenderHeight, fontSize, iconSize, letterSpacing, lineHeight} = size
  const negHeight = ascenderHeight + descenderHeight
  const capHeight = lineHeight - negHeight
  const iconOffset = (capHeight - iconSize) / 2
  const customIconSize = Math.floor((fontSize * 1.125) / 2) * 2 + 1
  const customIconOffset = (capHeight - customIconSize) / 2

  return {
    fontSize: rem(fontSize),
    lineHeight: `calc(${lineHeight} / ${fontSize})`,
    letterSpacing: rem(letterSpacing),
    transform: `translateY(${rem(descenderHeight)})`,

    '&:before': {
      marginTop: `calc(${rem(0 - negHeight)} - 1px)`,
    },

    '&:after': {
      marginBottom: '-1px',
    },

    '& svg:not([data-sanity-icon])': {
      fontSize: `calc(${customIconSize} / 16 * 1rem)`,
      margin: rem(customIconOffset),
    },

    '& [data-sanity-icon]': {
      fontSize: `calc(${iconSize} / 16 * 1rem)`,
      margin: rem(iconOffset),
    },
  }
}
