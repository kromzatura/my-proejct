'use client'

import { useState } from 'react'
import ProductFilter from './ProductFilter'
import ProductGrid from './ProductGrid'
import { Product } from '@/types/sanity'

interface ProductsClientProps {
  products: Product[]
  locale: string
}

export default function ProductsClient({ products, locale }: ProductsClientProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[] | any[]>(products)

  // Fallback products for when Sanity data is not available
  const fallbackProducts = [
    {
      id: '1',
      slug: 'premium-wheat-seeds',
      title: locale === 'nl' ? 'Premium Tarwe Zaden' : 'Premium Wheat Seeds',
      category: locale === 'nl' ? 'Zaden' : 'Seeds',
      description: locale === 'nl' 
        ? 'Hoogwaardige tarwe zaden voor professionele landbouw met uitstekende kiemkracht'
        : 'High-quality wheat seeds for professional agriculture with excellent germination',
      origin: locale === 'nl' ? 'Nederland' : 'Netherlands',
      type: locale === 'nl' ? 'Wintergraan' : 'Winter Grain',
      image: '/placeholder-product.jpg',
      featured: true
    },
    {
      id: '2',
      slug: 'organic-barley',
      title: locale === 'nl' ? 'Biologische Gerst' : 'Organic Barley',
      category: locale === 'nl' ? 'Biologisch' : 'Organic',
      description: locale === 'nl'
        ? 'Gecertificeerde biologische gerst van top kwaliteit volgens EU-normen'
        : 'Certified organic barley of top quality according to EU standards',
      origin: locale === 'nl' ? 'Duitsland' : 'Germany',
      type: locale === 'nl' ? 'Zomergraan' : 'Summer Grain',
      image: '/placeholder-product.jpg',
      featured: false
    },
    {
      id: '3',
      slug: 'corn-hybrid-seeds',
      title: locale === 'nl' ? 'Mais Hybrid Zaden' : 'Corn Hybrid Seeds', 
      category: locale === 'nl' ? 'Zaden' : 'Seeds',
      description: locale === 'nl'
        ? 'Hybride mais zaden voor maximale opbrengst en ziekteresistentie'
        : 'Hybrid corn seeds for maximum yield and disease resistance',
      origin: locale === 'nl' ? 'Frankrijk' : 'France',
      type: locale === 'nl' ? 'Hybride' : 'Hybrid',
      image: '/placeholder-product.jpg',
      featured: false
    },
    {
      id: '4',
      slug: 'organic-sunflower-seeds',
      title: locale === 'nl' ? 'Biologische Zonnebloem Zaden' : 'Organic Sunflower Seeds',
      category: locale === 'nl' ? 'Biologisch' : 'Organic',
      description: locale === 'nl'
        ? 'Biologische zonnebloem zaden voor olie-productie en voeding'
        : 'Organic sunflower seeds for oil production and nutrition',
      origin: locale === 'nl' ? 'Oekraïne' : 'Ukraine',
      type: locale === 'nl' ? 'Oliezaden' : 'Oil Seeds',
      image: '/placeholder-product.jpg',
      featured: true
    },
    {
      id: '5',
      slug: 'premium-rice-grains',
      title: locale === 'nl' ? 'Premium Rijst Korrels' : 'Premium Rice Grains',
      category: locale === 'nl' ? 'Granen' : 'Grains',
      description: locale === 'nl'
        ? 'Langkorrel basmati rijst van premium kwaliteit voor export'
        : 'Long grain basmati rice of premium quality for export',
      origin: locale === 'nl' ? 'India' : 'India',
      type: locale === 'nl' ? 'Basmati' : 'Basmati',
      image: '/placeholder-product.jpg',
      featured: false
    },
    {
      id: '6',
      slug: 'organic-quinoa-seeds',
      title: locale === 'nl' ? 'Biologische Quinoa Zaden' : 'Organic Quinoa Seeds',
      category: locale === 'nl' ? 'Biologisch' : 'Organic',
      description: locale === 'nl'
        ? 'Biologische quinoa zaden rijk aan eiwitten en voedingsstoffen'
        : 'Organic quinoa seeds rich in proteins and nutrients',
      origin: locale === 'nl' ? 'Bolivia' : 'Bolivia',
      type: locale === 'nl' ? 'Superfood' : 'Superfood',
      image: '/placeholder-product.jpg',
      featured: false
    },
    {
      id: '7',
      slug: 'rye-seeds',
      title: locale === 'nl' ? 'Rogge Zaden' : 'Rye Seeds',
      category: locale === 'nl' ? 'Zaden' : 'Seeds',
      description: locale === 'nl'
        ? 'Winterharde rogge zaden geschikt voor koude klimaten'
        : 'Winter-hardy rye seeds suitable for cold climates',
      origin: locale === 'nl' ? 'Polen' : 'Poland',
      type: locale === 'nl' ? 'Wintergraan' : 'Winter Grain',
      image: '/placeholder-product.jpg',
      featured: false
    },
    {
      id: '8',
      slug: 'buckwheat-grains',
      title: locale === 'nl' ? 'Boekweit Korrels' : 'Buckwheat Grains',
      category: locale === 'nl' ? 'Granen' : 'Grains',
      description: locale === 'nl'
        ? 'Glutenvrije boekweit korrels voor gezonde voeding'
        : 'Gluten-free buckwheat grains for healthy nutrition',
      origin: locale === 'nl' ? 'Rusland' : 'Russia',
      type: locale === 'nl' ? 'Pseudograan' : 'Pseudocereal',
      image: '/placeholder-product.jpg',
      featured: false
    },
    {
      id: '9',
      slug: 'flax-seeds',
      title: locale === 'nl' ? 'Lijnzaad' : 'Flax Seeds',
      category: locale === 'nl' ? 'Zaden' : 'Seeds',
      description: locale === 'nl'
        ? 'Lijnzaad rijk aan omega-3 vetzuren voor voeding en industrie'
        : 'Flax seeds rich in omega-3 fatty acids for nutrition and industry',
      origin: locale === 'nl' ? 'Canada' : 'Canada',
      type: locale === 'nl' ? 'Oliezaden' : 'Oil Seeds',
      image: '/placeholder-product.jpg',
      featured: true
    }
  ]

  const handleFilteredProductsChange = (newFilteredProducts: Product[] | any[]) => {
    setFilteredProducts(newFilteredProducts)
  }

  const isFromSanity = products.length > 0

  return (
    <div>
      <ProductFilter
        products={products}
        fallbackProducts={fallbackProducts}
        locale={locale}
        onFilteredProductsChange={handleFilteredProductsChange}
      />
      
      <ProductGrid
        products={filteredProducts}
        locale={locale}
        isFromSanity={isFromSanity}
      />
    </div>
  )
}
