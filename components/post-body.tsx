import { PortableText } from '@portabletext/react'

import markdownStyles from './markdown-styles.module.css'

export default function PostBody({ content }) {
  return (
    <div className={`mx-auto max-w-2xl ${markdownStyles.markdown}`}>
      <PortableText value={content} />
    </div>
  )
}
