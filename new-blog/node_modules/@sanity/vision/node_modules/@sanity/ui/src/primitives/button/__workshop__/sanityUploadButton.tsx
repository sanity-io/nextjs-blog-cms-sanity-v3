import {UploadIcon} from '@sanity/icons'
import {Button, Flex} from '@sanity/ui'
import styled from 'styled-components'

const SanityUploadButton = styled(Button).attrs({forwardedAs: 'label'})`
  & input {
    -webkit-appearance: none;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    max-width: 0;
    width: stretch;
  }

  & span:nth-child(2) {
    width: 0;
    flex: none;
    padding: 0;
  }
`

export default function SanityUploadButtonWorkaroundStory() {
  return (
    <Flex align="center" height="fill" htmlFor="file" justify="center">
      <SanityUploadButton icon={UploadIcon} tabIndex={0} text="Upload">
        <input type="file" />
      </SanityUploadButton>
    </Flex>
  )
}
