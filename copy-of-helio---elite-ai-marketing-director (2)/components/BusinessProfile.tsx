import React, { useState } from 'react';
import { IBusinessProfile } from '../types';
import { Save, Building2, Users, Mic2, Award, Type } from 'lucide-react';

interface BusinessProfileProps {
  profile: IBusinessProfile;
  onSave: (profile: IBusinessProfile) => void;
}

export const BusinessProfile: React.FC<BusinessProfileProps> = ({ profile, onSave }) => {
  const [formData, setFormData] = useState<IBusinessProfile>(profile);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="h-full overflow-y-auto p-6 md:p-10 bg-slate-950">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Business Profile</h1>
            <p className="text-slate-400">Helio uses this information to tailor every response to your specific brand.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Business Name */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <Building2 size={20} />
                <label className="font-semibold">Business Name</label>
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., The Daily Grind Coffee Co."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              required
            />
          </div>

          {/* Industry / Type */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <Type size={20} />
                <label className="font-semibold">Industry & Type</label>
            </div>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="e.g., Artisan Coffee Shop & Bakery"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              required
            />
          </div>

          {/* Target Audience */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <Users size={20} />
                <label className="font-semibold">Target Audience</label>
            </div>
            <textarea
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              placeholder="e.g., Remote workers and young professionals aged 25-40 who value quality coffee and a quiet workspace."
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
            />
          </div>

          {/* Brand Tone */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm space-y-4">
             <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <Mic2 size={20} />
                <label className="font-semibold">Brand Voice / Tone</label>
            </div>
            <input
              type="text"
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              placeholder="e.g., Friendly, Community-focused, Warm, slightly Witty"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Unique Selling Point */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm space-y-4">
             <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <Award size={20} />
                <label className="font-semibold">Unique Selling Point (USP)</label>
            </div>
            <textarea
              name="uniqueSellingPoint"
              value={formData.uniqueSellingPoint}
              onChange={handleChange}
              placeholder="e.g., We roast our beans in-house daily and offer the fastest WiFi in town."
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
            />
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg shadow-indigo-900/20"
            >
              <Save size={20} />
              {isSaved ? 'Profile Updated!' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};