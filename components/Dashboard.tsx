import React from 'react';
import { Sparkles, FlaskConical, Camera, ArrowRight, Stars, ChefHat } from 'lucide-react';
import { ViewState } from '../types';

interface DashboardProps {
  onNavigate: (view: ViewState) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-[80vh] flex flex-col justify-center">
      {/* Animated Background Blobs - Colorful & Attractive */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      </div>

      <header className="mb-12 animate-fade-in-up relative z-10">
        <div className="flex items-center gap-2 mb-4">
           <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-md shadow-indigo-200">Beta v2.0</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-serif font-medium text-[#333333] mb-4 leading-tight">
          Welcome to <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">GlowStudio.</span>
        </h1>
        <p className="text-xl text-gray-500 font-light max-w-2xl">
          Your personal AI aesthetician. Design routines, analyze ingredients, and visualize products in our digital lab.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {/* Card 1 - Routine */}
        <button 
          onClick={() => onNavigate('routine')}
          className="group relative text-left glass-card p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up delay-100 overflow-hidden border-t-4 border-t-amber-400"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:rotate-12">
            <Sparkles size={80} className="text-amber-500" />
          </div>
          
          <div className="bg-gradient-to-br from-amber-100 to-orange-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-inner">
            <Sparkles className="text-amber-600" size={24} />
          </div>
          <h3 className="text-xl font-serif text-[#333333] mb-2 group-hover:text-amber-600 transition-colors">Routine Builder</h3>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            Craft a personalized AM/PM regimen tailored specifically to your skin type.
          </p>
          <div className="flex items-center text-[#333333] font-medium text-xs group-hover:translate-x-2 transition-transform duration-300">
            Start Consultation <ArrowRight size={14} className="ml-2 text-amber-500" />
          </div>
        </button>

        {/* Card 2 - Analyzer */}
        <button 
          onClick={() => onNavigate('analyzer')}
          className="group relative text-left glass-card p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up delay-200 overflow-hidden border-t-4 border-t-emerald-400"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:-rotate-12">
            <FlaskConical size={80} className="text-emerald-500" />
          </div>

          <div className="bg-gradient-to-br from-emerald-100 to-teal-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-inner">
            <FlaskConical className="text-emerald-600" size={24} />
          </div>
          <h3 className="text-xl font-serif text-[#333333] mb-2 group-hover:text-emerald-600 transition-colors">Ingredient Analyzer</h3>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            Decode complex labels and check product safety scores instantly.
          </p>
          <div className="flex items-center text-[#333333] font-medium text-xs group-hover:translate-x-2 transition-transform duration-300">
            Analyze Formula <ArrowRight size={14} className="ml-2 text-emerald-500" />
          </div>
        </button>
        
        {/* Card 4 - Mask Validator */}
        <button 
          onClick={() => onNavigate('maskValidator')}
          className="group relative text-left glass-card p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up delay-400 overflow-hidden border-t-4 border-t-rose-400"
        >
           <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:rotate-12">
            <ChefHat size={80} className="text-rose-500" />
          </div>

          <div className="bg-gradient-to-br from-rose-100 to-pink-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-inner">
            <ChefHat className="text-rose-600" size={24} />
          </div>
          <h3 className="text-xl font-serif text-[#333333] mb-2 group-hover:text-rose-600 transition-colors">Mask Validator</h3>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            Validate your kitchen DIY face masks before you apply them.
          </p>
          <div className="flex items-center text-[#333333] font-medium text-xs group-hover:translate-x-2 transition-transform duration-300">
            Check Recipe <ArrowRight size={14} className="ml-2 text-rose-500" />
          </div>
        </button>

        {/* Card 3 - Studio */}
        <button 
          onClick={() => onNavigate('studio')}
          className="group relative text-left glass-card p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up delay-300 overflow-hidden border-t-4 border-t-indigo-400"
        >
           <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:rotate-45">
            <Camera size={80} className="text-indigo-500" />
          </div>

          <div className="bg-gradient-to-br from-indigo-100 to-purple-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-inner">
            <Camera className="text-indigo-600" size={24} />
          </div>
          <h3 className="text-xl font-serif text-[#333333] mb-2 group-hover:text-indigo-600 transition-colors">Product Studio</h3>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            Turn simple photos of mixtures into editorial product photography.
          </p>
          <div className="flex items-center text-[#333333] font-medium text-xs group-hover:translate-x-2 transition-transform duration-300">
            Enter Studio <ArrowRight size={14} className="ml-2 text-indigo-500" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;