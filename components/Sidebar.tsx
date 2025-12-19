
import React from 'react';
import { 
  FileText, 
  Stethoscope, 
  Settings, 
  Database, 
  HelpCircle, 
  Menu,
  Sparkles,
  Layers
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'docs', label: 'Smart Docs', icon: FileText },
    { id: 'doctor', label: 'Code Doctor (ABAP)', icon: Stethoscope },
    { id: 'automation', label: 'ERP Automation', icon: Layers },
    { id: 'admin', label: 'Admin Console', icon: Settings },
    { id: 'db', label: 'Database Config', icon: Database },
    { id: 'help', label: 'Documentation', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-white border-r h-screen flex flex-col sticky top-0 no-print">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <Sparkles size={24} />
        </div>
        <div>
          <h1 className="font-bold text-gray-900 text-lg leading-tight">AutoFlow</h1>
          <p className="text-xs text-gray-500">Enterprise AI Suite</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Main Menu</p>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
            DG
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-900 truncate">David Gomes</p>
            <p className="text-[10px] text-gray-500 truncate">davidgomesdgn@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
