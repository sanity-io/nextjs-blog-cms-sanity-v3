import {useTheme as useStyledTheme} from 'styled-components'

import {Theme} from './types'

/**
 * @public
 */
export function useTheme(): Theme {
  return useStyledTheme() as Theme
}
