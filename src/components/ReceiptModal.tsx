import { X, Download, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import soraLogo from 'figma:asset/ef516f90d1a9f4e4b7ac568320a02606f60d5319.png';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    bookingDate: string;
    guests: string;
    name: string;
    email: string;
    phone: string;
  };
  boat: any;
  paymentMethod: string;
  language: 'id' | 'en';
}

export function ReceiptModal({ isOpen, onClose, bookingData, boat, paymentMethod, language }: ReceiptModalProps) {
  if (!isOpen) return null;

  // Generate booking reference number
  const bookingRef = 'SORA' + Date.now().toString().slice(-8);
  
  const calculateTotal = () => {
    // Harga tetap per boat, tidak dikalikan jumlah penumpang
    return boat.price;
  };

  const text = {
    id: {
      bookingConfirmed: 'Booking Dikonfirmasi',
      bookingReference: 'Nomor Referensi',
      transactionDetails: 'Detail Transaksi',
      customerInfo: 'Informasi Pelanggan',
      fullName: 'Nama Lengkap',
      email: 'Email',
      phone: 'Telepon',
      bookingInfo: 'Informasi Pemesanan',
      activity: 'Aktivitas',
      location: 'Lokasi',
      date: 'Tanggal',
      guests: 'Jumlah Penumpang',
      paymentInfo: 'Informasi Pembayaran',
      paymentMethod: 'Metode Pembayaran',
      total: 'Total Pembayaran',
      ticketBarcode: 'Barcode Tiket',
      showBarcode: 'Tunjukkan barcode ini saat check-in',
      downloadReceipt: 'Download Resi',
      done: 'Selesai',
      bookingSuccess: 'Pemesanan Anda berhasil! Cek email untuk konfirmasi.'
    },
    en: {
      bookingConfirmed: 'Booking Confirmed',
      bookingReference: 'Reference Number',
      transactionDetails: 'Transaction Details',
      customerInfo: 'Customer Information',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      bookingInfo: 'Booking Information',
      activity: 'Activity',
      location: 'Location',
      date: 'Date',
      guests: 'Number of Guests',
      paymentInfo: 'Payment Information',
      paymentMethod: 'Payment Method',
      total: 'Total Payment',
      ticketBarcode: 'Ticket Barcode',
      showBarcode: 'Show this barcode at check-in',
      downloadReceipt: 'Download Receipt',
      done: 'Done',
      bookingSuccess: 'Your booking is successful! Check your email for confirmation.'
    }
  };

  const getPaymentMethodName = (method: string) => {
    const methods: { [key: string]: string } = {
      'gopay': 'GoPay',
      'ovo': 'OVO',
      'dana': 'DANA',
      'qris': 'QRIS'
    };
    return methods[method] || method;
  };

  const handleDownload = () => {
    // Mock download functionality
    alert(language === 'id' ? 'Resi akan didownload' : 'Receipt will be downloaded');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageWithFallback 
              src={soraLogo} 
              alt="Sora"
              className="w-8 h-8"
            />
            <h2 className="text-gray-900">Sora Receipt</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Success Message */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-green-600 mb-1">{text[language].bookingConfirmed}</h3>
              <p className="text-sm text-gray-600">{text[language].bookingSuccess}</p>
            </div>
          </div>

          {/* Booking Reference */}
          <div className="bg-blue-50 p-4 rounded-xl text-center">
            <p className="text-sm text-gray-600 mb-1">{text[language].bookingReference}</p>
            <p className="text-xl font-mono text-blue-600">{bookingRef}</p>
          </div>

          {/* Barcode */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <p className="text-sm text-gray-900 mb-3 text-center">{text[language].ticketBarcode}</p>
            <div className="bg-white p-4 rounded-lg">
              {/* Simple Barcode Representation */}
              <svg viewBox="0 0 200 60" className="w-full h-20">
                {/* Generate barcode-like pattern */}
                {Array.from({ length: 40 }).map((_, i) => {
                  const height = Math.random() > 0.5 ? 50 : 40;
                  const width = Math.random() > 0.7 ? 4 : 2;
                  return (
                    <rect
                      key={i}
                      x={i * 5}
                      y={(60 - height) / 2}
                      width={width}
                      height={height}
                      fill="#000000"
                    />
                  );
                })}
              </svg>
              <p className="text-center text-xs text-gray-500 mt-2 font-mono">{bookingRef}</p>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">{text[language].showBarcode}</p>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <h3 className="text-gray-900">{text[language].transactionDetails}</h3>
            
            {/* Customer Info */}
            <div className="bg-gray-50 p-4 rounded-xl space-y-2">
              <p className="text-sm text-gray-600">{text[language].customerInfo}</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{text[language].fullName}:</span>
                  <span className="text-gray-900">{bookingData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{text[language].email}:</span>
                  <span className="text-gray-900">{bookingData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{text[language].phone}:</span>
                  <span className="text-gray-900">{bookingData.phone}</span>
                </div>
              </div>
            </div>

            {/* Booking Info */}
            <div className="bg-gray-50 p-4 rounded-xl space-y-2">
              <p className="text-sm text-gray-600">{text[language].bookingInfo}</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{text[language].activity}:</span>
                  <span className="text-gray-900">{boat.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{text[language].location}:</span>
                  <span className="text-gray-900">{boat.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{text[language].date}:</span>
                  <span className="text-gray-900">{bookingData.bookingDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{text[language].guests}:</span>
                  <span className="text-gray-900">{bookingData.guests} {language === 'id' ? 'orang' : 'people'}</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-blue-50 p-4 rounded-xl space-y-2">
              <p className="text-sm text-gray-600">{text[language].paymentInfo}</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{text[language].paymentMethod}:</span>
                  <span className="text-gray-900">{getPaymentMethodName(paymentMethod)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                  <span className="text-gray-900">{text[language].total}:</span>
                  <span className="text-lg text-blue-600">Rp {calculateTotal().toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={handleDownload}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              {text[language].downloadReceipt}
            </button>
            <button 
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors"
            >
              {text[language].done}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
