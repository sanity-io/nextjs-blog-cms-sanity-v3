/* eslint-disable no-console */

import React, {useCallback, useMemo} from 'react'
import {render} from '../../../test'
import {MenuContext, MenuContextValue} from './menuContext'
import {useMenu} from './useMenu'

describe('components/menu', () => {
  describe('useMenu', () => {
    it('should get context value', async () => {
      const log = jest.fn()

      function Debug() {
        const rootMenu = useMenu()

        log(rootMenu)

        return <>debug</>
      }

      function Root() {
        const handleItemMouseEnter = useCallback(
          (event: React.MouseEvent<HTMLElement>) => console.log(event),
          []
        )

        const handleItemMouseLeave = useCallback(
          (event: React.MouseEvent<HTMLElement>) => console.log(event),
          []
        )

        const value: MenuContextValue = useMemo(
          () => ({
            version: 0.0,
            activeElement: null,
            activeIndex: 0,
            mount: (element: HTMLElement | null) => () => console.log(element),
            onItemClick: () => undefined,
            onItemMouseEnter: handleItemMouseEnter,
            onItemMouseLeave: handleItemMouseLeave,
            onMouseEnter: handleItemMouseEnter,
            onMouseLeave: handleItemMouseLeave,
          }),
          [handleItemMouseEnter, handleItemMouseLeave]
        )

        return (
          <MenuContext.Provider value={value}>
            <Debug />
          </MenuContext.Provider>
        )
      }

      render(<Root />)

      const contextValue = log.mock.calls[0][0]

      expect(contextValue.version).toBe(0.0)
      expect(contextValue.activeIndex).toBe(0)
      expect(typeof contextValue.mount).toBe('function')
      expect(typeof contextValue.onItemClick).toBe('function')
      expect(typeof contextValue.onItemMouseEnter).toBe('function')
      expect(typeof contextValue.onItemMouseEnter).toBe('function')
    })

    it('should fail when no context value is provided', async () => {
      const log = jest.fn()

      function Debug() {
        try {
          useMenu()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value: any = undefined

        return (
          <MenuContext.Provider value={value}>
            <Debug />
          </MenuContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual('useMenu(): missing context value')
    })

    it('should fail when context value is not compatible', async () => {
      const log = jest.fn()

      function Debug() {
        try {
          useMenu()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        // NOTE: we’re testing this because the context value may be a function in the future
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value: any = () => {
          return {version: 1}
        }

        return (
          <MenuContext.Provider value={value}>
            <Debug />
          </MenuContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual('useMenu(): the context value is not compatible')
    })
  })
})
