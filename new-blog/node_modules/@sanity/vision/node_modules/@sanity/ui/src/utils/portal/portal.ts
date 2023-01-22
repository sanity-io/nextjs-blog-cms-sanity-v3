import {createPortal} from 'react-dom'
import {usePortal} from './usePortal'

/**
 * @public
 */
export interface PortalProps {
  children: React.ReactNode
  /**
   * @beta This API might change. DO NOT USE IN PRODUCTION.
   */
  __unstable_name?: string
}

/**
 * @public
 */
export function Portal(props: PortalProps): React.ReactPortal | null {
  const {children, __unstable_name: name} = props
  const portal = usePortal()
  const portalElement =
    (name ? portal.elements && portal.elements[name] : portal.element) || portal.elements?.default

  if (!portalElement) {
    return null
  }

  return createPortal(children, portalElement)
}
