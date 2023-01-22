import {Component, PropsWithChildren} from 'react'
import {Code} from '../primitives/code'

/**
 * DO NOT USE IN PRODUCTION
 * @beta
 */
export type ErrorBoundaryProps = PropsWithChildren<{
  onCatch: (params: {error: Error; info: React.ErrorInfo}) => void
}>

/**
 * DO NOT USE IN PRODUCTION
 * @beta
 */
export interface ErrorBoundaryState {
  error: Error | null
}

/**
 * DO NOT USE IN PRODUCTION
 * @beta
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {error: null}

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return {error}
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.props.onCatch({error, info})
  }

  render(): React.ReactNode {
    const {error} = this.state

    if (error) {
      const message = typeof error?.message === 'string' ? error.message : 'Error'

      return <Code>{message}</Code>
    }

    return this.props.children
  }
}
