import fs from 'fs/promises'
import { createIntrospectionDataset } from '@sanity/experimental-groqsolid/typegen'
import prettier from 'prettier'

const result = await createIntrospectionDataset()

const neat = await prettier.format(result, {
  parser: 'typescript',
  filepath: './sanity.typegen.ts',
})

await fs.writeFile('./sanity.typegen.ts', neat, 'utf8')
