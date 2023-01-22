/** @jest-environment jsdom */

import {studioTheme, Theme} from '../../theme'
import {responsiveMarginStyle} from './marginStyle'

const {color, ...restTheme} = studioTheme
const theme: Theme = {sanity: {...restTheme, color: color.light.default}}

describe('styles/margin', () => {
  it('should 1', () => {
    const styles = responsiveMarginStyle({$margin: [0], theme})

    expect(styles).toEqual([[{margin: 0}]])
  })

  it('should 2', () => {
    const styles = responsiveMarginStyle({$margin: [0, 1, 2], theme})

    expect(styles).toEqual([
      [
        {
          margin: 0,
        },
        {
          '@media screen and (min-width: 360px)': {margin: '0.25rem'},
        },
        {
          '@media screen and (min-width: 600px)': {margin: '0.5rem'},
        },
      ],
    ])
  })
})
