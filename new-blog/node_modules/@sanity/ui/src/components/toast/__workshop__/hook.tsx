import {Box, Button, Inline, ToastProvider, useToast} from '@sanity/ui'
import React from 'react'

export default function HookStory() {
  const toast = useToast()

  return (
    <ToastProvider>
      <Box padding={[4, 5, 6]}>
        <Inline space={2}>
          <Button
            onClick={() =>
              toast.push({
                id: 'status',
                closable: true,
                title: 'Information',
                status: 'info',
                description: (
                  <>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis faucibus
                    pellentesque luctus. Curabitur sed tortor a elit tempus malesuada. Quisque sed
                    dapibus ligula, id pulvinar nisl.
                  </>
                ),
              })
            }
            text="Push info"
            tone="primary"
          />

          <Button
            onClick={() =>
              toast.push({
                id: 'status',
                closable: true,
                title: 'Warning',
                status: 'warning',
              })
            }
            text="Push warning"
            tone="caution"
          />

          <Button
            onClick={() =>
              toast.push({
                id: 'status',
                closable: true,
                title: 'Error',
                status: 'error',
              })
            }
            text="Push error"
            tone="critical"
          />

          <Button
            onClick={() =>
              toast.push({
                // id: 'status',
                closable: true,
                title: 'Some message',
                // status: 'error',
              })
            }
            text="Push some message"
          />
        </Inline>
      </Box>
    </ToastProvider>
  )
}
