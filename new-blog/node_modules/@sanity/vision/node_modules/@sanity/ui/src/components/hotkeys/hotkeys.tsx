import {forwardRef} from 'react'
import styled from 'styled-components'
import {useArrayProp} from '../../hooks'
import {Inline, KBD} from '../../primitives'

/**
 * @public
 */
export interface HotkeysProps {
  fontSize?: number | number[]
  padding?: number | number[]
  radius?: number | number[]
  space?: number | number[]
  keys?: string[]
}

const Root = styled.kbd`
  &:not([hidden]) {
    display: block;
  }
  font: inherit;
`

const Key = styled(KBD)`
  &:not([hidden]) {
    display: block;
  }
`

/**
 * @public
 */
export const Hotkeys = forwardRef(function Hotkeys(
  props: HotkeysProps & Omit<React.HTMLProps<HTMLElement>, 'as' | 'ref' | 'size'>,
  ref: React.Ref<HTMLElement>
) {
  const {fontSize, keys, padding, radius, space: spaceProp = 1, ...restProps} = props
  const space = useArrayProp(spaceProp)

  if (!keys || keys.length === 0) {
    return <></>
  }

  return (
    <Root data-ui="Hotkeys" {...restProps} ref={ref}>
      <Inline as="span" space={space}>
        {keys.map((key, i) => (
          <Key fontSize={fontSize} key={i} padding={padding} radius={radius}>
            {key}
          </Key>
        ))}
      </Inline>
    </Root>
  )
})
