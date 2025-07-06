import React from 'react';
import { Employee } from '../types/Employee';

interface ShareModalProps {
  employee: Employee;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ employee, onClose }) => {
  const currentUrl = window.location.href;
  const shareText = `Check out ${employee.name}'s business card from ${employee.company}`;

  const handleShareContact = async () => {
    const shareData = {
      title: `${employee.name} - ${employee.title}`,
      text: shareText,
      url: currentUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // Fallback - copy to clipboard when share fails or is cancelled
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(currentUrl);
          alert('Link copied to clipboard!');
        }
      }
    } else {
      // Fallback - copy to clipboard
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
        alert('Link copied to clipboard!');
      }
    }
  };

  const shareOnPlatform = (platform: string) => {
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedText = encodeURIComponent(shareText);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(`${employee.name} - Business Card`)}&body=${encodedText}%20${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="max-w-md mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <i className="fas fa-arrow-left text-xl"></i>
          </button>
          <h2 className="text-lg font-semibold">Share this card</h2>
          <div className="w-10"></div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* QR Code */}
          <div className="mb-8">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`}
              alt="QR Code"
              className="w-48 h-48"
            />
          </div>

          {/* Instructions */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-800 mb-2">
              Point your camera at the QR code,
            </p>
            <p className="text-lg text-gray-800">or visit</p>
          </div>

          {/* Share Contact Card Button */}
          <button
            onClick={handleShareContact}
            className="w-full bg-black text-white py-4 rounded-lg font-medium mb-8 flex items-center justify-center space-x-2"
          >
            <i className="fas fa-arrow-right text-lg"></i>
            <span>Share contact card</span>
          </button>

          {/* Social Share Buttons */}
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 mb-2">11</div>
              <div className="text-sm text-gray-600">Shares</div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => shareOnPlatform('facebook')}
                className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                title="Share on Facebook"
              >
                <i className="fab fa-facebook-f text-lg"></i>
              </button>
              
              <button
                onClick={() => shareOnPlatform('whatsapp')}
                className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
                title="Share on WhatsApp"
              >
                <i className="fab fa-whatsapp text-lg"></i>
              </button>
              
              <button
                onClick={() => shareOnPlatform('email')}
                className="w-12 h-12 bg-gray-600 text-white rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                title="Share via Email"
              >
                <i className="fas fa-envelope text-lg"></i>
              </button>
              
              <button
                onClick={() => shareOnPlatform('twitter')}
                className="w-12 h-12 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
                title="Share on Twitter"
              >
                <i className="fab fa-twitter text-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;