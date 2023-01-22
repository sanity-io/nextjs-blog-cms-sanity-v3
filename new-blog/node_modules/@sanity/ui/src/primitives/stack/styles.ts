import {CSSObject} from 'styled-components'
import {getResponsiveProp, rem, responsive, ThemeProps} from '../../styles'

export interface ResponsiveStackSpaceStyleProps {
  $space?: number | number[]
}

const BASE_STYLE: CSSObject = {
  '&&:not([hidden])': {
    display: 'grid',
  },
  '&[data-as="ul"],&[data-as="ol"]': {
    listStyle: 'none',
  },
  gridTemplateColumns: 'minmax(0, 1fr)',
  gridAutoRows: 'min-content',
}

export function stackBaseStyle(): CSSObject {
  return BASE_STYLE
}

export function responsiveStackSpaceStyle(
  props: ResponsiveStackSpaceStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media, space} = theme.sanity

  return responsive(media, getResponsiveProp(props.$space), (spaceIndex) => ({
    gridGap: rem(space[spaceIndex]),
  }))
}
