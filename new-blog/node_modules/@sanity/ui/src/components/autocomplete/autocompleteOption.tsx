import React, {useCallback} from 'react'
import {_isEnterToClickElement} from '../../helpers'

export interface AutocompleteOptionProps {
  children: React.ReactNode
  id: string
  onSelect: (v: string) => void
  selected: boolean
  value: string
}

export function AutocompleteOption(props: AutocompleteOptionProps): React.ReactElement {
  const {children, id, onSelect, selected, value} = props

  const handleClick = useCallback(() => {
    // Calling the `onSelect` in a timeout is a fix to
    // allow the `click` event to propagate in some cases
    setTimeout(() => {
      onSelect(value)
    }, 0)
  }, [onSelect, value])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLLIElement>) => {
      if (event.key === 'Enter' && !_isEnterToClickElement(event.currentTarget)) {
        handleClick()
      }
    },
    [handleClick]
  )

  return (
    <li
      aria-selected={selected}
      data-ui="AutocompleteOption"
      id={id}
      role="option"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </li>
  )
}
