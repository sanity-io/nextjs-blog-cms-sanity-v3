import {
  Autocomplete,
  BoundaryElementProvider,
  Box,
  Card,
  LayerProvider,
  Stack,
  Text,
} from '@sanity/ui'
import {useCallback, useState} from 'react'
import {Popover} from '../../../primitives'
import countries from '../__fixtures__/countries'
import {AutocompleteProps} from '../autocomplete'
import {ExampleOption} from './types'

export default function ConstrainedHeightStory() {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

  return (
    <Card height="fill" tone="transparent">
      <Card
        ref={setBoundaryElement}
        radius={3}
        shadow={3}
        style={{position: 'absolute', top: 20, right: 20, bottom: 20, left: 20}}
      >
        <Box height="fill" overflow="auto" padding={[3, 4, 5]} sizing="border">
          <Stack space={5}>
            <BoundaryElementProvider element={boundaryElement}>
              <ConstrainedHeightExampleField id="example-1" label="Example 1" />
              <ConstrainedHeightExampleField id="example-2" label="Example 2" />
              <ConstrainedHeightExampleField id="example-3" label="Example 3" />
              <ConstrainedHeightExampleField id="example-4" label="Example 4" />
              <ConstrainedHeightExampleField id="example-5" label="Example 5" />
              <ConstrainedHeightExampleField id="example-6" label="Example 6" />
              <ConstrainedHeightExampleField id="example-7" label="Example 7" />
              <ConstrainedHeightExampleField id="example-8" label="Example 8" />
              <ConstrainedHeightExampleField id="example-9" label="Example 9" />
            </BoundaryElementProvider>
          </Stack>
        </Box>
      </Card>
    </Card>
  )
}

function ConstrainedHeightExampleField({id, label}: {id: string; label: string}) {
  const [value, setValue] = useState('')

  const renderOption = useCallback((option: ExampleOption) => {
    return (
      <Card
        as="a"
        data-qa={`option-${option.value}`}
        href="#"
        key={option.value}
        onClick={(event) => event.preventDefault()}
        padding={3}
        radius={2}
      >
        <Text textOverflow="ellipsis">{option.title}</Text>
      </Card>
    )
  }, [])

  const renderValue = useCallback((currentValue: string, option?: ExampleOption) => {
    return option ? option.title : currentValue
  }, [])

  const filterOption = useCallback((query: string, option: ExampleOption) => {
    return option.title.toLowerCase().indexOf(query.toLowerCase()) > -1
  }, [])

  const options = countries.map((item) => ({value: item.code, title: item.name}))

  const renderPopover: AutocompleteProps['renderPopover'] = useCallback(
    (
      popoverProps: {
        content: React.ReactElement | null
        hidden: boolean
        inputElement: HTMLInputElement | null
        onMouseEnter: () => void
        onMouseLeave: () => void
      },
      popoverRef: React.Ref<HTMLDivElement>
    ) => {
      const {hidden, inputElement, ...restProps} = popoverProps

      if (hidden) return null

      return (
        <Popover
          {...restProps}
          arrow={false}
          constrainSize
          matchReferenceWidth
          open
          overflow="auto"
          placement="bottom-start"
          radius={1}
          ref={popoverRef}
          referenceElement={inputElement}
        />
      )
    },
    []
  )

  return (
    <Stack space={3}>
      <Text size={1} weight="medium">
        {label}
      </Text>
      <LayerProvider zOffset={100}>
        <Autocomplete
          filterOption={filterOption}
          id={id}
          onChange={setValue}
          openButton
          options={options}
          placeholder="Search"
          radius={1}
          renderOption={renderOption}
          renderPopover={renderPopover}
          renderValue={renderValue}
          value={value}
        />
      </LayerProvider>
    </Stack>
  )
}
