import {CSSObject} from 'styled-components'
import {getResponsiveProp, rem, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveGridStyleProps} from './types'

const GRID_CSS = {
  '&&:not([hidden])': {
    display: 'grid',
  },
  '&[data-as="ul"],&[data-as="ol"]': {
    listStyle: 'none',
  },
}

const GRID_AUTO_COLUMS = {
  auto: 'auto',
  min: 'min-content',
  max: 'max-content',
  fr: 'minmax(0, 1fr)',
}

const GRID_AUTO_ROWS = {
  auto: 'auto',
  min: 'min-content',
  max: 'max-content',
  fr: 'minmax(0, 1fr)',
}

export function responsiveGridStyle(): Array<
  CSSObject | ((props: ResponsiveGridStyleProps & ThemeProps) => CSSObject[])
> {
  return [
    GRID_CSS,
    responsiveGridAutoFlowStyle,
    responsiveGridAutoRowsStyle,
    responsiveGridAutoColsStyle,
    responsiveGridColumnsStyle,
    responsiveGridRowsStyle,
    responsiveGridGapStyle,
    responsiveGridGapXStyle,
    responsiveGridGapYStyle,
  ]
}

function responsiveGridAutoFlowStyle(props: ResponsiveGridStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$autoFlow), (autoFlow) => ({
    gridAutoFlow: autoFlow,
  }))
}

function responsiveGridAutoRowsStyle(props: ResponsiveGridStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$autoRows), (autoRows) => ({
    gridAutoRows: autoRows && GRID_AUTO_ROWS[autoRows],
  }))
}

function responsiveGridAutoColsStyle(props: ResponsiveGridStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$autoCols), (autoCols) => ({
    gridAutoColumns: autoCols && GRID_AUTO_COLUMS[autoCols],
  }))
}

function responsiveGridColumnsStyle(props: ResponsiveGridStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$columns), (columns) => ({
    gridTemplateColumns: columns && `repeat(${columns},minmax(0,1fr));`,
  }))
}

function responsiveGridRowsStyle(props: ResponsiveGridStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$rows), (rows) => ({
    gridTemplateRows: rows && `repeat(${rows},minmax(0,1fr));`,
  }))
}

function responsiveGridGapStyle(props: ResponsiveGridStyleProps & ThemeProps) {
  const {theme} = props
  const {media, space} = theme.sanity

  return responsive(media, getResponsiveProp(props.$gap), (gap) => ({
    gridGap: gap ? rem(space[gap]) : undefined,
  }))
}

function responsiveGridGapXStyle(props: ResponsiveGridStyleProps & ThemeProps) {
  const {theme} = props
  const {media, space} = theme.sanity

  return responsive(media, getResponsiveProp(props.$gapX), (gapX) => ({
    columnGap: gapX ? rem(space[gapX]) : undefined,
  }))
}

function responsiveGridGapYStyle(props: ResponsiveGridStyleProps & ThemeProps) {
  const {theme} = props
  const {media, space} = theme.sanity

  return responsive(media, getResponsiveProp(props.$gapY), (gapY) => ({
    rowGap: gapY ? rem(space[gapY]) : undefined,
  }))
}
