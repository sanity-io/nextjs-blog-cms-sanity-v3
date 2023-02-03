import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'blog',

  projectId: 'd6brmw0b',
  dataset: 'debug',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
