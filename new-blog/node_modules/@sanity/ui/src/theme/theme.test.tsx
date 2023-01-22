import React from 'react'
import {render} from '../../test'
import {studioTheme} from './studioTheme'
import {ThemeContext} from './themeContext'
import {ThemeContextValue} from './types'
import {useRootTheme} from './useRootTheme'

describe('theme', () => {
  describe('useRootTheme', () => {
    it('should get context value', async () => {
      const log = jest.fn()

      function Debug() {
        const rootTheme = useRootTheme()

        log(rootTheme)

        return <>debug</>
      }

      function Root() {
        const value: ThemeContextValue = {
          version: 0.0,
          scheme: 'light',
          theme: studioTheme,
          tone: 'default',
        }

        return (
          <ThemeContext.Provider value={value}>
            <Debug />
          </ThemeContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].version).toBe(0.0)
      expect(log.mock.calls[0][0].scheme).toBe('light')
      expect(log.mock.calls[0][0].tone).toBe('default')
    })

    it('should fail when no context value is provided', async () => {
      const log = jest.fn()

      function Debug() {
        try {
          useRootTheme()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        const value = undefined

        return (
          <ThemeContext.Provider value={value as any}>
            <Debug />
          </ThemeContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual('useRootTheme(): missing context value')
    })

    it('should fail when context value is not compatible', async () => {
      const log = jest.fn()

      function Debug() {
        try {
          useRootTheme()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        // NOTE: we’re testing this because the context value may be a function in the future
        const value = () => {
          return {version: 1}
        }

        return (
          <ThemeContext.Provider value={value as any}>
            <Debug />
          </ThemeContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual(
        'useRootTheme(): the context value is not compatible'
      )
    })
  })
})
