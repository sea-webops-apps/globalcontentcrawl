import { Lightbulb } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface ExampleSearchesProps {
  onSelectExample: (keywords: string[], languages: string[]) => void;
}

const EXAMPLE_SEARCHES = [
  {
    label: 'Contract Automation',
    keywords: ['contract', 'automation', 'workflow'],
    languages: ['en_us', 'de_de', 'fr_fr'],
    description: 'Find content about contract automation in English, German, and French'
  },
  {
    label: 'Healthcare Solutions',
    keywords: ['healthcare', 'digital', 'signature'],
    languages: ['en_us', 'es_es', 'pt_br'],
    description: 'Healthcare-related content in English, Spanish, and Portuguese'
  },
  {
    label: 'Customer Success Stories',
    keywords: ['customer', 'success', 'transformation'],
    languages: ['en_us', 'nl_nl', 'it_it'],
    description: 'Success stories in English, Dutch, and Italian'
  },
  {
    label: 'Banking & Financial',
    keywords: ['banking', 'financial', 'compliance'],
    languages: ['en_us', 'de_de', 'ja_jp'],
    description: 'Banking solutions in English, German, and Japanese'
  }
];

export function ExampleSearches({ onSelectExample }: ExampleSearchesProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lightbulb className="h-4 w-4" />
        <span>Try these example searches:</span>
      </div>
      
      <div className="grid gap-2">
        {EXAMPLE_SEARCHES.map((example, idx) => (
          <Button
            key={idx}
            variant="outline"
            className="h-auto py-3 px-4 justify-start text-left"
            onClick={() => onSelectExample(example.keywords, example.languages)}
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">{example.label}</span>
                <div className="flex gap-1">
                  {example.keywords.map((keyword, kidx) => (
                    <Badge key={kidx} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{example.description}</p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
