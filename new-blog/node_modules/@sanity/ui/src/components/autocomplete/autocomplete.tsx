import {ChevronDownIcon} from '@sanity/icons'
import React, {
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import {EMPTY_ARRAY, EMPTY_RECORD} from '../../constants'
import {_hasFocus, _raf, focusFirstDescendant} from '../../helpers'
import {useForwardedRef, useResponsiveProp} from '../../hooks'
import {Box, BoxProps, Button, Card, PopoverProps, Stack, Text, TextInput} from '../../primitives'
import {AnimatedSpinnerIcon, ListBox, ResultsPopover, Root} from './autocomplete.styles'
import {AutocompleteOption} from './autocompleteOption'
import {autocompleteReducer} from './autocompleteReducer'
import {
  AUTOCOMPLETE_LISTBOX_IGNORE_KEYS,
  AUTOCOMPLETE_POPOVER_FALLBACK_PLACEMENTS,
  AUTOCOMPLETE_POPOVER_MARGINS,
  AUTOCOMPLETE_POPOVER_PLACEMENT,
} from './constants'
import {AutocompleteOpenButtonProps, BaseAutocompleteOption} from './types'

/**
 * @public
 */
export interface AutocompleteProps<Option extends BaseAutocompleteOption = BaseAutocompleteOption> {
  border?: boolean
  customValidity?: string
  filterOption?: (query: string, option: Option) => boolean
  fontSize?: number | number[]
  icon?: React.ComponentType | React.ReactNode
  id: string
  /**
   * @beta
   */
  listBox?: BoxProps
  loading?: boolean
  onChange?: (value: string) => void
  onQueryChange?: (query: string | null) => void
  onSelect?: (value: string) => void
  /**
   * @beta
   */
  openButton?: boolean | AutocompleteOpenButtonProps
  options?: Option[]
  padding?: number | number[]
  popover?: Omit<PopoverProps, 'content' | 'onMouseEnter' | 'onMouseLeave' | 'open'> &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'content' | 'ref' | 'width'>
  prefix?: React.ReactNode
  radius?: number | number[]
  /**
   * @beta
   */
  relatedElements?: HTMLElement[]
  renderOption?: (option: Option) => React.ReactElement
  /**
   * @beta
   */
  renderPopover?: (
    props: {
      content: React.ReactElement | null
      hidden: boolean
      inputElement: HTMLInputElement | null
      onMouseEnter: () => void
      onMouseLeave: () => void
    },
    ref: React.Ref<HTMLDivElement>
  ) => React.ReactNode
  renderValue?: (value: string, option?: Option) => string
  suffix?: React.ReactNode
  value?: string
}

const defaultRenderValue = (value: string, option?: BaseAutocompleteOption) =>
  option ? option.value : value

const defaultFilterOption = (query: string, option: BaseAutocompleteOption) =>
  option.value.toLowerCase().indexOf(query.toLowerCase()) > -1

const InnerAutocomplete = forwardRef(function InnerAutocomplete<
  Option extends BaseAutocompleteOption
>(
  props: AutocompleteProps<Option> &
    Omit<
      React.HTMLProps<HTMLInputElement>,
      | 'aria-activedescendant'
      | 'aria-autocomplete'
      | 'aria-expanded'
      | 'aria-owns'
      | 'as'
      | 'autoCapitalize'
      | 'autoComplete'
      | 'autoCorrect'
      | 'id'
      | 'inputMode'
      | 'onChange'
      | 'onSelect'
      | 'prefix'
      | 'ref'
      | 'role'
      | 'spellCheck'
      | 'type'
      | 'value'
    >,
  ref: React.Ref<HTMLInputElement>
) {
  const {
    border = true,
    customValidity,
    disabled,
    filterOption: filterOptionProp,
    fontSize = 2,
    icon,
    id,
    listBox = {},
    loading,
    onBlur,
    onChange,
    onFocus,
    onQueryChange,
    onSelect,
    openButton,
    options: optionsProp,
    padding: paddingProp = 3,
    popover = {},
    prefix,
    radius = 3,
    readOnly,
    relatedElements,
    renderOption: renderOptionProp,
    renderPopover,
    renderValue = defaultRenderValue,
    suffix,
    value: valueProp,
    ...restProps
  } = props

  const [state, dispatch] = useReducer(autocompleteReducer, {
    activeValue: valueProp || null,
    focused: false,
    listFocused: false,
    query: null,
    value: valueProp || null,
  })

  const {activeValue, focused, listFocused, query, value} = state

  const defaultRenderOption = useCallback(
    ({value}: BaseAutocompleteOption) => (
      <Card data-as="button" padding={paddingProp} radius={2} tone="inherit">
        <Text size={fontSize} textOverflow="ellipsis">
          {value}
        </Text>
      </Card>
    ),
    [fontSize, paddingProp]
  )

  const renderOption =
    typeof renderOptionProp === 'function' ? renderOptionProp : defaultRenderOption
  const filterOption =
    typeof filterOptionProp === 'function' ? filterOptionProp : defaultFilterOption
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
  const [resultsPopoverElement, setResultsPopoverElement] = useState<HTMLDivElement | null>(null)
  const inputElementRef = useRef<HTMLInputElement | null>(null)
  const listBoxElementRef = useRef<HTMLDivElement | null>(null)
  const focusedElementRef = useRef<HTMLElement | null>(null)
  const valueRef = useRef(value)
  const valuePropRef = useRef(valueProp)
  const forwardedRef = useForwardedRef(ref)
  const popoverMouseWithinRef = useRef(false)
  const listBoxId = `${id}-listbox`
  const options = Array.isArray(optionsProp) ? optionsProp : EMPTY_ARRAY
  const padding = useResponsiveProp(paddingProp)
  const currentOption = useMemo(
    () => (value !== null ? options.find((o) => o.value === value) : undefined),
    [options, value]
  )
  const filteredOptions = useMemo(
    () => options.filter((option) => (query ? filterOption(query, option) : true)),
    [filterOption, options, query]
  )
  const filteredOptionsLen = filteredOptions.length
  const activeItemId = activeValue ? `${id}-option-${activeValue}` : undefined
  const expanded = (query !== null && loading) || (focused && query !== null)

  const handleRootBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setTimeout(() => {
        // NOTE: This is a workaround for a bug that may happen in Chrome (clicking the scrollbar
        // closes the results in certain situations):
        // - Do not handle blur if the mouse is within the popover
        if (popoverMouseWithinRef.current) {
          return
        }

        const elements: HTMLElement[] = (relatedElements || []).concat(
          rootElement ? [rootElement] : [],
          resultsPopoverElement ? [resultsPopoverElement] : []
        )

        let focusInside = false

        if (document.activeElement) {
          for (const e of elements) {
            if (e === document.activeElement || e.contains(document.activeElement)) {
              focusInside = true
              break
            }
          }
        }

        if (focusInside === false) {
          dispatch({type: 'root/blur'})
          popoverMouseWithinRef.current = false
          if (onQueryChange) onQueryChange(null)
          if (onBlur) onBlur(event)
        }
      }, 0)
    },
    [onBlur, onQueryChange, relatedElements, resultsPopoverElement, rootElement]
  )

  const handleRootFocus = useCallback((event: React.FocusEvent) => {
    const listBoxElement = listBoxElementRef.current
    const focusedElement = event.target instanceof HTMLElement ? event.target : null

    focusedElementRef.current = focusedElement

    const nextListFocused = Boolean(
      listBoxElement && focusedElement && listBoxElement.contains(focusedElement)
    )

    dispatch({type: 'root/setListFocused', listFocused: nextListFocused})
  }, [])

  const handleOptionSelect = useCallback(
    (v: string) => {
      dispatch({type: 'value/change', value: v})

      popoverMouseWithinRef.current = false

      if (onSelect) onSelect(v)

      valueRef.current = v

      if (onChange) onChange(v)
      if (onQueryChange) onQueryChange(null)

      inputElementRef.current?.focus()
    },
    [onChange, onSelect, onQueryChange]
  )

  const handleRootKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()

        if (!filteredOptionsLen) return

        const activeOption = filteredOptions.find((o) => o.value === activeValue)
        const activeIndex = activeOption ? filteredOptions.indexOf(activeOption) : -1
        const nextActiveOption = filteredOptions[(activeIndex + 1) % filteredOptionsLen]

        if (nextActiveOption) {
          dispatch({type: 'root/setActiveValue', value: nextActiveOption.value, listFocused: true})
        }

        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()

        if (!filteredOptionsLen) return

        const activeOption = filteredOptions.find((o) => o.value === activeValue)
        const activeIndex = activeOption ? filteredOptions.indexOf(activeOption) : -1
        const nextActiveOption =
          filteredOptions[
            activeIndex === -1
              ? filteredOptionsLen - 1
              : (filteredOptionsLen + activeIndex - 1) % filteredOptionsLen
          ]

        if (nextActiveOption) {
          dispatch({type: 'root/setActiveValue', value: nextActiveOption.value, listFocused: true})
        }

        return
      }

      if (event.key === 'Escape') {
        dispatch({type: 'root/escape'})
        popoverMouseWithinRef.current = false
        if (onQueryChange) onQueryChange(null)
        inputElementRef.current?.focus()

        return
      }

      const target = event.target as Node
      const listEl = listBoxElementRef.current

      if (
        (listEl === target || listEl?.contains(target)) &&
        !AUTOCOMPLETE_LISTBOX_IGNORE_KEYS.includes(event.key)
      ) {
        inputElementRef.current?.focus()

        return
      }
    },
    [activeValue, filteredOptions, filteredOptionsLen, onQueryChange]
  )

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextQuery = event.currentTarget.value

      dispatch({type: 'input/change', query: nextQuery})

      if (onQueryChange) onQueryChange(nextQuery)
    },
    [onQueryChange]
  )

  const handleInputFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (!focused) {
        dispatch({type: 'input/focus'})

        if (onFocus) onFocus(event)
      }
    },
    [focused, onFocus]
  )

  const handlePopoverMouseEnter = useCallback(() => {
    popoverMouseWithinRef.current = true
  }, [])

  const handlePopoverMouseLeave = useCallback(() => {
    popoverMouseWithinRef.current = false
  }, [])

  const handleClearButtonClick = useCallback(() => {
    dispatch({type: 'root/clear'})
    valueRef.current = ''
    if (onChange) onChange('')
    if (onQueryChange) onQueryChange(null)
    inputElementRef.current?.focus()
  }, [onChange, onQueryChange])

  const handleClearButtonFocus = useCallback(() => {
    dispatch({type: 'input/focus'})
  }, [])

  // Change the value when `value` prop changes
  useEffect(() => {
    if (valueProp !== valuePropRef.current) {
      valuePropRef.current = valueProp

      if (valueProp !== undefined) {
        dispatch({type: 'value/change', value: valueProp})
        valueRef.current = valueProp
      }

      return
    }

    if (valueProp !== value) {
      dispatch({type: 'value/change', value: valueProp || null})
    }
  }, [valueProp, value])

  // Reset active item when closing
  useEffect(() => {
    if (!focused) {
      if (valueRef.current) {
        dispatch({type: 'root/setActiveValue', value: valueRef.current})
      }
    }
  }, [focused])

  // Focus the selected item
  useEffect(() => {
    const listElement = listBoxElementRef.current

    if (!listElement) return

    const activeOption = filteredOptions.find((o) => o.value === activeValue)

    if (activeOption) {
      const activeIndex = filteredOptions.indexOf(activeOption)
      const activeItemElement = listElement.childNodes[activeIndex] as HTMLLIElement | undefined

      if (activeItemElement) {
        if (_hasFocus(activeItemElement)) {
          // already focused
          return
        }

        focusFirstDescendant(activeItemElement)
      }
    }
  }, [activeValue, filteredOptions])

  const setRef = useCallback(
    (el: HTMLInputElement | null) => {
      inputElementRef.current = el
      forwardedRef.current = el
    },
    [forwardedRef]
  )

  const clearButton = useMemo(() => {
    if (!loading && !disabled && value) {
      return {
        'aria-label': 'Clear',
        onFocus: handleClearButtonFocus,
      }
    }

    return undefined
  }, [disabled, handleClearButtonFocus, loading, value])

  const openButtonBoxPadding = useMemo(
    () =>
      padding.map((v) => {
        if (v === 0) return 0
        if (v === 1) return 1
        if (v === 2) return 1

        return v - 2
      }),
    [padding]
  )
  const openButtonPadding = useMemo(
    () =>
      padding.map((v) => {
        if (v === 0) return 0
        if (v === 1) return 0
        if (v === 2) return 1

        return v - 1
      }),
    [padding]
  )
  const openButtonProps: AutocompleteOpenButtonProps = useMemo(
    () => (typeof openButton === 'object' ? openButton : EMPTY_RECORD),
    [openButton]
  )

  const handleOpenClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      dispatch({
        type: 'root/open',
        query: value ? renderValue(value, currentOption) : '',
      })

      if (openButtonProps.onClick) openButtonProps.onClick(event)

      _raf(() => inputElementRef.current?.focus())
    },
    [currentOption, openButtonProps, renderValue, value]
  )

  const openButtonNode = useMemo(
    () =>
      !disabled && !readOnly && openButton ? (
        <Box aria-hidden={expanded} padding={openButtonBoxPadding}>
          <Button
            aria-label="Open"
            disabled={expanded}
            fontSize={fontSize}
            icon={ChevronDownIcon}
            mode="bleed"
            padding={openButtonPadding}
            {...openButtonProps}
            onClick={handleOpenClick}
          />
        </Box>
      ) : undefined,
    [
      disabled,
      expanded,
      fontSize,
      handleOpenClick,
      openButton,
      openButtonBoxPadding,
      openButtonPadding,
      openButtonProps,
      readOnly,
    ]
  )

  const inputValue = useMemo(() => {
    if (query === null) {
      if (value !== null) {
        return renderValue(value, currentOption)
      }

      return ''
    }

    return query
  }, [currentOption, query, renderValue, value])

  const input = (
    <TextInput
      {...restProps}
      aria-activedescendant={activeItemId}
      aria-autocomplete="list"
      aria-expanded={expanded}
      aria-owns={listBoxId}
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      border={border}
      clearButton={clearButton}
      customValidity={customValidity}
      disabled={disabled}
      fontSize={fontSize}
      icon={icon}
      iconRight={loading && AnimatedSpinnerIcon}
      id={id}
      inputMode="search"
      onChange={handleInputChange}
      onClear={handleClearButtonClick}
      onFocus={handleInputFocus}
      padding={padding}
      prefix={prefix}
      radius={radius}
      readOnly={readOnly}
      ref={setRef}
      role="combobox"
      spellCheck={false}
      suffix={suffix || openButtonNode}
      value={inputValue}
    />
  )

  const handleListBoxKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      // If the focus is currently in the list, move focus to the input element
      if (event.key === 'Tab') {
        if (listFocused) inputElementRef.current?.focus()
      }
    },
    [listFocused]
  )

  const content = useMemo(() => {
    if (filteredOptions.length === 0) return null

    return (
      <ListBox
        data-ui="AutoComplete__results"
        onKeyDown={handleListBoxKeyDown}
        padding={1}
        {...listBox}
        tabIndex={-1}
      >
        <Stack
          as="ul"
          aria-multiselectable={false}
          data-ui="AutoComplete__resultsList"
          id={listBoxId}
          ref={listBoxElementRef}
          role="listbox"
          space={1}
        >
          {filteredOptions.map((option) => {
            const active =
              activeValue !== null ? option.value === activeValue : currentOption === option

            return (
              <AutocompleteOption
                id={`${id}-option-${option.value}`}
                key={option.value}
                onSelect={handleOptionSelect}
                selected={active}
                value={option.value}
              >
                {cloneElement(renderOption(option), {
                  disabled: loading,
                  selected: active,
                  tabIndex: listFocused && active ? 0 : -1,
                })}
              </AutocompleteOption>
            )
          })}
        </Stack>
      </ListBox>
    )
  }, [
    activeValue,
    currentOption,
    filteredOptions,
    handleOptionSelect,
    handleListBoxKeyDown,
    id,
    listBox,
    listBoxId,
    listFocused,
    loading,
    renderOption,
  ])

  const results = useMemo(() => {
    if (renderPopover) {
      return renderPopover(
        {
          content,
          hidden: !expanded,
          inputElement: inputElementRef.current,
          onMouseEnter: handlePopoverMouseEnter,
          onMouseLeave: handlePopoverMouseLeave,
        },
        setResultsPopoverElement
      )
    }

    if (filteredOptionsLen === 0) {
      return null
    }

    return (
      <ResultsPopover
        __unstable_margins={AUTOCOMPLETE_POPOVER_MARGINS}
        arrow={false}
        constrainSize
        content={content}
        fallbackPlacements={AUTOCOMPLETE_POPOVER_FALLBACK_PLACEMENTS}
        matchReferenceWidth
        onMouseEnter={handlePopoverMouseEnter}
        onMouseLeave={handlePopoverMouseLeave}
        open={expanded}
        placement={AUTOCOMPLETE_POPOVER_PLACEMENT}
        portal
        radius={radius}
        ref={setResultsPopoverElement}
        referenceElement={inputElementRef.current}
        {...popover}
      />
    )
  }, [
    content,
    expanded,
    filteredOptionsLen,
    handlePopoverMouseEnter,
    handlePopoverMouseLeave,
    popover,
    radius,
    renderPopover,
  ])

  return (
    <Root
      data-ui="Autocomplete"
      onBlur={handleRootBlur}
      onFocus={handleRootFocus}
      onKeyDown={handleRootKeyDown}
      ref={setRootElement}
    >
      {input}
      {results}
    </Root>
  )
})

/**
 * @public
 */
export const Autocomplete = InnerAutocomplete as <Option extends BaseAutocompleteOption>(
  props: AutocompleteProps<Option> &
    Omit<
      React.HTMLProps<HTMLInputElement>,
      | 'aria-activedescendant'
      | 'aria-autocomplete'
      | 'aria-expanded'
      | 'aria-owns'
      | 'as'
      | 'autoCapitalize'
      | 'autoComplete'
      | 'autoCorrect'
      | 'id'
      | 'inputMode'
      | 'onChange'
      | 'onSelect'
      | 'prefix'
      | 'ref'
      | 'role'
      | 'spellCheck'
      | 'type'
      | 'value'
    > & {
      ref?: React.Ref<HTMLInputElement>
    }
) => React.ReactElement
