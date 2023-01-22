import {Dialog, DialogProvider} from '@sanity/ui'
import React from 'react'

export default function ProviderStory() {
  return (
    <DialogProvider position="absolute" zOffset={1000}>
      <Dialog header="Outer" id="provider-example">
        <Dialog header="Inner" id="nested-provider-example" />
      </Dialog>
    </DialogProvider>
  )
}
