import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'subschools',
  title: 'Салбар сургууль',
  icon: HomeIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Нэр',
      type: 'string',
    }),
    
    defineField({
      name: 'uria',
      title: 'Уриа үг',
      type: 'string',
    }),

    defineField({
      name: 'enuria',
      title: 'Уриа үг англи',
      type: 'string',
    }),
    
    defineField({
      name: 'slug',
      title: 'Холбоос',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Үндсэн зураг',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    
    }),
    
  ],
})
