import { getTranslations } from 'next-intl/server';
import { Link } from '../../../../i18n/routing';
import { notFound } from 'next/navigation';

// This will be replaced with dynamic data from Sanity CMS
const getBlogPost = (slug: string) => {
  const posts = {
    'industry-innovation-2024': {
      title: 'Industry Innovation in 2024',
      content: `
        <p>The industry landscape continues to evolve at an unprecedented pace, driven by technological advancements and changing market demands. At LAR Group, we're at the forefront of these innovations, continuously adapting our products and services to meet the needs of tomorrow.</p>
        
        <h2>Key Innovation Areas</h2>
        <p>This year has seen remarkable progress in several key areas:</p>
        
        <ul>
          <li><strong>Sustainability:</strong> Environmental considerations are now central to product development</li>
          <li><strong>Digital Integration:</strong> Smart technologies are becoming standard across product lines</li>
          <li><strong>Customer-Centric Design:</strong> User experience drives innovation decisions</li>
        </ul>
        
        <h2>Looking Ahead</h2>
        <p>As we move forward, LAR Group remains committed to leading the industry through innovative solutions that deliver real value to our customers. Our investment in research and development ensures we stay ahead of market trends.</p>
        
        <p>Stay tuned for more updates on our innovation journey and upcoming product launches.</p>
      `,
      category: 'industry',
      author: 'LAR Team',
      publishedAt: '2024-01-15',
      readingTime: 5,
      image: '/placeholder-blog-1.jpg'
    }
  };
  
  return posts[slug as keyof typeof posts] || null;
};

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations('blog');
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog"
            className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToBlog')}
          </Link>
          
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-sm font-medium text-blue-100 bg-blue-800 rounded-full mb-4">
              {t(`categories.${post.category}`)}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center text-blue-100">
            <span>{t('author')} {post.author}</span>
            <span className="mx-3">•</span>
            <span>{t('publishedOn')} {new Date(post.publishedAt).toLocaleDateString()}</span>
            <span className="mx-3">•</span>
            <span>{post.readingTime} {t('readingTime')}</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-12 flex items-center justify-center">
            <span className="text-blue-600 font-medium">Article Image Placeholder</span>
          </div>

          {/* Article Body */}
          <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Share Section */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('shareArticle')}
            </h3>
            <div className="flex space-x-4">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                Twitter
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </button>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              {t('relatedPosts')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/blog/new-product-line-launch" className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <span className="text-green-600 font-medium">Related Post Image</span>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">New Product Line Launch</h4>
                  <p className="text-gray-600">Introducing our latest product innovations...</p>
                </div>
              </Link>
              <Link href="/blog/quality-standards-excellence" className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                  <span className="text-purple-600 font-medium">Related Post Image</span>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Quality Standards Excellence</h4>
                  <p className="text-gray-600">How we maintain the highest quality standards...</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
