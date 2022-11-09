/**
 * This template is used on the Index page, the Slug page uses another template
 */

import Container from '../../components/container'
import IntroTemplate from '../../components/intro-template'
import Header from './Header'

export default function BlogTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Container>
        {/* @ts-expect-error Server Component */}
        <Header level={1} />
        {children}
      </Container>
      <IntroTemplate />
    </>
  )
}
