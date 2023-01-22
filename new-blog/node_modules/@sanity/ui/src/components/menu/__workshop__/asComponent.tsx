import {Button, Flex, Menu, MenuButton, MenuItem, Text} from '@sanity/ui'
import React, {forwardRef} from 'react'

const CustomLink = forwardRef(function CustomLink(
  props: {req: string} & Omit<React.HTMLProps<HTMLAnchorElement>, 'as' | 'href'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
): React.ReactElement {
  const {children, req, ...restProps} = props

  return (
    <a data-required={req} {...restProps} href="#" ref={ref}>
      {children}
    </a>
  )
})

export default function AsComponentStory() {
  const props = {href: '#'}

  return (
    <Flex align="center" height="fill" justify="center">
      <MenuButton
        button={<Button text="Menu with components" />}
        id="test"
        menu={
          <Menu>
            <MenuItem as={CustomLink} data-as="a" {...props} padding={3} tone="primary">
              <Text>Component 1</Text>
            </MenuItem>
            <MenuItem as={CustomLink} data-as="a" {...props} padding={3} tone="primary">
              <Text>Component 2</Text>
            </MenuItem>
            <MenuItem as={CustomLink} data-as="a" {...props} padding={3} tone="primary">
              <Text>Component 3</Text>
            </MenuItem>
            <MenuItem as={CustomLink} data-as="a" {...props} padding={3} tone="primary">
              <Text>Component 3</Text>
            </MenuItem>
          </Menu>
        }
      />
    </Flex>
  )
}
