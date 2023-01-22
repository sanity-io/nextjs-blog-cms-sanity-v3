import {Box, Button, Dialog, LayerProvider, Stack, Text} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import {useCallback, useRef, useState} from 'react'
import {WORKSHOP_WIDTH_OPTIONS} from '../../../__workshop__/constants'

export default function PropsStory() {
  const header = useText('Header', 'Props example', 'Props')
  const onClickOutside = useBoolean('Close when click outside', false, 'Props') || false
  const hideCloseButton = useBoolean('Hide close button', false, 'Props') || false
  const width = useSelect('Width', WORKSHOP_WIDTH_OPTIONS, 0, 'Props')
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const handleClose = useCallback(() => {
    setOpen(false)
    buttonRef.current?.focus()
  }, [])

  return (
    <LayerProvider>
      <Box padding={[4, 5, 6]}>
        <Button
          id="open-dialog-button"
          onClick={() => setOpen(true)}
          ref={buttonRef}
          text="Open dialog"
        />

        {open && (
          <Dialog
            __unstable_hideCloseButton={hideCloseButton}
            header={header}
            id="dialog"
            onClickOutside={onClickOutside ? handleClose : undefined}
            onClose={handleClose}
            open={open}
            width={width}
          >
            <Box padding={4}>
              <Stack space={4}>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et orci vitae diam
                  aliquet imperdiet.
                </Text>
                <Button id="button-1" text="Focus test" />
                <Text>
                  Sed in hendrerit metus. Sed sapien neque, imperdiet eu justo sed, vestibulum
                  mollis dolor.
                </Text>
                <Button id="button-2" text="Focus test" />
                <Text>
                  Nulla sit amet ipsum ligula. Duis sit amet velit tempor, ultricies mauris
                  dignissim, mollis enim.
                </Text>
                <Button id="button-3" text="Focus test" />
                <Text>Cras quis elit non mauris faucibus molestie non non augue. </Text>
                <Text>
                  Proin suscipit gravida sodales. Morbi vel purus molestie, rhoncus augue sit amet,
                  auctor justo.
                </Text>
                <Button id="button-4" text="Focus test" />
                <Text>Proin lobortis nunc a tellus condimentum, a ultrices arcu egestas.</Text>
                <Button id="button-5" text="Focus test" />
                <Text>
                  Suspendisse augue nibh, euismod sit amet sapien nec, molestie dignissim magna.
                </Text>
              </Stack>
            </Box>
          </Dialog>
        )}
      </Box>
    </LayerProvider>
  )
}
