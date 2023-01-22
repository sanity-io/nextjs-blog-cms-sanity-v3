import React from 'react'
import {render} from '../../../test'
import {ToastContext} from './toastContext'
import {ToastContextValue} from './types'
import {useToast} from './useToast'

describe('components/toast', () => {
  describe('useToast', () => {
    it('should get context value', async () => {
      const log = jest.fn()

      function Debug() {
        const rootToast = useToast()

        log(rootToast)

        return <>debug</>
      }

      function Root() {
        const value: ToastContextValue = {
          version: 0.0,
          push: () => '',
        }

        return (
          <ToastContext.Provider value={value}>
            <Debug />
          </ToastContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].version).toBe(0.0)
      expect(typeof log.mock.calls[0][0].push).toBe('function')
    })

    it('should fail when no context value is provided', async () => {
      const log = jest.fn()

      function Debug() {
        try {
          useToast()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        const value = undefined

        return (
          <ToastContext.Provider value={value as any}>
            <Debug />
          </ToastContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual('useToast(): missing context value')
    })

    it('should fail when context value is not compatible', async () => {
      const log = jest.fn()

      function Debug() {
        try {
          useToast()
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
          <ToastContext.Provider value={value as any}>
            <Debug />
          </ToastContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual(
        'useToast(): the context value is not compatible'
      )
    })
  })
})
