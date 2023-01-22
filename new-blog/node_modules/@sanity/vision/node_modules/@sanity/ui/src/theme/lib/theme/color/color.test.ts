/** @jest-environment jsdom */

import {createColorTheme} from './factory'

describe('color', () => {
  describe('createColorTheme', () => {
    it('should generate base (scheme=light, name=default)', () => {
      const theme = createColorTheme()
      const scheme = 'light'
      const name = 'default'
      const color = theme[scheme][name]

      expect(color.base).toEqual({
        bg: 'hsl(0, 0%, 100%)',
        border: 'hsl(0, 0%, 95%)',
        fg: 'hsl(0, 0%, 0%)',
        focusRing: 'hsl(240, 100%, 50%)',
        shadow: {
          ambient: 'hsl(0, 0%, 0%)',
          outline: 'hsl(0, 0%, 0%)',
          penumbra: 'hsl(0, 0%, 0%)',
          umbra: 'hsl(0, 0%, 0%)',
        },
        skeleton: {
          from: 'hsl(0, 0%, 0%)',
          to: 'hsl(0, 0%, 0%)',
        },
      })
    })

    it('should generate muted states (scheme=light, name=default)', () => {
      const theme = createColorTheme()
      const scheme = 'light'
      const name = 'default'
      const color = theme[scheme][name]

      expect(color.muted.default.enabled).toEqual({
        bg: 'hsl(0, 0%, 95%)',
        bg2: 'hsl(0, 0%, 95%)',
        border: 'hsl(0, 0%, 70%)',
        fg: 'hsl(0, 0%, 20%)',
        muted: {
          fg: 'hsl(0, 0%, 0%)',
        },
        link: {
          fg: 'hsl(0, 0%, 0%)',
        },
        accent: {
          fg: 'hsl(0, 0%, 0%)',
        },
        code: {
          bg: 'hsl(0, 0%, 0%)',
          fg: 'hsl(0, 0%, 0%)',
        },
        skeleton: {
          from: 'hsl(0, 0%, 0%)',
          to: 'hsl(0, 0%, 0%)',
        },
      })
    })
  })
})
