import { useState } from 'react';
import { Star, Gift, TrendingUp, Award, Ticket, Coffee, Shirt, Zap, Users, MessageSquare, ChevronRight, ArrowLeft, X, Check, Info } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ReferralModal } from './ReferralModal';

interface LoyaltyPageProps {
  language: 'id' | 'en';
  onClose: () => void;
}

interface PointHistoryItem {
  id: string;
  type: 'earned' | 'redeemed';
  amount: number;
  description: string;
  date: string;
  details?: string;
}

interface RewardItem {
  id: string;
  name: { id: string; en: string };
  points: number;
  description: { id: string; en: string };
  icon: any;
  category: string;
  terms?: { id: string; en: string };
}

export function LoyaltyPage({ language, onClose }: LoyaltyPageProps) {
  const [currentPoints, setCurrentPoints] = useState(2500);
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);
  const [selectedHistory, setSelectedHistory] = useState<PointHistoryItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  
  // Generate unique referral code (in real app, this would come from backend)
  const referralCode = 'SORA-JS2025';
  
  const currentLevel = 'Gold';
  const nextLevel = 'Platinum';
  const pointsToNextLevel = 1500;
  const totalPointsForNextLevel = 4000;
  const progress = (currentPoints / totalPointsForNextLevel) * 100;

  const text = {
    id: {
      loyaltyProgram: 'Program Loyalitas',
      yourPoints: 'Poin Anda',
      currentLevel: 'Level Saat Ini',
      nextLevel: 'Level Berikutnya',
      pointsNeeded: 'poin lagi ke',
      howToEarn: 'Cara Mendapatkan Poin',
      pointsHistory: 'Riwayat Poin',
      redeemRewards: 'Tukar Hadiah',
      viewAll: 'Lihat Semua',
      earnWays: [
        { title: 'Booking Aktivitas', desc: 'Dapatkan 100 poin per booking', icon: Ticket },
        { title: 'Tulis Review', desc: 'Dapatkan 50 poin per review', icon: MessageSquare },
        { title: 'Ajak Teman', desc: 'Dapatkan 200 poin per referral', icon: Users },
      ],
      rewards: 'Hadiah',
      discounts: 'Diskon',
      merchandise: 'Merchandise',
      all: 'Semua',
      redeem: 'Tukar',
      pts: 'pts',
      earned: 'Didapat',
      redeemed: 'Ditukar',
      levels: {
        Bronze: 'Perunggu',
        Silver: 'Perak',
        Gold: 'Emas',
        Platinum: 'Platinum'
      },
      confirmRedeem: 'Konfirmasi Penukaran',
      confirmRedeemMessage: 'Anda yakin ingin menukar',
      cancel: 'Batal',
      confirm: 'Konfirmasi',
      redeemSuccess: 'Berhasil menukar hadiah!',
      insufficientPoints: 'Poin tidak cukup',
      pointsRemaining: 'Sisa poin Anda',
      transactionDetails: 'Detail Transaksi',
      close: 'Tutup',
      termsConditions: 'Syarat & Ketentuan',
      tapForDetails: 'Ketuk untuk detail'
    },
    en: {
      loyaltyProgram: 'Loyalty Program',
      yourPoints: 'Your Points',
      currentLevel: 'Current Level',
      nextLevel: 'Next Level',
      pointsNeeded: 'points to',
      howToEarn: 'How to Earn Points',
      pointsHistory: 'Points History',
      redeemRewards: 'Redeem Rewards',
      viewAll: 'View All',
      earnWays: [
        { title: 'Book Activity', desc: 'Earn 100 points per booking', icon: Ticket },
        { title: 'Write Review', desc: 'Earn 50 points per review', icon: MessageSquare },
        { title: 'Refer Friend', desc: 'Earn 200 points per referral', icon: Users },
      ],
      rewards: 'Rewards',
      discounts: 'Discounts',
      merchandise: 'Merchandise',
      all: 'All',
      redeem: 'Redeem',
      pts: 'pts',
      earned: 'Earned',
      redeemed: 'Redeemed',
      levels: {
        Bronze: 'Bronze',
        Silver: 'Silver',
        Gold: 'Gold',
        Platinum: 'Platinum'
      },
      confirmRedeem: 'Confirm Redemption',
      confirmRedeemMessage: 'Are you sure you want to redeem',
      cancel: 'Cancel',
      confirm: 'Confirm',
      redeemSuccess: 'Successfully redeemed reward!',
      insufficientPoints: 'Insufficient points',
      pointsRemaining: 'Your remaining points',
      transactionDetails: 'Transaction Details',
      close: 'Close',
      termsConditions: 'Terms & Conditions',
      tapForDetails: 'Tap for details'
    }
  };

  const pointsHistory: PointHistoryItem[] = [
    {
      id: '1',
      type: 'earned',
      amount: 100,
      description: language === 'id' ? 'Booking Jetski Adventure' : 'Jetski Adventure Booking',
      date: '25 Oct 2025',
      details: language === 'id' ? 'Booking ID: #JS2025001 • 2 orang • 1 jam' : 'Booking ID: #JS2025001 • 2 people • 1 hour'
    },
    {
      id: '2',
      type: 'redeemed',
      amount: -500,
      description: language === 'id' ? 'Diskon 10% untuk Speed Boat' : '10% Discount for Speed Boat',
      date: '20 Oct 2025',
      details: language === 'id' ? 'Kode Voucher: SORA10 • Berlaku hingga 31 Des 2025' : 'Voucher Code: SORA10 • Valid until Dec 31, 2025'
    },
    {
      id: '3',
      type: 'earned',
      amount: 50,
      description: language === 'id' ? 'Review Banana Boat Fun' : 'Banana Boat Fun Review',
      date: '18 Oct 2025',
      details: language === 'id' ? 'Rating: 5 bintang • Review terverifikasi' : 'Rating: 5 stars • Verified review'
    },
    {
      id: '4',
      type: 'earned',
      amount: 200,
      description: language === 'id' ? 'Referral - Ahmad Wijaya' : 'Referral - Ahmad Wijaya',
      date: '15 Oct 2025',
      details: language === 'id' ? 'Teman berhasil booking pertama kali' : 'Friend completed first booking'
    },
    {
      id: '5',
      type: 'earned',
      amount: 100,
      description: language === 'id' ? 'Booking Donut Boat Ride' : 'Donut Boat Ride Booking',
      date: '12 Oct 2025',
      details: language === 'id' ? 'Booking ID: #DB2025001 • 4 orang • 20 menit' : 'Booking ID: #DB2025001 • 4 people • 20 minutes'
    },
  ];

  const rewards: RewardItem[] = [
    {
      id: 'r1',
      name: { id: 'Diskon 10%', en: '10% Discount' },
      points: 500,
      description: { id: 'Untuk semua aktivitas', en: 'For all activities' },
      icon: Ticket,
      category: 'discount',
      terms: { id: 'Berlaku untuk 1x pemesanan. Tidak dapat digabung dengan promo lain.', en: 'Valid for 1 booking. Cannot be combined with other promos.' }
    },
    {
      id: 'r2',
      name: { id: 'Diskon 20%', en: '20% Discount' },
      points: 1000,
      description: { id: 'Untuk semua aktivitas', en: 'For all activities' },
      icon: Ticket,
      category: 'discount',
      terms: { id: 'Berlaku untuk 1x pemesanan. Maksimal diskon Rp 100.000.', en: 'Valid for 1 booking. Max discount Rp 100,000.' }
    },
    {
      id: 'r3',
      name: { id: 'Free Upgrade', en: 'Free Upgrade' },
      points: 1500,
      description: { id: 'Upgrade ke paket premium', en: 'Upgrade to premium package' },
      icon: TrendingUp,
      category: 'discount',
      terms: { id: 'Upgrade gratis ke paket dengan dokumentasi foto/video.', en: 'Free upgrade to package with photo/video documentation.' }
    },
    {
      id: 'r4',
      name: { id: 'Kaos Sora', en: 'Sora T-Shirt' },
      points: 2000,
      description: { id: 'Merchandise eksklusif', en: 'Exclusive merchandise' },
      icon: Shirt,
      category: 'merchandise',
      terms: { id: 'Tersedia ukuran S, M, L, XL. Ambil di kantor Sora Samosir.', en: 'Available in S, M, L, XL. Pick up at Sora Samosir office.' }
    },
    {
      id: 'r5',
      name: { id: 'Tumbler Sora', en: 'Sora Tumbler' },
      points: 1500,
      description: { id: 'Merchandise eksklusif', en: 'Exclusive merchandise' },
      icon: Coffee,
      category: 'merchandise',
      terms: { id: 'Kapasitas 500ml. Ambil di kantor Sora Samosir.', en: '500ml capacity. Pick up at Sora Samosir office.' }
    },
    {
      id: 'r6',
      name: { id: 'Gratis 1 Aktivitas', en: 'Free 1 Activity' },
      points: 3000,
      description: { id: 'Pilih aktivitas favorit', en: 'Choose your favorite activity' },
      icon: Gift,
      category: 'discount',
      terms: { id: 'Pilih 1 aktivitas gratis (maks. Rp 500.000). Berlaku 30 hari.', en: 'Choose 1 free activity (max. Rp 500,000). Valid for 30 days.' }
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Bronze':
      case 'Perunggu':
        return '#CD7F32';
      case 'Silver':
      case 'Perak':
        return '#C0C0C0';
      case 'Gold':
      case 'Emas':
        return '#F39C12';
      case 'Platinum':
        return '#E5E4E2';
      default:
        return '#F39C12';
    }
  };

  const handleRedeemClick = (reward: RewardItem) => {
    if (currentPoints >= reward.points) {
      setSelectedReward(reward);
      setShowRedeemModal(true);
    } else {
      toast.error(text[language].insufficientPoints);
    }
  };

  const confirmRedeem = () => {
    if (selectedReward) {
      setCurrentPoints(prev => prev - selectedReward.points);
      toast.success(text[language].redeemSuccess);
      setShowRedeemModal(false);
      setSelectedReward(null);
    }
  };

  const handleEarnWayClick = (index: number) => {
    if (index === 2) {
      // Show referral modal for "Ajak Teman"
      setShowReferralModal(true);
    } else {
      const messages = {
        id: [
          'Booking aktivitas untuk mendapatkan 100 poin!',
          'Tulis review setelah aktivitas untuk mendapatkan 50 poin!'
        ],
        en: [
          'Book an activity to earn 100 points!',
          'Write a review after your activity to earn 50 points!'
        ]
      };
      toast.info(messages[language][index]);
    }
  };

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(r => r.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div 
        className="relative px-4 pt-6 pb-8 text-white"
        style={{ 
          background: 'linear-gradient(135deg, #0C2D6B 0%, #2980B9 100%)'
        }}
      >
        <button 
          onClick={onClose}
          className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">{language === 'id' ? 'Kembali' : 'Back'}</span>
        </button>

        <div className="absolute top-6 right-6 opacity-20">
          <Star className="w-32 h-32" style={{ color: '#F39C12' }} />
        </div>

        <div className="relative z-10">
          <h1 className="mb-6">{text[language].loyaltyProgram}</h1>
          
          {/* Points Display */}
          <div className="mb-6">
            <p className="text-white/80 text-sm mb-1">{text[language].yourPoints}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl">{currentPoints.toLocaleString('id-ID')}</span>
              <span className="text-white/80">{text[language].pts}</span>
            </div>
          </div>

          {/* Level Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="px-4 py-2 rounded-full flex items-center gap-2"
              style={{ backgroundColor: getLevelColor(currentLevel) }}
            >
              <Award className="w-4 h-4 text-white" />
              <span className="text-white">{text[language].levels[currentLevel as keyof typeof text.id.levels] || currentLevel}</span>
            </div>
          </div>

          {/* Progress to Next Level */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-white/80">{text[language].nextLevel}</span>
              <span className="text-white">{text[language].levels[nextLevel as keyof typeof text.id.levels] || nextLevel}</span>
            </div>
            
            <div className="w-full bg-white/20 rounded-full h-2 mb-2">
              <div 
                className="h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${progress}%`,
                  backgroundColor: '#F39C12'
                }}
              />
            </div>
            
            <p className="text-xs text-white/60">
              {pointsToNextLevel.toLocaleString('id-ID')} {text[language].pointsNeeded} {text[language].levels[nextLevel as keyof typeof text.id.levels] || nextLevel}
            </p>
          </div>
        </div>
      </div>

      {/* How to Earn Points */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ color: '#0C2D6B' }}>{text[language].howToEarn}</h2>
          <Zap className="w-5 h-5" style={{ color: '#F39C12' }} />
        </div>
        
        <div className="grid gap-3 mb-6">
          {text[language].earnWays.map((way, index) => {
            const Icon = way.icon;
            return (
              <button 
                key={index}
                onClick={() => handleEarnWayClick(index)}
                className="bg-white rounded-xl p-4 flex items-center gap-4 hover:bg-gray-50 active:scale-[0.98] transition-all"
                style={{ borderColor: '#E3F2FD', borderWidth: '1px' }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#E3F2FD' }}
                >
                  <Icon className="w-6 h-6" style={{ color: '#2980B9' }} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-sm mb-1" style={{ color: '#0C2D6B' }}>{way.title}</h3>
                  <p className="text-xs" style={{ color: '#7F8C8D' }}>{way.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5" style={{ color: '#7F8C8D' }} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Points History */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ color: '#0C2D6B' }}>{text[language].pointsHistory}</h2>
          <button className="text-sm" style={{ color: '#2980B9' }}>{text[language].viewAll}</button>
        </div>
        
        <div className="bg-white rounded-xl overflow-hidden" style={{ borderColor: '#E3F2FD', borderWidth: '1px' }}>
          {pointsHistory.map((item, index) => (
            <button 
              key={item.id}
              onClick={() => setSelectedHistory(item)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 active:scale-[0.99] transition-all"
              style={{ 
                borderBottomColor: index < pointsHistory.length - 1 ? '#E3F2FD' : 'transparent',
                borderBottomWidth: index < pointsHistory.length - 1 ? '1px' : '0'
              }}
            >
              <div className="flex-1 text-left">
                <p className="text-sm mb-1" style={{ color: '#0C2D6B' }}>{item.description}</p>
                <p className="text-xs" style={{ color: '#7F8C8D' }}>{item.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span 
                    className="text-sm"
                    style={{ color: item.type === 'earned' ? '#27AE60' : '#E74C3C' }}
                  >
                    {item.amount > 0 ? '+' : ''}{item.amount}
                  </span>
                  <span className="text-xs" style={{ color: '#7F8C8D' }}>
                    {item.type === 'earned' ? text[language].earned : text[language].redeemed}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4" style={{ color: '#7F8C8D' }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Rewards Catalog */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ color: '#0C2D6B' }}>{text[language].redeemRewards}</h2>
          <Gift className="w-5 h-5" style={{ color: '#F39C12' }} />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {['all', 'discount', 'merchandise'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="px-4 py-2 rounded-full whitespace-nowrap transition-all active:scale-95"
              style={{
                backgroundColor: selectedCategory === category ? '#0C2D6B' : '#E3F2FD',
                color: selectedCategory === category ? 'white' : '#2980B9'
              }}
            >
              {category === 'all' ? text[language].all : 
               category === 'discount' ? text[language].discounts : 
               text[language].merchandise}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {filteredRewards.map((reward) => {
            const Icon = reward.icon;
            const canRedeem = currentPoints >= reward.points;
            
            return (
              <div 
                key={reward.id}
                className="bg-white rounded-xl p-4"
                style={{ 
                  borderColor: canRedeem ? '#2980B9' : '#E3F2FD',
                  borderWidth: '1px',
                  opacity: canRedeem ? 1 : 0.6
                }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: '#E3F2FD' }}
                >
                  <Icon className="w-6 h-6" style={{ color: '#2980B9' }} />
                </div>
                
                <h3 className="text-sm mb-1" style={{ color: '#0C2D6B' }}>
                  {reward.name[language]}
                </h3>
                <p className="text-xs mb-3" style={{ color: '#7F8C8D' }}>
                  {reward.description[language]}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" style={{ color: '#F39C12' }} />
                    <span className="text-xs" style={{ color: '#0C2D6B' }}>
                      {reward.points}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleRedeemClick(reward)}
                    disabled={!canRedeem}
                    className="px-3 py-1 rounded-lg text-xs transition-all active:scale-95"
                    style={{
                      backgroundColor: canRedeem ? '#2980B9' : '#E3F2FD',
                      color: canRedeem ? 'white' : '#7F8C8D',
                      cursor: canRedeem ? 'pointer' : 'not-allowed'
                    }}
                  >
                    {text[language].redeem}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Level Benefits Info */}
      <div className="px-4 mt-6">
        <div 
          className="rounded-2xl p-6 text-white"
          style={{ 
            background: 'linear-gradient(135deg, #F39C12 0%, #E67E22 100%)'
          }}
        >
          <Award className="w-8 h-8 mb-3" />
          <h3 className="mb-2">{language === 'id' ? 'Keuntungan Level Gold' : 'Gold Level Benefits'}</h3>
          <ul className="text-sm space-y-1 opacity-90">
            <li>• {language === 'id' ? 'Diskon 15% setiap booking' : '15% discount on every booking'}</li>
            <li>• {language === 'id' ? 'Prioritas booking' : 'Priority booking'}</li>
            <li>• {language === 'id' ? 'Gratis dokumentasi foto' : 'Free photo documentation'}</li>
            <li>• {language === 'id' ? 'Customer support prioritas' : 'Priority customer support'}</li>
          </ul>
        </div>
      </div>

      {/* Redeem Confirmation Modal */}
      {showRedeemModal && selectedReward && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowRedeemModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: '#0C2D6B' }}>{text[language].confirmRedeem}</h3>
              <button 
                onClick={() => setShowRedeemModal(false)}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="w-5 h-5" style={{ color: '#7F8C8D' }} />
              </button>
            </div>

            <div className="mb-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: '#E3F2FD' }}
              >
                {(() => {
                  const Icon = selectedReward.icon;
                  return <Icon className="w-8 h-8" style={{ color: '#2980B9' }} />;
                })()}
              </div>

              <p className="text-center mb-2" style={{ color: '#0C2D6B' }}>
                {text[language].confirmRedeemMessage}
              </p>
              <h3 className="text-center mb-4" style={{ color: '#0C2D6B' }}>
                {selectedReward.name[language]}?
              </h3>

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm" style={{ color: '#7F8C8D' }}>
                    {language === 'id' ? 'Poin dibutuhkan' : 'Points needed'}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" style={{ color: '#F39C12' }} />
                    <span style={{ color: '#0C2D6B' }}>{selectedReward.points}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: '#7F8C8D' }}>
                    {text[language].pointsRemaining}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" style={{ color: '#F39C12' }} />
                    <span style={{ color: '#0C2D6B' }}>
                      {currentPoints - selectedReward.points}
                    </span>
                  </div>
                </div>
              </div>

              {selectedReward.terms && (
                <div className="bg-blue-50 rounded-xl p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#2980B9' }} />
                    <div>
                      <p className="text-xs mb-1" style={{ color: '#2980B9' }}>
                        {text[language].termsConditions}:
                      </p>
                      <p className="text-xs" style={{ color: '#7F8C8D' }}>
                        {selectedReward.terms[language]}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRedeemModal(false)}
                className="flex-1 py-3 rounded-xl transition-all active:scale-95"
                style={{
                  backgroundColor: '#E3F2FD',
                  color: '#2980B9'
                }}
              >
                {text[language].cancel}
              </button>
              <button
                onClick={confirmRedeem}
                className="flex-1 py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: '#2980B9',
                  color: 'white'
                }}
              >
                <Check className="w-5 h-5" />
                {text[language].confirm}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Referral Modal */}
      {showReferralModal && (
        <ReferralModal
          language={language}
          onClose={() => setShowReferralModal(false)}
          referralCode={referralCode}
        />
      )}

      {/* History Detail Modal */}
      {selectedHistory && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedHistory(null)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: '#0C2D6B' }}>{text[language].transactionDetails}</h3>
              <button 
                onClick={() => setSelectedHistory(null)}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="w-5 h-5" style={{ color: '#7F8C8D' }} />
              </button>
            </div>

            <div className="mb-6">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ 
                  backgroundColor: selectedHistory.type === 'earned' ? '#E8F8F5' : '#FADBD8'
                }}
              >
                <span 
                  className="text-2xl"
                  style={{ 
                    color: selectedHistory.type === 'earned' ? '#27AE60' : '#E74C3C'
                  }}
                >
                  {selectedHistory.amount > 0 ? '+' : ''}{selectedHistory.amount}
                </span>
              </div>

              <h3 className="text-center mb-2" style={{ color: '#0C2D6B' }}>
                {selectedHistory.description}
              </h3>
              
              <p className="text-center text-sm mb-4" style={{ color: '#7F8C8D' }}>
                {selectedHistory.date}
              </p>

              {selectedHistory.details && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm" style={{ color: '#7F8C8D' }}>
                    {selectedHistory.details}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedHistory(null)}
              className="w-full py-3 rounded-xl transition-all active:scale-95"
              style={{
                backgroundColor: '#2980B9',
                color: 'white'
              }}
            >
              {text[language].close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
