import React from 'react'
import {render} from '../../../test'
import {PortalContext} from './portalContext'
import {PortalContextValue} from './types'
import {usePortal} from './usePortal'

describe('utils/portal', () => {
  describe('usePortal', () => {
    it('should get context value', async () => {
      const log = jest.fn()

      function Debug() {
        const rootPortal = usePortal()

        log(rootPortal)

        return <>debug</>
      }

      function Root() {
        const value: PortalContextValue = {
          version: 0.0,
          boundaryElement: null,
          element: null,
        }

        return (
          <PortalContext.Provider value={value}>
            <Debug />
          </PortalContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].version).toBe(0.0)
      expect(log.mock.calls[0][0].boundaryElement).toBe(null)
      expect(log.mock.calls[0][0].element).toBe(null)
    })

    it('should fail when no context value is provided', async () => {
      const log = jest.fn()

      function Debug() {
        try {
          usePortal()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        const value = undefined

        return (
          <PortalContext.Provider value={value as any}>
            <Debug />
          </PortalContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual('usePortal(): missing context value')
    })

    it('should fail when context value is not compatible', async () => {
      const log = jest.fn()

      function Debug() {
        try {
          usePortal()
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
          <PortalContext.Provider value={value as any}>
            <Debug />
          </PortalContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual(
        'usePortal(): the context value is not compatible'
      )
    })
  })
})
