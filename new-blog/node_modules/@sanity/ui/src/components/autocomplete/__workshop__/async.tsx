import {LinkIcon} from '@sanity/icons'
import {
  Autocomplete,
  BaseAutocompleteOption,
  Box,
  Button,
  Card,
  Code,
  LayerProvider,
  Stack,
  Text,
} from '@sanity/ui'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {countriesStore} from '../__mocks__/apiStore'

export default function AsyncStory() {
  const [options, setOptions] = useState<BaseAutocompleteOption[]>([])
  const [loading, setLoading] = useState(false)
  const searchRef = useRef<{cancel: () => void} | null>(null)
  const fetchRef = useRef<{cancel: () => void} | null>(null)
  const [query, setQuery] = useState<string | null>(null)
  const [value, setValue] = useState('')
  const [optionTitle, setOptionTitle] = useState<string | null>(null)
  const [loadingCurrentRef, setLoadingCurrentRef] = useState(false)

  const doSearch = useCallback((query: string | null) => {
    if (searchRef.current) searchRef.current.cancel()
    searchRef.current = countriesStore.search(query || '', setOptions, setLoading)
  }, [])

  const filterOption = useCallback(() => true, [])

  const handleQueryChange = useCallback(
    (query: string | null) => {
      setQuery(query)

      if (query !== null) {
        doSearch(query)
      }
    },
    [doSearch]
  )

  const handleOpenButtonClick = useCallback(() => {
    if (!value) {
      doSearch('')
    }
  }, [doSearch, value])

  const renderValue = useCallback(() => {
    if (loadingCurrentRef) {
      return 'Loading…'
    }

    return optionTitle || ''
  }, [loadingCurrentRef, optionTitle])

  const renderOption = useCallback((option: BaseAutocompleteOption) => {
    return <AsyncOption documentId={option.value} />
  }, [])

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

  useEffect(() => {
    if (optionTitle) doSearch(optionTitle)
  }, [doSearch, optionTitle])

  return (
    <Box padding={[4, 5, 6]}>
      <Stack space={3}>
        <Text as="label" htmlFor="async" size={1} weight="semibold">
          Country
        </Text>
        <LayerProvider zOffset={100}>
          <Autocomplete
            disabled={loadingCurrentRef}
            filterOption={filterOption}
            id="async"
            loading={loading}
            onChange={setValue}
            onQueryChange={handleQueryChange}
            openButton={{onClick: handleOpenButtonClick}}
            options={options}
            placeholder="Search"
            prefix={
              <Box padding={1}>
                <Button disabled={!value} icon={LinkIcon} mode="bleed" padding={2} />
              </Box>
            }
            radius={1}
            renderOption={renderOption}
            renderValue={renderValue}
            value={value}
          />
        </LayerProvider>

        <Card border overflow="auto" padding={3} radius={1}>
          <Code language="json">{JSON.stringify({loading, options, query, value}, null, 2)}</Code>
        </Card>
      </Stack>
    </Box>
  )
}

function AsyncOption(props: {
  documentId: string
  disabled?: boolean
  selected?: boolean
  tabIndex?: number
}) {
  const {documentId, disabled, selected, tabIndex} = props
  const [data, setData] = useState<{title: string} | null>(null)
  const [loading, setLoading] = useState(false)
  const ref = useRef<{cancel: () => void} | null>(null)

  useEffect(() => {
    if (ref.current) ref.current.cancel()
    ref.current = countriesStore.fetchDocument(documentId, setData, setLoading)
  }, [documentId])

  return (
    <Card
      data-as="button"
      disabled={disabled}
      padding={3}
      radius={1}
      selected={selected}
      tabIndex={tabIndex}
    >
      {loading && (
        <Text muted>
          <>Loading…</>
        </Text>
      )}

      {!loading && <Text muted={!data}>{data ? data.title : <>Untitled</>}</Text>}
    </Card>
  )
}
