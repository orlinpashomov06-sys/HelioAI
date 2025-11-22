import React, { useState } from 'react';
import { X, Check, Shield, Star, ExternalLink } from 'lucide-react';
import { APP_NAME, STRIPE_PAYMENT_LINK } from '../constants';
import { Logo } from './Logo';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; 
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = () => {
    setIsProcessing(true);
    
    // Ensure link is clean
    const link = STRIPE_PAYMENT_LINK ? STRIPE_PAYMENT_LINK.trim() : "";

    if (!link || link.includes("test_link_here")) {
        alert("System Config Error: Please add your Stripe Link in constants.tsx");
        setIsProcessing(false);
        return;
    }

    // FIX: Use window.open instead of window.location.href
    // This prevents the "White Screen" crash by opening payment in a new secure tab
    const newWindow = window.open(link, '_blank');

    if (newWindow) {
        // If successful, focus the new window
        newWindow.focus();
        // Reset the button state after a few seconds so user can interact again if needed
        setTimeout(() => setIsProcessing(false), 3000);
    } else {
        // Fallback if browser blocked the popup
        alert("Payment window was blocked. Please allow popups for this site to continue.");
        setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-center relative border-b border-slate-800">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex justify-center mb-4">
             <Logo size={64} />
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">Upgrade to {APP_NAME} Pro</h2>
          <p className="text-indigo-300 text-sm">Unlock the full power of your AI Director</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Pricing */}
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-white">$19.99</span>
              <span className="text-slate-400">/month</span>
            </div>
            <p className="text-slate-500 text-sm mt-1">Cancel anytime. No hidden fees.</p>
          </div>

          {/* Features List */}
          <div className="space-y-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
            <FeatureItem text="Full 30-Day Content Calendars" />
            <FeatureItem text="Complete Marketing Strategies" />
            <FeatureItem text="Sales Funnel Blueprints" />
            <FeatureItem text="Unlimited AI Consultations" />
            <FeatureItem text="Competitor Analysis" />
          </div>

          {/* Action Button */}
          <button
            onClick={handleSubscribe}
            disabled={isProcessing}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Opening Payment...
              </>
            ) : (
              <>
                <Star className="w-5 h-5 fill-white/20" />
                Subscribe Now <ExternalLink size={14} className="opacity-50" />
              </>
            )}
          </button>
          
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <Shield size={12} />
            <span>Secure payment via Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
      <Check size={12} className="text-green-400" />
    </div>
    <span className="text-slate-300 text-sm">{text}</span>
  </div>
);