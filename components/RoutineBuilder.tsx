import React, { useState } from 'react';
import { Sun, Moon, RefreshCw, CheckCircle, Clock, Droplets, Shield, Sparkles, ShoppingBag, X, ExternalLink } from 'lucide-react';
import { SkinType, TimeAvailable, Goal, Routine, RoutineItem, MarketProduct } from '../types';
import { generateRoutine, getProductRecommendations } from '../services/skincareLogic';

const RoutineBuilder: React.FC = () => {
  const [skinType, setSkinType] = useState<SkinType>(SkinType.Combination);
  const [time, setTime] = useState<TimeAvailable>(TimeAvailable.Fifteen);
  const [goal, setGoal] = useState<Goal>(Goal.Hydration);
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [loading, setLoading] = useState(false);
  
  // State for Product Modal
  const [selectedItem, setSelectedItem] = useState<RoutineItem | null>(null);
  const [recommendations, setRecommendations] = useState<MarketProduct[]>([]);

  const handleGenerate = () => {
    setLoading(true);
    setRoutine(null);
    setSelectedItem(null);
    // Simulate AI thinking time
    setTimeout(() => {
      setRoutine(generateRoutine(skinType, time, goal));
      setLoading(false);
    }, 1500);
  };

  const handleItemClick = (item: RoutineItem) => {
    setSelectedItem(item);
    setRecommendations(getProductRecommendations(item.product));
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up pb-12 relative">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-serif text-[#333333] mb-4">The Routine Builder</h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Tell us about your unique skin profile, and our AI will curate a scientifically balanced morning and evening ritual.
        </p>
      </div>

      <div className="glass-card p-8 rounded-3xl shadow-sm mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Skin Type Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest">Skin Profile</label>
            <div className="space-y-2">
              {Object.values(SkinType).map((t) => (
                <button
                  key={t}
                  onClick={() => setSkinType(t)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 flex items-center justify-between
                    ${skinType === t 
                      ? 'bg-teal-50 border-teal-500 text-teal-800 font-medium shadow-sm' 
                      : 'border-gray-100 hover:border-gray-300 text-gray-500'}`}
                >
                  {t}
                  {skinType === t && <CheckCircle size={16} className="text-teal-500" />}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest">Availability</label>
            <div className="grid grid-cols-1 gap-2">
              {Object.values(TimeAvailable).map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 flex items-center justify-between
                    ${time === t 
                      ? 'bg-purple-50 border-purple-500 text-purple-800 font-medium shadow-sm' 
                      : 'border-gray-100 hover:border-gray-300 text-gray-500'}`}
                >
                  <span className="flex items-center gap-2">
                    <Clock size={16} className={time === t ? 'text-purple-500' : 'text-gray-400'} />
                    {t}
                  </span>
                  {time === t && <CheckCircle size={16} className="text-purple-500" />}
                </button>
              ))}
            </div>
          </div>

          {/* Goal Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest">Primary Goal</label>
            <div className="grid grid-cols-1 gap-2">
              {Object.values(Goal).map((g) => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 flex items-center justify-between
                    ${goal === g 
                      ? 'bg-rose-50 border-rose-500 text-rose-800 font-medium shadow-sm' 
                      : 'border-gray-100 hover:border-gray-300 text-gray-500'}`}
                >
                  <span className="flex items-center gap-2">
                    {g === Goal.Hydration && <Droplets size={16} className={goal === g ? 'text-rose-500' : 'text-gray-400'} />}
                    {g === Goal.Acne && <Shield size={16} className={goal === g ? 'text-rose-500' : 'text-gray-400'} />}
                    {g === Goal.AntiAging && <Sparkles size={16} className={goal === g ? 'text-rose-500' : 'text-gray-400'} />}
                    {g}
                  </span>
                  {goal === g && <CheckCircle size={16} className="text-rose-500" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="group relative bg-[#333333] text-white px-10 py-4 rounded-full font-medium hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100 shadow-xl hover:shadow-2xl"
          >
            <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
            </div>
            <span className="flex items-center relative z-10">
              {loading ? <RefreshCw className="animate-spin mr-3" size={20} /> : <Sparkles className="mr-3 text-yellow-300 group-hover:rotate-12 transition-transform" size={20} />}
              {loading ? 'Consulting Intelligence...' : 'Generate My Routine'}
            </span>
          </button>
        </div>
      </div>

      {routine && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Morning Routine - Sunny Gradient */}
          <div className="bg-gradient-to-br from-[#FFF9E5] to-[#FFEDD5] p-8 rounded-3xl animate-fade-in-up border border-orange-100 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10"></div>
            
            <div className="flex items-center mb-8 pb-4 border-b border-orange-200/50 relative z-10">
              <div className="bg-white p-3 rounded-full mr-4 shadow-sm text-amber-500">
                <Sun size={28} />
              </div>
              <div>
                 <h3 className="text-2xl font-serif text-amber-900">Morning Ritual</h3>
                 <p className="text-xs text-amber-700 uppercase tracking-wider mt-1 font-bold">Protect & Hydrate</p>
              </div>
            </div>
            <div className="space-y-6 relative z-10">
              <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-amber-200/50 -z-10"></div>
              {routine.morning.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleItemClick(item)}
                  className="flex items-start animate-fade-in-up cursor-pointer group" 
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex-shrink-0 bg-white border border-orange-200 text-amber-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-4 shadow-sm z-10 transition-transform group-hover:scale-110">
                    {idx + 1}
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl w-full group-hover:bg-white transition-all duration-300 border border-transparent hover:border-orange-200 shadow-sm hover:shadow-md flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-amber-600 uppercase mb-1">{item.step}</p>
                      <p className="font-medium text-amber-900 text-lg group-hover:text-amber-700">{item.product}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                       <ShoppingBag size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evening Routine - Deep Night Gradient */}
          <div className="bg-gradient-to-br from-[#1e1b4b] to-[#312e81] text-white p-8 rounded-3xl shadow-2xl animate-fade-in-up delay-200 border border-indigo-900 relative overflow-hidden">
             <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 -ml-10 -mb-10"></div>

            <div className="flex items-center mb-8 pb-4 border-b border-indigo-700 relative z-10">
              <div className="bg-indigo-900/50 p-3 rounded-full mr-4 border border-indigo-700 text-indigo-200">
                <Moon size={28} />
              </div>
              <div>
                 <h3 className="text-2xl font-serif text-white">Evening Ritual</h3>
                 <p className="text-xs text-indigo-300 uppercase tracking-wider mt-1 font-bold">Repair & Restore</p>
              </div>
            </div>
            <div className="space-y-6 relative z-10">
              <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-indigo-800 -z-10"></div>
              {routine.evening.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleItemClick(item)}
                  className="flex items-start animate-fade-in-up cursor-pointer group" 
                  style={{ animationDelay: `${(idx * 100) + 300}ms` }}
                >
                  <div className="flex-shrink-0 bg-[#0f172a] border border-indigo-500 text-indigo-200 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-4 z-10 shadow-lg transition-transform group-hover:scale-110">
                    {idx + 1}
                  </div>
                  <div className="bg-indigo-900/30 backdrop-blur-sm p-4 rounded-xl w-full group-hover:bg-indigo-900/50 transition-all duration-300 border border-transparent hover:border-indigo-700 shadow-sm hover:shadow-indigo-900/50 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-indigo-300 uppercase mb-1">{item.step}</p>
                      <p className="font-medium text-white text-lg group-hover:text-indigo-100">{item.product}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-indigo-800 text-indigo-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                       <ShoppingBag size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setSelectedItem(null)}></div>
          
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-scale-in">
            {/* Modal Header */}
            <div className="bg-[#333333] p-6 text-white relative">
               <button 
                 onClick={() => setSelectedItem(null)} 
                 className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
               >
                 <X size={20} />
               </button>
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Expert Recommendations for</h3>
               <h2 className="text-2xl font-serif">{selectedItem.product}</h2>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 bg-gray-50 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-[#557C70] bg-[#E8F3E8] px-2 py-1 rounded-md uppercase tracking-wider mb-2 inline-block">
                          {rec.brand}
                        </span>
                        <h4 className="text-lg font-medium text-[#333333] mb-1">{rec.name}</h4>
                        {rec.description && (
                          <p className="text-sm text-gray-500 italic mb-2">"{rec.description}"</p>
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                         <span className={`text-sm font-bold px-3 py-1 rounded-full 
                           ${rec.priceLevel === '$$$' ? 'bg-rose-50 text-rose-600' : 
                             rec.priceLevel === '$$' ? 'bg-amber-50 text-amber-600' : 
                             'bg-emerald-50 text-emerald-600'}`}>
                           {rec.priceLevel}
                         </span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                       <button className="text-xs font-bold text-[#333333] flex items-center group-hover:text-[#557C70] transition-colors">
                         VIEW DETAILS <ExternalLink size={12} className="ml-1" />
                       </button>
                    </div>
                  </div>
                ))}

                {recommendations.length === 0 && (
                   <div className="text-center py-8 text-gray-400">
                     <ShoppingBag size={48} className="mx-auto mb-3 opacity-30" />
                     <p>No specific recommendations found for this item.</p>
                   </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-gray-100 text-center text-xs text-gray-400">
               Prices: <span className="text-emerald-600 font-bold">$ Budget</span> • <span className="text-amber-600 font-bold">$$ Mid-Range</span> • <span className="text-rose-600 font-bold">$$$ Luxury</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutineBuilder;