import React from 'react'
import {render} from '../../../test'
import {BoundaryElementContext} from './boundaryElementContext'
import {BoundaryElementContextValue} from './types'
import {useBoundaryElement} from './useBoundaryElement'

describe('utils/boundaryElement', () => {
  describe('useBoundaryElement', () => {
    it('should get context value', async () => {
      const log = jest.fn()

      function Debug() {
        const rootBoundaryElement = useBoundaryElement()

        log(rootBoundaryElement)

        return <>debug</>
      }

      function Root() {
        const value: BoundaryElementContextValue = {
          version: 0.0,
          element: null,
        }

        return (
          <BoundaryElementContext.Provider value={value}>
            <Debug />
          </BoundaryElementContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].version).toBe(0.0)
      expect(log.mock.calls[0][0].element).toBe(null)
    })

    it('should provide default value when no context value is provided', async () => {
      const log = jest.fn()

      function Debug() {
        const rootBoundaryElement = useBoundaryElement()

        log(rootBoundaryElement)

        return null
      }

      function Root() {
        const value = undefined

        return (
          <BoundaryElementContext.Provider value={value as any}>
            <Debug />
          </BoundaryElementContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].version).toBe(0.0)
      expect(log.mock.calls[0][0].element).toBe(null)
    })

    it('should fail when context value is not compatible', async () => {
      const log = jest.fn()

      function Debug() {
        try {
          useBoundaryElement()
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
          <BoundaryElementContext.Provider value={value as any}>
            <Debug />
          </BoundaryElementContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual(
        'useBoundaryElement(): the context value is not compatible'
      )
    })
  })
})
