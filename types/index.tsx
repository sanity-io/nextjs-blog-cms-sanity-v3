export interface AuthorProps {
  name: string
  picture: any
}

export interface PostProps {
  title: string
  coverImage: any
  date: string
  excerpt?: string
  author: AuthorProps
  slug?: string
  content?: any
}
