# LAR Group B.V. - Professional B2B Website

A modern, internationalized B2B website built with Next.js 15, featuring comprehensive product catalog, content management, and lead generation capabilities.

## 🚀 Features

### Core Functionality
- **Next.js 15** with App Router and TypeScript
- **Internationalization** (English/Dutch) with next-intl
- **Responsive Design** with Tailwind CSS
- **SEO Optimized** with structured data and meta tags
- **CMS Integration** with Sanity for content management

### B2B Specific Features
- Professional product catalog with specifications
- Quote request system with detailed forms
- Multi-language contact forms
- Quality certifications showcase
- Company blog and knowledge base
- FAQ management system

### Integrations
- **Sanity CMS** for content management
- **Zoho Forms** for lead capture and CRM integration
- **Google Analytics 4** for visitor tracking
- **Google Tag Manager** for advanced analytics
- **Structured Data** for better search visibility

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Internationalization**: next-intl
- **CMS**: Sanity
- **Analytics**: Google Analytics 4, Google Tag Manager
- **Forms**: Zoho Forms integration
- **SEO**: Custom meta tags, structured data, sitemap

## 📦 Installation

```bash
# Clone the repository
git clone [repository-url]
cd my-project

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Configure your environment variables
# (See SETUP.md for detailed configuration)

# Run development server
npm run dev
```

## 🌐 Pages

### Main Pages
- **Home** (`/`) - Company overview and key features
- **About** (`/about`) - Company story and mission
- **Products** (`/products`) - Product catalog with categories
- **Quality & Certifications** (`/quality-and-certifications`) - Quality standards
- **Blog** (`/blog`) - Industry insights and company news
- **FAQ** (`/faq`) - Frequently asked questions
- **Contact** (`/contact`) - Contact form and company information

### Dynamic Pages
- **Product Details** (`/products/[slug]`) - Individual product pages
- **Blog Posts** (`/blog/[slug]`) - Individual blog articles

## 🔧 Configuration

See `SETUP.md` for complete configuration instructions including:
- Environment variables setup
- Sanity CMS configuration
- Zoho Forms integration
- Analytics setup
- SEO configuration

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Professional B2B user experience

## 🌍 Internationalization

Full support for:
- **English** (default)
- **Dutch** (Nederlands)

Language switching available in header navigation.

## 📊 Analytics & Tracking

Comprehensive tracking for B2B metrics:
- Page views and user behavior
- Form submissions and lead generation
- Product catalog engagement
- Quote requests and contact forms
- Custom B2B events and conversions

## 🔍 SEO Features

- Optimized meta tags for all pages
- Structured data for organization and products
- Multi-language sitemap
- Robots.txt configuration
- Open Graph and Twitter Card meta tags
- Google site verification

## 📈 Performance

- Server-side rendering with Next.js 15
- Optimized images and assets
- Fast loading times
- Core Web Vitals optimization
- Progressive web app features

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/              # Localized routes
│   │   ├── page.tsx          # Homepage
│   │   ├── about/            # About page
│   │   ├── products/         # Product catalog
│   │   ├── blog/             # Blog system
│   │   ├── contact/          # Contact page
│   │   └── ...
│   ├── components/           # React components
│   ├── api/                  # API routes
│   └── globals.css           # Global styles
├── lib/                      # Utility functions
├── types/                    # TypeScript definitions
└── i18n/                     # Internationalization
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support regarding this B2B website platform, please refer to the documentation or contact the development team.

## 📄 License

This project is proprietary software for LAR Group B.V.

---

**LAR Group B.V.** - Professional Seeds & Grains Excellence
