import { Globe, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Button } from './ui/button';
import { useState } from 'react';
import { getCrawlSummary } from '../lib/docusignCrawler';

interface CrawlStatusIndicatorProps {
  isSearching: boolean;
  selectedLanguages: string[];
}

export function CrawlStatusIndicator({ isSearching, selectedLanguages }: CrawlStatusIndicatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const crawlSummary = getCrawlSummary(selectedLanguages);

  if (!isSearching && selectedLanguages.length === 0) {
    return null;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <div 
        className="rounded-lg border p-4 space-y-3 transition-all"
        style={{
          background: isSearching 
            ? 'linear-gradient(135deg, rgba(107, 93, 211, 0.05) 0%, rgba(203, 194, 255, 0.08) 100%)'
            : 'var(--color-card)',
          borderColor: isSearching ? 'rgba(107, 93, 211, 0.3)' : 'var(--color-border)'
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            {isSearching ? (
              <div className="relative">
                <Loader2 className="h-5 w-5 text-primary animate-spin mt-0.5" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </div>
            ) : (
              <Globe className="h-5 w-5 text-primary mt-0.5" />
            )}
            <div className="flex-1">
              <p className="mb-1">
                {isSearching ? (
                  <>
                    <span className="text-primary">Live crawling</span>
                    <span> Docusign.com across </span>
                    <span>{selectedLanguages.length} {selectedLanguages.length === 1 ? 'locale' : 'locales'}</span>
                  </>
                ) : (
                  <>
                    <span>Ready to search </span>
                    <span>{crawlSummary.length * 3} URLs</span>
                    <span> across {selectedLanguages.length} {selectedLanguages.length === 1 ? 'locale' : 'locales'}</span>
                  </>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                {isSearching ? 'Crawling pages and matching translated keywords...' : 'Blog, Customer Stories, and Resources sections'}
              </p>
            </div>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="text-xs">
              {isOpen ? 'Hide' : 'Show'} URLs
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="space-y-3 pt-2">
          {crawlSummary.map((summary) => (
            <div key={summary.locale} className="space-y-2 pl-8">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="uppercase">
                  {summary.locale}
                </Badge>
                <span className="text-sm">{summary.localeName}</span>
              </div>
              <div className="space-y-1 text-xs">
                {summary.urls.map((urlInfo, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-muted-foreground">
                    <span className="w-32 flex-shrink-0">{urlInfo.type}:</span>
                    <a
                      href={urlInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {urlInfo.url}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
