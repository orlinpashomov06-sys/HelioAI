import React from 'react';
import { QUICK_TOOLS, APP_NAME } from '../constants';
import { IBusinessProfile } from '../types';
import { Sparkles, ArrowRight, Lock } from 'lucide-react';

interface DashboardProps {
  onNavigate: (prompt?: string) => void;
  profile: IBusinessProfile;
  onUpgrade?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, profile, onUpgrade }) => {
  const isPro = profile.subscriptionStatus === 'pro';

  const handleToolClick = (tool: typeof QUICK_TOOLS[0]) => {
    // CHECK: Is the tool Premium? Is the user Free?
    if (tool.isPremium && !isPro) {
        onUpgrade?.(); // Sell them the upgrade!
        return;
    }
    
    localStorage.setItem('helio_draft_msg', tool.prompt);
    onNavigate();
  };

  return (
    <div className="h-full overflow-y-auto p-6 md:p-10 bg-slate-950">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Hello, <span className="text-indigo-400">{profile.name || "Entrepreneur"}</span>.
          </h1>
          <p className="text-slate-400 text-lg">
            I am {APP_NAME}, your AI Marketing Director. What shall we conquer today?
          </p>
        </div>

        {/* Stats / Context Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm">
            <div className="text-slate-500 text-sm mb-1 font-medium">Current Focus</div>
            <div className="text-white font-semibold text-lg">{profile.type || "Business Growth"}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm">
             <div className="text-slate-500 text-sm mb-1 font-medium">Account Status</div>
            <div className="text-white font-semibold text-lg capitalize flex items-center gap-2">
                {isPro ? (
                    <>
                        <span className="text-yellow-400">Pro Member</span>
                        <Sparkles size={16} className="text-yellow-400 fill-yellow-400"/>
                    </>
                ) : (
                    <span className="text-slate-400">Free Plan</span>
                )}
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 rounded-xl shadow-lg text-white flex flex-col justify-center relative overflow-hidden group cursor-pointer hover:opacity-90 transition-opacity" onClick={() => onNavigate()}>
            <div className="relative z-10 flex items-center justify-between">
               <div>
                <div className="text-indigo-100 text-sm font-medium mb-1">New Strategy</div>
                <div className="font-bold text-lg">Start New Chat</div>
               </div>
               <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <Sparkles className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10" />
          </div>
        </div>

        {/* Quick Tools Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUICK_TOOLS.map((tool) => {
              const isLocked = tool.isPremium && !isPro;
              return (
                <button
                  key={tool.id}
                  onClick={() => handleToolClick(tool)}
                  className={`flex flex-col text-left p-5 bg-slate-900 border rounded-xl transition-all group relative overflow-hidden
                    ${isLocked 
                        ? 'border-slate-800 opacity-75 hover:border-slate-700 cursor-pointer' 
                        : 'border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800'
                    }`}
                >
                  {isLocked && (
                    <div className="absolute top-3 right-3 text-slate-600 bg-slate-950 p-1.5 rounded-full border border-slate-800">
                        <Lock size={14} />
                    </div>
                  )}

                  <div className={`mb-3 p-2 rounded-lg w-fit transition-transform ${
                      isLocked ? 'bg-slate-800 text-slate-500' : 'bg-slate-950 text-indigo-400 group-hover:text-indigo-300 group-hover:scale-110'
                  }`}>
                    {tool.icon}
                  </div>
                  <h3 className={`font-semibold mb-1 ${isLocked ? 'text-slate-400' : 'text-white'}`}>{tool.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{tool.description}</p>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};