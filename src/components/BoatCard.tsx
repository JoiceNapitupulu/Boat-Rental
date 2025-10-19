import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, Users, Star, Navigation, Clock } from 'lucide-react';

interface BoatCardProps {
  id: string;
  name: string;
  image: string;
  location: string;
  capacity: number;
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
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ borderColor: '#2980B9', borderWidth: '1px' }}>
      <div className="relative">
        <ImageWithFallback 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div 
          className="absolute top-3 left-3 text-white px-2 py-1 rounded-full text-sm"
          style={{ backgroundColor: '#0C2D6B' }}
        >
          {type}
        </div>
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
      
      <div className="p-4">
        <h3 className="mb-2" style={{ color: '#0C2D6B' }}>{name}</h3>
        
        <div className="flex items-center gap-4 mb-3" style={{ color: '#7F8C8D' }}>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" style={{ color: '#2980B9' }} />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" style={{ color: '#2980B9' }} />
            <span className="text-sm">{capacity} {text[language].guests}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-3" style={{ color: '#7F8C8D' }}>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" style={{ color: '#2980B9' }} />
            <span className="text-sm">{duration}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span style={{ color: '#2980B9' }}>Rp {price.toLocaleString('id-ID')}</span>
            <span style={{ color: '#7F8C8D' }} className="text-sm">
              {type === 'Perahu Sampan' ? '/jam' : '/trip'}
            </span>
          </div>
          <button 
            onClick={() => onBookNow(boat)}
            style={{ backgroundColor: '#0C2D6B' }}
            className="text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all"
          >
            {text[language].bookNow}
          </button>
        </div>
        
        <div className="text-xs mt-2" style={{ color: '#7F8C8D' }}>
          {reviews} {text[language].reviews}
        </div>
      </div>
    </div>
  );
}