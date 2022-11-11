import Container from '../../../../components/container'
import Header from '../../Header'
import { getAllPostsSlugs, getTitle } from '../../server.utils'

export async function generateStaticParams() {
  return await getAllPostsSlugs()
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  // Start fetching early, but don't await, so the queries can run in parallel
  const title = getTitle()

  console.log({ params })

  return (
    <Container>
      <Header level={2} title={await title} />
      TODO
    </Container>
  )
}
