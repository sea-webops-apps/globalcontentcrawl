# Backend Integration Guide for Docusign Content Finder

## Overview

The Docusign Content Finder widget is designed to crawl and search content from the official Docusign website across multiple locales. Due to browser CORS restrictions, the actual web crawling must be performed by a backend service.

## Architecture

```
┌─────────────┐         ┌─────────────┐         ┌──────────────────┐
│   Widget    │────────▶│   Backend   │────────▶│  Docusign.com    │
│  (Browser)  │◀────────│   API       │◀────────│  (Multiple URLs) │
└─────────────┘         └─────────────┘         └──────────────────┘
```

## URLs to Crawl

The widget needs to search the following content sections for each selected locale:

### Base URLs
- `/blog` - Blog posts and articles
- `/customer-stories` - Customer success stories and case studies
- `/resources` - Resources, whitepapers, and guides

### Locale-Specific URLs
For each locale, construct URLs using the pattern: `/{locale-path}/{section}`

**Examples:**
- English (US): `https://www.docusign.com/blog`
- French (FR): `https://www.docusign.com/fr-fr/blog`
- German (DE): `https://www.docusign.com/de-de/blog`
- Dutch (NL): `https://www.docusign.com/nl-nl/blog`
- Spanish (ES): `https://www.docusign.com/es-es/blog`
- Italian (IT): `https://www.docusign.com/it-it/blog`
- Portuguese (BR): `https://www.docusign.com/pt-br/blog`
- Japanese (JP): `https://www.docusign.com/ja-jp/blog`

## Backend API Requirements

### Endpoint: POST `/api/crawl-docusign`

**Request Body:**
```json
{
  "urls": [
    "https://www.docusign.com/blog",
    "https://www.docusign.com/customer-stories",
    "https://www.docusign.com/fr-fr/blog",
    ...
  ],
  "translatedKeywords": {
    "en_us": ["contract", "management", "workflow"],
    "fr_fr": ["contrat", "gestion", "flux de travail"],
    "de_de": ["vertrag", "verwaltung", "workflow"]
  }
}
```

**Response Body:**
```json
{
  "results": [
    {
      "id": "unique-id",
      "title": "Article Title",
      "type": "blog" | "customer-story" | "resource",
      "url": "https://www.docusign.com/blog/article-slug",
      "language": "en_us",
      "excerpt": "Brief description of the content...",
      "publishDate": "2024-10-15",
      "tags": ["contract", "automation", "workflow"]
    }
  ]
}
```

## Backend Implementation Steps

### 1. Web Scraping/Crawling

The backend should:

1. **Fetch HTML** from each URL
   ```python
   # Example using Python + BeautifulSoup
   import requests
   from bs4 import BeautifulSoup
   
   response = requests.get(url)
   soup = BeautifulSoup(response.content, 'html.parser')
   ```

2. **Parse Content** - Extract:
   - Article/page titles
   - Excerpts or meta descriptions
   - Publication dates
   - Content body for keyword matching
   - Tags or categories

3. **Filter by Keywords**
   - Search for translated keywords in:
     - Page title
     - Meta description
     - Article body
     - Tags/categories
   - Use case-insensitive matching
   - Consider partial matches and word boundaries

4. **Structure Results**
   - Convert parsed data to the response format
   - Include full URL to the content
   - Determine content type from URL path
   - Extract locale from URL

### 2. Recommended Technologies

**Node.js:**
```javascript
// Using Puppeteer or Cheerio
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function crawlPage(url, keywords) {
  // Fetch page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  
  // Extract content
  const content = await page.evaluate(() => {
    return {
      title: document.querySelector('h1')?.innerText,
      excerpt: document.querySelector('meta[name="description"]')?.content,
      // ... more selectors
    };
  });
  
  await browser.close();
  return content;
}
```

**Python:**
```python
# Using Scrapy or BeautifulSoup + Requests
import requests
from bs4 import BeautifulSoup

def crawl_page(url, keywords):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    return {
        'title': soup.find('h1').text if soup.find('h1') else '',
        'excerpt': soup.find('meta', {'name': 'description'})['content'] if soup.find('meta', {'name': 'description'}) else '',
        # ... more parsing
    }
```

### 3. Caching Strategy

Implement caching to improve performance:

```javascript
// Cache results for 24 hours
const CACHE_TTL = 24 * 60 * 60 * 1000;

const cache = {
  // key: URL + keywords hash
  // value: { results, timestamp }
};

function getCachedResults(url, keywords) {
  const key = `${url}-${hashKeywords(keywords)}`;
  const cached = cache[key];
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.results;
  }
  
  return null;
}
```

### 4. Rate Limiting

Implement rate limiting to be respectful of Docusign's servers:

```javascript
// Example: Max 5 requests per second
const rateLimiter = new RateLimiter({
  tokensPerInterval: 5,
  interval: 1000
});

await rateLimiter.removeTokens(1);
// Now safe to make request
```

### 5. Error Handling

Handle common errors gracefully:

- **404/Page Not Found**: Skip the URL, continue with others
- **Timeout**: Set reasonable timeouts (e.g., 10 seconds)
- **Rate Limiting (429)**: Back off and retry with exponential backoff
- **Network Errors**: Return partial results if some URLs succeed

## SEO Selectors (Example)

Common HTML selectors for Docusign.com content (may need adjustment):

```css
/* Article titles */
article h1
.blog-post-title
.customer-story-title

/* Excerpts */
.excerpt
.summary
meta[name="description"]

/* Dates */
.publish-date
time[datetime]
.post-date

/* Tags */
.tags
.categories
.topic-tags
```

## Security Considerations

1. **Input Validation**: Sanitize keywords and validate URLs
2. **Rate Limiting**: Prevent abuse of your API
3. **CORS**: Configure appropriate CORS headers
4. **Authentication**: Consider API key authentication
5. **Content Filtering**: Validate that URLs are from docusign.com only

## Testing

Test your backend with:

```bash
curl -X POST http://your-api.com/api/crawl-docusign \
  -H "Content-Type: application/json" \
  -d '{
    "urls": ["https://www.docusign.com/blog"],
    "translatedKeywords": {
      "en_us": ["contract", "management"]
    }
  }'
```

## Frontend Integration

Update `/lib/docusignCrawler.ts`:

```typescript
export async function crawlDocusignContent(
  locales: string[],
  translatedKeywords: Record<string, string[]>
): Promise<CrawledContent[]> {
  const urls = generateCrawlUrls(locales);
  
  // Replace the simulation with real API call
  const response = await fetch('https://your-api.com/api/crawl-docusign', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY' // If using auth
    },
    body: JSON.stringify({ urls, translatedKeywords })
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.results;
}
```

## Alternative: Third-Party Services

Consider using existing web scraping services:

1. **ScrapingBee** (https://www.scrapingbee.com/)
2. **Bright Data** (https://brightdata.com/)
3. **Apify** (https://apify.com/)
4. **ParseHub** (https://www.parsehub.com/)

These handle rendering, proxies, and anti-bot measures automatically.

## Current Implementation

The current implementation in `/lib/docusignCrawler.ts` includes:
- ✅ URL generation for all locales
- ✅ Locale path mapping (fr_FR → fr-fr)
- ✅ Content type detection
- ✅ Mock simulation for development
- ⚠️  Real crawling - needs backend implementation

Replace the `simulateCrawl()` function with your backend API call to enable real crawling.
