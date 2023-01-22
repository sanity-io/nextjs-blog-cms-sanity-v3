import {CSSObject} from 'styled-components'
import {getResponsiveProp, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveBorderStyleProps} from './types'

const BORDER_VALUE = '1px solid var(--card-border-color)'

export function responsiveBorderStyle(): Array<
  (props: ResponsiveBorderStyleProps & ThemeProps) => CSSObject[]
> {
  return [border, borderTop, borderRight, borderBottom, borderLeft]
}

function border(props: ResponsiveBorderStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$border), (value) =>
    value ? {'&&': {border: BORDER_VALUE}} : {'&&': {border: 0}}
  )
}

function borderTop(props: ResponsiveBorderStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$borderTop), (value) =>
    value ? {'&&': {borderTop: BORDER_VALUE}} : {'&&': {borderTop: 0}}
  )
}

function borderRight(props: ResponsiveBorderStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$borderRight), (value) =>
    value ? {'&&': {borderRight: BORDER_VALUE}} : {'&&': {borderRight: 0}}
  )
}

function borderBottom(props: ResponsiveBorderStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$borderBottom), (value) =>
    value ? {'&&': {borderBottom: BORDER_VALUE}} : {'&&': {borderBottom: 0}}
  )
}

function borderLeft(props: ResponsiveBorderStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$borderLeft), (value) =>
    value ? {'&&': {borderLeft: BORDER_VALUE}} : {'&&': {borderLeft: 0}}
  )
}
