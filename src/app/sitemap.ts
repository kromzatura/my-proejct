import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://largroup.nl';
  
  // Static pages
  const routes = [
    '',
    '/about',
    '/products', 
    '/quality-and-certifications',
    '/blog',
    '/faq',
    '/contact',
  ];

  // Generate sitemap entries for both locales
  const sitemapEntries: MetadataRoute.Sitemap = [];
  
  routes.forEach(route => {
    // English version
    sitemapEntries.push({
      url: `${baseUrl}/en${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : 0.8,
    });
    
    // Dutch version
    sitemapEntries.push({
      url: `${baseUrl}/nl${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : 0.8,
    });
  });

  return sitemapEntries;
}
