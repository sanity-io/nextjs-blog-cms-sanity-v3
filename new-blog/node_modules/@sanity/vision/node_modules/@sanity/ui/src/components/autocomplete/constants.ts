import {Placement} from '../../types'

/**
 * @internal
 */
export const AUTOCOMPLETE_LISTBOX_IGNORE_KEYS = [
  'Control',
  'Shift',
  'Alt',
  'Enter',
  'Home',
  'End',
  'PageUp',
  'PageDown',
  'Meta',
  'Tab',
  'CapsLock',
]

/**
 * @internal
 */
export const AUTOCOMPLETE_POPOVER_PLACEMENT: Placement = 'bottom-start'

/**
 * @internal
 */
export const AUTOCOMPLETE_POPOVER_FALLBACK_PLACEMENTS: Placement[] = ['bottom-start', 'top-start']
