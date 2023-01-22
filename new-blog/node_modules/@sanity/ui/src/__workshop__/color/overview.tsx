import {black, ColorTints, ColorValue, COLOR_HUES, hues, white} from '@sanity/color'
import {Box, Card, Code, Flex, Grid, Heading, Stack, useToast} from '@sanity/ui'
import React, {useCallback} from 'react'
import {hexToRgb, rgbToHsl} from '../../theme'

function ucfirst(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

const clipboard = {
  write(text: string) {
    const type = 'text/plain'
    const blob = new Blob([text], {type})
    const data = [new ClipboardItem({[type]: blob as any})]

    return navigator.clipboard.write(data)
  },
}

export default function ColorOverviewStory(): React.ReactElement {
  return (
    <Grid columns={[1, 1, 2, 3]} gapX={[3, 4, 5]} gapY={[4, 5, 6]} padding={[3, 4, 5]}>
      {COLOR_HUES.map((hueKey) => (
        <ColorHuePreview tints={hues[hueKey]} hueKey={hueKey} key={hueKey} />
      ))}
    </Grid>
  )
}

function ColorHuePreview(props: {hueKey: string; tints: ColorTints}) {
  const {hueKey, tints} = props

  return (
    <Box>
      <Heading as="h2" size={[1, 1, 2]}>
        {ucfirst(hueKey)}
      </Heading>

      <Stack marginTop={[3, 3, 4]} space={1}>
        {Object.entries(tints).map(([tintKey, tint]) => {
          return <ColorTintPreview key={tintKey} tint={tint} />
        })}
      </Stack>
    </Box>
  )
}

function ColorTintPreview(props: {tint: ColorValue}) {
  const {tint} = props
  const hsl = rgbToHsl(hexToRgb(tint.hex))
  const {push: pushToast} = useToast()

  const handleClick = useCallback(() => {
    clipboard
      .write(tint.hex)
      .then(() => {
        pushToast({
          title: (
            <>
              Copied {tint.title} (<code>{tint.hex}</code>) to clipboard!
            </>
          ),
        })
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
        pushToast({
          status: 'error',
          title: <>Copied not write to clipboard!</>,
        })
      })
  }, [pushToast, tint])

  return (
    <Card
      __unstable_focusRing
      as="button"
      onClick={handleClick}
      radius={2}
      style={
        {
          '--card-bg-color': tint.hex,
          '--card-fg-color': hsl.l < 50 ? white.hex : black.hex,
          cursor: 'pointer',
        } as any
      }
    >
      <Flex padding={3}>
        <Box flex={1}>
          <Code size={[1, 1, 2]} style={{color: 'inherit'}}>
            {tint.title}
          </Code>
        </Box>
        <Box>
          <Code size={[1, 1, 2]} style={{color: 'inherit'}}>
            {tint.hex}
          </Code>
        </Box>
      </Flex>
    </Card>
  )
}
