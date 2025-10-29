import { useState } from 'react';
import { FileSearch } from 'lucide-react';
import { ContentSearchForm } from './components/ContentSearchForm';
import { ContentResults, ContentItem } from './components/ContentResults';
import { CrawlStatusIndicator } from './components/CrawlStatusIndicator';
import { Toaster } from './components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { searchContent } from './lib/mockContentData';
import { translateKeywordsForLanguages } from './lib/keywordTranslations';

function App() {
  const [results, setResults] = useState<ContentItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerms, setSearchTerms] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('search');

  const handleSearch = async (keywords: string[], languages: string[]) => {
    setIsSearching(true);
    setHasSearched(false);
    setSearchTerms(keywords);
    setSelectedLanguages(languages);

    try {
      const searchResults = await searchContent(keywords, languages);
      setResults(searchResults);
      setHasSearched(true);
      // Automatically switch to results tab
      setActiveTab('results');
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen p-8" style={{
      background: 'linear-gradient(135deg, #F9F8FF 0%, #E8E4FF 50%, #CBC2FF 100%)'
    }}>
      <Toaster position="top-center" />
      
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-white mb-4 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #6B5DD3 0%, #9B8DFF 100%)'
            }}
          >
            <FileSearch className="h-8 w-8" />
          </div>
          <h1 className="mb-2">Docusign Content Finder</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover published blog posts and customer stories from Docusign.com in multiple languages
          </p>
        </div>

        {/* Main Widget */}
        <div className="bg-card rounded-2xl shadow-xl border p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="search">Search Content</TabsTrigger>
              <TabsTrigger value="results" disabled={!hasSearched}>
                Results {hasSearched && `(${results.length})`}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="mt-0 space-y-6">
              <CrawlStatusIndicator 
                isSearching={isSearching}
                selectedLanguages={selectedLanguages}
              />
              <ContentSearchForm 
                onSearch={handleSearch} 
                isSearching={isSearching}
                onLanguageChange={setSelectedLanguages}
              />
            </TabsContent>

            <TabsContent value="results" className="mt-0">
              {hasSearched && (
                <ContentResults 
                  results={results} 
                  searchTerms={searchTerms}
                  selectedLanguages={selectedLanguages}
                  onNewSearch={() => setActiveTab('search')}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Info Footer */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-muted-foreground text-sm">
            This tool crawls <span className="text-foreground">Docusign.com/blog</span>, <span className="text-foreground">/customer-stories</span>, and <span className="text-foreground">/resources</span> across multiple locales.
            <br />
            Keywords are automatically translated to match content in your selected languages.
          </p>
          <p className="text-xs text-muted-foreground">
            Currently using simulated crawling. See <code className="px-1 py-0.5 rounded bg-muted">BACKEND_INTEGRATION.md</code> for production setup.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
