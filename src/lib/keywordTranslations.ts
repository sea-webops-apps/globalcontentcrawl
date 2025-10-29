// Translation mappings for common business and technology keywords
// Maps English keywords to their equivalents in supported languages

export const keywordTranslations: Record<string, Record<string, string[]>> = {
  // Digital & Technology
  'digital': {
    en_us: ['digital'],
    de_de: ['digital', 'digitale', 'digitalen'],
    nl_nl: ['digitaal', 'digitale'],
    fr_fr: ['numérique', 'digital'],
    es_es: ['digital'],
    it_it: ['digitale'],
    pt_br: ['digital'],
    ja_jp: ['デジタル'],
  },
  'transformation': {
    en_us: ['transformation'],
    de_de: ['transformation', 'transformierung'],
    nl_nl: ['transformatie'],
    fr_fr: ['transformation'],
    es_es: ['transformación'],
    it_it: ['trasformazione'],
    pt_br: ['transformação'],
    ja_jp: ['トランスフォーメーション', '変革'],
  },
  'technology': {
    en_us: ['technology'],
    de_de: ['technologie'],
    nl_nl: ['technologie'],
    fr_fr: ['technologie'],
    es_es: ['tecnología'],
    it_it: ['tecnologia'],
    pt_br: ['tecnologia'],
    ja_jp: ['テクノロジー', '技術'],
  },
  
  // Signatures & Documents
  'signature': {
    en_us: ['signature', 'e-signature', 'electronic signature'],
    de_de: ['signatur', 'e-signatur', 'unterschrift', 'elektronische signatur'],
    nl_nl: ['handtekening', 'e-handtekening', 'elektronische handtekening'],
    fr_fr: ['signature', 'signature électronique', 'e-signature'],
    es_es: ['firma', 'firma electrónica', 'e-firma'],
    it_it: ['firma', 'firma elettronica', 'e-firma'],
    pt_br: ['assinatura', 'assinatura eletrônica', 'e-assinatura'],
    ja_jp: ['署名', '電子署名'],
  },
  'contract': {
    en_us: ['contract', 'agreement'],
    de_de: ['vertrag', 'verträge', 'kontrakt'],
    nl_nl: ['contract', 'overeenkomst'],
    fr_fr: ['contrat', 'accord'],
    es_es: ['contrato', 'acuerdo'],
    it_it: ['contratto', 'accordo'],
    pt_br: ['contrato', 'acordo'],
    ja_jp: ['契約', '契約書'],
  },
  'document': {
    en_us: ['document', 'documents'],
    de_de: ['dokument', 'dokumente'],
    nl_nl: ['document', 'documenten'],
    fr_fr: ['document', 'documents'],
    es_es: ['documento', 'documentos'],
    it_it: ['documento', 'documenti'],
    pt_br: ['documento', 'documentos'],
    ja_jp: ['文書', 'ドキュメント'],
  },
  
  // Workflow & Automation
  'workflow': {
    en_us: ['workflow', 'process'],
    de_de: ['workflow', 'arbeitsablauf', 'prozess'],
    nl_nl: ['workflow', 'werkstroom', 'proces'],
    fr_fr: ['workflow', 'flux de travail', 'processus'],
    es_es: ['flujo de trabajo', 'workflow', 'proceso'],
    it_it: ['flusso di lavoro', 'workflow', 'processo'],
    pt_br: ['fluxo de trabalho', 'workflow', 'processo'],
    ja_jp: ['ワークフロー', '業務フロー'],
  },
  'automation': {
    en_us: ['automation', 'automate'],
    de_de: ['automatisierung', 'automatisieren', 'automationsverfahren'],
    nl_nl: ['automatisering', 'automatiseren'],
    fr_fr: ['automatisation', 'automatiser'],
    es_es: ['automatización', 'automatizar'],
    it_it: ['automazione', 'automatizzare'],
    pt_br: ['automação', 'automatizar'],
    ja_jp: ['自動化', 'オートメーション'],
  },
  'efficiency': {
    en_us: ['efficiency', 'efficient'],
    de_de: ['effizienz', 'effizient'],
    nl_nl: ['efficiëntie', 'efficiënt'],
    fr_fr: ['efficacité', 'efficace'],
    es_es: ['eficiencia', 'eficiente'],
    it_it: ['efficienza', 'efficiente'],
    pt_br: ['eficiência', 'eficiente'],
    ja_jp: ['効率', '効率化'],
  },
  
  // Management
  'management': {
    en_us: ['management', 'manage'],
    de_de: ['management', 'verwaltung', 'verwalten'],
    nl_nl: ['beheer', 'management'],
    fr_fr: ['gestion', 'gérer'],
    es_es: ['gestión', 'administración'],
    it_it: ['gestione', 'amministrazione'],
    pt_br: ['gestão', 'gerenciamento'],
    ja_jp: ['管理', 'マネジメント'],
  },
  'customer': {
    en_us: ['customer', 'client'],
    de_de: ['kunde', 'kunden', 'kundschaft', 'mandant'],
    nl_nl: ['klant', 'klanten'],
    fr_fr: ['client', 'clients'],
    es_es: ['cliente', 'clientes'],
    it_it: ['cliente', 'clienti'],
    pt_br: ['cliente', 'clientes'],
    ja_jp: ['顧客', 'クライアント'],
  },
  
  // Business & Industry
  'business': {
    en_us: ['business', 'enterprise'],
    de_de: ['geschäft', 'unternehmen', 'business'],
    nl_nl: ['bedrijf', 'onderneming', 'business'],
    fr_fr: ['entreprise', 'affaires', 'business'],
    es_es: ['negocio', 'empresa', 'empresarial'],
    it_it: ['business', 'affari', 'azienda'],
    pt_br: ['negócio', 'empresa', 'empresarial'],
    ja_jp: ['ビジネス', '事業'],
  },
  'healthcare': {
    en_us: ['healthcare', 'health', 'medical'],
    de_de: ['gesundheitswesen', 'gesundheit', 'medizinisch'],
    nl_nl: ['gezondheidszorg', 'gezondheid', 'medisch'],
    fr_fr: ['santé', 'soins de santé', 'médical'],
    es_es: ['salud', 'atención médica', 'sanitario'],
    it_it: ['sanità', 'assistenza sanitaria', 'medico'],
    pt_br: ['saúde', 'assistência médica'],
    ja_jp: ['医療', 'ヘルスケア'],
  },
  'banking': {
    en_us: ['banking', 'bank', 'financial'],
    de_de: ['banking', 'bank', 'finanzen', 'bankwesen'],
    nl_nl: ['banking', 'bank', 'bankieren'],
    fr_fr: ['banque', 'bancaire', 'financier'],
    es_es: ['banca', 'banco', 'bancario'],
    it_it: ['banking', 'banca', 'bancario'],
    pt_br: ['bancário', 'banco', 'banking'],
    ja_jp: ['銀行', 'バンキング'],
  },
  'real estate': {
    en_us: ['real estate', 'property'],
    de_de: ['immobilien', 'grundstück'],
    nl_nl: ['vastgoed', 'onroerend goed'],
    fr_fr: ['immobilier', 'propriété'],
    es_es: ['bienes raíces', 'inmobiliaria', 'propiedad'],
    it_it: ['immobiliare', 'proprietà'],
    pt_br: ['imobiliário', 'propriedade'],
    ja_jp: ['不動産'],
  },
  'telecommunications': {
    en_us: ['telecommunications', 'telecom', 'communications'],
    de_de: ['telekommunikation', 'kommunikation'],
    nl_nl: ['telecommunicatie', 'communicatie'],
    fr_fr: ['télécommunications', 'télécom'],
    es_es: ['telecomunicaciones', 'comunicaciones'],
    it_it: ['telecomunicazioni', 'comunicazione'],
    pt_br: ['telecomunicações', 'comunicação'],
    ja_jp: ['通信', '通信業界', 'テレコム'],
  },
  'automotive': {
    en_us: ['automotive', 'auto', 'vehicle'],
    de_de: ['automotive', 'automobil', 'fahrzeug', 'auto'],
    nl_nl: ['automotive', 'auto', 'voertuig'],
    fr_fr: ['automobile', 'auto', 'véhicule'],
    es_es: ['automotriz', 'automóvil', 'vehículo'],
    it_it: ['automotive', 'automobile', 'auto'],
    pt_br: ['automotivo', 'automóvel', 'veículo'],
    ja_jp: ['自動車'],
  },
  
  // Success & Results
  'success': {
    en_us: ['success', 'successful'],
    de_de: ['erfolg', 'erfolgreich'],
    nl_nl: ['succes', 'succesvol'],
    fr_fr: ['succès', 'réussite'],
    es_es: ['éxito', 'exitoso'],
    it_it: ['successo'],
    pt_br: ['sucesso'],
    ja_jp: ['成功', 'サクセス'],
  },
  'story': {
    en_us: ['story', 'case study'],
    de_de: ['geschichte', 'erfolgsgeschichte', 'fallstudie'],
    nl_nl: ['verhaal', 'case study'],
    fr_fr: ['histoire', 'témoignage', 'étude de cas'],
    es_es: ['historia', 'caso', 'estudio de caso'],
    it_it: ['storia', 'caso studio'],
    pt_br: ['história', 'caso', 'estudo de caso'],
    ja_jp: ['事例', 'ストーリー', '導入事例'],
  },
  
  // Common Actions
  'streamline': {
    en_us: ['streamline', 'optimize'],
    de_de: ['optimieren', 'rationalisieren', 'verbessern'],
    nl_nl: ['stroomlijnen', 'optimaliseren'],
    fr_fr: ['optimiser', 'rationaliser'],
    es_es: ['optimizar', 'agilizar', 'racionalizar'],
    it_it: ['ottimizzare', 'razionalizzare'],
    pt_br: ['otimizar', 'agilizar', 'racionalizar'],
    ja_jp: ['効率化', '最適化'],
  },
  'accelerate': {
    en_us: ['accelerate', 'speed up'],
    de_de: ['beschleunigen', 'schneller'],
    nl_nl: ['versnellen', 'accelereren'],
    fr_fr: ['accélérer'],
    es_es: ['acelerar'],
    it_it: ['accelerare'],
    pt_br: ['acelerar'],
    ja_jp: ['加速', '高速化'],
  },
  'improve': {
    en_us: ['improve', 'enhance'],
    de_de: ['verbessern', 'erhöhen'],
    nl_nl: ['verbeteren'],
    fr_fr: ['améliorer'],
    es_es: ['mejorar'],
    it_it: ['migliorare'],
    pt_br: ['melhorar'],
    ja_jp: ['改善', '向上'],
  },
  'reduce': {
    en_us: ['reduce', 'decrease'],
    de_de: ['reduzieren', 'verringern', 'vermindern'],
    nl_nl: ['verminderen', 'reduceren', 'verkorten'],
    fr_fr: ['réduire', 'diminuer'],
    es_es: ['reducir', 'disminuir'],
    it_it: ['ridurre'],
    pt_br: ['reduzir', 'diminuir'],
    ja_jp: ['削減', '低減'],
  },
  
  // Experience & Service
  'experience': {
    en_us: ['experience'],
    de_de: ['erfahrung', 'erlebnis'],
    nl_nl: ['ervaring', 'beleving'],
    fr_fr: ['expérience'],
    es_es: ['experiencia'],
    it_it: ['esperienza'],
    pt_br: ['experiência'],
    ja_jp: ['体験', 'エクスペリエンス'],
  },
  'onboarding': {
    en_us: ['onboarding'],
    de_de: ['onboarding', 'einarbeitung'],
    nl_nl: ['onboarding', 'inwerken'],
    fr_fr: ['intégration', 'onboarding'],
    es_es: ['incorporación', 'onboarding'],
    it_it: ['onboarding', 'integrazione'],
    pt_br: ['integração', 'onboarding'],
    ja_jp: ['オンボーディング', '導入'],
  },
  
  // Compliance & Security
  'compliance': {
    en_us: ['compliance', 'regulatory'],
    de_de: ['compliance', 'vorschriften', 'einhaltung'],
    nl_nl: ['compliance', 'naleving'],
    fr_fr: ['conformité', 'réglementation'],
    es_es: ['cumplimiento', 'normativa'],
    it_it: ['conformità', 'compliance'],
    pt_br: ['conformidade', 'compliance'],
    ja_jp: ['コンプライアンス', '規制'],
  },
  
  // Lifecycle & Best Practices
  'lifecycle': {
    en_us: ['lifecycle', 'life cycle'],
    de_de: ['lebenszyklus', 'lifecycle'],
    nl_nl: ['levenscyclus', 'lifecycle'],
    fr_fr: ['cycle de vie', 'lifecycle'],
    es_es: ['ciclo de vida', 'lifecycle'],
    it_it: ['ciclo di vita', 'lifecycle'],
    pt_br: ['ciclo de vida', 'lifecycle'],
    ja_jp: ['ライフサイクル'],
  },
  'best practices': {
    en_us: ['best practices'],
    de_de: ['best practices', 'bewährte verfahren'],
    nl_nl: ['best practices', 'beste praktijken'],
    fr_fr: ['meilleures pratiques', 'bonnes pratiques'],
    es_es: ['mejores prácticas', 'buenas prácticas'],
    it_it: ['migliori pratiche', 'best practices'],
    pt_br: ['melhores práticas'],
    ja_jp: ['ベストプラクティス'],
  },
  'agreement': {
    en_us: ['agreement'],
    de_de: ['vereinbarung', 'abkommen'],
    nl_nl: ['overeenkomst', 'akkoord'],
    fr_fr: ['accord', 'convention'],
    es_es: ['acuerdo', 'convenio'],
    it_it: ['accordo'],
    pt_br: ['acordo'],
    ja_jp: ['合意', '契約'],
  },
};

// Function to translate keywords for a specific language
export function translateKeywords(keywords: string[], targetLanguage: string): string[] {
  const translatedSet = new Set<string>();
  
  keywords.forEach(keyword => {
    const lowerKeyword = keyword.toLowerCase().trim();
    
    // Add the original keyword
    translatedSet.add(lowerKeyword);
    
    // Check if we have a translation mapping for this keyword
    if (keywordTranslations[lowerKeyword]) {
      const translations = keywordTranslations[lowerKeyword][targetLanguage] || [];
      translations.forEach(translation => translatedSet.add(translation.toLowerCase()));
    }
    
    // Also check for partial matches in our translation keys
    Object.keys(keywordTranslations).forEach(translationKey => {
      if (translationKey.includes(lowerKeyword) || lowerKeyword.includes(translationKey)) {
        const translations = keywordTranslations[translationKey][targetLanguage] || [];
        translations.forEach(translation => translatedSet.add(translation.toLowerCase()));
      }
    });
  });
  
  return Array.from(translatedSet);
}

// Function to get all possible translations across selected languages
export function translateKeywordsForLanguages(
  keywords: string[],
  targetLanguages: string[]
): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  
  targetLanguages.forEach(lang => {
    result[lang] = translateKeywords(keywords, lang);
  });
  
  return result;
}
