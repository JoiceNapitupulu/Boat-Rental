import { useState, useEffect } from 'react';
import { X, Clock, Sparkles, Users, Gift, Star, TrendingUp, Percent } from 'lucide-react';
import { BookingModal } from './BookingModal';

interface PromoPageProps {
  language: 'id' | 'en';
  onClose: () => void;
  boats: any[];
}

interface PromoPackage {
  id: string;
  title: { id: string; en: string };
  description: { id: string; en: string };
  discount: number;
  originalPrice: number;
  promoPrice: number;
  activities: string[];
  badge?: { id: string; en: string };
  popular?: boolean;
}

export function PromoPage({ language, onClose, boats }: PromoPageProps) {
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown to New Year 2026
  useEffect(() => {
    const calculateTimeLeft = () => {
      const newYear = new Date('2026-01-01T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = newYear - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const promoPackages: PromoPackage[] = [
    {
      id: 'bundle-family',
      title: { 
        id: 'Paket Keluarga Seru', 
        en: 'Family Fun Package' 
      },
      description: { 
        id: 'Banana Boat + Donut Boat + Speed Boat - Sempurna untuk keluarga!', 
        en: 'Banana Boat + Donut Boat + Speed Boat - Perfect for families!' 
      },
      discount: 30,
      originalPrice: 800000,
      promoPrice: 560000,
      activities: ['Banana Boat Fun', 'Donut Boat Ride', 'Speed Boat Thrill'],
      badge: { id: 'PALING POPULER', en: 'MOST POPULAR' },
      popular: true
    },
    {
      id: 'bundle-adventure',
      title: { 
        id: 'Paket Petualangan Ekstrim', 
        en: 'Extreme Adventure Package' 
      },
      description: { 
        id: 'Jetski + Speed Boat - Untuk pecinta adrenalin!', 
        en: 'Jetski + Speed Boat - For adrenaline junkies!' 
      },
      discount: 25,
      originalPrice: 1600000,
      promoPrice: 1200000,
      activities: ['Jetski Adventure', 'Speed Boat Thrill'],
      badge: { id: 'TERBAIK', en: 'BEST VALUE' }
    },
    {
      id: 'bundle-cultural',
      title: { 
        id: 'Paket Budaya & Relaksasi', 
        en: 'Cultural & Relaxation Package' 
      },
      description: { 
        id: 'Perahu Sampan Tradisional + Donut Boat - Santai dan seru!', 
        en: 'Traditional Sampan + Donut Boat - Relax and fun!' 
      },
      discount: 35,
      originalPrice: 180000,
      promoPrice: 117000,
      activities: ['Perahu Sampan Tradisional', 'Donut Boat Ride']
    },
    {
      id: 'jetski-promo',
      title: { 
        id: 'Jetski Adventure', 
        en: 'Jetski Adventure' 
      },
      description: { 
        id: 'Diskon spesial untuk aktivitas jetski', 
        en: 'Special discount for jetski activity' 
      },
      discount: 20,
      originalPrice: 1200000,
      promoPrice: 960000,
      activities: ['Jetski Adventure']
    },
    {
      id: 'banana-promo',
      title: { 
        id: 'Banana Boat Fun', 
        en: 'Banana Boat Fun' 
      },
      description: { 
        id: 'Serunya naik banana boat dengan harga hemat', 
        en: 'Banana boat fun at a great price' 
      },
      discount: 20,
      originalPrice: 250000,
      promoPrice: 200000,
      activities: ['Banana Boat Fun']
    },
    {
      id: 'speed-promo',
      title: { 
        id: 'Speed Boat Thrill', 
        en: 'Speed Boat Thrill' 
      },
      description: { 
        id: 'Sensasi kecepatan dengan harga spesial', 
        en: 'Speed thrill at special price' 
      },
      discount: 20,
      originalPrice: 400000,
      promoPrice: 320000,
      activities: ['Speed Boat Thrill']
    }
  ];

  const text = {
    id: {
      title: 'Promo Akhir Tahun 2025',
      subtitle: 'Nikmati diskon hingga 35% untuk semua aktivitas!',
      endsIn: 'Promo Berakhir Dalam',
      days: 'Hari',
      hours: 'Jam',
      minutes: 'Menit',
      seconds: 'Detik',
      whyChoose: 'Kenapa Pilih Promo Ini?',
      reason1: 'Diskon Terbesar Tahun Ini',
      reason1Desc: 'Hemat hingga 35% untuk paket bundle',
      reason2: 'Semua Lokasi Tersedia',
      reason2Desc: '8 pantai eksotis di Samosir',
      reason3: 'Bonus Poin Loyalitas',
      reason3Desc: 'Dapatkan 2x poin untuk setiap pemesanan',
      reason4: 'Gratis Reschedule',
      reason4Desc: 'Ubah jadwal kapan saja tanpa biaya',
      bookNow: 'Pesan Sekarang',
      save: 'Hemat',
      from: 'dari',
      packages: 'Paket Promo Spesial',
      terms: 'Syarat & Ketentuan',
      termsContent: '• Promo berlaku hingga 31 Desember 2025\n• Tidak dapat digabung dengan promo lain\n• Pembayaran penuh diperlukan saat booking\n• Gratis reschedule 1x',
      close: 'Tutup'
    },
    en: {
      title: 'Year-End Promo 2025',
      subtitle: 'Enjoy up to 35% discount for all activities!',
      endsIn: 'Promo Ends In',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      whyChoose: 'Why Choose This Promo?',
      reason1: 'Biggest Discount This Year',
      reason1Desc: 'Save up to 35% for bundle packages',
      reason2: 'All Locations Available',
      reason2Desc: '8 exotic beaches in Samosir',
      reason3: 'Bonus Loyalty Points',
      reason3Desc: 'Get 2x points for every booking',
      reason4: 'Free Reschedule',
      reason4Desc: 'Change schedule anytime at no cost',
      bookNow: 'Book Now',
      save: 'Save',
      from: 'from',
      packages: 'Special Promo Packages',
      terms: 'Terms & Conditions',
      termsContent: '• Promo valid until December 31, 2025\n• Cannot be combined with other promos\n• Full payment required at booking\n• Free reschedule 1x',
      close: 'Close'
    }
  };

  const handleBookPackage = (pkg: PromoPackage) => {
    // Find the first boat matching the first activity in the package
    const activity = pkg.activities[0];
    const boat = boats.find(b => b.name === activity);
    
    if (boat) {
      // Create a modified boat object with promo price
      const promoBoat = {
        ...boat,
        originalPrice: pkg.originalPrice,
        price: pkg.promoPrice,
        isPromo: true,
        promoDiscount: pkg.discount,
        packageTitle: pkg.title[language]
      };
      
      setSelectedPackage(promoBoat);
      setIsBookingModalOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div 
        className="sticky top-0 z-10 px-4 py-4 flex items-center justify-between"
        style={{ backgroundColor: '#0C2D6B' }}
      >
        <h1 className="text-white">{text[language].title}</h1>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Hero Banner with Countdown */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #F39C12 0%, #E67E22 100%)'
        }}
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1482441696648-2ad41e95e8fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxlYnJhdGlvbiUyMGZpcmV3b3Jrc3xlbnwxfHx8fDE3Mjk5NDE0OTd8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative px-4 py-8 text-center text-white">
          <Sparkles className="w-12 h-12 mx-auto mb-4 animate-pulse" />
          <h2 className="mb-2">{text[language].subtitle}</h2>
          
          {/* Countdown Timer */}
          <div className="mt-6 mb-2">
            <p className="text-sm opacity-90 mb-3">{text[language].endsIn}</p>
            <div className="flex justify-center gap-2">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div 
                  key={unit}
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-3 min-w-[70px]"
                >
                  <div className="text-2xl">{String(value).padStart(2, '0')}</div>
                  <div className="text-xs opacity-90 mt-1">
                    {text[language][unit as keyof typeof text.id]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="px-4 py-6" style={{ backgroundColor: '#E3F2FD' }}>
        <h3 className="text-center mb-6" style={{ color: '#0C2D6B' }}>
          {text[language].whyChoose}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 text-center">
            <Percent className="w-8 h-8 mx-auto mb-2" style={{ color: '#F39C12' }} />
            <p className="mb-1" style={{ color: '#0C2D6B' }}>{text[language].reason1}</p>
            <p className="text-xs" style={{ color: '#7F8C8D' }}>{text[language].reason1Desc}</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2" style={{ color: '#2980B9' }} />
            <p className="mb-1" style={{ color: '#0C2D6B' }}>{text[language].reason2}</p>
            <p className="text-xs" style={{ color: '#7F8C8D' }}>{text[language].reason2Desc}</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <Gift className="w-8 h-8 mx-auto mb-2" style={{ color: '#F39C12' }} />
            <p className="mb-1" style={{ color: '#0C2D6B' }}>{text[language].reason3}</p>
            <p className="text-xs" style={{ color: '#7F8C8D' }}>{text[language].reason3Desc}</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2" style={{ color: '#2980B9' }} />
            <p className="mb-1" style={{ color: '#0C2D6B' }}>{text[language].reason4}</p>
            <p className="text-xs" style={{ color: '#7F8C8D' }}>{text[language].reason4Desc}</p>
          </div>
        </div>
      </div>

      {/* Promo Packages */}
      <div className="px-4 py-6">
        <h3 className="mb-4" style={{ color: '#0C2D6B' }}>
          {text[language].packages}
        </h3>
        
        <div className="space-y-4">
          {promoPackages.map((pkg) => (
            <div 
              key={pkg.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg relative"
              style={{ borderColor: pkg.popular ? '#F39C12' : '#E3F2FD', borderWidth: pkg.popular ? '2px' : '1px' }}
            >
              {/* Badge */}
              {pkg.badge && (
                <div 
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs z-10"
                  style={{ backgroundColor: '#F39C12' }}
                >
                  {pkg.badge[language]}
                </div>
              )}
              
              <div className="p-5">
                <h4 className="mb-2" style={{ color: '#0C2D6B' }}>
                  {pkg.title[language]}
                </h4>
                <p className="text-sm mb-3" style={{ color: '#7F8C8D' }}>
                  {pkg.description[language]}
                </p>
                
                {/* Activities List */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {pkg.activities.map((activity, idx) => (
                    <div 
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs"
                      style={{ backgroundColor: '#E3F2FD', color: '#2980B9' }}
                    >
                      {activity}
                    </div>
                  ))}
                </div>
                
                {/* Price Section */}
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span 
                        className="line-through text-sm"
                        style={{ color: '#7F8C8D' }}
                      >
                        Rp {pkg.originalPrice.toLocaleString('id-ID')}
                      </span>
                      <span 
                        className="px-2 py-0.5 rounded text-xs text-white"
                        style={{ backgroundColor: '#E74C3C' }}
                      >
                        -{pkg.discount}%
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span style={{ color: '#0C2D6B' }}>
                        Rp {pkg.promoPrice.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <p className="text-xs mt-1" style={{ color: '#27AE60' }}>
                      {text[language].save} Rp {(pkg.originalPrice - pkg.promoPrice).toLocaleString('id-ID')}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleBookPackage(pkg)}
                    className="px-6 py-3 rounded-xl text-white hover:opacity-90 transition-all"
                    style={{ backgroundColor: '#0C2D6B' }}
                  >
                    {text[language].bookNow}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="px-4 pb-8">
        <div 
          className="rounded-xl p-4"
          style={{ backgroundColor: '#E3F2FD' }}
        >
          <h4 className="mb-2" style={{ color: '#0C2D6B' }}>
            {text[language].terms}
          </h4>
          <p className="text-sm whitespace-pre-line" style={{ color: '#7F8C8D' }}>
            {text[language].termsContent}
          </p>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        boat={selectedPackage}
        isOpen={isBookingModalOpen}
        language={language}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedPackage(null);
        }}
      />
    </div>
  );
}
