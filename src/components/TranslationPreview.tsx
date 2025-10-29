import { Languages } from 'lucide-react';
import { Badge } from './ui/badge';
import { translateKeywords } from '../lib/keywordTranslations';

interface TranslationPreviewProps {
  keywords: string[];
  targetLanguage: string;
  languageName: string;
}

export function TranslationPreview({ keywords, targetLanguage, languageName }: TranslationPreviewProps) {
  if (keywords.length === 0) return null;

  const sampleKeyword = keywords[0];
  const translations = translateKeywords([sampleKeyword], targetLanguage);
  
  // Filter out the original keyword to show only translations
  const actualTranslations = translations.filter(t => t.toLowerCase() !== sampleKeyword.toLowerCase());

  if (actualTranslations.length === 0) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Languages className="h-3 w-3" />
      <span>"{sampleKeyword}" → </span>
      <div className="flex gap-1">
        {actualTranslations.slice(0, 2).map((translation, idx) => (
          <Badge key={idx} variant="outline" className="text-xs">
            {translation}
          </Badge>
        ))}
        {actualTranslations.length > 2 && (
          <span className="text-xs">+{actualTranslations.length - 2}</span>
        )}
      </div>
      <span>in {languageName}</span>
    </div>
  );
}
