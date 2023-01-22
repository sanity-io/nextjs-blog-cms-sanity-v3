import {CSSObject} from 'styled-components'
import {rem, _responsive, ThemeProps} from '../../styles'
import {ResponsiveWidthStyleProps} from './types'

const BASE_STYLE: CSSObject = {
  width: '100%',
  margin: '0 auto',
}

export function containerBaseStyle(): CSSObject {
  return BASE_STYLE
}

export function responsiveContainerWidthStyle(
  props: ResponsiveWidthStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {container, media} = theme.sanity

  return _responsive(media, props.$width, (val) => ({
    maxWidth: val === 'auto' ? 'none' : rem(container[val]),
  }))
}
