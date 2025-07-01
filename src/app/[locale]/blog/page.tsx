import { useTranslations } from 'next-intl';
import { Link } from '../../../i18n/routing';

export default function BlogPage() {
  const t = useTranslations('blog');

  // Placeholder blog posts data - will be replaced with Sanity CMS data later
  const blogPosts = [
    {
      id: 1,
      title: 'Industry Innovation in 2024',
      excerpt: 'Exploring the latest trends and innovations shaping our industry this year.',
      category: 'industry',
      author: 'LAR Team',
      publishedAt: '2024-01-15',
      readingTime: 5,
      image: '/placeholder-blog-1.jpg',
      slug: 'industry-innovation-2024'
    },
    {
      id: 2,
      title: 'New Product Line Launch',
      excerpt: 'Introducing our latest product innovations designed to meet evolving market demands.',
      category: 'products',
      author: 'Product Team',
      publishedAt: '2024-01-10',
      readingTime: 3,
      image: '/placeholder-blog-2.jpg',
      slug: 'new-product-line-launch'
    },
    {
      id: 3,
      title: 'Quality Standards Excellence',
      excerpt: 'How we maintain the highest quality standards across all our operations.',
      category: 'insights',
      author: 'Quality Team',
      publishedAt: '2024-01-05',
      readingTime: 7,
      image: '/placeholder-blog-3.jpg',
      slug: 'quality-standards-excellence'
    }
  ];

  const categories = [
    { key: 'all', label: t('categories.all') },
    { key: 'industry', label: t('categories.industry') },
    { key: 'products', label: t('categories.products') },
    { key: 'insights', label: t('categories.insights') },
    { key: 'announcements', label: t('categories.announcements') }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t('hero.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              {t('hero.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.key}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  category.key === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <span className="text-blue-600 font-medium">Blog Image Placeholder</span>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                      {t(`categories.${post.category}`)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {post.readingTime} {t('readingTime')}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{t('author')} {post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {t('readMore')}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Stay Updated with LAR Group
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest industry insights and company updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-md text-gray-900"
            />
            <button className="px-6 py-3 bg-white text-blue-900 rounded-md font-medium hover:bg-gray-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
