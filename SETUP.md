# LAR Group B2B Website - Setup & Configuration Guide

## Overview
This is a comprehensive guide to complete the setup of your LAR Group B2B website built with Next.js 15, Tailwind CSS, next-intl (EN/NL), and integrated with Sanity CMS.

## ✅ Completed Features
- ✅ Next.js 15 with App Router and TypeScript
- ✅ Internationalization (EN/NL) with next-intl
- ✅ Professional responsive design with Tailwind CSS
- ✅ SEO optimization with meta tags, structured data, sitemap
- ✅ Professional B2B pages: Home, About, Products, Quality & Certifications, Blog, FAQ, Contact
- ✅ Sanity CMS setup with schemas for products, blog posts, FAQ, certifications
- ✅ Contact form and Quote request form with Zoho Forms integration
- ✅ Google Analytics 4 and Google Tag Manager integration
- ✅ API endpoints for form fallbacks
- ✅ Professional LAR Group branding and content

## 🔧 Configuration Required

### 1. Environment Variables Setup
Copy `.env.local.example` to `.env.local` and configure:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://largroup.nl

# SEO Configuration  
GOOGLE_SITE_VERIFICATION=your-google-site-verification-code

# Analytics Configuration
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          # Your Google Analytics 4 ID
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX          # Your Google Tag Manager ID

# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-write-token

# Zoho Forms Integration
NEXT_PUBLIC_ZOHO_CONTACT_FORM_URL=https://forms.zohopublic.com/your-contact-form-url
NEXT_PUBLIC_ZOHO_QUOTE_FORM_URL=https://forms.zohopublic.com/your-quote-form-url

# Development
NODE_ENV=development
```

### 2. Sanity CMS Setup

#### Step 1: Create Sanity Project
```bash
cd studio
npm install
npx sanity init
```

#### Step 2: Configure Sanity Studio
- Follow the prompts to connect to your Sanity project
- Update the project ID in your `.env.local`
- Deploy your schemas: `npx sanity deploy`

#### Step 3: Add Content
Access your Sanity Studio at `http://localhost:3333/studio` and add:
- Products (seeds, grains with specifications, images, categories)
- Blog posts (industry insights, company news)
- FAQ items (common B2B questions)
- Certifications (quality certificates, compliance documents)

### 3. Zoho Forms Setup

#### Step 1: Create Forms in Zoho
1. **Contact Form**: Create a form with fields:
   - Name_First, Name_Last, Email, SingleLine (Company), PhoneNumber_countrycode, Dropdown (Subject), MultiLine (Message), MultiSelect (Interests)

2. **Quote Request Form**: Create a form with fields:
   - SingleLine (Company), Name_First, Name_Last, Email, PhoneNumber_countrycode, SingleLine1 (Product), Number (Quantity), Dropdown (Usage), MultiLine (Specifications), SingleLine2 (Delivery Location), Date (Preferred Delivery), MultiLine1 (Additional Info), Hidden (Locale)

#### Step 2: Get Form URLs
- Get the public submission URLs from Zoho Forms
- Add them to your `.env.local` file

### 4. Analytics Setup

#### Google Analytics 4
1. Create a GA4 property at https://analytics.google.com
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add it to `.env.local` as `NEXT_PUBLIC_GA_ID`

#### Google Tag Manager  
1. Create a GTM container at https://tagmanager.google.com
2. Get your Container ID (GTM-XXXXXXX)
3. Add it to `.env.local` as `NEXT_PUBLIC_GTM_ID`
4. Configure tags for form submissions, product views, etc.

### 5. SEO Configuration

#### Google Search Console
1. Verify your domain at https://search.google.com/search-console
2. Add the verification code to `.env.local` as `GOOGLE_SITE_VERIFICATION`
3. Submit your sitemap: `https://largroup.nl/sitemap.xml`

## 🚀 Deployment

### Development Server
```bash
npm run dev
```
Access: http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically with each push

## 📁 Project Structure
```
my-project/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Localized pages
│   │   ├── api/               # API endpoints
│   │   └── components/        # React components
│   ├── lib/                   # Utilities (SEO, analytics, Sanity)
│   ├── types/                 # TypeScript definitions
│   └── i18n/                  # Internationalization config
├── messages/                  # Translation files (en.json, nl.json)
├── schemas/                   # Sanity CMS schemas
├── studio/                    # Sanity Studio configuration
└── public/                    # Static assets
```

## 🎯 Key Features for B2B

### Forms & Lead Generation
- Professional contact form with company details
- Quote request system with product specifications
- Form tracking with analytics
- Zoho Forms integration for CRM

### Product Catalog
- Dynamic product pages from Sanity CMS
- Product specifications and technical details
- Request quote functionality per product
- Category-based organization

### Content Management
- Multi-language blog system
- FAQ management
- Quality certifications display
- Easy content updates via Sanity Studio

### SEO & Analytics
- Comprehensive meta tags and structured data
- Multi-language sitemap
- Google Analytics event tracking
- GTM integration for advanced tracking

## 🔄 Next Steps After Configuration

1. **Content Creation**: Add your actual products, blog posts, and certifications in Sanity
2. **Design Customization**: Adjust colors, fonts, and styling to match your exact brand
3. **Form Testing**: Test all forms with real submissions
4. **Analytics Verification**: Verify tracking is working correctly
5. **SEO Optimization**: Monitor search console and optimize based on data
6. **Performance Testing**: Test site speed and optimize as needed

## 📞 Support
This is a production-ready B2B website with professional features. All major functionality is implemented and ready for customization with your specific content and branding.

The site is built with modern best practices and is fully SEO-optimized for B2B lead generation and product showcase.
