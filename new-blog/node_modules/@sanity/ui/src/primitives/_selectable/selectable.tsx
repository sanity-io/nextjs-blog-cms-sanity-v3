import styled from 'styled-components'
import {responsiveBorderStyle, ResponsiveBorderStyleProps} from '../../styles/border'
import {responsiveRadiusStyle, ResponsiveRadiusStyleProps} from '../../styles/radius'
import {Box} from '../box'
import {selectableBaseStyle, selectableColorStyle, SelectableStyleProps} from './style'

/**
 * @internal
 */
export const Selectable = styled(Box)<
  SelectableStyleProps & ResponsiveRadiusStyleProps & ResponsiveBorderStyleProps
>(responsiveBorderStyle, responsiveRadiusStyle, selectableBaseStyle, selectableColorStyle)
