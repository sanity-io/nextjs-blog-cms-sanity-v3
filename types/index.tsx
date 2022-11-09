export interface AuthorProps {
  name: string
  picture: any
}

export interface PostProps {
  _id: string
  title: string
  coverImage: any
  date: string
  excerpt?: string
  author: AuthorProps
  slug?: string
  content?: any
}
