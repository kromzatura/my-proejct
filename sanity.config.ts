import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'lar-group-cms',
  title: 'LAR Group B.V. - Content Management',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Products')
              .child(S.documentTypeList('product').title('Products')),
            S.listItem()
              .title('Blog Posts')
              .child(S.documentTypeList('blogPost').title('Blog Posts')),
            S.listItem()
              .title('FAQ Items')
              .child(S.documentTypeList('faqItem').title('FAQ Items')),
            S.listItem()
              .title('Certifications')
              .child(S.documentTypeList('certification').title('Certifications')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !['product', 'blogPost', 'faqItem', 'certification'].includes(listItem.getId() || '')
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
