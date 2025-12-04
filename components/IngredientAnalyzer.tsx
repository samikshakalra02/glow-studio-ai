import React, { useState } from 'react';
import { Search, AlertCircle, Check, ShieldCheck, Microscope, Leaf, AlertTriangle, FlaskConical, X, Sparkles, Zap, Info, Gavel } from 'lucide-react';
import { analyzeIngredients } from '../services/skincareLogic';
import { IngredientAnalysis, IngredientDetail } from '../types';

// Simple circular gauge component for visual score
const ScoreGauge: React.FC<{ score: number }> = ({ score }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const percentage = (score / 10) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const getColor = (s: number) => {
    if (s >= 8) return '#10B981'; // Emerald 500
    if (s >= 5) return '#F59E0B'; // Amber 500
    return '#EF4444'; // Red 500
  };

  const color = getColor(score);

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
       <svg className="transform -rotate-90 w-32 h-32">
         <circle
           cx="64"
           cy="64"
           r={radius}
           stroke="#F3F4F6"
           strokeWidth="8"
           fill="transparent"
         />
         <circle
           cx="64"
           cy="64"
           r={radius}
           stroke={color}
           strokeWidth="8"
           fill="transparent"
           strokeDasharray={circumference}
           strokeDashoffset={strokeDashoffset}
           strokeLinecap="round"
           className="transition-all duration-1000 ease-out"
         />
       </svg>
       <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold text-[#333333]">{score}</span>
          <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Safety</span>
       </div>
    </div>
  );
};

const IngredientAnalyzer: React.FC = () => {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<IngredientAnalysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientDetail | null>(null);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setAnalyzing(true);
    setAnalysis(null);
    setTimeout(() => {
      setAnalysis(analyzeIngredients(input));
      setAnalyzing(false);
    }, 1200);
  };

  // Dynamic Background for Verdict
  const getVerdictBackground = (score: number) => {
    if (score >= 8.5) return 'bg-gradient-to-r from-emerald-500 to-teal-500';
    if (score >= 5) return 'bg-gradient-to-r from-amber-500 to-orange-500';
    return 'bg-gradient-to-r from-rose-500 to-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up pb-12 relative">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-serif text-[#333333] mb-4">Ingredient Analyzer</h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Paste your ingredients below. Click on any identified ingredient to reveal its <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-bold">secret personality</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 relative group focus-within:ring-2 focus-within:ring-[#7FA99B] transition-all duration-300">
            <textarea
              className="w-full h-80 p-2 text-gray-600 bg-transparent resize-none focus:outline-none text-base leading-relaxed placeholder:text-gray-300 font-mono"
              placeholder="Paste list here... (e.g. Water, Honey, Lemon Juice, Retinol, Alcohol Denat)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="absolute bottom-6 right-6">
              <button
                onClick={handleAnalyze}
                disabled={analyzing || !input}
                className="bg-[#333333] text-white px-8 py-3 rounded-full font-medium hover:bg-black hover:scale-105 transition-all shadow-lg flex items-center disabled:opacity-50 disabled:transform-none"
              >
                {analyzing ? <Microscope className="animate-bounce mr-2" size={18} /> : <Search className="mr-2" size={18} />}
                {analyzing ? 'Analyzing...' : 'Analyze Formula'}
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-4 text-xs text-gray-400 uppercase tracking-widest">
             <span className="flex items-center text-emerald-600"><Leaf size={12} className="mr-1" /> Natural</span>
             <span className="flex items-center text-purple-600"><FlaskConical size={12} className="mr-1" /> Chemical</span>
          </div>
        </div>

        <div className="lg:col-span-2">
          {analysis ? (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-white animate-scale-in h-full flex flex-col relative overflow-hidden">
               {/* Background Glow based on score */}
               <div className={`absolute top-0 right-0 w-64 h-64 rounded-full filter blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none
                 ${analysis.score >= 8 ? 'bg-emerald-400' : analysis.score >= 5 ? 'bg-amber-400' : 'bg-rose-400'}`}></div>

               <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-serif text-[#333333] italic">"{analysis.vibe}"</h3>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Cocktail Analysis</p>
                    </div>
                    <ScoreGauge score={analysis.score} />
                  </div>

                  <div className="flex-grow space-y-6 overflow-y-auto pr-2 custom-scrollbar" style={{maxHeight: '400px'}}>
                    
                    {/* Overall Verdict Box (Vibrant) */}
                    <div className={`${getVerdictBackground(analysis.score)} text-white p-5 rounded-2xl shadow-lg transform transition-transform hover:scale-[1.02]`}>
                        <div className="flex items-center mb-2 text-xs font-bold text-white/80 uppercase tracking-widest">
                           <Gavel size={14} className="mr-2" /> Final Verdict
                        </div>
                        <p className="font-serif text-lg leading-tight font-medium">
                           {analysis.cocktailVerdict}
                        </p>
                    </div>

                    {/* Interactive Ingredients List */}
                    <div>
                      <div className="flex items-center mb-3 text-xs font-bold text-[#333333] uppercase tracking-widest">
                        <Info size={14} className="mr-2" /> Tap to Inspect
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {analysis.identifiedIngredients.length === 0 && <span className="text-gray-400 text-sm italic">No known ingredients detected.</span>}
                        {analysis.identifiedIngredients.map((ing, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedIngredient(ing)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize animate-fade-in-up border transition-all hover:scale-105 active:scale-95 shadow-sm
                              ${ing.type === 'good' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100' : 
                                ing.type === 'bad' ? 'bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100' : 
                                ing.type === 'caution' ? 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100' :
                                'bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100'}`}
                            style={{ animationDelay: `${i * 50}ms` }}
                          >
                            {ing.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Synergy Section */}
                    {analysis.synergies.length > 0 && (
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100">
                        <div className="flex items-center mb-3 text-xs font-bold text-indigo-900 uppercase tracking-widest">
                          <Zap size={14} className="mr-2 text-indigo-500" /> Chemistry Check
                        </div>
                        <div className="space-y-3">
                          {analysis.synergies.map((syn, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm">
                              <div className={`mt-0.5
                                ${syn.type === 'boost' ? 'text-green-500' : 'text-red-500'}`}>
                                {syn.type === 'boost' ? <Sparkles size={16} /> : <AlertTriangle size={16} />}
                              </div>
                              <div>
                                <span className="font-bold text-indigo-950">{syn.pair}:</span>
                                <span className="text-indigo-800/80 ml-1 text-xs block">{syn.description}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
               
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-sm text-gray-600 italic leading-relaxed">
                      "{analysis.summary}"
                    </p>
                  </div>
               </div>
            </div>
          ) : (
            <div className="h-full glass-card rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-8 transition-colors hover:border-emerald-300 hover:bg-white/50">
              <div className="bg-gradient-to-br from-gray-100 to-gray-50 p-4 rounded-full mb-6 shadow-sm">
                 <ShieldCheck className="text-gray-400" size={48} />
              </div>
              <p className="text-[#333333] font-serif text-lg">Awaiting Formulation</p>
              <p className="text-sm text-gray-400 mt-2 max-w-xs">Input ingredients to reveal their true nature and compatibility.</p>
            </div>
          )}
        </div>
      </div>

      {/* Ingredient Detail Modal */}
      {selectedIngredient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSelectedIngredient(null)}></div>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl animate-blob-in transform transition-all border-t-4 border-emerald-400">
            <button 
              onClick={() => setSelectedIngredient(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 text-4xl shadow-lg border-4 border-white ring-2 ring-gray-100
                ${selectedIngredient.type === 'good' ? 'bg-gradient-to-br from-green-100 to-emerald-200' : 
                  selectedIngredient.type === 'bad' ? 'bg-gradient-to-br from-red-100 to-rose-200' : 'bg-gradient-to-br from-amber-100 to-orange-200'}`}>
                {selectedIngredient.type === 'good' ? '🌿' : selectedIngredient.type === 'bad' ? '🧪' : '⚠️'}
              </div>
              
              <h3 className="text-3xl font-serif text-[#333333] capitalize mb-1">{selectedIngredient.name}</h3>
              <div className="inline-block px-4 py-1.5 rounded-full bg-gray-900 text-white text-xs font-bold tracking-widest uppercase mb-8 shadow-md">
                {selectedIngredient.slang.split(' ')[0]} {selectedIngredient.slang.split(' ')[1]}
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl w-full border border-gray-100">
                <p className="text-lg text-emerald-700 font-serif italic mb-4">
                  "{selectedIngredient.slang}"
                </p>
                <div className="h-px bg-gray-200 w-1/2 mx-auto my-4"></div>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">
                  {selectedIngredient.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientAnalyzer;