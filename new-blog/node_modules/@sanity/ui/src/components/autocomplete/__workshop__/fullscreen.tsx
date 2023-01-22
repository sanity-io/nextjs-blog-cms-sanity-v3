import {CloseIcon, SearchIcon} from '@sanity/icons'
import {
  Autocomplete,
  BaseAutocompleteOption,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Label,
  Layer,
  Portal,
  PortalProvider,
  Skeleton,
  Stack,
  Text,
  TextSkeleton,
  useToast,
} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {countriesStore} from '../__mocks__/apiStore'

export default function Fullscreen() {
  const error = useBoolean('Error', false, 'Props')

  const {push: pushToast} = useToast()
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)
  const [closeSearchButtonElement, setCloseSearchButtonElement] =
    useState<HTMLButtonElement | null>(null)
  const [options, setOptions] = useState<BaseAutocompleteOption[]>([])
  const searchRef = useRef<{cancel: () => void} | null>(null)
  const fetchRef = useRef<{cancel: () => void} | null>(null)
  const openSearchButtonElementRef = useRef<HTMLButtonElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingCurrentRef, setLoadingCurrentRef] = useState(false)
  const [open, setOpen] = useState(false)
  const [optionTitle, setOptionTitle] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState<string | null>(null)
  const [value, setValue] = useState<string>('')

  const relatedElements = useMemo(
    () => [closeSearchButtonElement].filter(Boolean) as HTMLElement[],
    [closeSearchButtonElement]
  )

  const search = useCallback((query: string | null) => {
    if (searchRef.current) searchRef.current.cancel()
    searchRef.current = countriesStore.search(query || '', setOptions, setLoading)
  }, [])

  const filterOption = useCallback(() => true, [])

  const handleClose = useCallback(() => setOpen(false), [])

  const handleQueryChange = useCallback(
    (query: string | null) => {
      if (query !== null) search(query)
      setQuery(query)
    },
    [search]
  )

  const handleOpen = useCallback(() => {
    setValue('')
    setOpen(true)
  }, [])

  const handleSelect = useCallback(
    (v: string) => {
      setOpen(false)
      setValue(v)
      pushToast({status: 'info', title: `Selected “${v}”`})
    },
    [pushToast]
  )

  const renderOption = useCallback((option: BaseAutocompleteOption) => {
    return <AsyncOption documentId={option.value} />
  }, [])

  const renderPopover = useCallback(
    (
      props: {
        content: React.ReactNode
        hidden: boolean
        onMouseEnter: () => void
        onMouseLeave: () => void
      },
      ref: React.Ref<HTMLDivElement>
    ) => {
      if (!props.hidden && error) {
        return (
          <Portal>
            <Card
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
              padding={4}
              style={{position: 'absolute', inset: '0 0 0 0'}}
              tone="critical"
            >
              <Flex align="center" height="fill" justify="center">
                <Text align="center" muted>
                  Something went wrong while searching
                </Text>
              </Flex>
            </Card>
          </Portal>
        )
      }

      if (!props.hidden && query && !loading && options.length === 0) {
        return (
          <Portal>
            <Card
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
              padding={4}
              style={{position: 'absolute', inset: '0 0 0 0'}}
            >
              <Flex align="center" height="fill" justify="center">
                <Text align="center" muted>
                  No results for <strong>‘{query}’</strong>
                </Text>
              </Flex>
            </Card>
          </Portal>
        )
      }

      return (
        <Portal>
          <Card
            hidden={props.hidden}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            ref={ref}
          >
            {props.content}
          </Card>
        </Portal>
      )
    },
    [error, loading, options, query]
  )

  const renderValue = useCallback(() => {
    if (loadingCurrentRef) {
      return 'Loading…'
    }

    return optionTitle || ''
  }, [loadingCurrentRef, optionTitle])

  useEffect(() => {
    if (open) inputRef.current?.focus()
    if (!open) openSearchButtonElementRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (fetchRef.current) fetchRef.current.cancel()

    if (value) {
      fetchRef.current = countriesStore.fetchDocument(
        value,
        (data) => setOptionTitle(data?.title || null),
        setLoadingCurrentRef
      )
    } else {
      setOptionTitle(null)
      setLoadingCurrentRef(false)
    }
  }, [value])

  return (
    <Card style={{display: 'flex', flexDirection: 'column', minHeight: '100%'}} tone="transparent">
      <PortalProvider element={portalElement}>
        <Flex direction="column" flex={1} height="fill">
          <Card hidden={open} padding={2}>
            <Flex align="center">
              <Box flex={1} />
              <Button
                aria-label="Open search"
                icon={SearchIcon}
                mode="ghost"
                onClick={handleOpen}
                ref={openSearchButtonElementRef}
              />
            </Flex>
          </Card>
          <Layer hidden={!open} style={{position: 'sticky', top: 0}}>
            <Card padding={2} shadow={1}>
              <Autocomplete
                filterOption={filterOption}
                icon={SearchIcon}
                id="fullsceen-example"
                listBox={{padding: 2}}
                loading={loading}
                onQueryChange={handleQueryChange}
                onSelect={handleSelect}
                options={options}
                placeholder="Search"
                radius={2}
                ref={inputRef}
                relatedElements={relatedElements}
                renderOption={renderOption}
                renderPopover={renderPopover}
                renderValue={renderValue}
                suffix={
                  <Box padding={1}>
                    <Button
                      aria-label="Close search"
                      icon={CloseIcon}
                      onClick={handleClose}
                      padding={2}
                      mode="bleed"
                      ref={setCloseSearchButtonElement}
                    />
                  </Box>
                }
                value={value}
              />
            </Card>
          </Layer>
          <Card flex={1} hidden={!open} ref={setPortalElement} style={{position: 'relative'}} />
          <Box flex={1} hidden={open} padding={4}>
            <Heading>Welcome to this app</Heading>
          </Box>
        </Flex>
      </PortalProvider>
    </Card>
  )
}

function AsyncOption(props: {
  documentId: string
  disabled?: boolean
  selected?: boolean
  tabIndex?: number
}) {
  const {documentId, disabled, selected, tabIndex} = props
  const [data, setData] = useState<{code: string; title: string} | null>(null)
  const [loading, setLoading] = useState(false)
  const ref = useRef<{cancel: () => void} | null>(null)

  useEffect(() => {
    if (ref.current) ref.current.cancel()
    ref.current = countriesStore.fetchDocument(documentId, setData, setLoading)
  }, [documentId])

  return (
    <Card
      aria-label={data?.title}
      data-as="a"
      disabled={disabled}
      padding={2}
      radius={2}
      selected={selected}
      style={{lineHeight: 0}}
      tabIndex={tabIndex}
    >
      <Flex align="center">
        <Skeleton radius={2} style={{width: 35, height: 35}} />
        <Box flex={1} marginLeft={3}>
          <Stack space={2}>
            {loading && (
              <>
                <TextSkeleton style={{maxWidth: 200}} />
                <TextSkeleton size={1} style={{maxWidth: 120}} />
              </>
            )}
            {!loading && (
              <>
                <Text muted={!data} textOverflow="ellipsis">
                  {data ? data.title : <>Untitled</>}
                </Text>
                <Text muted size={1}>
                  {data?.code}
                </Text>
              </>
            )}
          </Stack>
        </Box>
        <Box paddingX={2}>
          <Label muted size={0}>
            Country
          </Label>
        </Box>
      </Flex>
    </Card>
  )
}
