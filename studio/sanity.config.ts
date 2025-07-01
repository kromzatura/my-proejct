import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Import schemas from parent directory
import { schemaTypes } from '../schemas'

export default defineConfig({
  name: 'lar-group-studio',
  title: 'LAR Group B.V. - Content Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('LAR Group Content')
          .items([
            // Products Section
            S.listItem()
              .title('🌾 Products')
              .child(
                S.list()
                  .title('Products')
                  .items([
                    S.listItem()
                      .title('All Products')
                      .child(S.documentTypeList('product').title('All Products')),
                    S.listItem()
                      .title('Featured Products')
                      .child(
                        S.documentTypeList('product')
                          .title('Featured Products')
                          .filter('_type == "product" && featured == true')
                      ),
                    S.listItem()
                      .title('Seeds')
                      .child(
                        S.documentTypeList('product')
                          .title('Seeds')
                          .filter('_type == "product" && category == "seeds"')
                      ),
                    S.listItem()
                      .title('Grains')
                      .child(
                        S.documentTypeList('product')
                          .title('Grains')
                          .filter('_type == "product" && category == "grains"')
                      ),
                  ])
              ),

            // Blog Section
            S.listItem()
              .title('📝 Blog')
              .child(
                S.list()
                  .title('Blog Management')
                  .items([
                    S.listItem()
                      .title('All Posts')
                      .child(S.documentTypeList('blogPost').title('All Blog Posts')),
                    S.listItem()
                      .title('Published Posts')
                      .child(
                        S.documentTypeList('blogPost')
                          .title('Published Posts')
                          .filter('_type == "blogPost" && publishedAt < now()')
                      ),
                    S.listItem()
                      .title('Featured Posts')
                      .child(
                        S.documentTypeList('blogPost')
                          .title('Featured Posts')
                          .filter('_type == "blogPost" && featured == true')
                      ),
                  ])
              ),

            // FAQ Section
            S.listItem()
              .title('❓ FAQ')
              .child(S.documentTypeList('faqItem').title('FAQ Items')),

            // Certifications Section
            S.listItem()
              .title('🏆 Certifications')
              .child(
                S.list()
                  .title('Certifications')
                  .items([
                    S.listItem()
                      .title('All Certifications')
                      .child(S.documentTypeList('certification').title('All Certifications')),
                    S.listItem()
                      .title('Active Certifications')
                      .child(
                        S.documentTypeList('certification')
                          .title('Active Certifications')
                          .filter('_type == "certification" && active == true')
                      ),
                  ])
              ),

            S.divider(),

            // Other document types
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

  document: {
    // Custom document actions
    actions: (prev, context) => {
      return prev
    }
  }
})
