// Sanity schema types for TypeScript
export interface SanityDocument {
  _id: string
  _createdAt: string
  _updatedAt: string
  _type: string
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface SanityFile {
  _type: 'file'
  asset: {
    _ref: string
    _type: 'reference'
    url?: string
  }
}

// Product types
export interface Product extends SanityDocument {
  title: string
  slug: SanitySlug
  description: string
  category: 'seeds' | 'grains' | 'organic' | 'conventional'
  type: string
  origin: string
  certification: string[]
  specifications: {
    purity?: string
    germination?: string
    moisture?: string
    weight?: string
    packaging?: string
  }
  image: SanityImage
  gallery?: SanityImage[]
  features?: string[]
  technicalSpecs?: any[]
  featured: boolean
  organic?: boolean
  inStock?: boolean
  price?: number
  purity?: number
  germination?: number
  moistureContent?: number
  packagingOptions?: string[]
  harvestYear?: number
  relatedProducts?: Product[]
}

// Blog post types
export interface BlogPost extends SanityDocument {
  title: string
  slug: SanitySlug
  content: any[] // Portable text
  excerpt: string
  publishedAt: string
  author: {
    name: string
    image?: SanityImage
    bio?: string
  }
  category: 'industry' | 'products' | 'insights' | 'announcements'
  image: SanityImage
  tags?: string[]
  featured: boolean
  readingTime: number
  relatedPosts?: BlogPost[]
}

// FAQ types
export interface FAQ extends SanityDocument {
  question: string
  answer: string
  category: 'general' | 'products' | 'orders' | 'quality' | 'support' | 'pricing'
  order: number
  featured: boolean
}

// Certificate types
export interface Certificate extends SanityDocument {
  title: string
  description: string
  image: SanityImage
  pdfFile?: SanityFile
  issuer: string
  validUntil?: string
  order: number
  featured: boolean
}

// Company info types
export interface CompanyInfo extends SanityDocument {
  companyName: string
  tagline: string
  description: string
  address: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  phone: string
  email: string
  businessHours: {
    weekdays: string
    weekend: string
    timezone: string
  }
  socialMedia: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
  logo: SanityImage
  images: SanityImage[]
}
