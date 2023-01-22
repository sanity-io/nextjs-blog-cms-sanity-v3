import {AutocompleteMsg, AutocompleteState} from './types'

/**
 * @internal
 */
export function autocompleteReducer(
  state: AutocompleteState,
  msg: AutocompleteMsg
): AutocompleteState {
  if (msg.type === 'input/change') {
    return {...state, activeValue: null, focused: true, query: msg.query}
  }

  if (msg.type === 'input/focus') {
    return {...state, focused: true}
  }

  if (msg.type === 'root/blur') {
    return {...state, focused: false, query: null}
  }

  if (msg.type === 'root/clear') {
    return {...state, activeValue: null, query: null, value: null}
  }

  if (msg.type === 'root/escape') {
    return {...state, focused: false, query: null}
  }

  if (msg.type === 'root/open') {
    return {...state, query: state.query || msg.query}
  }

  if (msg.type === 'root/setActiveValue') {
    return {...state, activeValue: msg.value, listFocused: msg.listFocused || state.listFocused}
  }

  if (msg.type === 'root/setListFocused') {
    return {...state, listFocused: msg.listFocused}
  }

  if (msg.type === 'value/change') {
    return {...state, activeValue: msg.value, query: null, value: msg.value}
  }

  return state
}
