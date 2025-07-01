'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Product } from '@/types/sanity'

interface ProductFilterProps {
  products: Product[]
  fallbackProducts: any[]
  locale: string
  onFilteredProductsChange: (products: Product[] | any[]) => void
}

type FilterCategory = 'all' | 'seeds' | 'grains' | 'organic'
type SortOption = 'name' | 'newest' | 'featured'

export default function ProductFilter({ 
  products, 
  fallbackProducts, 
  locale, 
  onFilteredProductsChange 
}: ProductFilterProps) {
  const t = useTranslations('products')
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [searchTerm, setSearchTerm] = useState('')

  // Use Sanity products if available, otherwise use fallback
  const allProducts = products.length > 0 ? products : fallbackProducts

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...allProducts]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(product => {
        const category = product.category.toLowerCase()
        
        switch (activeFilter) {
          case 'seeds':
            return category.includes('seed') || category.includes('zaden')
          case 'grains':
            return category.includes('grain') || category.includes('granen') || category.includes('korrel')
          case 'organic':
            return category.includes('organic') || category.includes('biologisch')
          default:
            return true
        }
      })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title)
        case 'newest':
          // For Sanity products, use _createdAt if available
          if (a._createdAt && b._createdAt) {
            return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
          }
          return 0
        case 'featured':
          // Featured products first
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return filtered
  }, [allProducts, activeFilter, sortBy, searchTerm])

  // Update parent component with filtered products
  useMemo(() => {
    onFilteredProductsChange(filteredAndSortedProducts)
  }, [filteredAndSortedProducts, onFilteredProductsChange])

  const handleFilterChange = (filter: FilterCategory) => {
    setActiveFilter(filter)
  }

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort)
  }

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder={locale === 'nl' ? 'Zoeken in producten...' : 'Search products...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-blue-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('categories.all')}
          </button>
          <button
            onClick={() => handleFilterChange('seeds')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'seeds'
                ? 'bg-blue-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('categories.seeds')}
          </button>
          <button
            onClick={() => handleFilterChange('grains')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'grains'
                ? 'bg-blue-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('categories.grains')}
          </button>
          <button
            onClick={() => handleFilterChange('organic')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'organic'
                ? 'bg-blue-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('categories.organic')}
          </button>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-4">
          <label className="text-sm text-gray-600">
            {locale === 'nl' ? 'Sorteren op:' : 'Sort by:'}
          </label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">{t('sort.name')}</option>
            <option value="newest">{t('sort.newest')}</option> 
            <option value="featured">{locale === 'nl' ? 'Aanbevolen' : 'Featured'}</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-4 text-sm text-gray-600">
        {locale === 'nl' 
          ? `${filteredAndSortedProducts.length} product${filteredAndSortedProducts.length !== 1 ? 'en' : ''} gevonden`
          : `${filteredAndSortedProducts.length} product${filteredAndSortedProducts.length !== 1 ? 's' : ''} found`
        }
        {searchTerm && (
          <span className="ml-2">
            {locale === 'nl' ? 'voor' : 'for'} "{searchTerm}"
          </span>
        )}
      </div>
    </div>
  )
}
