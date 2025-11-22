import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Chat } from './components/Chat';
import { BusinessProfile } from './components/BusinessProfile';
import { UpgradeModal } from './components/UpgradeModal';
import { IBusinessProfile, ViewState } from './types';
import { APP_NAME } from './constants';

const DEFAULT_PROFILE: IBusinessProfile = {
  name: "",
  type: "",
  targetAudience: "",
  tone: "",
  uniqueSellingPoint: "",
  subscriptionStatus: 'free'
};

const App: React.FC = () => {
  // State
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [profile, setProfile] = useState<IBusinessProfile>(() => {
    const saved = localStorage.getItem('helio_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Persist profile
  useEffect(() => {
    localStorage.setItem('helio_profile', JSON.stringify(profile));
  }, [profile]);

  // Check for Stripe Success Return
  useEffect(() => {
    // Check if URL contains ?status=success (returned from Stripe)
    const query = new URLSearchParams(window.location.search);
    if (query.get('status') === 'success') {
        setProfile(prev => ({ ...prev, subscriptionStatus: 'pro' }));
        
        // Clean URL so refreshing doesn't re-trigger
        window.history.replaceState({}, document.title, window.location.pathname);
        
        alert(`🎉 Payment Successful! Welcome to ${APP_NAME} Pro.`);
    }
  }, []);

  // Determine if onboarding is needed
  const isProfileIncomplete = !profile.name || !profile.type;

  // Handlers
  const handleNavigate = (view: ViewState) => setCurrentView(view);
  
  const handleStartChat = (initialPrompt?: string) => {
    if (initialPrompt) {
        localStorage.setItem('helio_draft_msg', initialPrompt);
    }
    setCurrentView('chat');
  };

  // --- MONETIZATION HANDLER ---
  const handleUpgradeClick = () => {
    setShowUpgradeModal(true);
  };

  // Legacy handler, now handled via URL check
  const handleConfirmSubscription = () => {
    setShowUpgradeModal(false);
  };

  const renderContent = () => {
    if (isProfileIncomplete && currentView !== 'profile') {
       return (
         <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6">
            <div className="max-w-md space-y-4">
                <h2 className="text-3xl font-bold text-white">Welcome to {APP_NAME}</h2>
                <p className="text-slate-400">Before we begin growing your business, I need to understand who you are. Let's set up your Elite Business Profile.</p>
                <button 
                    onClick={() => setCurrentView('profile')}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-all shadow-lg shadow-indigo-500/20"
                >
                    Setup Profile
                </button>
            </div>
         </div>
       );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={handleStartChat} profile={profile} onUpgrade={handleUpgradeClick} />;
      case 'chat':
        return <Chat profile={profile} />;
      case 'profile':
        return <BusinessProfile profile={profile} onSave={setProfile} />;
      default:
        return <Dashboard onNavigate={handleStartChat} profile={profile} onUpgrade={handleUpgradeClick} />;
    }
  };

  return (
    <>
      <Layout currentView={currentView} onNavigate={handleNavigate} profile={profile} onUpgrade={handleUpgradeClick}>
        {renderContent()}
      </Layout>
      
      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)}
        onConfirm={handleConfirmSubscription}
      />
    </>
  );
};

export default App;