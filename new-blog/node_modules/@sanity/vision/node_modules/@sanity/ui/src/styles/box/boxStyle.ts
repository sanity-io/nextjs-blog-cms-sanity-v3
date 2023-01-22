import {Property} from 'csstype'
import {CSSObject} from 'styled-components'
import {_responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveBoxStyleProps} from './types'

const BASE_STYLE: CSSObject = {
  '&[data-as="ul"],&[data-as="ol"]': {
    listStyle: 'none',
  },
}

const BOX_SIZING: {[key: string]: Property.BoxSizing} = {
  content: 'content-box',
  border: 'border-box',
}

const BOX_HEIGHT = {
  stretch: 'stretch',
  fill: '100%',
}

export function boxStyle(): CSSObject {
  return BASE_STYLE
}

export function responsiveBoxStyle(): Array<
  (props: ResponsiveBoxStyleProps & ThemeProps) => CSSObject[]
> {
  return [
    responsiveBoxSizingStyle,
    responsiveBoxHeightStyle,
    responsiveBoxOverflowStyle,
    responsiveBoxDisplayStyle,
  ]
}

function responsiveBoxDisplayStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$display, (display) => ({
    '&:not([hidden])': {display},
  }))
}

function responsiveBoxSizingStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$sizing, (sizing) => ({
    boxSizing: BOX_SIZING[sizing],
  }))
}

function responsiveBoxHeightStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$height, (height) => ({
    height: BOX_HEIGHT[height],
  }))
}

function responsiveBoxOverflowStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$overflow, (overflow) => ({
    overflow,
  }))
}
