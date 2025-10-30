import { useState } from 'react';
import { X, Copy, Share2, MessageCircle, Users, Gift, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ReferralModalProps {
  language: 'id' | 'en';
  onClose: () => void;
  referralCode: string;
}

export function ReferralModal({ language, onClose, referralCode }: ReferralModalProps) {
  const [copied, setCopied] = useState(false);

  const text = {
    id: {
      title: 'Ajak Teman & Dapatkan Poin',
      subtitle: 'Bagikan kode referral Anda dan dapatkan 200 poin untuk setiap teman yang booking!',
      yourCode: 'Kode Referral Anda',
      copyCode: 'Salin Kode',
      shareVia: 'Bagikan Via',
      whatsapp: 'WhatsApp',
      share: 'Share',
      howItWorks: 'Cara Kerja',
      step1: 'Bagikan Kode',
      step1Desc: 'Ajak teman pakai kode referral Anda',
      step2: 'Teman Booking',
      step2Desc: 'Teman mendaftar & booking pertama kali',
      step3: 'Dapatkan Poin',
      step3Desc: 'Anda & teman dapat 200 poin!',
      benefits: 'Keuntungan Referral',
      benefit1: 'Poin tanpa batas',
      benefit1Desc: 'Tidak ada batasan jumlah teman yang bisa Anda ajak',
      benefit2: 'Bonus untuk teman',
      benefit2Desc: 'Teman Anda juga dapat 200 poin bonus',
      benefit3: 'Tracking real-time',
      benefit3Desc: 'Lihat status referral Anda kapan saja',
      close: 'Tutup',
      copied: 'Kode berhasil disalin!',
      referralStats: 'Statistik Referral',
      totalReferrals: 'Total Referral',
      pending: 'Pending',
      successful: 'Berhasil',
      shareMessage: `Yuk cobain watersports seru di Danau Toba! 🌊\n\nPakai kode referral saya: ${referralCode} dan dapatkan 200 poin bonus!\n\nDownload aplikasi Sora sekarang dan nikmati berbagai aktivitas menarik:\n🚤 Jetski Adventure\n🍌 Banana Boat\n🍩 Donut Boat\n⚡ Speed Boat\n⛵ Perahu Sampan Tradisional\n\nBooking sekarang di: https://sorasamosir.com`
    },
    en: {
      title: 'Invite Friends & Earn Points',
      subtitle: 'Share your referral code and earn 200 points for each friend who books!',
      yourCode: 'Your Referral Code',
      copyCode: 'Copy Code',
      shareVia: 'Share Via',
      whatsapp: 'WhatsApp',
      share: 'Share',
      howItWorks: 'How It Works',
      step1: 'Share Code',
      step1Desc: 'Invite friends using your referral code',
      step2: 'Friend Books',
      step2Desc: 'Friend signs up & makes first booking',
      step3: 'Earn Points',
      step3Desc: 'You & friend get 200 points!',
      benefits: 'Referral Benefits',
      benefit1: 'Unlimited points',
      benefit1Desc: 'No limit on how many friends you can invite',
      benefit2: 'Bonus for friends',
      benefit2Desc: 'Your friend also gets 200 bonus points',
      benefit3: 'Real-time tracking',
      benefit3Desc: 'View your referral status anytime',
      close: 'Close',
      copied: 'Code copied successfully!',
      referralStats: 'Referral Statistics',
      totalReferrals: 'Total Referrals',
      pending: 'Pending',
      successful: 'Successful',
      shareMessage: `Try amazing watersports at Lake Toba! 🌊\n\nUse my referral code: ${referralCode} and get 200 bonus points!\n\nDownload Sora app now and enjoy various exciting activities:\n🚤 Jetski Adventure\n🍌 Banana Boat\n🍩 Donut Boat\n⚡ Speed Boat\n⛵ Traditional Sampan Boat\n\nBook now at: https://sorasamosir.com`
    }
  };

  const handleCopyCode = () => {
    // Fallback copy method for environments where Clipboard API is blocked
    const textArea = document.createElement('textarea');
    textArea.value = referralCode;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopied(true);
      toast.success(text[language].copied);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    } finally {
      textArea.remove();
    }
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(text[language].shareMessage);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sora Watersports Referral',
          text: text[language].shareMessage
        });
      } catch (error) {
        // User cancelled share
      }
    } else {
      // Fallback to copying to clipboard using execCommand
      const textArea = document.createElement('textarea');
      textArea.value = text[language].shareMessage;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        toast.success(text[language].copied);
      } catch (err) {
        toast.error('Failed to copy message');
      } finally {
        textArea.remove();
      }
    }
  };

  // Mock stats - in real app, this would come from backend
  const stats = {
    total: 5,
    pending: 2,
    successful: 3
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b flex items-start justify-between"
        >
          <div className="flex-1">
            <h2 className="mb-1" style={{ color: '#0C2D6B' }}>
              {text[language].title}
            </h2>
            <p className="text-sm" style={{ color: '#7F8C8D' }}>
              {text[language].subtitle}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="ml-4 p-1 hover:opacity-70 transition-opacity"
          >
            <X className="w-6 h-6" style={{ color: '#7F8C8D' }} />
          </button>
        </div>

        <div className="p-6">
          {/* Referral Code Card */}
          <div 
            className="rounded-2xl p-6 mb-6 relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, #0C2D6B 0%, #2980B9 100%)'
            }}
          >
            <div className="absolute top-0 right-0 opacity-10">
              <Users className="w-32 h-32" />
            </div>
            
            <div className="relative z-10">
              <p className="text-white/80 text-sm mb-2">{text[language].yourCode}</p>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                <p className="text-white text-center text-2xl tracking-widest">
                  {referralCode}
                </p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleCopyCode}
                  className="flex-1 bg-white text-center py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                  style={{ color: '#0C2D6B' }}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-5 h-5" style={{ color: '#27AE60' }} />
                      <span>{text[language].copied.split('!')[0]}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>{text[language].copyCode}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Share Options */}
          <div className="mb-6">
            <p className="mb-3" style={{ color: '#0C2D6B' }}>
              {text[language].shareVia}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center justify-center gap-2 bg-white border-2 rounded-xl py-3 hover:bg-gray-50 active:scale-95 transition-all"
                style={{ borderColor: '#25D366' }}
              >
                <MessageCircle className="w-5 h-5" style={{ color: '#25D366' }} />
                <span style={{ color: '#25D366' }}>{text[language].whatsapp}</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 bg-white border-2 rounded-xl py-3 hover:bg-gray-50 active:scale-95 transition-all"
                style={{ borderColor: '#2980B9' }}
              >
                <Share2 className="w-5 h-5" style={{ color: '#2980B9' }} />
                <span style={{ color: '#2980B9' }}>{text[language].share}</span>
              </button>
            </div>
          </div>

          {/* Referral Stats */}
          <div className="mb-6">
            <p className="mb-3" style={{ color: '#0C2D6B' }}>
              {text[language].referralStats}
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div 
                className="text-center p-4 rounded-xl"
                style={{ backgroundColor: '#E3F2FD' }}
              >
                <p className="text-2xl mb-1" style={{ color: '#2980B9' }}>
                  {stats.total}
                </p>
                <p className="text-xs" style={{ color: '#7F8C8D' }}>
                  {text[language].totalReferrals}
                </p>
              </div>
              <div 
                className="text-center p-4 rounded-xl"
                style={{ backgroundColor: '#FFF3E0' }}
              >
                <p className="text-2xl mb-1" style={{ color: '#F39C12' }}>
                  {stats.pending}
                </p>
                <p className="text-xs" style={{ color: '#7F8C8D' }}>
                  {text[language].pending}
                </p>
              </div>
              <div 
                className="text-center p-4 rounded-xl"
                style={{ backgroundColor: '#E8F8F5' }}
              >
                <p className="text-2xl mb-1" style={{ color: '#27AE60' }}>
                  {stats.successful}
                </p>
                <p className="text-xs" style={{ color: '#7F8C8D' }}>
                  {text[language].successful}
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-6">
            <p className="mb-3" style={{ color: '#0C2D6B' }}>
              {text[language].howItWorks}
            </p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#E3F2FD', color: '#2980B9' }}
                >
                  1
                </div>
                <div className="flex-1">
                  <p className="mb-1" style={{ color: '#0C2D6B' }}>
                    {text[language].step1}
                  </p>
                  <p className="text-sm" style={{ color: '#7F8C8D' }}>
                    {text[language].step1Desc}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#E3F2FD', color: '#2980B9' }}
                >
                  2
                </div>
                <div className="flex-1">
                  <p className="mb-1" style={{ color: '#0C2D6B' }}>
                    {text[language].step2}
                  </p>
                  <p className="text-sm" style={{ color: '#7F8C8D' }}>
                    {text[language].step2Desc}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#E8F8F5', color: '#27AE60' }}
                >
                  3
                </div>
                <div className="flex-1">
                  <p className="mb-1" style={{ color: '#0C2D6B' }}>
                    {text[language].step3}
                  </p>
                  <p className="text-sm" style={{ color: '#7F8C8D' }}>
                    {text[language].step3Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div 
            className="rounded-xl p-4 mb-4"
            style={{ backgroundColor: '#FFF3E0' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Gift className="w-5 h-5" style={{ color: '#F39C12' }} />
              <p style={{ color: '#0C2D6B' }}>
                {text[language].benefits}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#27AE60' }} />
                <div>
                  <p className="text-sm mb-0.5" style={{ color: '#0C2D6B' }}>
                    {text[language].benefit1}
                  </p>
                  <p className="text-xs" style={{ color: '#7F8C8D' }}>
                    {text[language].benefit1Desc}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#27AE60' }} />
                <div>
                  <p className="text-sm mb-0.5" style={{ color: '#0C2D6B' }}>
                    {text[language].benefit2}
                  </p>
                  <p className="text-xs" style={{ color: '#7F8C8D' }}>
                    {text[language].benefit2Desc}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#27AE60' }} />
                <div>
                  <p className="text-sm mb-0.5" style={{ color: '#0C2D6B' }}>
                    {text[language].benefit3}
                  </p>
                  <p className="text-xs" style={{ color: '#7F8C8D' }}>
                    {text[language].benefit3Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
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
    </div>
  );
}
