import {CloseIcon} from '@sanity/icons'
import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {focusFirstDescendant, focusLastDescendant} from '../../helpers'
import {useClickOutside, useForwardedRef, useGlobalKeyDown} from '../../hooks'
import {Box, Button, Card, Container, Flex, Text} from '../../primitives'
import {ResponsivePaddingProps, ResponsiveWidthProps} from '../../primitives/types'
import {responsivePaddingStyle, ResponsivePaddingStyleProps} from '../../styles/internal'
import {ThemeColorSchemeKey, useTheme} from '../../theme'
import {DialogPosition} from '../../types'
import {Layer, Portal, useLayer} from '../../utils'
import {
  dialogStyle,
  responsiveDialogPositionStyle,
  ResponsiveDialogPositionStyleProps,
} from './styles'
import {useDialog} from './useDialog'

/**
 * @public
 */
export interface DialogProps extends ResponsivePaddingProps, ResponsiveWidthProps {
  /**
   * @beta
   */
  __unstable_autoFocus?: boolean
  /**
   * @beta
   */
  __unstable_hideCloseButton?: boolean
  cardRadius?: number | number[]
  cardShadow?: number | number[]
  contentRef?: React.ForwardedRef<HTMLDivElement>
  footer?: React.ReactNode
  header?: React.ReactNode
  id: string
  onClickOutside?: () => void
  onClose?: () => void
  portal?: string
  position?: DialogPosition | DialogPosition[]
  scheme?: ThemeColorSchemeKey
  zOffset?: number | number[]
}

interface DialogCardProps extends ResponsiveWidthProps {
  /**
   * @beta
   */
  __unstable_autoFocus: boolean
  /**
   * @beta
   */
  __unstable_hideCloseButton: boolean
  children: React.ReactNode
  contentRef?: React.ForwardedRef<HTMLDivElement>
  footer: React.ReactNode
  header: React.ReactNode
  id: string
  onClickOutside?: () => void
  onClose?: () => void
  radius: number | number[]
  scheme?: ThemeColorSchemeKey
  shadow: number | number[]
}

const Root = styled(Layer)<ResponsiveDialogPositionStyleProps & ResponsivePaddingStyleProps>(
  responsivePaddingStyle,
  dialogStyle,
  responsiveDialogPositionStyle
)

const DialogContainer = styled(Container)`
  &:not([hidden]) {
    display: flex;
  }
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const DialogCardRoot = styled(Card)`
  &:not([hidden]) {
    display: flex;
  }
  width: 100%;
  min-height: 0;
  max-height: 100%;
  overflow: hidden;
`

const DialogLayout = styled(Flex)`
  flex: 1;
  min-height: 0;
  width: 100%;
`

const DialogHeader = styled(Card)`
  position: relative;
  z-index: 2;

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    border-bottom: 1px solid var(--card-hairline-soft-color);
  }
`

const DialogContent = styled(Box)`
  position: relative;
  z-index: 1;
  overflow: auto;
  outline: none;
`

const DialogFooter = styled(Box)`
  position: relative;
  z-index: 3;
  border-top: 1px solid var(--card-hairline-soft-color);
`

const DialogCard = forwardRef(function DialogCard(
  props: DialogCardProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    __unstable_autoFocus: autoFocus,
    __unstable_hideCloseButton: hideCloseButton,
    children,
    contentRef,
    footer,
    header,
    id,
    onClickOutside,
    onClose,
    radius,
    scheme,
    shadow,
    width,
  } = props
  const forwardedRef = useForwardedRef(ref)
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
  const localContentRef = useRef<HTMLDivElement | null>(null)
  const layer = useLayer()
  const {isTopLayer} = layer
  const labelId = `${id}_label`
  const showCloseButton = Boolean(onClose) && hideCloseButton === false
  const showHeader = Boolean(header) || showCloseButton

  useEffect(() => {
    if (!autoFocus) return

    // On mount: focus the first interactive element in the contents
    if (forwardedRef.current) {
      focusFirstDescendant(forwardedRef.current)
    }
  }, [autoFocus, forwardedRef])

  useGlobalKeyDown(
    useCallback(
      (event: KeyboardEvent) => {
        if (!isTopLayer || !onClose) return

        if (event.key === 'Escape') {
          event.preventDefault()
          event.stopPropagation()
          onClose()
        }
      },
      [isTopLayer, onClose]
    )
  )

  useClickOutside(
    useCallback(() => {
      if (!isTopLayer || !onClickOutside) return

      onClickOutside()
    }, [isTopLayer, onClickOutside]),
    [rootElement]
  )

  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      setRootElement(el)
      forwardedRef.current = el
    },
    [forwardedRef]
  )

  const setContentRef = useCallback(
    (el: HTMLDivElement | null) => {
      localContentRef.current = el
      if (typeof contentRef === 'function') contentRef(el)
      else if (contentRef) contentRef.current = el
    },
    [contentRef]
  )

  return (
    <DialogContainer data-ui="DialogCard" width={width}>
      <DialogCardRoot radius={radius} ref={setRef} scheme={scheme} shadow={shadow}>
        <DialogLayout direction="column">
          {showHeader && (
            <DialogHeader>
              <Flex>
                <Box flex={1} padding={4}>
                  {header && (
                    <Text id={labelId} weight="semibold">
                      {header}
                    </Text>
                  )}
                </Box>
                {showCloseButton && (
                  <Box padding={2}>
                    <Button
                      aria-label="Close dialog"
                      disabled={!onClose}
                      icon={CloseIcon}
                      mode="bleed"
                      onClick={onClose}
                      padding={3}
                    />
                  </Box>
                )}
              </Flex>
            </DialogHeader>
          )}

          <DialogContent flex={1} ref={setContentRef} tabIndex={-1}>
            {children}
          </DialogContent>

          {footer && <DialogFooter>{footer}</DialogFooter>}
        </DialogLayout>
      </DialogCardRoot>
    </DialogContainer>
  )
})

/**
 * @public
 */
export const Dialog = forwardRef(function Dialog(
  props: DialogProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'id' | 'width'>,
  ref: React.Ref<HTMLDivElement>
) {
  const dialog = useDialog()
  const theme = useTheme()
  const {
    __unstable_autoFocus: autoFocus = true,
    __unstable_hideCloseButton: hideCloseButton = false,
    cardRadius = 3,
    cardShadow = 4,
    children,
    contentRef,
    footer,
    header,
    id,
    onClickOutside,
    onClose,
    padding = 4,
    portal,
    position = dialog.position || 'fixed',
    scheme,
    width = 0,
    zOffset = dialog.zOffset || theme.sanity.layer?.dialog.zOffset,
    ...restProps
  } = props
  const preDivRef = useRef<HTMLDivElement | null>(null)
  const postDivRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)

  const handleFocus = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    const target = event.target
    const cardElement = cardRef.current

    if (!cardElement) {
      return
    }

    if (target === preDivRef.current) {
      focusLastDescendant(cardElement)

      return
    }

    if (target === postDivRef.current) {
      focusFirstDescendant(cardElement)

      return
    }
  }, [])

  const labelId = `${id}_label`

  return (
    <Portal __unstable_name={portal}>
      <Root
        {...restProps}
        $padding={padding}
        $position={position}
        aria-labelledby={labelId}
        aria-modal
        data-ui="Dialog"
        id={id}
        onFocus={handleFocus}
        ref={ref}
        role="dialog"
        zOffset={zOffset}
      >
        <div ref={preDivRef} tabIndex={0} />
        <DialogCard
          __unstable_autoFocus={autoFocus}
          __unstable_hideCloseButton={hideCloseButton}
          contentRef={contentRef}
          footer={footer}
          header={header}
          id={id}
          onClickOutside={onClickOutside}
          onClose={onClose}
          radius={cardRadius}
          ref={cardRef}
          scheme={scheme}
          shadow={cardShadow}
          width={width}
        >
          {children}
        </DialogCard>
        <div ref={postDivRef} tabIndex={0} />
      </Root>
    </Portal>
  )
})
