import {
  Button,
  Flex,
  LayerProvider,
  Placement,
  Popover,
  ThemeColorToneKey,
  useLayer,
} from '@sanity/ui'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'

export default function RecursiveStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <LayerProvider>
        <RecursiveExample />
      </LayerProvider>
    </Flex>
  )
}

const placements: Placement[] = ['top', 'right', 'bottom', 'left']
const tones: ThemeColorToneKey[] = ['primary', 'positive', 'caution', 'critical']

function RecursiveExample({onClose}: {onClose?: () => void}) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const {isTopLayer} = useLayer()
  const [seed] = useState(() => Math.floor(Math.random() * 4))
  const fallbackPlacements = useMemo(() => {
    const before = placements.slice(seed)
    const after = placements.slice(0, seed)

    return before.concat(after)
  }, [seed])

  useEffect(() => {
    if (open === false) buttonRef.current?.focus()
  }, [open])

  useEffect(() => {
    buttonRef.current?.focus()
  }, [])

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!isTopLayer) return
      if (event.key === 'Escape' && onClose) onClose()
    },
    [isTopLayer, onClose]
  )

  return (
    <Popover
      fallbackPlacements={fallbackPlacements}
      content={<RecursiveExample onClose={handleClose} />}
      open={open}
      placement={fallbackPlacements[3]}
      portal
      tone={tones[seed]}
    >
      <Button
        mode="bleed"
        onKeyDown={handleKeyDown}
        onClick={handleOpen}
        radius={3}
        ref={buttonRef}
        text="Open"
      />
    </Popover>
  )
}
