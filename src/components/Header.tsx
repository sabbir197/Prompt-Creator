import React from 'react';
import { Sparkles, BookOpen, History, Star } from 'lucide-react';

interface HeaderProps {
  activeTab: 'generator' | 'history' | 'favorites';
  setActiveTab: (tab: 'generator' | 'history' | 'favorites') => void;
  historyCount: number;
  favoritesCount: number;
  onOpenGuidelines: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  historyCount,
  favoritesCount,
  onOpenGuidelines,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
              StockPrompt Studio
            </span>
          </div>
        </div>

        {/* Navigation Tabs - Clean typography with active indicator */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('generator')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'generator'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Prompt Studio
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <History className="w-4 h-4 text-slate-500" />
            <span>History</span>
            {historyCount > 0 && (
              <span className="text-xs text-slate-500 font-mono tabular-nums">
                ({historyCount})
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('favorites')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'favorites'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Star className="w-4 h-4 text-amber-500" />
            <span>Saved</span>
            {favoritesCount > 0 && (
              <span className="text-xs text-slate-500 font-mono tabular-nums">
                ({favoritesCount})
              </span>
            )}
          </button>
        </nav>

        {/* Primary Action Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenGuidelines}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors whitespace-nowrap shadow-xs focus-visible:outline-2 focus-visible:outline-slate-900"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Contributor Guidelines</span>
            <span className="sm:hidden">Guidelines</span>
          </button>
        </div>
      </div>
    </header>
  );
};
