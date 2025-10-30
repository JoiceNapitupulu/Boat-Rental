import { useState, useRef, useEffect } from 'react';
import { 
  X, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ChevronDown,
  User,
  Bot,
  CheckCircle2,
  HelpCircle,
  MapPin,
  CreditCard,
  Calendar,
  Info
} from 'lucide-react';

interface SupportPageProps {
  language: 'id' | 'en';
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface FAQ {
  question: { id: string; en: string };
  answer: { id: string; en: string };
  category: string;
}

export function SupportPage({ language, onClose }: SupportPageProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'faq'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'id' 
        ? 'Halo! Selamat datang di Sora Support. Saya Rina, asisten virtual Anda. Ada yang bisa saya bantu?' 
        : 'Hello! Welcome to Sora Support. I\'m Rina, your virtual assistant. How can I help you?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const text = {
    id: {
      title: 'Pusat Bantuan',
      subtitle: 'Tim kami siap membantu Anda 24/7',
      chat: 'Live Chat',
      faq: 'FAQ',
      quickActions: 'Hubungi Kami',
      call: 'Telepon',
      whatsapp: 'WhatsApp',
      email: 'Email',
      operatingHours: 'Jam Operasional',
      hours247: '24/7 - Tersedia Setiap Hari',
      typePlaceholder: 'Ketik pesan Anda...',
      send: 'Kirim',
      quickTopics: 'Topik Bantuan Cepat',
      booking: 'Cara Booking',
      payment: 'Pembayaran',
      location: 'Lokasi & Rute',
      reschedule: 'Reschedule',
      cancel: 'Pembatalan',
      refund: 'Pengembalian Dana',
      typing: 'Mengetik...',
      faqs: 'Pertanyaan Umum',
      contactInfo: 'Informasi Kontak',
      phoneNumber: '+62 821-6789-0123',
      emailAddress: 'support@sorasamosir.com',
      whatsappNumber: '+62 821-6789-0123'
    },
    en: {
      title: 'Help Center',
      subtitle: 'Our team is ready to help you 24/7',
      chat: 'Live Chat',
      faq: 'FAQ',
      quickActions: 'Contact Us',
      call: 'Call',
      whatsapp: 'WhatsApp',
      email: 'Email',
      operatingHours: 'Operating Hours',
      hours247: '24/7 - Available Every Day',
      typePlaceholder: 'Type your message...',
      send: 'Send',
      quickTopics: 'Quick Help Topics',
      booking: 'How to Book',
      payment: 'Payment',
      location: 'Location & Route',
      reschedule: 'Reschedule',
      cancel: 'Cancellation',
      refund: 'Refund',
      typing: 'Typing...',
      faqs: 'Frequently Asked Questions',
      contactInfo: 'Contact Information',
      phoneNumber: '+62 821-6789-0123',
      emailAddress: 'support@sorasamosir.com',
      whatsappNumber: '+62 821-6789-0123'
    }
  };

  const faqs: FAQ[] = [
    {
      question: {
        id: 'Bagaimana cara melakukan booking?',
        en: 'How do I make a booking?'
      },
      answer: {
        id: 'Pilih aktivitas yang Anda inginkan, klik "Pesan Sekarang", isi informasi kontak dan pilih metode pembayaran. Setelah pembayaran berhasil, Anda akan menerima resi digital dengan barcode tiket.',
        en: 'Select your desired activity, click "Book Now", fill in your contact information and choose payment method. After successful payment, you will receive a digital receipt with ticket barcode.'
      },
      category: 'booking'
    },
    {
      question: {
        id: 'Metode pembayaran apa saja yang tersedia?',
        en: 'What payment methods are available?'
      },
      answer: {
        id: 'Kami menerima OVO, GoPay, DANA, dan QRIS. Semua metode pembayaran aman dan terenkripsi.',
        en: 'We accept OVO, GoPay, DANA, and QRIS. All payment methods are secure and encrypted.'
      },
      category: 'payment'
    },
    {
      question: {
        id: 'Apakah bisa reschedule atau membatalkan booking?',
        en: 'Can I reschedule or cancel my booking?'
      },
      answer: {
        id: 'Ya, Anda dapat reschedule atau membatalkan booking maksimal 24 jam sebelum tanggal aktivitas. Untuk pembatalan, dana akan dikembalikan 100% jika dibatalkan 24 jam sebelumnya.',
        en: 'Yes, you can reschedule or cancel your booking up to 24 hours before the activity date. For cancellations, funds will be refunded 100% if cancelled 24 hours in advance.'
      },
      category: 'reschedule'
    },
    {
      question: {
        id: 'Di mana lokasi pengambilan untuk aktivitas?',
        en: 'Where is the pick-up location for activities?'
      },
      answer: {
        id: 'Setiap aktivitas memiliki lokasi berbeda di 8 pantai di Samosir. Lokasi lengkap dengan GPS akan dikirim setelah booking dikonfirmasi. Anda juga dapat melihat di halaman detail aktivitas.',
        en: 'Each activity has different locations across 8 beaches in Samosir. Complete location with GPS will be sent after booking confirmation. You can also view it on the activity detail page.'
      },
      category: 'location'
    },
    {
      question: {
        id: 'Berapa lama durasi setiap aktivitas?',
        en: 'How long does each activity last?'
      },
      answer: {
        id: 'Durasi bervariasi: Jetski (1 jam), Speed Boat (30 menit), Banana Boat (30 menit), Donut Boat (20 menit), dan Perahu Sampan Tradisional (3 jam).',
        en: 'Duration varies: Jetski (1 hour), Speed Boat (30 minutes), Banana Boat (30 minutes), Donut Boat (20 minutes), and Traditional Sampan Boat (3 hours).'
      },
      category: 'booking'
    },
    {
      question: {
        id: 'Apakah harga sudah termasuk peralatan keselamatan?',
        en: 'Does the price include safety equipment?'
      },
      answer: {
        id: 'Ya, semua harga sudah termasuk life jacket, helm (untuk jetski), dan peralatan keselamatan lainnya. Instruktur profesional juga sudah termasuk.',
        en: 'Yes, all prices include life jacket, helmet (for jetski), and other safety equipment. Professional instructors are also included.'
      },
      category: 'booking'
    },
    {
      question: {
        id: 'Bagaimana cara mendapatkan poin loyalitas?',
        en: 'How do I earn loyalty points?'
      },
      answer: {
        id: 'Anda mendapatkan 100 poin untuk setiap Rp 100.000 yang dibelanjakan. Poin dapat ditukar dengan diskon atau upgrade aktivitas. Saat promo, dapatkan 2x poin!',
        en: 'You earn 100 points for every Rp 100,000 spent. Points can be redeemed for discounts or activity upgrades. During promos, get 2x points!'
      },
      category: 'payment'
    },
    {
      question: {
        id: 'Apakah ada batasan usia untuk aktivitas watersport?',
        en: 'Are there age restrictions for watersport activities?'
      },
      answer: {
        id: 'Ya, untuk Jetski minimal usia 16 tahun. Banana Boat, Donut Boat, dan Speed Boat minimal 6 tahun dengan pendampingan. Perahu Sampan tidak ada batasan usia.',
        en: 'Yes, for Jetski minimum age is 16 years. Banana Boat, Donut Boat, and Speed Boat minimum 6 years with supervision. Sampan Boat has no age restriction.'
      },
      category: 'booking'
    }
  ];

  const quickTopics = [
    { icon: Calendar, label: text[language].booking, keyword: language === 'id' ? 'booking' : 'booking' },
    { icon: CreditCard, label: text[language].payment, keyword: language === 'id' ? 'pembayaran' : 'payment' },
    { icon: MapPin, label: text[language].location, keyword: language === 'id' ? 'lokasi' : 'location' },
    { icon: Info, label: text[language].reschedule, keyword: language === 'id' ? 'reschedule' : 'reschedule' }
  ];

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('booking') || lowerMessage.includes('pesan')) {
      return language === 'id'
        ? 'Untuk melakukan booking, pilih aktivitas yang Anda inginkan dari halaman utama, lalu klik "Pesan Sekarang". Isi informasi kontak dan pilih metode pembayaran. Apakah ada yang ingin ditanyakan lebih lanjut?'
        : 'To make a booking, select your desired activity from the home page, then click "Book Now". Fill in your contact information and choose a payment method. Is there anything else you\'d like to know?';
    }
    
    if (lowerMessage.includes('bayar') || lowerMessage.includes('payment')) {
      return language === 'id'
        ? 'Kami menerima OVO, GoPay, DANA, dan QRIS. Pembayaran 100% aman dan terenkripsi. Ada pertanyaan lain?'
        : 'We accept OVO, GoPay, DANA, and QRIS. Payment is 100% secure and encrypted. Any other questions?';
    }
    
    if (lowerMessage.includes('lokasi') || lowerMessage.includes('location') || lowerMessage.includes('dimana')) {
      return language === 'id'
        ? 'Kami beroperasi di 8 pantai di Samosir: Pantai Pasir Putih Parbaba, Pantai Batu Hoda, Pantai Sigurgur, Pantai Indah Situngkir, Sibolazi Beach, Batu Passa, Tuktuk Siadong, dan Ambarita. Lokasi lengkap dengan GPS akan dikirim setelah booking.'
        : 'We operate at 8 beaches in Samosir: Pantai Pasir Putih Parbaba, Pantai Batu Hoda, Pantai Sigurgur, Pantai Indah Situngkir, Sibolazi Beach, Batu Passa, Tuktuk Siadong, and Ambarita. Complete location with GPS will be sent after booking.';
    }
    
    if (lowerMessage.includes('cancel') || lowerMessage.includes('batal') || lowerMessage.includes('reschedule')) {
      return language === 'id'
        ? 'Anda dapat reschedule atau membatalkan booking maksimal 24 jam sebelum tanggal aktivitas. Untuk pembatalan, dana akan dikembalikan 100%. Butuh bantuan untuk reschedule?'
        : 'You can reschedule or cancel your booking up to 24 hours before the activity date. For cancellations, funds will be refunded 100%. Need help rescheduling?';
    }
    
    if (lowerMessage.includes('harga') || lowerMessage.includes('price') || lowerMessage.includes('berapa')) {
      return language === 'id'
        ? 'Harga aktivitas: Jetski (Rp 1.200.000), Speed Boat (Rp 400.000), Banana Boat (Rp 250.000), Donut Boat (Rp 150.000), Perahu Sampan (Rp 30.000). Sedang ada promo hingga 35%! Ingin info lebih lanjut?'
        : 'Activity prices: Jetski (Rp 1,200,000), Speed Boat (Rp 400,000), Banana Boat (Rp 250,000), Donut Boat (Rp 150,000), Sampan Boat (Rp 30,000). Current promo up to 35%! Want more info?';
    }

    if (lowerMessage.includes('promo') || lowerMessage.includes('diskon') || lowerMessage.includes('discount')) {
      return language === 'id'
        ? 'Sedang ada Promo Akhir Tahun dengan diskon hingga 35%! Tersedia paket bundle dan individual. Cek halaman promo untuk detail lengkap. Mau saya bantu booking dengan harga promo?'
        : 'Year-End Promo is now available with up to 35% discount! Bundle and individual packages available. Check the promo page for full details. Would you like me to help you book at promo price?';
    }

    if (lowerMessage.includes('poin') || lowerMessage.includes('point') || lowerMessage.includes('loyalitas') || lowerMessage.includes('loyalty')) {
      return language === 'id'
        ? 'Dapatkan 100 poin untuk setiap Rp 100.000 yang dibelanjakan. Poin dapat ditukar dengan diskon atau upgrade. Saat promo, dapatkan 2x poin! Ingin tahu cara menukar poin?'
        : 'Earn 100 points for every Rp 100,000 spent. Points can be redeemed for discounts or upgrades. During promos, get 2x points! Want to know how to redeem points?';
    }
    
    return language === 'id'
      ? 'Terima kasih atas pesannya! Pertanyaan Anda akan segera dijawab oleh tim support kami. Apakah ada yang lain yang bisa saya bantu?'
      : 'Thank you for your message! Your question will be answered by our support team shortly. Is there anything else I can help with?';
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToRespond = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(messageToRespond),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickTopic = (keyword: string) => {
    setInputMessage(keyword);
    setActiveTab('chat');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div 
        className="px-4 py-4 flex items-center justify-between"
        style={{ backgroundColor: '#0C2D6B' }}
      >
        <div>
          <h1 className="text-white">{text[language].title}</h1>
          <p className="text-sm text-white opacity-80">{text[language].subtitle}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Quick Contact Actions */}
      <div className="px-4 py-4" style={{ backgroundColor: '#E3F2FD' }}>
        <p className="text-sm mb-3" style={{ color: '#0C2D6B' }}>
          {text[language].quickActions}
        </p>
        <div className="grid grid-cols-3 gap-3">
          <a
            href={`tel:${text[language].phoneNumber}`}
            className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 hover:opacity-80 transition-opacity"
          >
            <Phone className="w-6 h-6" style={{ color: '#2980B9' }} />
            <span className="text-xs" style={{ color: '#0C2D6B' }}>{text[language].call}</span>
          </a>
          <a
            href={`https://wa.me/${text[language].whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 hover:opacity-80 transition-opacity"
          >
            <MessageCircle className="w-6 h-6" style={{ color: '#25D366' }} />
            <span className="text-xs" style={{ color: '#0C2D6B' }}>{text[language].whatsapp}</span>
          </a>
          <a
            href={`mailto:${text[language].emailAddress}`}
            className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 hover:opacity-80 transition-opacity"
          >
            <Mail className="w-6 h-6" style={{ color: '#2980B9' }} />
            <span className="text-xs" style={{ color: '#0C2D6B' }}>{text[language].email}</span>
          </a>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="px-4 py-3 flex items-center justify-center gap-2" style={{ backgroundColor: '#F0F9FF' }}>
        <Clock className="w-4 h-4" style={{ color: '#2980B9' }} />
        <p className="text-sm" style={{ color: '#0C2D6B' }}>
          {text[language].operatingHours}: <span style={{ color: '#27AE60' }}>{text[language].hours247}</span>
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-3 text-center transition-colors ${
            activeTab === 'chat' ? 'border-b-2' : ''
          }`}
          style={{
            color: activeTab === 'chat' ? '#0C2D6B' : '#7F8C8D',
            borderColor: activeTab === 'chat' ? '#0C2D6B' : 'transparent'
          }}
        >
          <MessageCircle className="w-5 h-5 inline-block mr-2" />
          {text[language].chat}
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`flex-1 py-3 text-center transition-colors ${
            activeTab === 'faq' ? 'border-b-2' : ''
          }`}
          style={{
            color: activeTab === 'faq' ? '#0C2D6B' : '#7F8C8D',
            borderColor: activeTab === 'faq' ? '#0C2D6B' : 'transparent'
          }}
        >
          <HelpCircle className="w-5 h-5 inline-block mr-2" />
          {text[language].faq}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' ? (
          <div className="h-full flex flex-col">
            {/* Quick Topics */}
            <div className="px-4 py-3" style={{ backgroundColor: '#FAFAFA' }}>
              <p className="text-xs mb-2" style={{ color: '#7F8C8D' }}>{text[language].quickTopics}</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {quickTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickTopic(topic.keyword)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-white whitespace-nowrap hover:opacity-80 transition-opacity"
                    style={{ borderColor: '#2980B9', borderWidth: '1px', color: '#2980B9' }}
                  >
                    <topic.icon className="w-4 h-4" />
                    <span className="text-xs">{topic.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: message.sender === 'user' ? '#0C2D6B' : '#E3F2FD' }}
                  >
                    {message.sender === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5" style={{ color: '#2980B9' }} />
                    )}
                  </div>
                  <div className={`flex-1 ${message.sender === 'user' ? 'flex justify-end' : ''}`}>
                    <div
                      className="inline-block px-4 py-3 rounded-2xl max-w-[80%]"
                      style={{
                        backgroundColor: message.sender === 'user' ? '#0C2D6B' : '#E3F2FD',
                        color: message.sender === 'user' ? 'white' : '#0C2D6B'
                      }}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className="text-xs mt-1 opacity-70"
                      >
                        {message.timestamp.toLocaleTimeString(language === 'id' ? 'id-ID' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#E3F2FD' }}
                  >
                    <Bot className="w-5 h-5" style={{ color: '#2980B9' }} />
                  </div>
                  <div
                    className="px-4 py-3 rounded-2xl"
                    style={{ backgroundColor: '#E3F2FD', color: '#7F8C8D' }}
                  >
                    <p className="text-sm">{text[language].typing}</p>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={text[language].typePlaceholder}
                  className="flex-1 px-4 py-3 rounded-full border-2 outline-none"
                  style={{ borderColor: '#E3F2FD' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={inputMessage.trim() === ''}
                  className="p-3 rounded-full transition-opacity disabled:opacity-50"
                  style={{ backgroundColor: '#0C2D6B' }}
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto px-4 py-4">
            <h3 className="mb-4" style={{ color: '#0C2D6B' }}>{text[language].faqs}</h3>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl overflow-hidden"
                  style={{ borderColor: '#E3F2FD', borderWidth: '1px' }}
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.question.id ? null : faq.question.id)}
                    className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span style={{ color: '#0C2D6B' }}>{faq.question[language]}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        expandedFAQ === faq.question.id ? 'rotate-180' : ''
                      }`}
                      style={{ color: '#2980B9' }}
                    />
                  </button>
                  {expandedFAQ === faq.question.id && (
                    <div className="px-4 pb-4">
                      <p className="text-sm" style={{ color: '#7F8C8D' }}>
                        {faq.answer[language]}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Info Card */}
            <div 
              className="mt-6 rounded-xl p-4"
              style={{ backgroundColor: '#E3F2FD' }}
            >
              <h4 className="mb-3" style={{ color: '#0C2D6B' }}>{text[language].contactInfo}</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" style={{ color: '#2980B9' }} />
                  <span className="text-sm" style={{ color: '#0C2D6B' }}>
                    {text[language].phoneNumber}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5" style={{ color: '#25D366' }} />
                  <span className="text-sm" style={{ color: '#0C2D6B' }}>
                    {text[language].whatsappNumber}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" style={{ color: '#2980B9' }} />
                  <span className="text-sm" style={{ color: '#0C2D6B' }}>
                    {text[language].emailAddress}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
