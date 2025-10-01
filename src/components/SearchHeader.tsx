import { Search, MapPin, Calendar, Users, Waves } from 'lucide-react';
import { useState } from 'react';

interface SearchHeaderProps {
  onSearch: (params: SearchParams) => void;
  language: 'id' | 'en';
}

interface SearchParams {
  location: string;
  date: string;
  guests: string;
}

export function SearchHeader({ onSearch, language }: SearchHeaderProps) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    date: '',
    guests: ''
  });

  const handleSearch = () => {
    onSearch(searchParams);
  };

  const text = {
    id: {
      brand: 'Sora',
      tagline: 'KEBEBASAN ANDA DI ATAS AIR',
      subtitle: 'Temukan Perjalanan Sempurna di Danau Toba',
      whereTo: 'Mau ke mana?',
      guests: 'Penumpang',
      searchBoats: 'Cari Kapal'
    },
    en: {
      brand: 'Sora',
      tagline: 'YOUR FREEDOM ON THE WATER',
      subtitle: 'Find Your Perfect Journey on Lake Toba',
      whereTo: 'Where to?',
      guests: 'Guests',
      searchBoats: 'Search Boats'
    }
  };

  return (
    <div style={{ backgroundColor: '#0C2D6B' }} className="bg-gradient-to-r to-[#2980B9] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Waves className="absolute top-4 left-4 w-16 h-16 animate-pulse" />
        <Waves className="absolute bottom-4 right-4 w-12 h-12 animate-pulse delay-1000" />
      </div>
      <div className="px-4 py-8 relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl mb-2 text-white tracking-wide">{text[language].brand}</h1>
          <p className="text-sm opacity-90 mb-1">{text[language].tagline}</p>
          <p className="text-sm opacity-75">{text[language].subtitle}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="space-y-3">
            <div className="relative">
              <MapPin style={{ color: '#2980B9' }} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
              <select 
                value={searchParams.location}
                onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                style={{ color: '#0C2D6B' }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2"
                {...({ style: { focusRingColor: '#2980B9' } })}
              >
                <option value="">{text[language].whereTo}</option>
                <option value="samosir">Pulau Samosir</option>
                <option value="tomok">Tomok</option>
                <option value="simanindo">Simanindo</option>
                <option value="ambarita">Ambarita</option>
                <option value="tuktuk">Tuk Tuk</option>
                <option value="balige">Balige</option>
              </select>
            </div>
            
            <div className="relative">
              <Calendar style={{ color: '#2980B9' }} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
              <input 
                type="date"
                value={searchParams.date}
                onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                style={{ color: '#0C2D6B' }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2"
                {...({ style: { focusRingColor: '#2980B9' } })}
              />
            </div>
            
            <div className="relative">
              <Users style={{ color: '#2980B9' }} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
              <select 
                value={searchParams.guests}
                onChange={(e) => setSearchParams({...searchParams, guests: e.target.value})}
                style={{ color: '#0C2D6B' }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2"
                {...({ style: { focusRingColor: '#2980B9' } })}
              >
                <option value="">{text[language].guests}</option>
                <option value="2">2 {text[language].guests.toLowerCase()}</option>
                <option value="4">4 {text[language].guests.toLowerCase()}</option>
                <option value="6">6 {text[language].guests.toLowerCase()}</option>
                <option value="8">8 {text[language].guests.toLowerCase()}</option>
                <option value="10+">10+ {text[language].guests.toLowerCase()}</option>
              </select>
            </div>
            
            <button 
              onClick={handleSearch}
              style={{ backgroundColor: '#0C2D6B' }}
              className="w-full text-white py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              {text[language].searchBoats}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}