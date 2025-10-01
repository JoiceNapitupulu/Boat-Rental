import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  language: 'id' | 'en';
  onLanguageChange: (language: 'id' | 'en') => void;
}

export function LanguageSwitcher({ language, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
      <Globe className="w-4 h-4 text-white" />
      <button
        onClick={() => onLanguageChange('id')}
        className={`px-2 py-1 rounded-full text-xs transition-colors ${
          language === 'id' 
            ? 'bg-white text-blue-600' 
            : 'text-white/80 hover:text-white'
        }`}
      >
        ID
      </button>
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-2 py-1 rounded-full text-xs transition-colors ${
          language === 'en' 
            ? 'bg-white text-blue-600' 
            : 'text-white/80 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}