import React, {memo} from 'react'
import {Stack} from '../../primitives'
import {useTree} from './useTree'

export interface TreeGroupProps {
  expanded?: boolean
}

export const TreeGroup = memo(function TreeGroup(
  props: TreeGroupProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'ref' | 'role' | 'wrap'>
): React.ReactElement {
  const {children, expanded = false, ...restProps} = props
  const tree = useTree()

  return (
    <Stack
      as="ul"
      data-ui="TreeGroup"
      {...restProps}
      hidden={!expanded}
      marginTop={tree.space}
      role="group"
      space={tree.space}
    >
      {children}
    </Stack>
  )
})
