import { X, Calendar, Users, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ReceiptModal } from './ReceiptModal';
import soraLogo from 'figma:asset/ef516f90d1a9f4e4b7ac568320a02606f60d5319.png';

interface BookingModalProps {
  boat: any;
  isOpen: boolean;
  onClose: () => void;
  language: 'id' | 'en';
}

export function BookingModal({ boat, isOpen, onClose, language }: BookingModalProps) {
  const [bookingData, setBookingData] = useState({
    bookingDate: '',
    guests: '',
    name: '',
    email: '',
    phone: ''
  });

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);

  if (!isOpen || !boat) return null;

  const text = {
    id: {
      book: 'Pesan',
      selectDates: 'Pilih Tanggal & Penumpang',
      bookingDate: 'Tanggal Booking',
      guests: 'Jumlah penumpang',
      total: 'Total',
      continue: 'Lanjutkan',
      contactInfo: 'Informasi Kontak',
      fullName: 'Nama Lengkap',
      email: 'Email',
      phone: 'Nomor Telepon',
      bookingSummary: 'Ringkasan Pemesanan',
      date: 'Tanggal',
      back: 'Kembali',
      bookNow: 'Pesan Sekarang',
      bookingSuccess: 'Permintaan pemesanan berhasil dikirim! Anda akan menerima email konfirmasi sebentar lagi.',
      selectGuests: 'Pilih jumlah penumpang',
      paymentMethod: 'Metode Pembayaran',
      selectPayment: 'Pilih metode pembayaran',
      proceedPayment: 'Lanjutkan Pembayaran',
      eWallet: 'E-Wallet',
      qris: 'QRIS'
    },
    en: {
      book: 'Book',
      selectDates: 'Select Date & Guests',
      bookingDate: 'Booking Date',
      guests: 'Number of guests',
      total: 'Total',
      continue: 'Continue',
      contactInfo: 'Contact Information',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone Number',
      bookingSummary: 'Booking Summary',
      date: 'Date',
      back: 'Back',
      bookNow: 'Book Now',
      bookingSuccess: 'Booking request submitted! You will receive a confirmation email shortly.',
      selectGuests: 'Select number of guests',
      paymentMethod: 'Payment Method',
      selectPayment: 'Select payment method',
      proceedPayment: 'Proceed to Payment',
      eWallet: 'E-Wallet',
      qris: 'QRIS'
    }
  };

  const handleBooking = () => {
    // Show receipt instead of alert
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    onClose();
    setStep(1);
    setPaymentMethod('');
    setBookingData({
      bookingDate: '',
      guests: '',
      name: '',
      email: '',
      phone: ''
    });
  };

  const calculateTotal = () => {
    // Harga tetap per boat, tidak dikalikan jumlah penumpang
    return boat.price;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-md mx-4 rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-lg px-2 py-1 shadow-[0_3px_12px_rgba(0,0,0,0.08),0_1px_6px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.6)] border border-gray-100/60 transform hover:scale-105 transition-transform duration-200">
              <img 
                src={soraLogo} 
                alt="Sora Logo" 
                className="h-5 w-auto object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
              />
            </div>
            <h2 style={{ color: '#0C2D6B' }}>{text[language].book}</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full transition-colors"
            style={{ backgroundColor: '#E3F2FD' }}
          >
            <X className="w-5 h-5" style={{ color: '#2980B9' }} />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-6">
            <ImageWithFallback 
              src={boat.image} 
              alt={boat.name}
              className="w-full h-32 object-cover rounded-xl"
            />
            <div className="mt-3">
              <h3 className="text-gray-900">{boat.name}</h3>
              <p className="text-gray-600">{boat.location}</p>
              <p className="text-blue-600">Rp {boat.price.toLocaleString('id-ID')}{boat.type === 'Perahu Sampan' ? '/jam' : '/trip'}</p>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-gray-900">{text[language].selectDates}</h3>
              
              <div>
                <label className="text-sm text-gray-600 mb-1 block">{text[language].bookingDate}</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
                  <input 
                    type="date"
                    value={bookingData.bookingDate}
                    onChange={(e) => setBookingData({...bookingData, bookingDate: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
                <select 
                  value={bookingData.guests}
                  onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{text[language].selectGuests}</option>
                  <option value="2">{language === 'id' ? '2 penumpang' : '2 guests'}</option>
                  <option value="4">{language === 'id' ? '4 penumpang' : '4 guests'}</option>
                  <option value="6">{language === 'id' ? '6 penumpang' : '6 guests'}</option>
                  <option value="8">{language === 'id' ? '8 penumpang' : '8 guests'}</option>
                </select>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">{text[language].total}</span>
                  <span className="text-blue-600">Rp {calculateTotal().toLocaleString('id-ID')}</span>
                </div>
              </div>
              
              <button 
                onClick={() => setStep(2)}
                disabled={!bookingData.bookingDate || !bookingData.guests}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              >
                {text[language].continue}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-gray-900">{text[language].contactInfo}</h3>
              
              <input 
                type="text"
                placeholder={text[language].fullName}
                value={bookingData.name}
                onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <input 
                type="email"
                placeholder={text[language].email}
                value={bookingData.email}
                onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <input 
                type="tel"
                placeholder={text[language].phone}
                value={bookingData.phone}
                onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="text-gray-900 mb-2">{text[language].bookingSummary}</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>{text[language].date}:</span>
                    <span>{bookingData.bookingDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{text[language].guests}:</span>
                    <span>{bookingData.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{text[language].total}:</span>
                    <span className="text-blue-600">Rp {calculateTotal().toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  {text[language].back}
                </button>
                <button 
                  onClick={() => setStep(3)}
                  disabled={!bookingData.name || !bookingData.email || !bookingData.phone}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-300"
                >
                  {text[language].continue}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-gray-900">{text[language].paymentMethod}</h3>
              
              <div className="space-y-3">
                <p className="text-sm text-gray-600">{text[language].selectPayment}</p>
                
                {/* E-Wallet Section */}
                <div>
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">{text[language].eWallet}</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => setPaymentMethod('gopay')}
                      className={`w-full p-4 border-2 rounded-xl flex items-center gap-3 transition-all ${
                        paymentMethod === 'gopay' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <div className="w-10 h-10 bg-[#00AED6] rounded-lg flex items-center justify-center text-white font-bold">
                          GP
                        </div>
                      </div>
                      <span className="font-medium text-gray-900">GoPay</span>
                      {paymentMethod === 'gopay' && (
                        <div className="ml-auto w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>

                    <button
                      onClick={() => setPaymentMethod('ovo')}
                      className={`w-full p-4 border-2 rounded-xl flex items-center gap-3 transition-all ${
                        paymentMethod === 'ovo' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <div className="w-10 h-10 bg-[#4C3494] rounded-lg flex items-center justify-center text-white font-bold">
                          OVO
                        </div>
                      </div>
                      <span className="font-medium text-gray-900">OVO</span>
                      {paymentMethod === 'ovo' && (
                        <div className="ml-auto w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>

                    <button
                      onClick={() => setPaymentMethod('dana')}
                      className={`w-full p-4 border-2 rounded-xl flex items-center gap-3 transition-all ${
                        paymentMethod === 'dana' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <div className="w-10 h-10 bg-[#118EEA] rounded-lg flex items-center justify-center text-white font-bold">
                          DANA
                        </div>
                      </div>
                      <span className="font-medium text-gray-900">DANA</span>
                      {paymentMethod === 'dana' && (
                        <div className="ml-auto w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {/* QRIS Section */}
                <div>
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">{text[language].qris}</p>
                  <button
                    onClick={() => setPaymentMethod('qris')}
                    className={`w-full p-4 border-2 rounded-xl flex items-center gap-3 transition-all ${
                      paymentMethod === 'qris' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                        QRIS
                      </div>
                    </div>
                    <span className="font-medium text-gray-900">QRIS</span>
                    {paymentMethod === 'qris' && (
                      <div className="ml-auto w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-700">{text[language].total}</span>
                  <span className="text-lg font-semibold text-blue-600">Rp {calculateTotal().toLocaleString('id-ID')}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {boat.name} • {bookingData.guests} {text[language].guests}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  {text[language].back}
                </button>
                <button 
                  onClick={handleBooking}
                  disabled={!paymentMethod}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-300 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  {text[language].proceedPayment}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Receipt Modal */}
      {showReceipt && (
        <ReceiptModal 
          isOpen={showReceipt}
          onClose={handleCloseReceipt}
          bookingData={bookingData}
          boat={boat}
          paymentMethod={paymentMethod}
          language={language}
        />
      )}
    </div>
  );
}
