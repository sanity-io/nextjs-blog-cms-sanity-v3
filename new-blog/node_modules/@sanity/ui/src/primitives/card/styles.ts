import {css, FlattenSimpleInterpolation} from 'styled-components'
import {ThemeProps} from '../../styles'
import {_colorVarsStyle} from '../../styles/colorVars'
import {focusRingBorderStyle, focusRingStyle} from '../../styles/focusRing'
import {CardStyleProps} from './types'

export function cardStyle(
  props: CardStyleProps & ThemeProps
): Array<FlattenSimpleInterpolation | (() => FlattenSimpleInterpolation)> {
  return [cardBaseStyle(props), cardColorStyle(props)]
}

export function cardBaseStyle(props: CardStyleProps & ThemeProps): FlattenSimpleInterpolation {
  const {$checkered, theme} = props
  const space = theme.sanity.space

  return css`
    ${$checkered &&
    css`
      background-size: ${space[3]}px ${space[3]}px;
      background-position: 50% 50%;
      background-image: var(--card-bg-image);
    `}

    &[data-as='button'] {
      -webkit-font-smoothing: inherit;
      appearance: none;
      outline: none;
      font: inherit;
      text-align: inherit;
      border: 0;
      width: stretch;
    }

    /* &:is(a) */
    &[data-as='a'] {
      outline: none;
      text-decoration: none;
    }

    /* &:is(pre) */
    &[data-as='pre'] {
      font: inherit;
    }
  `
}

export function cardColorStyle(props: CardStyleProps & ThemeProps): FlattenSimpleInterpolation {
  const {$checkered, $focusRing, theme} = props
  const {focusRing} = theme.sanity
  const {base, card} = theme.sanity.color
  const border = {width: 0, color: 'var(--card-border-color)'}

  return css`
    ${_colorVarsStyle(base, card.enabled, $checkered)}

    background-color: var(--card-bg-color);
    color: var(--card-fg-color);

    /* &:is(button) */
    &[data-as='button'] {
      --card-focus-ring-box-shadow: none;

      cursor: default;
      box-shadow: var(--card-focus-ring-box-shadow);

      &:disabled {
        ${_colorVarsStyle(base, card.disabled, $checkered)}
      }

      &:not(:disabled) {
        &[data-pressed] {
          ${_colorVarsStyle(base, card.pressed, $checkered)}
        }

        &[data-selected] {
          ${_colorVarsStyle(base, card.selected, $checkered)}
        }

        @media (hover: hover) {
          &:not([data-pressed]):not([data-selected]) {
            &:hover {
              ${_colorVarsStyle(base, card.hovered, $checkered)}
            }

            &:active {
              ${_colorVarsStyle(base, card.pressed, $checkered)}
            }
          }
        }

        &:focus {
          --card-focus-ring-box-shadow: ${$focusRing
            ? focusRingStyle({base, border, focusRing})
            : undefined};
        }

        &:focus:not(:focus-visible) {
          --card-focus-ring-box-shadow: ${$focusRing ? focusRingBorderStyle(border) : undefined};
        }
      }
    }

    /* &:is(a) */
    &[data-as='a'] {
      cursor: pointer;
      box-shadow: var(--card-focus-ring-box-shadow);

      &[data-disabled] {
        ${_colorVarsStyle(base, card.disabled, $checkered)}
      }

      &:not([data-disabled]) {
        &[data-pressed] {
          ${_colorVarsStyle(base, card.pressed, $checkered)}
        }

        &[data-selected] {
          ${_colorVarsStyle(base, card.selected, $checkered)}
        }

        @media (hover: hover) {
          &:not([data-pressed]):not([data-selected]) {
            &:hover {
              ${_colorVarsStyle(base, card.hovered, $checkered)}
            }

            &:active {
              ${_colorVarsStyle(base, card.pressed, $checkered)}
            }
          }
        }

        &:focus {
          --card-focus-ring-box-shadow: ${$focusRing
            ? focusRingStyle({base, border, focusRing})
            : undefined};
        }

        &:focus:not(:focus-visible) {
          --card-focus-ring-box-shadow: ${$focusRing ? focusRingBorderStyle(border) : undefined};
        }
      }
    }

    ${theme.sanity.styles?.card?.root}
  `
}
