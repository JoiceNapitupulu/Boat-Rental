import { useState } from 'react';
import { SearchHeader } from './components/SearchHeader';
import { BoatCard } from './components/BoatCard';
import { BookingModal } from './components/BookingModal';
import { BottomNav } from './components/BottomNav';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { LoyaltyCard } from './components/LoyaltyCard';
import { Filter, Star, Navigation, MessageCircle, Award } from 'lucide-react';

interface SearchParams {
  location: string;
  date: string;
  guests: string;
}

const soraBoats = [
  {
    id: '1',
    name: 'Kapal Tradisional Batak',
    image: 'https://images.unsplash.com/photo-1676180600433-5109519eca6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGluZG9uZXNpYW4lMjBib2F0JTIwbGFrZXxlbnwxfHx8fDE3NTkyOTMwMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Tomok - Samosir',
    capacity: 15,
    rating: 4.8,
    reviews: 89,
    price: 150000,
    type: 'Kapal Tradisional',
    duration: '45 menit',
    hasGps: true
  },
  {
    id: '2',
    name: 'Speed Boat Modern',
    image: 'https://images.unsplash.com/photo-1569832653475-fd1028ed7eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdG9iYSUyMHNhbW9zaXIlMjBpc2xhbmR8ZW58MXx8fHwxNzU5MjkzMDMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Parapat - Tuk Tuk',
    capacity: 8,
    rating: 4.9,
    reviews: 156,
    price: 200000,
    type: 'Speed Boat',
    duration: '30 menit',
    hasGps: true
  },
  {
    id: '3',
    name: 'Kapal Wisata Danau',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwYm9hdCUyMHRvdXJpc218ZW58MXx8fHwxNzU5MjkzMDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Balige - Simanindo',
    capacity: 25,
    rating: 4.7,
    reviews: 203,
    price: 120000,
    type: 'Kapal Wisata',
    duration: '1 jam',
    hasGps: true
  },
  {
    id: '4',
    name: 'Perahu Nelayan',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoaW5nJTIwYm9hdCUyMGxha2V8ZW58MXx8fHwxNzU5MjkzMDMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Ambarita - Onan Runggu',
    capacity: 6,
    rating: 4.5,
    reviews: 67,
    price: 80000,
    type: 'Perahu Nelayan',
    duration: '2 jam',
    hasGps: false
  }
];

const categories = {
  id: ['Semua', 'Kapal Tradisional', 'Speed Boat', 'Kapal Wisata', 'Perahu Nelayan'],
  en: ['All', 'Traditional Boat', 'Speed Boat', 'Tourist Boat', 'Fishing Boat']
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedBoat, setSelectedBoat] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [language, setLanguage] = useState<'id' | 'en'>('id');
  const [selectedCategory, setSelectedCategory] = useState(categories[language][0]);
  const [filteredBoats, setFilteredBoats] = useState(soraBoats);

  const handleSearch = (params: SearchParams) => {
    // Mock search functionality
    console.log('Searching with params:', params);
    // In a real app, this would filter boats based on search parameters
  };

  const handleBookNow = (boat: any) => {
    setSelectedBoat(boat);
    setIsBookingModalOpen(true);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    const allKey = categories[language][0];
    
    if (category === allKey) {
      setFilteredBoats(soraBoats);
    } else {
      // Map category translations to boat types
      const categoryMap = {
        'Kapal Tradisional': 'Kapal Tradisional',
        'Traditional Boat': 'Kapal Tradisional',
        'Speed Boat': 'Speed Boat',
        'Kapal Wisata': 'Kapal Wisata',
        'Tourist Boat': 'Kapal Wisata',
        'Perahu Nelayan': 'Perahu Nelayan',
        'Fishing Boat': 'Perahu Nelayan'
      };
      
      const boatType = categoryMap[category as keyof typeof categoryMap];
      setFilteredBoats(soraBoats.filter(boat => boat.type === boatType));
    }
  };

  const handleLanguageChange = (newLanguage: 'id' | 'en') => {
    setLanguage(newLanguage);
    setSelectedCategory(categories[newLanguage][0]);
    setFilteredBoats(soraBoats);
  };

  const text = {
    id: {
      popularCategories: 'Kategori Populer',
      featuredBoats: 'Kapal Unggulan',
      viewAll: 'Lihat Semua',
      needHelp: 'Butuh Bantuan Memilih?',
      helpDescription: 'Tim ahli kami dapat membantu Anda menemukan kapal yang sempurna untuk petualangan Anda.',
      contactSupport: 'Hubungi Dukungan',
      myBookings: 'Pemesanan Saya',
      paymentMethods: 'Metode Pembayaran',
      settings: 'Pengaturan',
      helpSupport: 'Bantuan & Dukungan',
      searchResults: 'Hasil Pencarian',
      searchHint: 'Gunakan pencarian di atas untuk menemukan kapal di area Anda',
      favorites: 'Favorit Anda',
      noFavorites: 'Belum ada favorit. Mulai jelajahi kapal!',
      profile: 'Profil'
    },
    en: {
      popularCategories: 'Popular Categories',
      featuredBoats: 'Featured Boats',
      viewAll: 'View All',
      needHelp: 'Need Help Choosing?',
      helpDescription: 'Our experts can help you find the perfect boat for your adventure.',
      contactSupport: 'Contact Support',
      myBookings: 'My Bookings',
      paymentMethods: 'Payment Methods',
      settings: 'Settings',
      helpSupport: 'Help & Support',
      searchResults: 'Search Results',
      searchHint: 'Use the search above to find boats in your area',
      favorites: 'Your Favorites',
      noFavorites: 'No favorites yet. Start exploring boats!',
      profile: 'Profile'
    }
  };

  const renderHome = () => (
    <div className="pb-20">
      <div className="relative">
        <SearchHeader onSearch={handleSearch} language={language} />
        <div className="absolute top-4 right-4 z-20">
          <LanguageSwitcher language={language} onLanguageChange={handleLanguageChange} />
        </div>
      </div>
      
      <div className="px-4 py-6">
        {/* Loyalty Card */}
        <div className="mb-6">
          <LoyaltyCard points={2500} level="Gold" language={language} />
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 style={{ color: '#0C2D6B' }}>{text[language].popularCategories}</h2>
          <button className="flex items-center gap-1" style={{ color: '#2980B9' }}>
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter</span>
          </button>
        </div>
        
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories[language].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'text-white'
                  : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: selectedCategory === category ? '#0C2D6B' : '#E3F2FD',
                color: selectedCategory === category ? 'white' : '#2980B9'
              }}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ color: '#0C2D6B' }}>{text[language].featuredBoats}</h2>
          <button style={{ color: '#2980B9' }} className="text-sm">{text[language].viewAll}</button>
        </div>
        
        <div className="grid gap-4">
          {filteredBoats.map((boat) => (
            <BoatCard
              key={boat.id}
              {...boat}
              language={language}
              onBookNow={handleBookNow}
            />
          ))}
        </div>
        
        <div className="mt-8 rounded-2xl p-6 text-center" style={{ backgroundColor: '#E3F2FD' }}>
          <MessageCircle className="w-12 h-12 mx-auto mb-3" style={{ color: '#2980B9' }} />
          <h3 className="mb-2" style={{ color: '#0C2D6B' }}>{text[language].needHelp}</h3>
          <p className="mb-4" style={{ color: '#7F8C8D' }}>{text[language].helpDescription}</p>
          <button 
            style={{ backgroundColor: '#0C2D6B' }}
            className="text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all"
          >
            {text[language].contactSupport}
          </button>
        </div>
        
        {/* Promo Banner */}
        <div 
          className="mt-6 rounded-2xl p-6 text-center text-white relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, #F39C12 0%, #E67E22 100%)'
          }}
        >
          <Award className="absolute top-2 right-2 w-8 h-8 opacity-30" />
          <h3 className="mb-2">Promo Akhir Tahun!</h3>
          <p className="text-sm opacity-90">Dapatkan diskon 20% untuk pemesanan pertama Anda</p>
        </div>
      </div>
    </div>
  );

  const renderSearch = () => (
    <div className="pb-20 pt-6 px-4">
      <h2 style={{ color: '#0C2D6B' }} className="mb-6">{text[language].searchResults}</h2>
      <div className="text-center py-12">
        <Navigation className="w-16 h-16 mx-auto mb-4" style={{ color: '#2980B9' }} />
        <p style={{ color: '#7F8C8D' }}>{text[language].searchHint}</p>
      </div>
    </div>
  );

  const renderFavorites = () => (
    <div className="pb-20 pt-6 px-4">
      <h2 style={{ color: '#0C2D6B' }} className="mb-6">{text[language].favorites}</h2>
      <div className="text-center py-12">
        <Star className="w-16 h-16 mx-auto mb-4" style={{ color: '#F39C12' }} />
        <p style={{ color: '#7F8C8D' }}>{text[language].noFavorites}</p>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="pb-20 pt-6 px-4">
      <div className="text-center mb-8">
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: '#E3F2FD' }}
        >
          <span style={{ color: '#2980B9' }} className="text-2xl">JS</span>
        </div>
        <h2 style={{ color: '#0C2D6B' }}>Joko Siahaan</h2>
        <p style={{ color: '#7F8C8D' }}>joko.siahaan@email.com</p>
      </div>
      
      <div className="space-y-3">
        <button 
          className="w-full bg-white rounded-xl p-4 text-left hover:opacity-90 transition-all"
          style={{ borderColor: '#2980B9', borderWidth: '1px' }}
        >
          <span style={{ color: '#0C2D6B' }}>{text[language].myBookings}</span>
        </button>
        <button 
          className="w-full bg-white rounded-xl p-4 text-left hover:opacity-90 transition-all"
          style={{ borderColor: '#2980B9', borderWidth: '1px' }}
        >
          <span style={{ color: '#0C2D6B' }}>{text[language].paymentMethods}</span>
        </button>
        <button 
          className="w-full bg-white rounded-xl p-4 text-left hover:opacity-90 transition-all"
          style={{ borderColor: '#2980B9', borderWidth: '1px' }}
        >
          <span style={{ color: '#0C2D6B' }}>{text[language].settings}</span>
        </button>
        <button 
          className="w-full bg-white rounded-xl p-4 text-left hover:opacity-90 transition-all"
          style={{ borderColor: '#2980B9', borderWidth: '1px' }}
        >
          <span style={{ color: '#0C2D6B' }}>{text[language].helpSupport}</span>
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'search':
        return renderSearch();
      case 'favorites':
        return renderFavorites();
      case 'profile':
        return renderProfile();
      default:
        return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderContent()}
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      <BookingModal
        boat={selectedBoat}
        isOpen={isBookingModalOpen}
        language={language}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedBoat(null);
        }}
      />
    </div>
  );
}