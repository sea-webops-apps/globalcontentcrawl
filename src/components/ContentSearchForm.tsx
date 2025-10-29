import { useState } from 'react';
import { Search, X, Languages } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { ExampleSearches } from './ExampleSearches';
import { Separator } from './ui/separator';

interface ContentSearchFormProps {
  onSearch: (keywords: string[], languages: string[]) => void;
  isSearching: boolean;
  onLanguageChange?: (languages: string[]) => void;
}

const AVAILABLE_LANGUAGES = [
  { code: 'en_us', label: 'English (US)' },
  { code: 'de_de', label: 'Deutsch (DE)' },
  { code: 'nl_nl', label: 'Nederlands (NL)' },
  { code: 'fr_fr', label: 'Français (FR)' },
  { code: 'es_es', label: 'Español (ES)' },
  { code: 'it_it', label: 'Italiano (IT)' },
  { code: 'pt_br', label: 'Português (BR)' },
  { code: 'ja_jp', label: '日本語 (JP)' },
];

export function ContentSearchForm({ onSearch, isSearching, onLanguageChange }: ContentSearchFormProps) {
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['en_us']);

  const handleAddKeyword = () => {
    const trimmed = keywordInput.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords([...keywords, trimmed]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const toggleLanguage = (code: string) => {
    const newLanguages = selectedLanguages.includes(code)
      ? selectedLanguages.filter(l => l !== code)
      : [...selectedLanguages, code];
    
    setSelectedLanguages(newLanguages);
    onLanguageChange?.(newLanguages);
  };

  const handleSearch = () => {
    if (keywords.length > 0 && selectedLanguages.length > 0) {
      onSearch(keywords, selectedLanguages);
    }
  };

  const handleExampleSelect = (exampleKeywords: string[], exampleLanguages: string[]) => {
    setKeywords(exampleKeywords);
    setSelectedLanguages(exampleLanguages);
    onLanguageChange?.(exampleLanguages);
  };

  return (
    <div className="space-y-6">
      {/* Translation Info Alert */}
      {selectedLanguages.length > 1 || !selectedLanguages.includes('en_us') ? (
        <Alert className="bg-mist-light border-mist">
          <Languages className="h-4 w-4 text-primary" />
          <AlertDescription>
            Your keywords will be automatically translated to match content in the selected languages.
          </AlertDescription>
        </Alert>
      ) : null}

      {/* Keywords Section */}
      <div className="space-y-3">
        <Label htmlFor="keyword-input">Keywords (in English)</Label>
        <div className="flex gap-2">
          <Input
            id="keyword-input"
            placeholder="e.g., contract, workflow, automation (press Enter)"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleAddKeyword} variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <Badge 
                key={keyword} 
                variant="secondary" 
                className="pl-3 pr-1 py-1.5 gap-1.5"
              >
                {keyword}
                <button
                  onClick={() => handleRemoveKeyword(keyword)}
                  className="ml-1 rounded-sm hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Languages Section */}
      <div className="space-y-3">
        <Label>Target Languages</Label>
        <div className="grid grid-cols-2 gap-2">
          {AVAILABLE_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => toggleLanguage(lang.code)}
              className={`px-4 py-2.5 rounded-lg border transition-all ${
                selectedLanguages.includes(lang.code)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border hover:bg-muted'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        disabled={keywords.length === 0 || selectedLanguages.length === 0 || isSearching}
        className="w-full"
      >
        {isSearching ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            Searching...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Search Content
          </>
        )}
      </Button>

      {/* Example Searches */}
      {keywords.length === 0 && !isSearching && (
        <>
          <Separator className="my-4" />
          <ExampleSearches onSelectExample={handleExampleSelect} />
        </>
      )}
    </div>
  );
}
