export interface AuthorProps {
  name: string
  picture: any
}

export interface PostProps {
  _id?: string
  title: string
  date: string
  excerpt?: string
  coverImage: any
  slug?: string
  author: AuthorProps
  content?: any
}
