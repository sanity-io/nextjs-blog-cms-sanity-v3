import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'profilePicture',
      title: 'Picture',
      type: 'image',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'resume',
      title: 'Resume',
      type: 'file',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'string',
    }),
    defineField({
      name: 'hobbies',
      title: 'Hobbies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'teams',
      title: 'Teams',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'text',
    }),
  ],
})
