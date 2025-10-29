import { ExternalLink, Copy, FileText, Users, Languages, Globe, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner@2.0.3';
import { translateKeywordsForLanguages } from '../lib/keywordTranslations';
import { useState } from 'react';

export interface ContentItem {
  id: string;
  title: string;
  type: 'blog' | 'customer-story';
  url: string;
  language: string;
  excerpt: string;
  publishDate: string;
  tags: string[];
}

interface ContentResultsProps {
  results: ContentItem[];
  searchTerms: string[];
  selectedLanguages: string[];
  onNewSearch?: () => void;
}

export function ContentResults({ results, searchTerms, selectedLanguages, onNewSearch }: ContentResultsProps) {
  const [showTranslations, setShowTranslations] = useState(false);
  const translatedKeywords = translateKeywordsForLanguages(searchTerms, selectedLanguages);
  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard!');
  };

  const highlightText = (text: string) => {
    let highlightedText = text;
    searchTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-900">$1</mark>');
    });
    return highlightedText;
  };

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No results found. Try different keywords or languages.</p>
      </div>
    );
  }

  const languageNames: Record<string, string> = {
    en_us: 'English',
    de_de: 'German',
    nl_nl: 'Dutch',
    fr_fr: 'French',
    es_es: 'Spanish',
    it_it: 'Italian',
    pt_br: 'Portuguese',
    ja_jp: 'Japanese',
  };

  return (
    <div className="space-y-4">
      {/* Search Summary */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            {onNewSearch && (
              <Button
                variant="outline"
                size="sm"
                onClick={onNewSearch}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                New Search
              </Button>
            )}
            <p className="text-muted-foreground">
              Found {results.length} {results.length === 1 ? 'result' : 'results'}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTranslations(!showTranslations)}
            className="gap-2"
          >
            <Languages className="h-4 w-4" />
            {showTranslations ? 'Hide' : 'View'} Translations
          </Button>
        </div>

        {/* Translation Info */}
        {showTranslations && (
          <div className="p-4 rounded-lg bg-muted/50 border space-y-2">
            <p className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-primary" />
              <span>Translated search keywords:</span>
            </p>
            <div className="space-y-2 pl-6">
              {selectedLanguages.map((lang) => {
                const keywords = translatedKeywords[lang] || [];
                return (
                  <div key={lang} className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {languageNames[lang] || lang}:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {keywords.slice(0, 10).map((keyword, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                      {keywords.length > 10 && (
                        <Badge variant="outline" className="text-xs">
                          +{keywords.length - 10} more
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-4">
          {results.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl border bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {item.type === 'blog' ? (
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Users className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Badge variant={item.type === 'blog' ? 'default' : 'secondary'}>
                      {item.type === 'blog' ? 'Blog Post' : 'Customer Story'}
                    </Badge>
                    <Badge variant="outline" className="uppercase">
                      {languageNames[item.language] || item.language}
                    </Badge>
                    {item.url.includes('docusign.com') && (
                      <Badge variant="outline" className="gap-1 text-primary border-primary/30">
                        <Globe className="h-3 w-3" />
                        Docusign.com
                      </Badge>
                    )}
                  </div>
                  <h3 
                    className="mb-2"
                    dangerouslySetInnerHTML={{ __html: highlightText(item.title) }}
                  />
                  <p 
                    className="text-muted-foreground mb-3"
                    dangerouslySetInnerHTML={{ __html: highlightText(item.excerpt) }}
                  />
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Published: {new Date(item.publishDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyUrl(item.url)}
                  className="flex-1"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy URL
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => window.open(item.url, '_blank')}
                  className="flex-1"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Page
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
