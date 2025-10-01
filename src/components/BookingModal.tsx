import { X, Calendar, Users, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookingModalProps {
  boat: any;
  isOpen: boolean;
  onClose: () => void;
  language: 'id' | 'en';
}

export function BookingModal({ boat, isOpen, onClose, language }: BookingModalProps) {
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    guests: '',
    name: '',
    email: '',
    phone: ''
  });

  const [step, setStep] = useState(1);

  if (!isOpen || !boat) return null;

  const text = {
    id: {
      book: 'Pesan',
      selectDates: 'Pilih Tanggal & Penumpang',
      startDate: 'Tanggal Berangkat',
      endDate: 'Tanggal Kembali',
      guests: 'Jumlah penumpang',
      total: 'Total',
      continue: 'Lanjutkan',
      contactInfo: 'Informasi Kontak',
      fullName: 'Nama Lengkap',
      email: 'Email',
      phone: 'Nomor Telepon',
      bookingSummary: 'Ringkasan Pemesanan',
      dates: 'Tanggal',
      back: 'Kembali',
      bookNow: 'Pesan Sekarang',
      bookingSuccess: 'Permintaan pemesanan berhasil dikirim! Anda akan menerima email konfirmasi sebentar lagi.'
    },
    en: {
      book: 'Book',
      selectDates: 'Select Dates & Guests',
      startDate: 'Start Date',
      endDate: 'End Date',
      guests: 'Number of guests',
      total: 'Total',
      continue: 'Continue',
      contactInfo: 'Contact Information',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone Number',
      bookingSummary: 'Booking Summary',
      dates: 'Dates',
      back: 'Back',
      bookNow: 'Book Now',
      bookingSuccess: 'Booking request submitted! You will receive a confirmation email shortly.'
    }
  };

  const handleBooking = () => {
    // Mock booking submission
    alert(text[language].bookingSuccess);
    onClose();
    setStep(1);
    setBookingData({
      startDate: '',
      endDate: '',
      guests: '',
      name: '',
      email: '',
      phone: ''
    });
  };

  const calculateTotal = () => {
    if (!bookingData.startDate || !bookingData.endDate) return boat.price;
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) || 1;
    return boat.price * days;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-md mx-4 rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between rounded-t-3xl">
          <h2 style={{ color: '#0C2D6B' }}>{text[language].book} {boat.name}</h2>
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
              <p className="text-blue-600">${boat.price}/day</p>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-gray-900">Select Dates & Guests</h3>
              
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
                <input 
                  type="date"
                  placeholder="Start Date"
                  value={bookingData.startDate}
                  onChange={(e) => setBookingData({...bookingData, startDate: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
                <input 
                  type="date"
                  placeholder="End Date"
                  value={bookingData.endDate}
                  onChange={(e) => setBookingData({...bookingData, endDate: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
                <select 
                  value={bookingData.guests}
                  onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Number of guests</option>
                  <option value="2">2 guests</option>
                  <option value="4">4 guests</option>
                  <option value="6">6 guests</option>
                  <option value="8">8 guests</option>
                </select>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total</span>
                  <span className="text-blue-600">${calculateTotal()}</span>
                </div>
              </div>
              
              <button 
                onClick={() => setStep(2)}
                disabled={!bookingData.startDate || !bookingData.endDate || !bookingData.guests}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-gray-900">Contact Information</h3>
              
              <input 
                type="text"
                placeholder="Full Name"
                value={bookingData.name}
                onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <input 
                type="email"
                placeholder="Email"
                value={bookingData.email}
                onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <input 
                type="tel"
                placeholder="Phone Number"
                value={bookingData.phone}
                onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="text-gray-900 mb-2">Booking Summary</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Dates:</span>
                    <span>{bookingData.startDate} - {bookingData.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span>{bookingData.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="text-blue-600">${calculateTotal()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={handleBooking}
                  disabled={!bookingData.name || !bookingData.email || !bookingData.phone}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-300 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}