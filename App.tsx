
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SmartDocs from './components/SmartDocs';
import { Search, Bell, Grid, Globe } from 'lucide-react';

const Header = () => (
  <header className="h-16 bg-white border-b px-8 flex items-center justify-between sticky top-0 z-10 no-print">
    <div className="flex items-center gap-4 flex-1">
      <div className="relative max-w-md w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input 
          type="text" 
          placeholder="Global Search..." 
          className="w-full bg-gray-50 border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>
    </div>
    
    <div className="flex items-center gap-4">
      <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors relative">
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
      <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
        <Grid size={20} />
      </button>
      <div className="h-6 w-px bg-gray-200 mx-2"></div>
      <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg hover:bg-gray-50 transition-colors">
        <Globe size={16} className="text-gray-500" />
        <span className="text-xs font-bold text-gray-700">EN</span>
      </button>
    </div>
  </header>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('docs');

  const renderContent = () => {
    switch (activeTab) {
      case 'docs':
        return <SmartDocs />;
      case 'doctor':
        return (
          <div className="p-12 text-center h-[calc(100vh-10rem)] flex flex-col items-center justify-center opacity-50">
            <h2 className="text-2xl font-bold mb-2">Code Doctor (ABAP)</h2>
            <p>Otimização e análise de código Z avançada. Em breve.</p>
          </div>
        );
      case 'admin':
        return (
          <div className="p-12 text-center h-[calc(100vh-10rem)] flex flex-col items-center justify-center opacity-50">
            <h2 className="text-2xl font-bold mb-2">Admin Console</h2>
            <p>Gestão de usuários, tokens e logs.</p>
          </div>
        );
      default:
        return <SmartDocs />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
