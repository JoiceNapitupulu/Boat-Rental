import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, Users, Star, Navigation, Clock } from 'lucide-react';

interface BoatCardProps {
  id: string;
  name: string;
  image: string;
  location: string;
  capacity: number | string;
  rating: number;
  reviews: number;
  price: number;
  type: string;
  duration: string;
  hasGps: boolean;
  language: 'id' | 'en';
  onBookNow: (boat: any) => void;
}

export function BoatCard({ 
  id, 
  name, 
  image, 
  location, 
  capacity, 
  rating, 
  reviews, 
  price, 
  type,
  duration,
  hasGps,
  language,
  onBookNow 
}: BoatCardProps) {
  const boat = { id, name, image, location, capacity, rating, reviews, price, type, duration, hasGps };

  const text = {
    id: {
      guests: 'penumpang',
      reviews: 'ulasan',
      bookNow: 'Pesan Sekarang',
      gpsTracking: 'GPS Tracking'
    },
    en: {
      guests: 'guests',
      reviews: 'reviews',
      bookNow: 'Book Now',
      gpsTracking: 'GPS Tracking'
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ borderColor: '#2980B9', borderWidth: '1px', width: '302px', height: '277px' }}>
      <div className="relative">
        <ImageWithFallback 
          src={image} 
          alt={name}
          className="w-full object-cover"
          style={{ height: '160px' }}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
          <Star style={{ color: '#F39C12' }} className="w-4 h-4 fill-current" />
          <span className="text-sm" style={{ color: '#0C2D6B' }}>{rating}</span>
        </div>
        {hasGps && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
            <Navigation style={{ color: '#2980B9' }} className="w-3 h-3" />
            <span className="text-xs" style={{ color: '#0C2D6B' }}>{text[language].gpsTracking}</span>
          </div>
        )}
      </div>
      
      <div className="p-3" style={{ height: '117px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 className="mb-1 text-sm" style={{ color: '#0C2D6B' }}>{name}</h3>
          
          <div className="flex items-center gap-1 mb-1" style={{ color: '#7F8C8D' }}>
            <MapPin className="w-3 h-3" style={{ color: '#2980B9' }} />
            <span className="text-xs">{location}</span>
          </div>

          <div className="flex items-center gap-3 mb-1" style={{ color: '#7F8C8D' }}>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" style={{ color: '#2980B9' }} />
              <span className="text-xs">{capacity} {text[language].guests}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" style={{ color: '#2980B9' }} />
              <span className="text-xs">{duration}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm" style={{ color: '#2980B9' }}>Rp {price.toLocaleString('id-ID')}</span>
            <span style={{ color: '#7F8C8D' }} className="text-xs">
              {type === 'Perahu Sampan' ? '/jam' : '/trip'}
            </span>
            <div className="text-xs" style={{ color: '#7F8C8D' }}>
              {reviews} {text[language].reviews}
            </div>
          </div>
          <button 
            onClick={() => onBookNow(boat)}
            style={{ backgroundColor: '#0C2D6B' }}
            className="text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all text-xs whitespace-nowrap"
          >
            {text[language].bookNow}
          </button>
        </div>
      </div>
    </div>
  );
}