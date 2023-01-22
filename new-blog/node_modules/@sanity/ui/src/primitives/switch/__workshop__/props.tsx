import {Flex, Switch, useTheme} from '@sanity/ui'
import {useBoolean, useNumber} from '@sanity/ui-workshop'
import React, {useCallback, useMemo} from 'react'
import {ThemeProvider} from 'styled-components'

export default function PropsStory() {
  const checked = useBoolean('Checked', false)
  const indeterminate = useBoolean('Indeterminate', false)
  const readOnly = useBoolean('Read only', false)
  const theme = useTheme()
  const focusRingOffset = useNumber('Focus ring offset', theme.sanity.focusRing.offset)
  const focusRingWidth = useNumber('Focus ring width', theme.sanity.focusRing.width)
  const handleChange = useCallback(() => undefined, [])

  const customTheme = useMemo(
    () => ({
      ...theme,
      sanity: {
        ...theme.sanity,
        focusRing: {
          offset: focusRingOffset || theme.sanity.focusRing.offset,
          width: focusRingWidth || theme.sanity.focusRing.width,
        },
      },
    }),
    [focusRingOffset, focusRingWidth, theme]
  )

  return (
    <ThemeProvider theme={customTheme}>
      <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
        <Switch
          checked={checked}
          indeterminate={indeterminate}
          onChange={handleChange}
          readOnly={readOnly}
        />
      </Flex>
    </ThemeProvider>
  )
}
