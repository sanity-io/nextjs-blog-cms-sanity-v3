import {icons, IconSymbol} from '@sanity/icons'
import {
  AvatarSize,
  BadgeMode,
  BadgeTone,
  ButtonMode,
  ButtonTextAlign,
  ButtonTone,
  CardTone,
  DialogPosition,
  FlexAlign,
  FlexJustify,
  Placement,
  TextAlign,
  TextInputType,
  ThemeColorSpotKey,
  ThemeColorToneKey,
  ThemeFontWeightKey,
} from '@sanity/ui'

export const WORKSHOP_AVATAR_SIZE_OPTIONS: {[key: string]: AvatarSize} = {
  '0 (default)': 0,
  '1': 1,
  '2': 2,
}

export const WORKSHOP_BADGE_MODE_OPTIONS: {[key: string]: BadgeMode} = {
  Default: 'default',
  Outline: 'outline',
}

export const WORKSHOP_BADGE_TONE_OPTIONS: {[key: string]: BadgeTone} = {
  Default: 'default',
  Primary: 'primary',
  Positive: 'positive',
  Caution: 'caution',
  Critical: 'critical',
}

export const WORKSHOP_BUTTON_MODE_OPTIONS: {[key: string]: ButtonMode} = {
  Default: 'default',
  Ghost: 'ghost',
  Bleed: 'bleed',
}

export const WORKSHOP_BUTTON_TEXT_ALIGN_OPTIONS: {[key: string]: ButtonTextAlign | ''} = {
  '(none)': '',
  Left: 'left',
  Right: 'right',
  Center: 'center',
}

export const WORKSHOP_BUTTON_TONE_OPTIONS: {[key: string]: ButtonTone} = {
  Default: 'default',
  Primary: 'primary',
  Positive: 'positive',
  Caution: 'caution',
  Critical: 'critical',
}

export const WORKSHOP_CARD_AS_OPTIONS: {
  [key: string]: 'div' | 'button' | 'span' | 'ol' | 'pre' | 'ul'
} = {
  'DIV (default)': 'div',
  BUTTON: 'button',
  SPAN: 'span',
  OL: 'ol',
  PRE: 'pre',
  UL: 'ul',
}

export const WORKSHOP_CARD_TONE_OPTIONS: {[key: string]: CardTone} = {
  Default: 'default',
  Inherit: 'inherit',
  Transparent: 'transparent',
  Primary: 'primary',
  Positive: 'positive',
  Caution: 'caution',
  Critical: 'critical',
}

export const WORKSHOP_CODE_LANGUAGE_OPTIONS = {
  JavaScript: 'javascript',
  JSON: 'json',
  JSX: 'jsx',
  TypeScript: 'typescript',
}

export const WORKSHOP_CONTAINER_WIDTH_OPTIONS: {[key: string]: number | 'auto'} = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  auto: 'auto',
}

export const WORKSHOP_DIALOG_POSITION_OPTIONS: {[key: string]: DialogPosition} = {
  Fixed: 'fixed',
  Absolute: 'absolute',
}

export const WORKSHOP_FLEX_DIRECTION_OPTIONS: {[key: string]: 'row' | 'column'} = {
  Row: 'row',
  Column: 'column',
}

export const WORKSHOP_FLEX_ALIGN_OPTIONS: Record<FlexAlign, FlexAlign> = {
  baseline: 'baseline',
  center: 'center',
  'flex-end': 'flex-end',
  'flex-start': 'flex-start',
  stretch: 'stretch',
}

export const WORKSHOP_FLEX_JUSTIFY_OPTIONS: Record<FlexJustify, FlexJustify> = {
  center: 'center',
  'flex-end': 'flex-end',
  'flex-start': 'flex-start',
  'space-around': 'space-around',
  'space-between': 'space-between',
  'space-evenly': 'space-evenly',
}

export const WORKSHOP_FONT_WEIGHT_OPTIONS: {[key: string]: ThemeFontWeightKey} = {
  Regular: 'regular',
  Medium: 'medium',
  Semibold: 'semibold',
  Bold: 'bold',
}

export const WORKSHOP_HEADING_FONT_SIZE_OPTIONS = {
  '0': 0,
  '1': 1,
  '2 (default)': 2,
  '3': 3,
  '4': 4,
}

export const WORKSHOP_ICON_SYMBOL_OPTIONS: {[key: string]: IconSymbol | ''} = Object.keys(
  icons
).reduce(
  (acc: {[key: string]: IconSymbol | ''}, key) => {
    acc[key] = key as IconSymbol

    return acc
  },
  {'(none)': ''}
)

export const WORKSHOP_LABEL_FONT_SIZE_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
}

export const WORKSHOP_PLACEMENT_OPTIONS: Record<Placement, Placement> = {
  top: 'top',
  'top-start': 'top-start',
  'top-end': 'top-end',
  right: 'right',
  'right-start': 'right-start',
  'right-end': 'right-end',
  left: 'left',
  'left-start': 'left-start',
  'left-end': 'left-end',
  bottom: 'bottom',
  'bottom-start': 'bottom-start',
  'bottom-end': 'bottom-end',
}

export const WORKSHOP_RADIUS_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
}

export const WORKSHOP_SHADOW_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
}

export const WORKSHOP_SPACE_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
}

export const WORKSHOP_SPOT_COLOR_OPTIONS: {[key: string]: ThemeColorSpotKey} = {
  Gray: 'gray',
  Blue: 'blue',
  Purple: 'purple',
  Magenta: 'magenta',
  Red: 'red',
  Orange: 'orange',
  Yellow: 'yellow',
  Green: 'green',
  Cyan: 'cyan',
}

export const WORKSHOP_TEXT_ALIGN_OPTIONS: {[key: string]: TextAlign | ''} = {
  '(none)': '',
  Initial: 'initial',
  Left: 'left',
  Right: 'right',
  Center: 'center',
  Justify: 'justify',
}

export const WORKSHOP_TEXT_FONT_SIZE_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
}

export const WORKSHOP_TEXT_INPUT_TYPE_OPTIONS: {[key: string]: TextInputType} = {
  date: 'date',
  'datetime-local': 'datetime-local',
  email: 'email',
  month: 'month',
  number: 'number',
  password: 'password',
  tel: 'tel',
  time: 'time',
  text: 'text',
  week: 'week',
  color: 'color',
}

export const WORKSHOP_TEXT_OVERFLOW_OPTIONS: {[key: string]: 'ellipsis' | ''} = {
  None: '',
  Ellipsis: 'ellipsis',
}

export const WORKSHOP_TEXT_SIZE_OPTIONS = {
  '0': 0,
  '1': 1,
  '2 (default)': 2,
  '3': 3,
  '4': 4,
}

export const WORKSHOP_TEXT_WEIGHT_OPTIONS: {[key: string]: ThemeFontWeightKey | ''} = {
  'Regular (default)': '',
  Medium: 'medium',
  Semibold: 'semibold',
  Bold: 'bold',
}

export const WORKSHOP_THEME_COLOR_TONE_OPTIONS: {[key: string]: ThemeColorToneKey} = {
  Default: 'default',
  Transparent: 'transparent',
  Primary: 'primary',
  Positive: 'positive',
  Caution: 'caution',
  Critical: 'critical',
}

export const WORKSHOP_TOAST_STATUS_OPTIONS: {
  [key: string]: 'error' | 'success' | 'warning' | 'info' | ''
} = {
  None: '',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
}

export const WORKSHOP_WIDTH_OPTIONS: {[key: string]: number | 'auto'} = {
  Auto: 'auto',
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
}
