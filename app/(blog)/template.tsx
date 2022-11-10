/**
 * This template is used on the Index page, the Slug page uses another template
 */

import Container from '../../components/container'
import IntroTemplate from '../../components/intro-template'

export default function BlogTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Container>{children}</Container>
      <IntroTemplate />
    </>
  )
}

// @TODO test if it works
export const revalidate = 62