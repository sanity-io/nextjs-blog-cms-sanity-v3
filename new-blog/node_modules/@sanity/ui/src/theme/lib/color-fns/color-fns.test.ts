import {hexToRgb, multiply, parseColor, rgba, screen} from '.'

const hues = {
  gray: {
    600: '#6e7683',
  },
  blue: {
    500: '#2276fc',
  },
}

describe('color-fns', () => {
  describe('hexToRgb', () => {
    it('should convert hex to RGB', () => {
      const hex = '#ff0000'
      const rgb = hexToRgb(hex)

      expect(rgb).toEqual({r: 255, g: 0, b: 0})
    })
  })

  describe('screen', () => {
    it('should blend color using the "screen" mode', () => {
      const backdrop = hexToRgb(hues.blue[500])
      const source = hexToRgb(hues.gray[600])
      const rgb = screen(backdrop, source)

      expect(rgb).toEqual({r: 129, g: 181, b: 254})
    })
  })

  describe('multiply', () => {
    it('should blend color using the "multiply" mode', () => {
      const backdrop = hexToRgb(hues.blue[500])
      const source = hexToRgb(hues.gray[600])
      const rgb = multiply(backdrop, source)

      expect(rgb).toEqual({r: 15, g: 55, b: 129})
    })
  })

  describe('parseColor', () => {
    it('should parse a hex to RGB', () => {
      const rgb = parseColor('#ccc')

      expect(rgb).toEqual({r: 204, g: 204, b: 204})
    })

    it('should parse a HSL to RGB', () => {
      const rgb1 = parseColor('hsl(210, 20%, 50%)')
      const rgb2 = parseColor('hsl(210, 10%, 0%)')

      expect(rgb1).toEqual({r: 102, g: 128, b: 153})
      expect(rgb2).toEqual({r: 0, g: 0, b: 0})
    })
  })

  describe('helpers/rgba', () => {
    it('should convert hex to RGBA string', () => {
      expect(rgba('#f00', 0.5)).toBe(`rgba(255,0,0,0.5)`)
    })
  })
})
