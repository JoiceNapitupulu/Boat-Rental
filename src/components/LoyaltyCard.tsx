import { Star, Gift } from 'lucide-react';

interface LoyaltyCardProps {
  points: number;
  level: string;
  language: 'id' | 'en';
}

export function LoyaltyCard({ points, level, language }: LoyaltyCardProps) {
  const text = {
    id: {
      loyaltyPoints: 'Poin Loyalitas',
      yourLevel: 'Level Anda',
      redeemRewards: 'Tukar Hadiah'
    },
    en: {
      loyaltyPoints: 'Loyalty Points',
      yourLevel: 'Your Level',
      redeemRewards: 'Redeem Rewards'
    }
  };

  return (
    <div 
      className="rounded-2xl p-4 text-white relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #0C2D6B 0%, #2980B9 100%)'
      }}
    >
      <div className="absolute top-2 right-2 opacity-20">
        <Star className="w-16 h-16" style={{ color: '#F39C12' }} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white">{text[language].loyaltyPoints}</h3>
          <div 
            className="px-2 py-1 rounded-full text-xs"
            style={{ backgroundColor: '#F39C12' }}
          >
            {level}
          </div>
        </div>
        
        <div className="mb-4">
          <span className="text-2xl text-white">{points.toLocaleString('id-ID')}</span>
          <span className="text-sm text-white/80 ml-1">pts</span>
        </div>
        
        <button 
          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-colors"
        >
          <Gift className="w-4 h-4" />
          <span className="text-sm">{text[language].redeemRewards}</span>
        </button>
      </div>
    </div>
  );
}