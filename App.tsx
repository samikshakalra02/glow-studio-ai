import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RoutineBuilder from './components/RoutineBuilder';
import IngredientAnalyzer from './components/IngredientAnalyzer';
import MockupStudio from './components/MockupStudio';
import FaceMaskValidator from './components/FaceMaskValidator';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'routine':
        return <RoutineBuilder />;
      case 'analyzer':
        return <IngredientAnalyzer />;
      case 'maskValidator':
        return <FaceMaskValidator />;
      case 'studio':
        return <MockupStudio />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#333333]">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <main className={`
        min-h-screen transition-all duration-300
        md:ml-64 p-6 md:p-12
      `}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;