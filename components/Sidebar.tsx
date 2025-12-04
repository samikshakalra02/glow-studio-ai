import React from 'react';
import { Home, Sparkles, FlaskConical, Camera, Menu, X, ArrowRight, ChefHat } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, setIsOpen }) => {
  const navItems: { id: ViewState; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Home', icon: <Home size={20} /> },
    { id: 'routine', label: 'Routine Builder', icon: <Sparkles size={20} /> },
    { id: 'analyzer', label: 'Analyzer', icon: <FlaskConical size={20} /> },
    { id: 'maskValidator', label: 'Mask Validator', icon: <ChefHat size={20} /> },
    { id: 'studio', label: 'Mockup Studio', icon: <Camera size={20} /> },
  ];

  return (
    <>
      {/* Mobile Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-3 bg-white/80 backdrop-blur rounded-full shadow-sm md:hidden text-[#333333] hover:bg-white transition-all"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-white/90 backdrop-blur-md border-r border-gray-100 z-40 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="p-8 h-full flex flex-col">
          <div 
            onClick={() => setView('dashboard')}
            className="flex items-center gap-3 font-light text-2xl tracking-tight text-[#333333] mb-16 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-serif font-bold group-hover:rotate-180 transition-transform duration-700 shadow-lg">G</div>
            <span className="font-serif group-hover:tracking-wide transition-all duration-300">GlowStudio.</span>
          </div>

          <nav className="space-y-3 flex-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group
                  ${currentView === item.id 
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg shadow-gray-300 transform scale-[1.02]' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-[#333333]'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <span className={`transition-transform duration-300 ${currentView === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </div>
                {currentView === item.id && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-gray-100">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 relative overflow-hidden group cursor-pointer border border-emerald-100">
               <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
               <p className="text-[10px] font-bold text-emerald-600 tracking-widest mb-2">PRO ACCESS</p>
               <p className="font-serif text-[#333333] text-lg leading-tight mb-4">Unlock Model v4.0</p>
               <div className="flex items-center text-xs font-bold text-[#333333]">
                 UPGRADE NOW <ArrowRight size={12} className="ml-2 group-hover:translate-x-1 transition-transform" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;