import React from 'react';
import { LayoutDashboard, MessageSquare, Settings, Menu, X, Zap } from 'lucide-react';
import { ViewState, IBusinessProfile } from '../types';
import { APP_NAME } from '../constants';
import { Logo } from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  profile?: IBusinessProfile;
  onUpgrade?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, profile, onUpgrade }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const isPro = profile?.subscriptionStatus === 'pro';

  const NavItem = ({ view, icon: Icon, label }: { view: ViewState; icon: any; label: string }) => (
    <button
      onClick={() => {
        onNavigate(view);
        setIsMobileMenuOpen(false);
      }}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        currentView === view
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20'
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Brand with New Logo */}
          <div className="flex items-center space-x-3 px-4 py-6 mb-6">
            <Logo size={36} />
            <div className="flex flex-col">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">
                {APP_NAME}
                </span>
                {isPro && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-400">PRO EDITION</span>
                )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <NavItem view="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem view="chat" icon={MessageSquare} label="Marketing Chat" />
            <NavItem view="profile" icon={Settings} label="Business Profile" />
          </nav>

          {/* UPGRADE CTA */}
          {!isPro && onUpgrade && (
             <div className="px-4 pb-6">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl border border-indigo-500/20 shadow-lg">
                    <div className="flex items-center gap-2 text-white font-semibold mb-2">
                        <Zap size={16} className="text-yellow-400 fill-yellow-400" />
                        Unlock Pro
                    </div>
                    <p className="text-xs text-slate-400 mb-3 leading-relaxed">Get 30-day calendars, full strategies, and ad campaigns.</p>
                    <button 
                        onClick={onUpgrade}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-indigo-500/20 border border-indigo-500/20"
                    >
                        Upgrade Now
                    </button>
                </div>
             </div>
          )}

          {/* Footer Info */}
          <div className="px-4 py-4 text-xs text-slate-500 border-t border-slate-800">
            <p>Elite AI Marketing</p>
            <p>v1.0.2</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900">
          <div className="flex items-center space-x-2">
            <Logo size={32} />
            <span className="font-bold text-white text-lg">{APP_NAME}</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        <main className="flex-1 overflow-hidden relative">
          {children}
        </main>
      </div>
    </div>
  );
};