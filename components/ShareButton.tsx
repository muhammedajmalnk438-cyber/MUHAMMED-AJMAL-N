import React, { useState, useEffect } from 'react';
import { Share2, X, Copy, Check, Linkedin, Twitter, Facebook, MessageCircle, Link as LinkIcon, MoreHorizontal, QrCode } from 'lucide-react';
import { PROFILE } from '../constants';

const ShareButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [showQr, setShowQr] = useState(false);

  useEffect(() => {
    // Check if native share is supported
    if (typeof navigator !== 'undefined' && navigator.share) {
      setCanNativeShare(true);
    }
  }, []);

  const shareData = {
    title: `${PROFILE.name} - Portfolio`,
    text: `Check out this portfolio by ${PROFILE.name}. ${PROFILE.title}`,
    // Always share the current URL of the app
    url: typeof window !== 'undefined' ? window.location.href : '',
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setIsOpen(false); // Close modal after successful share initiation
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareData.url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    } else {
      // Fallback or just ignore if clipboard API is not available (e.g., non-secure context)
      console.warn("Clipboard API unavailable");
    }
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366]',
      url: `https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-[#0077b5]',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`
    },
    {
      name: 'X / Twitter',
      icon: Twitter,
      color: 'bg-black',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`
    }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-md text-charcoal dark:text-cream hover:bg-gray-100 dark:hover:bg-white/10 hover:text-ocean dark:hover:text-emerald transition-colors"
        aria-label="Share Portfolio"
        title="Share this portfolio"
      >
        <Share2 size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative w-full max-w-md bg-white dark:bg-charcoal rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700 animate-slide-up ring-1 ring-white/10">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-charcoal dark:text-white mb-2">Share Portfolio</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Share this portfolio with your network.
            </p>

            <div className="grid grid-cols-4 gap-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md transform group-hover:-translate-y-1 transition-all duration-300 ${social.color}`}>
                    <social.icon size={20} />
                  </div>
                  <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400">{social.name}</span>
                </a>
              ))}
              
              {canNativeShare && (
                <button
                  onClick={handleNativeShare}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-charcoal dark:text-white bg-gray-100 dark:bg-gray-700 shadow-md transform group-hover:-translate-y-1 transition-all duration-300">
                    <MoreHorizontal size={20} />
                  </div>
                  <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400">More</span>
                </button>
              )}
            </div>

            <div className="relative mb-6">
              <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 group focus-within:border-ocean dark:focus-within:border-emerald transition-colors">
                <LinkIcon size={16} className="text-gray-400 shrink-0" />
                <input 
                  type="text" 
                  readOnly 
                  value={shareData.url} 
                  className="flex-1 bg-transparent text-sm text-gray-600 dark:text-gray-300 outline-none truncate"
                />
                <button
                  onClick={copyToClipboard}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    copied 
                      ? 'bg-emerald text-white' 
                      : 'bg-white dark:bg-gray-700 text-gray-500 hover:text-ocean dark:hover:text-white shadow-sm'
                  }`}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
              {copied && (
                <span className="absolute -top-8 right-0 text-xs font-bold text-emerald animate-fade-in bg-emerald/10 px-2 py-1 rounded">
                  Copied!
                </span>
              )}
            </div>

            {/* QR Code Section */}
            <div className="flex flex-col items-center justify-center">
              {!showQr ? (
                <button 
                  onClick={() => setShowQr(true)}
                  className="flex items-center gap-2 text-sm text-ocean dark:text-emerald font-medium hover:underline transition-all"
                >
                  <QrCode size={16} />
                  Show QR Code
                </button>
              ) : (
                <div className="flex flex-col items-center animate-fade-in w-full">
                   <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-inner mb-2">
                     <img 
                       src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareData.url)}&bgcolor=ffffff`}
                       alt="Portfolio QR Code"
                       className="w-32 h-32"
                       loading="lazy"
                     />
                   </div>
                   <button 
                     onClick={() => setShowQr(false)}
                     className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                   >
                     Hide QR Code
                   </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareButton;