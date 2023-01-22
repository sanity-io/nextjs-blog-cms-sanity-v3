import React, {createElement, forwardRef, isValidElement, useMemo} from 'react'
import {isValidElementType} from 'react-is'
import styled from 'styled-components'
import {ThemeProps} from '../../styles'
import {responsiveRadiusStyle, ResponsiveRadiusStyleProps} from '../../styles/internal'
import {useTheme} from '../../theme'
import {ButtonMode, ButtonTextAlign, ButtonTone, FlexJustify} from '../../types'
import {Box} from '../box'
import {Flex} from '../flex'
import {Spinner} from '../spinner'
import {Text} from '../text'
import {ResponsivePaddingProps, ResponsiveRadiusProps} from '../types'
import {buttonBaseStyles, buttonColorStyles} from './styles'

/**
 * @public
 */
export interface ButtonProps extends ResponsivePaddingProps, ResponsiveRadiusProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  fontSize?: number | number[]
  mode?: ButtonMode
  icon?: React.ComponentType | React.ReactNode
  iconRight?: React.ComponentType | React.ReactNode
  justify?: FlexJustify | FlexJustify[]
  /**
   * @beta Do not use in production, as this might change.
   */
  loading?: boolean
  selected?: boolean
  space?: number | number[]
  textAlign?: ButtonTextAlign
  text?: React.ReactNode
  tone?: ButtonTone
  type?: 'button' | 'reset' | 'submit'
}

const Root = styled.button<
  {$mode: ButtonMode; $tone: ButtonTone} & ResponsiveRadiusStyleProps & ThemeProps
>(responsiveRadiusStyle, buttonBaseStyles, buttonColorStyles)

const LoadingBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--card-bg-color);
  border-radius: inherit;
  z-index: 1;
  box-shadow: inherit;
`

/**
 * @public
 */
export const Button = forwardRef(function Button(
  props: ButtonProps & Omit<React.HTMLProps<HTMLButtonElement>, 'as'>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const {
    children,
    disabled,
    fontSize,
    icon,
    iconRight,
    justify = 'center',
    loading,
    mode = 'default',
    padding = 3,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    radius = 2,
    selected,
    space = 3,
    text,
    textAlign,
    tone = 'default',
    type = 'button',
    ...restProps
  } = props

  const theme = useTheme()

  const boxProps = useMemo(
    () => ({
      // flex: 1,
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
    }),
    [padding, paddingX, paddingY, paddingTop, paddingBottom, paddingLeft, paddingRight]
  )

  return (
    <Root
      data-ui="Button"
      {...restProps}
      $mode={mode}
      $radius={radius}
      $tone={tone}
      data-disabled={Boolean(loading || disabled)}
      data-selected={selected ? '' : undefined}
      disabled={Boolean(loading || disabled)}
      ref={ref}
      type={type}
    >
      {Boolean(loading) && (
        <LoadingBox>
          <Spinner />
        </LoadingBox>
      )}

      {(icon || text || iconRight) && (
        <Box as="span" {...boxProps}>
          <Flex as="span" justify={justify}>
            {icon && (
              <Text size={fontSize}>
                {isValidElement(icon) && icon}
                {isValidElementType(icon) && createElement(icon)}
              </Text>
            )}

            {text && (
              <Box
                flex={iconRight ? 1 : undefined}
                marginLeft={icon ? space : undefined}
                marginRight={iconRight ? space : undefined}
              >
                <Text
                  align={textAlign}
                  size={fontSize}
                  textOverflow="ellipsis"
                  weight={theme.sanity.button.textWeight}
                >
                  {text}
                </Text>
              </Box>
            )}

            {iconRight && (
              <Text size={fontSize}>
                {isValidElement(iconRight) && iconRight}
                {isValidElementType(iconRight) && createElement(iconRight)}
              </Text>
            )}
          </Flex>
        </Box>
      )}

      {children && (
        <Box as="span" {...boxProps}>
          {children}
        </Box>
      )}
    </Root>
  )
})
