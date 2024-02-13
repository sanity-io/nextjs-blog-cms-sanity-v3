import { groq } from 'next-sanity'

const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

const photoFields = groq`
  _id,
  description,
  image,
`

const aboutFields = groq`
  _id,
  _updatedAt,
  name,
  hobbies,
  intro,
  profilePicture,
  resume,
  status,
  skills,
  teams,
  title,
  yearsOfExperience,
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const photosQuery = groq`
*[_type == "photo"] | order(date desc, _updatedAt desc) {
  ${photoFields}
}`

export const mostRecentAboutQuery = groq`
*[_type == "about"] | order(_updatedAt desc) [0] {
  ${aboutFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export interface Author {
  name?: string
  picture?: any
}

export interface Post {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  slug?: string
  content?: any
}

export interface About {
  _id: string
  title?: string
  profilePicture?: any
  name?: any
  skills?: string[]
  hobbies?: string[]
  teams?: string[]
  intro?: string
  status?: string
  yearsOfExperience?: string
  _updatedAt?: string
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}

export interface Photo {
  _id?: string
  description?: string
  image?: any
}
