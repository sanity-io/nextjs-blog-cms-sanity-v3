import {css, CSSObject, FlattenSimpleInterpolation} from 'styled-components'
import {ThemeColorSchemeKey, ThemeFontWeightKey} from '../../theme'
import {CardTone} from '../../types'
import {focusRingBorderStyle, focusRingStyle} from '../focusRing'
import {rem, _responsive} from '../helpers'
import {ThemeProps} from '../types'

/**
 * @internal
 */
export interface TextInputInputStyleProps {
  $fontSize: number[]
  $scheme: ThemeColorSchemeKey
  $tone: CardTone
  $weight?: ThemeFontWeightKey
}

/**
 * @internal
 */
export interface TextInputRepresentationStyleProps {
  $hasPrefix?: boolean
  $hasSuffix?: boolean
  $scheme: ThemeColorSchemeKey
  $tone: CardTone
}

const ROOT_STYLE = css`
  &:not([hidden]) {
    display: flex;
  }

  align-items: center;
`

export function textInputRootStyle(): FlattenSimpleInterpolation {
  return ROOT_STYLE
}

export function textInputBaseStyle(
  props: TextInputInputStyleProps & ThemeProps
): FlattenSimpleInterpolation {
  const {theme, $scheme, $tone, $weight} = props
  const font = theme.sanity.fonts.text
  const color = theme.sanity.color.input

  return css`
    appearance: none;
    background: none;
    border: 0;
    border-radius: 0;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    font-family: ${font.family};
    font-weight: ${($weight && font.weights[$weight]) || font.weights.regular};
    margin: 0;
    position: relative;
    z-index: 1;
    display: block;

    /* NOTE: This is a hack to disable Chrome’s autofill styles */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-text-fill-color: var(--input-fg-color) !important;
      transition: background-color 5000s;
      transition-delay: 86400s /* 24h */;
    }

    /* &:is(textarea) */
    &[data-as='textarea'] {
      resize: none;
    }

    color: var(--input-fg-color);

    &::placeholder {
      color: var(--input-placeholder-color);
    }

    &[data-scheme='${$scheme}'][data-tone='${$tone}'] {
      --input-fg-color: ${color.default.enabled.fg};
      --input-placeholder-color: ${color.default.enabled.placeholder};

      /* enabled */
      &:not(:invalid):not(:disabled):not(:read-only) {
        --input-fg-color: ${color.default.enabled.fg};
        --input-placeholder-color: ${color.default.enabled.placeholder};
      }

      /* disabled */
      &:not(:invalid):disabled {
        --input-fg-color: ${color.default.disabled.fg};
        --input-placeholder-color: ${color.default.disabled.placeholder};
      }

      /* invalid */
      &:invalid {
        --input-fg-color: ${color.invalid.enabled.fg};
        --input-placeholder-color: ${color.invalid.enabled.placeholder};
      }

      /* readOnly */
      &:read-only {
        --input-fg-color: ${color.default.readOnly.fg};
        --input-placeholder-color: ${color.default.readOnly.placeholder};
      }
    }
  `
}

export function textInputFontSizeStyle(props: TextInputInputStyleProps & ThemeProps): CSSObject[] {
  const {theme} = props
  const {fonts, media} = theme.sanity

  return _responsive(media, props.$fontSize, (sizeIndex) => {
    const size = fonts.text.sizes[sizeIndex] || fonts.text.sizes[2]

    return {
      fontSize: rem(size.fontSize),
      lineHeight: size.lineHeight / size.fontSize,
    }
  })
}

export function textInputRepresentationStyle(
  props: TextInputRepresentationStyleProps & ThemeProps
): FlattenSimpleInterpolation {
  const {$hasPrefix, $hasSuffix, $scheme, $tone, theme} = props
  const {focusRing, input} = theme.sanity
  const color = theme.sanity.color.input

  return css`
    --input-box-shadow: none;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    pointer-events: none;
    z-index: 0;

    background-color: var(--card-bg-color);
    box-shadow: var(--input-box-shadow);

    border-top-left-radius: ${$hasPrefix ? 0 : undefined};
    border-bottom-left-radius: ${$hasPrefix ? 0 : undefined};
    border-top-right-radius: ${$hasSuffix ? 0 : undefined};
    border-bottom-right-radius: ${$hasSuffix ? 0 : undefined};

    &[data-scheme='${$scheme}'][data-tone='${$tone}'] {
      --card-bg-color: ${color.default.enabled.bg};
      --card-fg-color: ${color.default.enabled.fg};

      /* enabled */
      *:not(:disabled) + &[data-border] {
        --input-box-shadow: ${focusRingBorderStyle({
          color: color.default.enabled.border,
          width: input.border.width,
        })};
      }

      /* invalid */
      *:not(:disabled):invalid + & {
        --card-bg-color: ${color.invalid.enabled.bg};
        --card-fg-color: ${color.invalid.enabled.fg};

        &[data-border] {
          --input-box-shadow: ${focusRingBorderStyle({
            color: color.invalid.enabled.border,
            width: input.border.width,
          })};
        }
      }

      /* focused */
      *:not(:disabled):focus + & {
        &[data-border] {
          --input-box-shadow: ${focusRingStyle({
            border: {color: color.default.enabled.border, width: input.border.width},
            focusRing,
          })};
        }

        &:not([data-border]) {
          --input-box-shadow: ${focusRingStyle({focusRing})};
        }
      }

      /* disabled */
      *:disabled + & {
        --card-bg-color: ${color.default.disabled.bg} !important;
        --card-fg-color: ${color.default.disabled.fg} !important;

        &[data-border] {
          --input-box-shadow: ${focusRingBorderStyle({
            color: color.default.disabled.border,
            width: input.border.width,
          })};
        }
      }

      /* readOnly */
      *:read-only + & {
        --card-bg-color: ${color.default.readOnly.bg} !important;
        --card-fg-color: ${color.default.readOnly.fg} !important;
      }

      /* hovered */
      @media (hover: hover) {
        *:not(:disabled):not(:read-only):not(:invalid):hover + & {
          --card-bg-color: ${color.default.hovered.bg};
          --card-fg-color: ${color.default.hovered.fg};
        }

        *:not(:disabled):not(:read-only):not(:invalid):not(:focus):hover + &[data-border] {
          --input-box-shadow: ${focusRingBorderStyle({
            color: color.default.hovered.border,
            width: input.border.width,
          })};
        }
      }
    }
  `
}
