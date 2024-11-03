import { FolderIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Мэдээний ангилал',
  icon: FolderIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Нэр',
      type: 'string',
      validation: (rule) => rule.required(),
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
      name: 'description',
      title: 'Description',
      type: 'text'
    
    }),
    
  ],
})
