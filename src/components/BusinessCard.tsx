import React, { useState } from 'react';
import { Employee } from '../types/Employee';
import ShareModal from './ShareModal';
import ContactFormModal from './ContactFormModal';

interface BusinessCardProps {
  employee: Employee;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ employee }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleSaveContact = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${employee.name}
ORG:${employee.company}
TITLE:${employee.title}
EMAIL:${employee.email}
${employee.phones.map(phone => `TEL:${phone}`).join('\n')}
${employee.website ? `URL:${employee.website}` : ''}
${employee.address ? `ADR:;;${employee.address.street};${employee.address.city};;${employee.address.zipCode};${employee.address.country}` : ''}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${employee.name.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const currentUrl = window.location.href;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Business Card */}
      <div className="max-w-md mx-auto bg-white min-h-screen relative">
        {/* Company Logo Section with Flip Animation */}
        <div className="text-center pt-12 pb-8">
          <div className="flip-container mx-auto w-64 h-32 mb-8">
            <div className="flipper">
              {/* Front - Company Logo */}
              <div className="front">
                <img 
                  src="/src/assets/company-logo.png" 
                  alt="Diplomat Properties Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Back - QR Code */}
              <div className="back flex items-center justify-center bg-white">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(currentUrl)}`}
                  alt="QR Code"
                  className="w-30 h-30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="px-6">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-200">
              <img
                src={employee.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&size=96&background=dc2626&color=fff`}
                alt={employee.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">{employee.name}</h1>
            <p className="text-gray-600 text-base">{employee.title}</p>
          </div>

          {/* Contact Information - Centered */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start justify-center space-x-3">
              <i className="fas fa-building text-black text-lg mt-1 flex-shrink-0"></i>
              <div className="text-gray-700 text-center">
                <div className="font-medium">{employee.company}</div>
                {employee.reraNumber && (
                  <div className="text-sm text-gray-500">{employee.reraNumber}</div>
                )}
              </div>
            </div>

            {employee.phones.map((phone, index) => (
              <div key={index} className="flex items-center justify-center space-x-3">
                <i className="fas fa-mobile fa-flip-horizontal text-black text-lg flex-shrink-0"></i>
                <a 
                  href={`tel:${phone}`}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {phone}
                </a>
              </div>
            ))}

            <div className="flex items-center justify-center space-x-3">
              <i className="fas fa-envelope text-black text-lg flex-shrink-0"></i>
              <a 
                href={`mailto:${employee.email}`}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {employee.email}
              </a>
            </div>

            {employee.website && (
              <div className="flex items-center justify-center space-x-3">
                <i className="fas fa-globe text-black text-lg flex-shrink-0"></i>
                <a 
                  href={`https://${employee.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {employee.website}
                </a>
              </div>
            )}

            {employee.address && (
              <div className="flex items-start justify-center space-x-3">
                <i className="fas fa-map-marker-alt text-black text-lg mt-1 flex-shrink-0"></i>
                <div className="text-gray-700 text-center">
                  <div>{employee.address.street}</div>
                  <div>{employee.address.city}, {employee.address.country}</div>
                </div>
              </div>
            )}
          </div>

          {/* Share Card Button */}
          <button
            onClick={() => setShowShareModal(true)}
            className="w-full flex items-center justify-center space-x-2 py-3 mb-4 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <span>Share card</span>
            <i className="fas fa-share-alt text-base"></i>
          </button>

          {/* Action Buttons */}
          <div className="space-y-4 pb-8">
            <button
              onClick={handleSaveContact}
              className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Save Contact
            </button>
            
            <button
              onClick={() => setShowContactForm(true)}
              className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Send your contact
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal 
          employee={employee}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactFormModal 
          employee={employee}
          onClose={() => setShowContactForm(false)}
        />
      )}
    </div>
  );
};

export default BusinessCard;