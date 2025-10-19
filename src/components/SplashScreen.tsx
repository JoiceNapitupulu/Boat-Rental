import { Waves } from 'lucide-react';
import soraLogo from 'figma:asset/b4398db50b454ae1b722a3f11af68f59d92f1dad.png';

interface SplashScreenProps {
  language: 'id' | 'en';
}

export function SplashScreen({ language }: SplashScreenProps) {
  const text = {
    id: {
      tagline: 'KEBEBASAN ANDA DI ATAS AIR',
      loading: 'Memuat...'
    },
    en: {
      tagline: 'YOUR FREEDOM ON THE WATER',
      loading: 'Loading...'
    }
  };

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center text-white relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #0C2D6B 0%, #2980B9 100%)'
      }}
    >
      {/* Animated waves */}
      <div className="absolute inset-0 opacity-10">
        <Waves className="absolute top-8 left-8 w-24 h-24 animate-pulse" />
        <Waves className="absolute bottom-8 right-8 w-16 h-16 animate-pulse delay-1000" />
        <Waves className="absolute top-1/2 left-1/4 w-12 h-12 animate-pulse delay-500" />
      </div>
      
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-3">
          <img 
            src={soraLogo} 
            alt="Sora Logo" 
            className="h-40 w-auto object-contain mx-auto animate-pulse transform hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        {/* Tagline */}
        <p className="text-lg opacity-90 mb-8 tracking-wide">
          {text[language].tagline}
        </p>
        
        {/* Loading indicator */}
        <div className="flex flex-col items-center">
          <div className="flex space-x-2 mb-4">
            <div 
              className="w-3 h-3 rounded-full animate-bounce"
              style={{ backgroundColor: '#F39C12', animationDelay: '0ms' }}
            ></div>
            <div 
              className="w-3 h-3 rounded-full animate-bounce"
              style={{ backgroundColor: '#F39C12', animationDelay: '150ms' }}
            ></div>
            <div 
              className="w-3 h-3 rounded-full animate-bounce"
              style={{ backgroundColor: '#F39C12', animationDelay: '300ms' }}
            ></div>
          </div>
          <p className="text-sm opacity-75">{text[language].loading}</p>
        </div>
      </div>
    </div>
  );
}