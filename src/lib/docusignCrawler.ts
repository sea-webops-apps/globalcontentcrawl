// Docusign Website Crawler Service
// This service constructs locale-specific URLs and would connect to a backend API
// for actual web crawling due to CORS restrictions in browser environments

export interface CrawlConfig {
  baseUrls: string[];
  locale: string;
  keywords: string[];
}

export interface CrawledContent {
  id: string;
  title: string;
  type: 'blog' | 'customer-story' | 'resource';
  url: string;
  language: string;
  excerpt: string;
  publishDate: string;
  tags: string[];
}

// Map locale codes to URL path format
// e.g., fr_FR becomes fr-fr in URLs
export function localeToUrlPath(locale: string): string {
  return locale.toLowerCase().replace('_', '-');
}

// URL path to locale code
export function urlPathToLocale(urlPath: string): string {
  return urlPath.replace('-', '_');
}

// Base URLs to crawl on Docusign website
export const DOCUSIGN_CONTENT_URLS = {
  customerStories: '/customer-stories',
  blog: '/blog',
  resources: '/resources',
};

// Construct full URL with locale
export function buildLocaleUrl(locale: string, contentPath: string): string {
  const baseUrl = 'https://www.docusign.com';
  
  // English US doesn't need locale prefix
  if (locale === 'en_us') {
    return `${baseUrl}${contentPath}`;
  }
  
  // Other locales use locale prefix: e.g., /fr-fr/blog
  const urlPath = localeToUrlPath(locale);
  return `${baseUrl}/${urlPath}${contentPath}`;
}

// Get all URLs to crawl for selected locales
export function generateCrawlUrls(locales: string[]): string[] {
  const urls: string[] = [];
  const contentPaths = Object.values(DOCUSIGN_CONTENT_URLS);
  
  locales.forEach(locale => {
    contentPaths.forEach(path => {
      urls.push(buildLocaleUrl(locale, path));
    });
  });
  
  return urls;
}

// Determine content type from URL
export function getContentTypeFromUrl(url: string): 'blog' | 'customer-story' | 'resource' {
  if (url.includes('/blog')) return 'blog';
  if (url.includes('/customer-stories')) return 'customer-story';
  return 'resource';
}

// Extract locale from URL
export function extractLocaleFromUrl(url: string): string {
  // Match pattern like /fr-fr/ or /de-de/
  const localeMatch = url.match(/\.com\/([a-z]{2}-[a-z]{2})\//);
  if (localeMatch) {
    return urlPathToLocale(localeMatch[1]);
  }
  // Default to en_us if no locale in URL
  return 'en_us';
}

/**
 * BACKEND API INTEGRATION REQUIRED
 * 
 * This function would call a backend API endpoint that performs the actual web crawling.
 * The backend would:
 * 1. Fetch pages from Docusign URLs
 * 2. Parse HTML to extract article titles, excerpts, dates, tags
 * 3. Filter results by translated keywords
 * 4. Return structured data
 * 
 * Example backend endpoint:
 * POST /api/crawl-docusign
 * Body: { urls: string[], keywords: string[] }
 * Response: CrawledContent[]
 */
export async function crawlDocusignContent(
  locales: string[],
  translatedKeywords: Record<string, string[]>
): Promise<CrawledContent[]> {
  const urls = generateCrawlUrls(locales);
  
  console.log('🔍 Crawling URLs:', urls);
  console.log('🌐 Translated Keywords:', translatedKeywords);
  
  // In production, this would call your backend API:
  // const response = await fetch('/api/crawl-docusign', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ urls, translatedKeywords })
  // });
  // return await response.json();
  
  // For now, simulate the API call with mock data
  return simulateCrawl(urls, translatedKeywords);
}

/**
 * SIMULATION FOR DEVELOPMENT
 * This simulates what the backend crawler would return.
 * Replace this with actual API calls in production.
 */
async function simulateCrawl(
  urls: string[],
  translatedKeywords: Record<string, string[]>
): Promise<CrawledContent[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock crawled content based on the URLs being searched
  const mockResults: CrawledContent[] = [];
  
  // Generate mock results for each URL
  urls.forEach((url, index) => {
    const locale = extractLocaleFromUrl(url);
    const contentType = getContentTypeFromUrl(url);
    const keywords = translatedKeywords[locale] || [];
    
    // Only add results if there are keywords to search for
    if (keywords.length > 0) {
      // Add 1-2 mock results per URL to simulate found content
      const numResults = Math.floor(Math.random() * 2) + 1;
      
      for (let i = 0; i < numResults; i++) {
        mockResults.push(generateMockResult(url, locale, contentType, keywords, index * 10 + i));
      }
    }
  });
  
  return mockResults;
}

// Generate a mock result for demonstration
function generateMockResult(
  url: string,
  locale: string,
  contentType: 'blog' | 'customer-story' | 'resource',
  keywords: string[],
  index: number
): CrawledContent {
  const templates = getTemplatesByLocale(locale, contentType);
  const template = templates[index % templates.length];
  
  return {
    id: `crawled-${locale}-${contentType}-${index}`,
    title: template.title,
    type: contentType,
    url: `${url}/${template.slug}`,
    language: locale,
    excerpt: template.excerpt,
    publishDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tags: keywords.slice(0, 4),
  };
}

// Mock content templates by locale
function getTemplatesByLocale(locale: string, type: string) {
  const templates: Record<string, any[]> = {
    en_us: [
      {
        title: 'Accelerating Digital Transformation with Smart Agreements',
        slug: 'accelerating-digital-transformation',
        excerpt: 'Learn how organizations are leveraging agreement automation to drive digital transformation and improve business efficiency.',
      },
      {
        title: 'The Future of Contract Management in 2025',
        slug: 'future-contract-management-2025',
        excerpt: 'Explore emerging trends in contract lifecycle management and how AI is transforming agreement workflows.',
      },
      {
        title: 'Customer Success: Global Enterprise Transforms Contract Workflows',
        slug: 'global-enterprise-contract-transformation',
        excerpt: 'Discover how a Fortune 500 company reduced contract cycle time by 80% using automated workflows and e-signatures.',
      },
    ],
    de_de: [
      {
        title: 'Digitale Transformation durch intelligente Vereinbarungen beschleunigen',
        slug: 'digitale-transformation-beschleunigen',
        excerpt: 'Erfahren Sie, wie Unternehmen die Automatisierung von Vereinbarungen nutzen, um die digitale Transformation voranzutreiben.',
      },
      {
        title: 'Die Zukunft des Vertragsmanagements im Jahr 2025',
        slug: 'zukunft-vertragsmanagement-2025',
        excerpt: 'Entdecken Sie aufkommende Trends im Vertragslebenszyklusmanagement und wie KI Workflows transformiert.',
      },
    ],
    nl_nl: [
      {
        title: 'Digitale transformatie versnellen met slimme overeenkomsten',
        slug: 'digitale-transformatie-versnellen',
        excerpt: 'Ontdek hoe organisaties automatisering van overeenkomsten gebruiken om digitale transformatie te stimuleren.',
      },
      {
        title: 'De toekomst van contractbeheer in 2025',
        slug: 'toekomst-contractbeheer-2025',
        excerpt: 'Verken opkomende trends in het beheer van contractlevenscycli en hoe AI workflows transformeert.',
      },
    ],
    fr_fr: [
      {
        title: 'Accélérer la transformation numérique avec des accords intelligents',
        slug: 'accelerer-transformation-numerique',
        excerpt: 'Découvrez comment les organisations exploitent l\'automatisation des accords pour stimuler la transformation numérique.',
      },
      {
        title: 'L\'avenir de la gestion des contrats en 2025',
        slug: 'avenir-gestion-contrats-2025',
        excerpt: 'Explorez les tendances émergentes dans la gestion du cycle de vie des contrats et comment l\'IA transforme les workflows.',
      },
    ],
    es_es: [
      {
        title: 'Acelerar la transformación digital con acuerdos inteligentes',
        slug: 'acelerar-transformacion-digital',
        excerpt: 'Descubra cómo las organizaciones aprovechan la automatización de acuerdos para impulsar la transformación digital.',
      },
      {
        title: 'El futuro de la gestión de contratos en 2025',
        slug: 'futuro-gestion-contratos-2025',
        excerpt: 'Explore las tendencias emergentes en la gestión del ciclo de vida de contratos y cómo la IA transforma los flujos de trabajo.',
      },
    ],
    it_it: [
      {
        title: 'Accelerare la trasformazione digitale con accordi intelligenti',
        slug: 'accelerare-trasformazione-digitale',
        excerpt: 'Scopri come le organizzazioni sfruttano l\'automazione degli accordi per guidare la trasformazione digitale.',
      },
      {
        title: 'Il futuro della gestione dei contratti nel 2025',
        slug: 'futuro-gestione-contratti-2025',
        excerpt: 'Esplora le tendenze emergenti nella gestione del ciclo di vita dei contratti e come l\'IA trasforma i flussi di lavoro.',
      },
    ],
    pt_br: [
      {
        title: 'Acelerando a transformação digital com acordos inteligentes',
        slug: 'acelerando-transformacao-digital',
        excerpt: 'Saiba como as organizações aproveitam a automação de acordos para impulsionar a transformação digital.',
      },
      {
        title: 'O futuro da gestão de contratos em 2025',
        slug: 'futuro-gestao-contratos-2025',
        excerpt: 'Explore as tendências emergentes na gestão do ciclo de vida de contratos e como a IA transforma os fluxos de trabalho.',
      },
    ],
    ja_jp: [
      {
        title: 'スマート契約でデジタルトランスフォーメーションを加速',
        slug: 'digital-transformation-acceleration',
        excerpt: '組織が契約の自動化を活用してデジタルトランスフォーメーションを推進する方法をご紹介します。',
      },
      {
        title: '2025年の契約管理の未来',
        slug: 'future-contract-management-2025',
        excerpt: '契約ライフサイクル管理の新たなトレンドとAIがワークフローを変革する方法を探ります。',
      },
    ],
  };
  
  return templates[locale] || templates.en_us;
}

/**
 * Helper function to display which URLs will be crawled
 */
export function getCrawlSummary(locales: string[]): {
  locale: string;
  localeName: string;
  urls: { type: string; url: string }[];
}[] {
  const localeNames: Record<string, string> = {
    en_us: 'English (US)',
    de_de: 'Deutsch (DE)',
    nl_nl: 'Nederlands (NL)',
    fr_fr: 'Français (FR)',
    es_es: 'Español (ES)',
    it_it: 'Italiano (IT)',
    pt_br: 'Português (BR)',
    ja_jp: '日本語 (JP)',
  };
  
  return locales.map(locale => ({
    locale,
    localeName: localeNames[locale] || locale,
    urls: [
      { type: 'Customer Stories', url: buildLocaleUrl(locale, DOCUSIGN_CONTENT_URLS.customerStories) },
      { type: 'Blog', url: buildLocaleUrl(locale, DOCUSIGN_CONTENT_URLS.blog) },
      { type: 'Resources', url: buildLocaleUrl(locale, DOCUSIGN_CONTENT_URLS.resources) },
    ],
  }));
}
