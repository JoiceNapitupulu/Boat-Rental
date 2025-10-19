import { useState, useEffect } from 'react';
import { SearchHeader } from './components/SearchHeader';
import { BoatCard } from './components/BoatCard';
import { BookingModal } from './components/BookingModal';
import { BottomNav } from './components/BottomNav';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { LoyaltyCard } from './components/LoyaltyCard';
import { SplashScreen } from './components/SplashScreen';
import { Filter, Star, Navigation, MessageCircle, Award } from 'lucide-react';
import soraLogo from 'figma:asset/b4398db50b454ae1b722a3f11af68f59d92f1dad.png';

interface SearchParams {
  location: string;
  date: string;
  guests: string;
}

const soraBoats = [
  // Water Sports Activities in Samosir
  {
    id: '5',
    name: 'Jetski Adventure',
    image: 'https://images.unsplash.com/photo-1648484983838-b47185140bee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXRza2klMjB3YXRlciUyMHNwb3J0cyUyMGxha2V8ZW58MXx8fHwxNzU5OTI4NDY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Samosir',
    capacity: 2,
    rating: 4.9,
    reviews: 245,
    price: 1200000,
    type: 'Olahraga Air',
    duration: '1 jam',
    hasGps: true,
    category: 'watersports'
  },
  {
    id: '6',
    name: 'Jetski Premium Package',
    image: 'https://images.unsplash.com/photo-1648484983838-b47185140bee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXRza2klMjB3YXRlciUyMHNwb3J0cyUyMGxha2V8ZW58MXx8fHwxNzU5OTI4NDY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Samosir',
    capacity: 2,
    rating: 5.0,
    reviews: 189,
    price: 1500000,
    type: 'Olahraga Air',
    duration: '1 jam + foto/video',
    hasGps: true,
    category: 'watersports'
  },
  {
    id: '7',
    name: 'Banana Boat Fun',
    image: 'https://images.unsplash.com/photo-1680238577907-6e4549d95b44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjBib2F0JTIwd2F0ZXIlMjBzcG9ydHN8ZW58MXx8fHwxNzU5OTI4NDcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Samosir',
    capacity: 6,
    rating: 4.7,
    reviews: 312,
    price: 250000,
    type: 'Olahraga Air',
    duration: '30 menit',
    hasGps: false,
    category: 'watersports'
  },
  {
    id: '8',
    name: 'Banana Boat + Documentation',
    image: 'https://images.unsplash.com/photo-1680238577907-6e4549d95b44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjBib2F0JTIwd2F0ZXIlMjBzcG9ydHN8ZW58MXx8fHwxNzU5OTI4NDcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Samosir',
    capacity: 6,
    rating: 4.8,
    reviews: 287,
    price: 350000,
    type: 'Olahraga Air',
    duration: '30 menit + foto/video',
    hasGps: false,
    category: 'watersports'
  },
  {
    id: '9',
    name: 'Donut Boat Ride',
    image: 'https://images.unsplash.com/photo-1714822270785-e307c2e28709?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb251dCUyMGJvYXQlMjB3YXRlciUyMHNwb3J0cyUyMHR1YmV8ZW58MXx8fHwxNzU5OTI4NDc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Samosir',
    capacity: 4,
    rating: 4.6,
    reviews: 198,
    price: 150000,
    type: 'Olahraga Air',
    duration: '20 menit',
    hasGps: false,
    category: 'watersports'
  },
  {
    id: '10',
    name: 'Donut Boat + Documentation',
    image: 'https://images.unsplash.com/photo-1714822270785-e307c2e28709?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb251dCUyMGJvYXQlMjB3YXRlciUyMHNwb3J0cyUyMHR1YmV8ZW58MXx8fHwxNzU5OTI4NDc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Samosir',
    capacity: 4,
    rating: 4.7,
    reviews: 165,
    price: 250000,
    type: 'Olahraga Air',
    duration: '20 menit + foto/video',
    hasGps: false,
    category: 'watersports'
  },
  {
    id: '11',
    name: 'Speed Boat Thrill',
    image: 'https://images.unsplash.com/photo-1569832653475-fd1028ed7eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdG9iYSUyMHNhbW9zaXIlMjBpc2xhbmR8ZW58MXx8fHwxNzU5MjkzMDMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Samosir',
    capacity: 6,
    rating: 4.8,
    reviews: 278,
    price: 400000,
    type: 'Olahraga Air',
    duration: '30 menit',
    hasGps: true,
    category: 'watersports'
  },
  {
    id: '12',
    name: 'Speed Boat + Documentation',
    image: 'https://images.unsplash.com/photo-1569832653475-fd1028ed7eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdG9iYSUyMHNhbW9zaXIlMjBpc2xhbmR8ZW58MXx8fHwxNzU5MjkzMDMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Samosir',
    capacity: 6,
    rating: 4.9,
    reviews: 234,
    price: 500000,
    type: 'Olahraga Air',
    duration: '30 menit + foto/video',
    hasGps: true,
    category: 'watersports'
  },
  {
    id: '13',
    name: 'Perahu Sampan Tradisional',
    image: 'https://images.unsplash.com/photo-1743504440802-5fdea460cd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHNhbXBhbiUyMGJvYXQlMjBpbmRvbmVzaWF8ZW58MXx8fHwxNzU5OTI4NDc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Samosir',
    capacity: 4,
    rating: 4.4,
    reviews: 156,
    price: 30000,
    type: 'Perahu Sampan',
    duration: '1 jam',
    hasGps: false,
    category: 'traditional'
  }
];

const categories = {
  id: ['Semua', 'Jetski', 'Banana Boat', 'Donut Boat', 'Speed Boat', 'Perahu Sampan'],
  en: ['All', 'Jetski', 'Banana Boat', 'Donut Boat', 'Speed Boat', 'Sampan Boat']
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedBoat, setSelectedBoat] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [language, setLanguage] = useState<'id' | 'en'>('id');
  const [selectedCategory, setSelectedCategory] = useState(categories[language][0]);
  const [filteredBoats, setFilteredBoats] = useState(soraBoats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

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
      // Filter by activity name
      if (category === 'Jetski') {
        setFilteredBoats(soraBoats.filter(boat => boat.name.includes('Jetski')));
      } else if (category === 'Banana Boat') {
        setFilteredBoats(soraBoats.filter(boat => boat.name.includes('Banana Boat')));
      } else if (category === 'Donut Boat') {
        setFilteredBoats(soraBoats.filter(boat => boat.name.includes('Donut Boat')));
      } else if (category === 'Speed Boat' || category === 'Speed Boat') {
        setFilteredBoats(soraBoats.filter(boat => boat.name.includes('Speed Boat')));
      } else if (category === 'Perahu Sampan' || category === 'Sampan Boat') {
        setFilteredBoats(soraBoats.filter(boat => boat.type === 'Perahu Sampan'));
      } else {
        setFilteredBoats(soraBoats);
      }
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
      featuredBoats: 'Aktivitas Olahraga Air',
      viewAll: 'Lihat Semua',
      needHelp: 'Butuh Bantuan Memilih?',
      helpDescription: 'Tim ahli kami dapat membantu Anda menemukan aktivitas yang sempurna untuk petualangan Anda.',
      contactSupport: 'Hubungi Dukungan',
      myBookings: 'Pemesanan Saya',
      paymentMethods: 'Metode Pembayaran',
      settings: 'Pengaturan',
      helpSupport: 'Bantuan & Dukungan',
      searchResults: 'Hasil Pencarian',
      searchHint: 'Gunakan pencarian di atas untuk menemukan aktivitas di area Anda',
      favorites: 'Favorit Anda',
      noFavorites: 'Belum ada favorit. Mulai jelajahi aktivitas!',
      profile: 'Profil',
      waterSports: 'Olahraga Air di Samosir',
      newWaterSports: 'Aktivitas Baru!'
    },
    en: {
      popularCategories: 'Popular Categories',
      featuredBoats: 'Water Sports Activities',
      viewAll: 'View All',
      needHelp: 'Need Help Choosing?',
      helpDescription: 'Our experts can help you find the perfect activity for your adventure.',
      contactSupport: 'Contact Support',
      myBookings: 'My Bookings',
      paymentMethods: 'Payment Methods',
      settings: 'Settings',
      helpSupport: 'Help & Support',
      searchResults: 'Search Results',
      searchHint: 'Use the search above to find activities in your area',
      favorites: 'Your Favorites',
      noFavorites: 'No favorites yet. Start exploring activities!',
      profile: 'Profile',
      waterSports: 'Water Sports in Samosir',
      newWaterSports: 'New Activities!'
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
        
        {/* Water Sports Promo Banner */}
        <div 
          className="mt-6 rounded-2xl p-6 text-center text-white relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, #2980B9 0%, #0C2D6B 100%)'
          }}
        >
          <Award className="absolute top-2 right-2 w-8 h-8 opacity-30" />
          <h3 className="mb-2">
            {language === 'id' ? '🌊 Olahraga Air Baru di Samosir!' : '🌊 New Water Sports in Samosir!'}
          </h3>
          <p className="text-sm opacity-90">
            {language === 'id' 
              ? 'Nikmati Jetski, Banana Boat, Donut Boat & lebih banyak lagi!'
              : 'Enjoy Jetski, Banana Boat, Donut Boat & more!'
            }
          </p>
          <button 
            onClick={() => handleCategoryFilter(language === 'id' ? 'Olahraga Air' : 'Water Sports')}
            className="mt-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-all"
          >
            {language === 'id' ? 'Lihat Aktivitas' : 'View Activities'}
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
          <h3 className="mb-2">
            {language === 'id' ? 'Promo Akhir Tahun!' : 'Year-End Promo!'}
          </h3>
          <p className="text-sm opacity-90">
            {language === 'id' 
              ? 'Dapatkan diskon 20% untuk pemesanan pertama Anda'
              : 'Get 20% discount for your first booking'
            }
          </p>
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

  if (isLoading) {
    return <SplashScreen language={language} />;
  }

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