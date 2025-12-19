
import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  ChevronDown, 
  Check, 
  Sparkles,
  Download,
  Printer,
  FileCode,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { DocumentType, SAPModule, ProjectDetails } from '../types';
import { generateSAPDocument } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const SmartDocs: React.FC = () => {
  const [details, setDetails] = useState<ProjectDetails>({
    title: '',
    client: '',
    type: DocumentType.FUNCTIONAL_SPEC,
    modules: [SAPModule.MM],
    description: '',
    includeAbap: true,
    testPlan: true,
    effortEstimation: true,
    effortBreakdown: true,
  });

  const [loading, setLoading] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState<string | null>(null);

  const modules = Object.values(SAPModule);
  const docTypes = Object.values(DocumentType);

  const toggleModule = (mod: SAPModule) => {
    setDetails(prev => ({
      ...prev,
      modules: prev.modules.includes(mod)
        ? prev.modules.filter(m => m !== mod)
        : [...prev.modules, mod]
    }));
  };

  const handleGenerate = async () => {
    if (!details.title || !details.description) {
      alert("Por favor, preencha o título e a descrição funcional.");
      return;
    }
    setLoading(true);
    try {
      const result = await generateSAPDocument(details);
      setGeneratedDoc(result);
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar documento.");
    } finally {
      setLoading(false);
    }
  };

  const downloadTxt = () => {
    if (!generatedDoc) return;
    const blob = new Blob([generatedDoc], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${details.title || 'spec'}.txt`;
    a.click();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto flex gap-8">
      {/* Left Column: Form */}
      <div className="flex-1 max-w-xl space-y-6 no-print">
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <FileText size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">PROJECT DETAILS</h2>
            <span className="ml-auto flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">
              <Sparkles size={10} /> Unlimited
            </span>
          </div>

          <div className="space-y-4">
            {/* Doc Type */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Document Type</label>
              <div className="relative">
                <select 
                  className="w-full appearance-none bg-gray-50 border rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={details.type}
                  onChange={(e) => setDetails({...details, type: e.target.value as DocumentType})}
                >
                  {docTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Project Title */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Project Title *</label>
              <input 
                type="text"
                placeholder="Ex: S/4HANA Implementation Finance"
                className="w-full bg-gray-50 border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                value={details.title}
                onChange={(e) => setDetails({...details, title: e.target.value})}
              />
            </div>

            {/* Client Name */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Client Name</label>
              <input 
                type="text"
                placeholder="e.g. Acme Corp"
                className="w-full bg-gray-50 border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                value={details.client}
                onChange={(e) => setDetails({...details, client: e.target.value})}
              />
            </div>

            {/* Modules */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Modules</label>
                <button 
                  className="text-[10px] font-bold text-indigo-600 hover:underline"
                  onClick={() => setDetails({...details, modules: modules})}
                >
                  Select All
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {modules.map(mod => (
                  <button
                    key={mod}
                    onClick={() => toggleModule(mod)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                      details.modules.includes(mod)
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {mod}
                  </button>
                ))}
              </div>
            </div>

            {/* Functional Description */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Functional Description *</label>
              <textarea 
                rows={5}
                placeholder="Descreva o requisito em linguagem natural..."
                className="w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                value={details.description}
                onChange={(e) => setDetails({...details, description: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Branding & Logos */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
           <div className="flex items-center gap-3 mb-6">
            <AlertCircle size={18} className="text-gray-400" />
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Branding & Logos</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="border-2 border-dashed border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:border-indigo-100 transition-colors cursor-pointer group">
                <Upload size={20} className="text-gray-300 group-hover:text-indigo-400 transition-colors" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Consulting Logo</span>
             </div>
             <div className="border-2 border-dashed border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:border-indigo-100 transition-colors cursor-pointer group">
                <Upload size={20} className="text-gray-300 group-hover:text-indigo-400 transition-colors" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Client Logo</span>
             </div>
          </div>
          <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 border-2 border-dashed border-indigo-100 rounded-xl text-[10px] font-bold text-indigo-600 hover:bg-indigo-50 transition-all uppercase tracking-widest">
            <Upload size={14} /> Upload Template (.TXT)
          </button>
        </div>

        {/* Structure Config */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
           <div className="flex justify-between items-center mb-6">
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Document Structure</h2>
            <button className="text-[10px] font-bold text-white bg-gray-900 px-2 py-0.5 rounded-sm">SELECT ALL</button>
          </div>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={details.includeAbap} 
                onChange={() => setDetails({...details, includeAbap: !details.includeAbap})}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <FileCode size={16} className="text-gray-400 group-hover:text-indigo-600" />
              <span className="text-sm font-semibold text-gray-700">Include ABAP Development</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={details.testPlan} 
                onChange={() => setDetails({...details, testPlan: !details.testPlan})}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <Check size={16} className="text-gray-400 group-hover:text-indigo-600" />
              <span className="text-sm font-semibold text-gray-700">Test Plan & Scenarios</span>
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={details.effortEstimation} 
                  onChange={() => setDetails({...details, effortEstimation: !details.effortEstimation})}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <Check size={16} className="text-gray-400 group-hover:text-indigo-600" />
                <span className="text-sm font-semibold text-gray-700">Effort Estimation</span>
              </label>
              {details.effortEstimation && (
                <div className="ml-9 space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={details.effortBreakdown}
                      onChange={() => setDetails({...details, effortBreakdown: !details.effortBreakdown})}
                      className="w-3 h-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-medium text-gray-500">Calculation Breakdown</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-indigo-100 transition-all disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Sparkles size={20} />
          )}
          GENERATE DOCUMENT
        </button>
      </div>

      {/* Right Column: Preview */}
      <div className="flex-[1.5] bg-white rounded-2xl border p-8 shadow-sm h-[calc(100vh-8rem)] overflow-hidden flex flex-col sticky top-24">
        <div className="flex items-center justify-between mb-8 no-print">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
               <FileText size={18} />
            </div>
            <h3 className="font-bold text-gray-900 tracking-tight">Generated Output</h3>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={downloadTxt}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-bold rounded-xl border transition-all"
            >
              <Download size={14} /> TXT
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold rounded-xl border border-indigo-100 transition-all"
            >
              <Printer size={14} /> PRINT / PDF
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-4 scroll-smooth print:overflow-visible">
          {generatedDoc ? (
            <div className="prose prose-sm max-w-none text-gray-800 sap-preview">
              <ReactMarkdown 
                components={{
                  hr: () => <div className="my-10 border-t-2 border-dashed border-gray-100 relative"><span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 text-[10px] font-bold text-gray-300 uppercase tracking-widest">Page Break</span></div>,
                  h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-indigo-900 mb-6 mt-12 first:mt-0" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl font-bold text-gray-900 border-b-2 border-indigo-50 pb-2 mb-4 mt-10" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg font-bold text-gray-800 mb-3 mt-8" {...props} />,
                  table: ({node, ...props}) => (
                    <div className="my-6 overflow-x-auto border rounded-xl">
                      <table className="min-w-full divide-y divide-gray-200" {...props} />
                    </div>
                  ),
                  thead: ({node, ...props}) => <thead className="bg-gray-50" {...props} />,
                  th: ({node, ...props}) => <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest" {...props} />,
                  td: ({node, ...props}) => <td className="px-4 py-3 text-sm text-gray-600 border-t" {...props} />,
                }}
              >
                {generatedDoc.replace(/--- PAGE BREAK ---/g, '\n\n***\n\n')}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <FileText size={32} className="text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-500">Documento pendente de geração...</p>
              <p className="text-xs text-gray-400 mt-1 max-w-xs">Preencha os detalhes à esquerda e clique em "Generate Document" para iniciar a IA.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartDocs;
