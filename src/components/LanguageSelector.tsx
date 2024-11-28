import React, { useCallback, useMemo, useState } from 'react';
import { Language, languages } from '../data/languages';
import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface LanguageSelectorProps {
  selectedLanguage: string | null;
  onSelectLanguage: (languageId: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onSelectLanguage,
}) => {
  const [query, setQuery] = useState("");
  const filteredLanguages = useMemo(() => {
    if(!query) return languages;
    console.log(query)
    return languages.filter(x => x.name.toLowerCase().includes(query.toLowerCase().trim())); 
  }, [query]);
  return (
    <>
    <input className='w-full my-2 p-2' value={query} onChange={e => setQuery(e.target.value)} 
      placeholder='Filter languages'
    />
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredLanguages.map((language) => {
        const IconComponent = (Icons as Record<string, React.FC<LucideProps>>)[
          language.icon.charAt(0).toUpperCase() + language.icon.slice(1)
        ] || Icons.Code;
        
        return (
          <button
            key={language.id}
            onClick={() => onSelectLanguage(language.id)}
            className={`p-4 rounded-lg border transition-all ${
              selectedLanguage === language.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <IconComponent className="w-5 h-5 text-blue-600" />
              <span className="font-medium">{language.name}</span>
            </div>
          </button>
        );
      })}
    </div>
    </>
  );
};

export default LanguageSelector;