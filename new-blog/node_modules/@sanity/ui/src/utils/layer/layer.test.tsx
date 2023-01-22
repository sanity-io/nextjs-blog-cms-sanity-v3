import React from 'react'
import {render} from '../../../test'
import {LayerContext} from './layerContext'
import {LayerContextValue} from './types'
import {useLayer} from './useLayer'

describe('utils/layer', () => {
  describe('useLayer', () => {
    it('should get context value', async () => {
      const log = jest.fn()

      function Debug() {
        const rootLayer = useLayer()

        log(rootLayer)

        return <>debug</>
      }

      function Root() {
        const value: LayerContextValue = {
          version: 0.0,
          isTopLayer: true,
          registerChild: () => () => undefined,
          size: 0,
          zIndex: 0,
        }

        return (
          <LayerContext.Provider value={value}>
            <Debug />
          </LayerContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].version).toBe(0.0)
      expect(log.mock.calls[0][0].isTopLayer).toBe(true)
      expect(typeof log.mock.calls[0][0].registerChild).toBe('function')
      expect(log.mock.calls[0][0].size).toBe(0)
      expect(log.mock.calls[0][0].zIndex).toBe(0)
    })

    it('should fail when no context value is provided', async () => {
      const log = jest.fn()

      function Debug() {
        try {
          useLayer()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        const value = undefined

        return (
          <LayerContext.Provider value={value as any}>
            <Debug />
          </LayerContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual('useLayer(): missing context value')
    })

    it('should fail when context value is not compatible', async () => {
      const log = jest.fn()

      function Debug() {
        try {
          useLayer()
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
          <LayerContext.Provider value={value as any}>
            <Debug />
          </LayerContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual(
        'useLayer(): the context value is not compatible'
      )
    })
  })
})
