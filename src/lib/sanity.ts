import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity configuration
const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN, // Only needed for write operations
}

// Create Sanity client
export const sanityClient = createClient(config)

// Image URL builder
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper function for fetching content with error handling
export async function sanityFetch<T>(query: string, params?: any): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, params)
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return null
  }
}

// Sanity queries
export const queries = {
  // Products
  allProducts: `*[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    category,
    type,
    origin,
    certification,
    specifications,
    image,
    featured,
    _createdAt
  }`,
  
  productBySlug: `*[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    category,
    type,
    origin,
    certification,
    specifications,
    image,
    gallery,
    features,
    technicalSpecs,
    relatedProducts[]->{
      _id,
      title,
      slug,
      image
    },
    _createdAt,
    _updatedAt
  }`,

  // Blog posts
  allBlogPosts: `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    author,
    category,
    image,
    featured,
    readingTime
  }`,
  
  blogPostBySlug: `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    excerpt,
    publishedAt,
    author,
    category,
    image,
    tags,
    relatedPosts[]->{
      _id,
      title,
      slug,
      image,
      publishedAt
    },
    _createdAt,
    _updatedAt
  }`,

  // FAQ
  allFAQs: `*[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order,
    featured
  }`,

  // Certificates
  allCertificates: `*[_type == "certificate"] | order(order asc) {
    _id,
    title,
    description,
    image,
    pdfFile,
    issuer,
    validUntil,
    order,
    featured
  }`,

  // Company info
  companyInfo: `*[_type == "companyInfo"][0] {
    _id,
    companyName,
    tagline,
    description,
    address,
    phone,
    email,
    businessHours,
    socialMedia,
    logo,
    images
  }`
}
