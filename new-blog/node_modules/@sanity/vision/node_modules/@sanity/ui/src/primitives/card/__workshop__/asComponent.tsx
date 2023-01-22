import {Card, Flex, Text} from '@sanity/ui'
import {forwardRef} from 'react'

const CustomLink = forwardRef(function CustomLink(
  props: {req: string} & Omit<React.HTMLProps<HTMLAnchorElement>, 'as' | 'href'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
): React.ReactElement {
  const {children, req, ...restProps} = props

  return (
    <a data-required={req} {...restProps} ref={ref}>
      {children}
    </a>
  )
})

export default function AsComponentStory() {
  const props = {href: '#'}

  return (
    <Flex align="center" height="fill" justify="center">
      <Card as={CustomLink} data-as="a" {...props} padding={3} tone="primary">
        <Text>As component</Text>
      </Card>
    </Flex>
  )
}
