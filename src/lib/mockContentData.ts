import { ContentItem } from '../components/ContentResults';
import { translateKeywords, translateKeywordsForLanguages } from './keywordTranslations';
import { crawlDocusignContent } from './docusignCrawler';

// Mock data simulating content from docusign.com
// This is fallback data - the real implementation uses the crawler
export const mockContentDatabase: ContentItem[] = [
  // English Content
  {
    id: '1',
    title: 'Digital Transformation: How E-Signatures Are Revolutionizing Business',
    type: 'blog',
    url: 'https://www.docusign.com/blog/digital-transformation-esignatures',
    language: 'en_us',
    excerpt: 'Discover how electronic signatures are accelerating digital transformation and improving workflow efficiency across industries.',
    publishDate: '2024-10-15',
    tags: ['digital transformation', 'e-signature', 'workflow', 'efficiency'],
  },
  {
    id: '2',
    title: 'Customer Success Story: Salesforce Streamlines Contract Management',
    type: 'customer-story',
    url: 'https://www.docusign.com/customer-stories/salesforce',
    language: 'en_us',
    excerpt: 'Learn how Salesforce uses Docusign to automate contract workflows and reduce signing time by 80%.',
    publishDate: '2024-09-20',
    tags: ['contract management', 'automation', 'salesforce', 'customer story'],
  },
  {
    id: '3',
    title: 'The Future of Agreement Technology in Healthcare',
    type: 'blog',
    url: 'https://www.docusign.com/blog/healthcare-agreement-technology',
    language: 'en_us',
    excerpt: 'Healthcare organizations are leveraging agreement technology to improve patient experience and operational efficiency.',
    publishDate: '2024-10-01',
    tags: ['healthcare', 'agreement technology', 'patient experience', 'compliance'],
  },
  
  // German Content
  {
    id: '4',
    title: 'Digitale Transformation: Wie E-Signaturen Geschäftsprozesse Revolutionieren',
    type: 'blog',
    url: 'https://www.docusign.com/de-de/blog/digitale-transformation-e-signaturen',
    language: 'de_de',
    excerpt: 'Erfahren Sie, wie elektronische Signaturen die digitale Transformation beschleunigen und die Workflow-Effizienz in allen Branchen verbessern.',
    publishDate: '2024-10-10',
    tags: ['digitale transformation', 'e-signatur', 'workflow', 'effizienz'],
  },
  {
    id: '5',
    title: 'Kundenerfolg: BMW Optimiert Vertragsmanagement',
    type: 'customer-story',
    url: 'https://www.docusign.com/de-de/customer-stories/bmw',
    language: 'de_de',
    excerpt: 'BMW nutzt Docusign zur Automatisierung von Vertragsworkflows und reduziert die Bearbeitungszeit um 75%.',
    publishDate: '2024-09-15',
    tags: ['vertragsmanagement', 'automatisierung', 'automotive', 'kundenerfolg'],
  },
  
  // Dutch Content
  {
    id: '6',
    title: 'Digitale Transformatie: E-Handtekeningen in de Praktijk',
    type: 'blog',
    url: 'https://www.docusign.com/nl-nl/blog/digitale-transformatie-e-handtekeningen',
    language: 'nl_nl',
    excerpt: 'Ontdek hoe elektronische handtekeningen digitale transformatie versnellen en de workflow-efficiëntie verbeteren.',
    publishDate: '2024-09-28',
    tags: ['digitale transformatie', 'e-handtekening', 'workflow', 'efficiëntie'],
  },
  {
    id: '7',
    title: 'Klantverhaal: ING Bank Stroomlijnt Documentbeheer',
    type: 'customer-story',
    url: 'https://www.docusign.com/nl-nl/customer-stories/ing',
    language: 'nl_nl',
    excerpt: 'ING Bank gebruikt Docusign om documentworkflows te automatiseren en de ondertekeningsduur met 70% te verkorten.',
    publishDate: '2024-09-05',
    tags: ['documentbeheer', 'banking', 'automatisering', 'klantverhaal'],
  },
  
  // French Content
  {
    id: '8',
    title: 'Transformation Numérique: Les Signatures Électroniques au Service des Entreprises',
    type: 'blog',
    url: 'https://www.docusign.com/fr-fr/blog/transformation-numerique',
    language: 'fr_fr',
    excerpt: 'Découvrez comment les signatures électroniques accélèrent la transformation numérique et améliorent l\'efficacité des workflows.',
    publishDate: '2024-10-05',
    tags: ['transformation numérique', 'signature électronique', 'workflow', 'efficacité'],
  },
  {
    id: '9',
    title: 'Témoignage Client: Renault Optimise la Gestion des Contrats',
    type: 'customer-story',
    url: 'https://www.docusign.com/fr-fr/customer-stories/renault',
    language: 'fr_fr',
    excerpt: 'Renault utilise Docusign pour automatiser les workflows de contrats et réduire les délais de signature de 80%.',
    publishDate: '2024-08-22',
    tags: ['gestion des contrats', 'automatisation', 'automotive', 'témoignage'],
  },
  
  // Spanish Content
  {
    id: '10',
    title: 'Transformación Digital: Firmas Electrónicas en el Mundo Empresarial',
    type: 'blog',
    url: 'https://www.docusign.com/es-es/blog/transformacion-digital',
    language: 'es_es',
    excerpt: 'Descubra cómo las firmas electrónicas aceleran la transformación digital y mejoran la eficiencia del flujo de trabajo.',
    publishDate: '2024-09-30',
    tags: ['transformación digital', 'firma electrónica', 'flujo de trabajo', 'eficiencia'],
  },
  {
    id: '11',
    title: 'Historia de Éxito: Telefónica Agiliza la Gestión de Contratos',
    type: 'customer-story',
    url: 'https://www.docusign.com/es-es/customer-stories/telefonica',
    language: 'es_es',
    excerpt: 'Telefónica utiliza Docusign para automatizar los flujos de trabajo de contratos y reducir los tiempos de firma en un 85%.',
    publishDate: '2024-08-15',
    tags: ['gestión de contratos', 'automatización', 'telecomunicaciones', 'caso de éxito'],
  },
  
  // Additional English Content
  {
    id: '12',
    title: 'Contract Lifecycle Management Best Practices for 2024',
    type: 'blog',
    url: 'https://www.docusign.com/blog/clm-best-practices-2024',
    language: 'en_us',
    excerpt: 'Explore the latest best practices in contract lifecycle management to optimize your agreement workflows.',
    publishDate: '2024-10-20',
    tags: ['contract management', 'CLM', 'best practices', 'workflow optimization'],
  },
  {
    id: '13',
    title: 'Real Estate Industry Transforms with Digital Agreements',
    type: 'blog',
    url: 'https://www.docusign.com/blog/real-estate-digital-agreements',
    language: 'en_us',
    excerpt: 'The real estate industry is embracing digital transformation with e-signatures and automated agreement workflows.',
    publishDate: '2024-09-12',
    tags: ['real estate', 'digital agreements', 'automation', 'industry trends'],
  },
  {
    id: '14',
    title: 'Customer Story: T-Mobile Accelerates Customer Onboarding',
    type: 'customer-story',
    url: 'https://www.docusign.com/customer-stories/tmobile',
    language: 'en_us',
    excerpt: 'T-Mobile leverages Docusign to streamline customer onboarding and reduce paperwork by 90%.',
    publishDate: '2024-08-30',
    tags: ['customer onboarding', 'telecommunications', 'automation', 'customer experience'],
  },
  
  // Italian Content
  {
    id: '15',
    title: 'Trasformazione Digitale: Come le Firme Elettroniche Stanno Cambiando il Business',
    type: 'blog',
    url: 'https://www.docusign.com/it-it/blog/trasformazione-digitale',
    language: 'it_it',
    excerpt: 'Scopri come le firme elettroniche accelerano la trasformazione digitale e migliorano l\'efficienza dei flussi di lavoro.',
    publishDate: '2024-09-25',
    tags: ['trasformazione digitale', 'firma elettronica', 'workflow', 'efficienza'],
  },
  {
    id: '16',
    title: 'Storia di Successo: UniCredit Ottimizza la Gestione dei Contratti',
    type: 'customer-story',
    url: 'https://www.docusign.com/it-it/customer-stories/unicredit',
    language: 'it_it',
    excerpt: 'UniCredit utilizza Docusign per automatizzare i flussi di lavoro dei contratti e ridurre i tempi di firma del 75%.',
    publishDate: '2024-08-18',
    tags: ['gestione contratti', 'banking', 'automazione', 'caso di successo'],
  },
  
  // Portuguese Content
  {
    id: '17',
    title: 'Transformação Digital: Assinaturas Eletrônicas Revolucionando Negócios',
    type: 'blog',
    url: 'https://www.docusign.com/pt-br/blog/transformacao-digital',
    language: 'pt_br',
    excerpt: 'Descubra como as assinaturas eletrônicas aceleram a transformação digital e melhoram a eficiência do fluxo de trabalho.',
    publishDate: '2024-09-18',
    tags: ['transformação digital', 'assinatura eletrônica', 'fluxo de trabalho', 'eficiência'],
  },
  {
    id: '18',
    title: 'Case de Sucesso: Banco do Brasil Agiliza Gestão de Contratos',
    type: 'customer-story',
    url: 'https://www.docusign.com/pt-br/customer-stories/banco-do-brasil',
    language: 'pt_br',
    excerpt: 'Banco do Brasil usa Docusign para automatizar fluxos de trabalho de contratos e reduzir tempo de assinatura em 80%.',
    publishDate: '2024-08-10',
    tags: ['gestão de contratos', 'banking', 'automação', 'caso de sucesso'],
  },
  
  // Japanese Content
  {
    id: '19',
    title: 'デジタルトランスフォーメーション：電子署名がビジネスを変革',
    type: 'blog',
    url: 'https://www.docusign.com/ja-jp/blog/digital-transformation',
    language: 'ja_jp',
    excerpt: '電子署名がデジタルトランスフォーメーションを加速し、ワークフローの効率を向上させる方法をご紹介します。',
    publishDate: '2024-09-22',
    tags: ['デジタルトランスフォーメーション', '電子署名', 'ワークフロー', '効率化'],
  },
  {
    id: '20',
    title: '導入事例：ソフトバンクが契約管理を効率化',
    type: 'customer-story',
    url: 'https://www.docusign.com/ja-jp/customer-stories/softbank',
    language: 'ja_jp',
    excerpt: 'ソフトバンクはDocusignを活用して契約ワークフローを自動化し、署名時間を75%削減しました。',
    publishDate: '2024-08-25',
    tags: ['契約管理', '通信業界', '自動化', '導入事例'],
  },
];

// Search content using the Docusign crawler
export const searchContent = async (
  keywords: string[],
  languages: string[]
): Promise<ContentItem[]> => {
  // Translate keywords for all selected languages
  const translatedKeywords = translateKeywordsForLanguages(keywords, languages);
  
  console.log('🔍 Starting Docusign content search...');
  console.log('📝 Original keywords:', keywords);
  console.log('🌐 Target languages:', languages);
  console.log('🔄 Translated keywords:', translatedKeywords);
  
  try {
    // Crawl Docusign website with locale-specific URLs
    // This will search:
    // - https://www.docusign.com/blog
    // - https://www.docusign.com/customer-stories  
    // - https://www.docusign.com/resources
    // And for each locale:
    // - https://www.docusign.com/fr-fr/blog (for French)
    // - https://www.docusign.com/de-de/blog (for German)
    // etc.
    const crawledResults = await crawlDocusignContent(languages, translatedKeywords);
    
    console.log(`✅ Found ${crawledResults.length} results from Docusign.com`);
    
    // Convert crawled content to ContentItem format
    const results: ContentItem[] = crawledResults.map(item => ({
      id: item.id,
      title: item.title,
      type: item.type === 'resource' ? 'blog' : item.type, // Map resource to blog for UI
      url: item.url,
      language: item.language,
      excerpt: item.excerpt,
      publishDate: item.publishDate,
      tags: item.tags,
    }));
    
    // Also search local mock database for fallback/supplementary results
    const mockResults = await searchMockDatabase(keywords, languages, translatedKeywords);
    
    // Combine results, prioritizing crawled content
    const combinedResults = [...results, ...mockResults];
    
    // Remove duplicates based on URL
    const uniqueResults = Array.from(
      new Map(combinedResults.map(item => [item.url, item])).values()
    );
    
    return uniqueResults;
  } catch (error) {
    console.error('❌ Error crawling Docusign content:', error);
    // Fallback to mock database on error
    return searchMockDatabase(keywords, languages, translatedKeywords);
  }
};

// Fallback search in mock database
async function searchMockDatabase(
  keywords: string[],
  languages: string[],
  translatedKeywords: Record<string, string[]>
): Promise<ContentItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const results = mockContentDatabase.filter((item) => {
    const matchesLanguage = languages.includes(item.language);
    
    if (!matchesLanguage) {
      return false;
    }

    // Get translated keywords for this item's language
    const keywordsForLanguage = translatedKeywords[item.language] || [];
    
    const searchText = `${item.title} ${item.excerpt} ${item.tags.join(' ')}`.toLowerCase();
    
    // Check if any translated keyword matches the content
    const matchesKeywords = keywordsForLanguage.some(keyword =>
      searchText.includes(keyword.toLowerCase())
    );

    return matchesKeywords;
  });

  return results;
}
