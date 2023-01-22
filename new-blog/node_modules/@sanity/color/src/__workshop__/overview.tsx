import {Box, Card, Code, Flex, Grid, Heading, Stack, hexToRgb, rgbToHsl, useToast} from '@sanity/ui'
import {ReactElement, useCallback} from 'react'
import styled from 'styled-components'
import {black, white} from '../config'
import {COLOR_HUES} from '../constants'
import {hues} from '../hues'
import {ColorTints, ColorValue} from '../types'

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

export default function ColorOverviewStory(): ReactElement {
  return (
    <Grid columns={[1, 1, 2, 3]} gapX={[4, 4, 5]} gapY={[5, 5, 6]} padding={[4, 5, 6]}>
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
      <Heading as="h2" size={1}>
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

const ColorCard = styled(Card)<{$bg: string; $fg: string}>`
  cursor: pointer;

  --card-bg-color: ${({$bg}) => $bg};
  --card-fg-color: ${({$fg}) => $fg};

  &:not(:disabled):active,
  &:not(:disabled):hover {
    --card-bg-color: ${({$bg}) => $bg} !important;
    --card-fg-color: ${({$fg}) => $fg} !important;
  }
`

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
    <ColorCard
      $bg={tint.hex}
      $fg={hsl.l < 50 ? white : black}
      __unstable_focusRing
      forwardedAs="button"
      onClick={handleClick}
      radius={2}
    >
      <Flex padding={3}>
        <Box flex={1}>
          <Code size={1} style={{color: 'inherit'}}>
            {tint.title}
          </Code>
        </Box>
        <Box>
          <Code size={1} style={{color: 'inherit'}}>
            {tint.hex}
          </Code>
        </Box>
      </Flex>
    </ColorCard>
  )
}
