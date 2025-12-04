import React, { useState } from 'react';
import { ChefHat, AlertTriangle, ThumbsUp, Plus, X, ArrowRight, RotateCcw, AlertCircle, CheckCircle } from 'lucide-react';
import { SkinProblem, MaskValidationResult } from '../types';
import { validateFaceMask } from '../services/skincareLogic';

const FaceMaskValidator: React.FC = () => {
  const [problem, setProblem] = useState<SkinProblem>(SkinProblem.Tanning);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [result, setResult] = useState<MaskValidationResult | null>(null);

  const commonIngredients = ['Lemon', 'Honey', 'Turmeric', 'Baking Soda', 'Yogurt', 'Coffee', 'Coconut Oil', 'Toothpaste', 'Aloe'];

  const addIngredient = (ing: string) => {
    if (!ingredients.includes(ing) && ingredients.length < 5) {
      setIngredients([...ingredients, ing]);
      setResult(null); // Reset result on change
    }
  };

  const removeIngredient = (ing: string) => {
    setIngredients(ingredients.filter(i => i !== ing));
    setResult(null);
  };

  const handleValidate = () => {
    if (ingredients.length === 0) return;
    const validation = validateFaceMask(ingredients, problem);
    setResult(validation);
  };

  // Color mapping for problems
  const getProblemColor = (p: SkinProblem) => {
    switch(p) {
      case SkinProblem.Pimples: return 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100';
      case SkinProblem.Tanning: return 'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100';
      case SkinProblem.Dryness: return 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100';
      case SkinProblem.Oily: return 'border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-100';
      default: return 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100';
    }
  };

  const getProblemActiveColor = (p: SkinProblem) => {
    switch(p) {
      case SkinProblem.Pimples: return 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-200';
      case SkinProblem.Tanning: return 'bg-orange-500 text-white border-orange-600 ring-2 ring-orange-200';
      case SkinProblem.Dryness: return 'bg-blue-500 text-white border-blue-600 ring-2 ring-blue-200';
      case SkinProblem.Oily: return 'bg-teal-500 text-white border-teal-600 ring-2 ring-teal-200';
      default: return 'bg-purple-500 text-white border-purple-600 ring-2 ring-purple-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up pb-12">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-serif text-[#333333] mb-3">DIY Mask Validator</h2>
        <p className="text-gray-500">
          Kitchen ingredients can be tricky. Select your concern and ingredients to check if your grandmother's recipe is actually safe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Section */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl space-y-6 border border-white/50 shadow-sm">
            
            {/* Problem Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Target Concern</label>
              <div className="flex flex-wrap gap-2">
                {Object.values(SkinProblem).map((p) => (
                  <button
                    key={p}
                    onClick={() => { setProblem(p); setResult(null); }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-300
                      ${problem === p 
                        ? getProblemActiveColor(p) 
                        : getProblemColor(p)}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredient Builder */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Recipe Ingredients (Max 5)</label>
              
              {/* Selected Chips */}
              <div className="flex flex-wrap gap-2 mb-4 min-h-[50px] p-3 bg-gray-50/50 rounded-2xl border border-dashed border-gray-300">
                {ingredients.length === 0 && <span className="text-sm text-gray-400 self-center w-full text-center italic">Tap ingredients below to add to mix...</span>}
                {ingredients.map(ing => (
                  <span key={ing} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm font-medium text-[#333333] flex items-center shadow-sm animate-scale-in">
                    {ing}
                    <button onClick={() => removeIngredient(ing)} className="ml-2 text-gray-400 hover:text-red-500 bg-gray-100 rounded-full p-0.5 hover:bg-red-50 transition-colors">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>

              {/* Quick Add */}
              <p className="text-xs text-gray-400 mb-2 font-bold tracking-wider">PANTRY STAPLES:</p>
              <div className="flex flex-wrap gap-2">
                {commonIngredients.map(ing => (
                  <button
                    key={ing}
                    onClick={() => addIngredient(ing)}
                    disabled={ingredients.includes(ing)}
                    className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-bold hover:bg-[#E8F3E8] hover:text-[#557C70] hover:border-[#557C70] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    + {ing}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleValidate}
              disabled={ingredients.length === 0}
              className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 rounded-2xl font-medium hover:scale-[1.02] transition-transform shadow-lg shadow-gray-200 disabled:opacity-50 flex items-center justify-center group"
            >
              Validate Recipe <ChefHat className="ml-2 group-hover:rotate-12 transition-transform" size={18} />
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="relative">
          {result ? (
             <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 animate-scale-in relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${result.isSafe ? 'from-green-400 to-emerald-500' : 'from-red-500 to-pink-500'}`}></div>
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10 
                   ${result.isSafe ? 'bg-green-300' : 'bg-red-300'}`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-6">
                    <div className={`w-20 h-20 rounded-2xl rotate-3 flex items-center justify-center text-3xl shadow-lg
                      ${result.isSafe ? 'bg-gradient-to-br from-green-100 to-emerald-50 text-emerald-600' : 'bg-gradient-to-br from-red-100 to-rose-50 text-rose-600'}`}>
                      {result.isSafe ? <ThumbsUp size={36} /> : <AlertTriangle size={36} />}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-serif ${result.isSafe ? 'text-emerald-800' : 'text-rose-800'}`}>{result.verdict}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-400 uppercase tracking-widest mr-2">Safety Score</span>
                        <div className="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${result.isSafe ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{width: `${result.score * 10}%`}}></div>
                        </div>
                        <span className="ml-2 font-bold text-sm text-gray-600">{result.score}/10</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Warning Section */}
                    {result.warnings.length > 0 && (
                      <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100">
                        <h4 className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-3 flex items-center">
                          <AlertCircle size={14} className="mr-2" /> Red Flags Detected
                        </h4>
                        <ul className="space-y-2">
                          {result.warnings.map((w, i) => (
                            <li key={i} className="text-sm text-rose-800 flex items-start">
                              <span className="mr-2 min-w-[6px] h-1.5 mt-1.5 rounded-full bg-rose-400"></span> {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Alternatives Section */}
                    {result.betterAlternatives.length > 0 && (
                      <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                        <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3 flex items-center">
                          <CheckCircle size={14} className="mr-2" /> Dermatologist Swaps
                        </h4>
                        <p className="text-sm text-emerald-800 mb-3 opacity-80">Better ingredients for {problem}:</p>
                        <div className="flex flex-wrap gap-2">
                          {result.betterAlternatives.map((alt, i) => (
                            <span key={i} className="px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-xs font-bold text-emerald-700 shadow-sm">
                              {alt}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {result.warnings.length === 0 && (
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl text-center border border-gray-200">
                        <p className="text-gray-600 italic font-serif text-lg">"{result.explanation}"</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 text-center border-t border-gray-100 pt-6">
                    <button onClick={() => {setResult(null); setIngredients([]);}} className="text-sm text-gray-400 hover:text-[#333333] flex items-center justify-center mx-auto transition-colors">
                      <RotateCcw size={14} className="mr-2" /> Test Another Recipe
                    </button>
                  </div>
                </div>
             </div>
          ) : (
            <div className="h-full min-h-[400px] glass-card rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-8 opacity-60">
               <div className="bg-gray-50 p-6 rounded-full mb-4">
                 <ChefHat size={40} className="text-gray-300" />
               </div>
               <h3 className="text-xl font-serif text-gray-400 mb-2">Waiting for Ingredients...</h3>
               <p className="text-sm text-gray-400 max-w-xs">
                 Select a skin concern and add at least one ingredient to start the safety check.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaceMaskValidator;