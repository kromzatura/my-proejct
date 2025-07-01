'use client'

import { Link } from '@/i18n/routing'
import { urlFor } from '@/lib/sanity'
import { Product } from '@/types/sanity'

interface ProductGridProps {
  products: Product[] | any[]
  locale: string
  isFromSanity: boolean
}

export default function ProductGrid({ products, locale, isFromSanity }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {locale === 'nl' ? 'Geen producten gevonden' : 'No products found'}
        </h3>
        <p className="text-gray-500">
          {locale === 'nl' 
            ? 'Probeer een andere zoekopdracht of filter.'
            : 'Try a different search term or filter.'
          }
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={isFromSanity ? product._id : product.id} 
          product={product} 
          locale={locale} 
          isFromSanity={isFromSanity}
        />
      ))}
    </div>
  )
}

// Product Card Component
function ProductCard({ 
  product, 
  locale, 
  isFromSanity 
}: { 
  product: Product | any
  locale: string
  isFromSanity: boolean
}) {
  // Handle image URL based on data source
  const imageUrl = isFromSanity && product.image 
    ? urlFor(product.image).width(400).height(300).url() 
    : product.image || '/placeholder-product.svg'
  
  // Handle slug based on data source
  const productSlug = isFromSanity ? product.slug?.current : product.slug

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="aspect-w-4 aspect-h-3 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {product.category}
          </span>
          {product.featured && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              {locale === 'nl' ? 'Aanbevolen' : 'Featured'}
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-900 transition-colors">
          {product.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="block">
              {locale === 'nl' ? 'Herkomst' : 'Origin'}: {product.origin}
            </span>
            <span className="block">
              {locale === 'nl' ? 'Type' : 'Type'}: {product.type}
            </span>
          </div>
          
          <Link
            href={`/products/${productSlug}`}
            className="inline-flex items-center px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors"
          >
            {locale === 'nl' ? 'Details' : 'View Details'}
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
