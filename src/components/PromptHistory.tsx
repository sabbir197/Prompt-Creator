import React, { useState } from 'react';
import { GenerationSession, GeneratedPrompt } from '../types';
import { History, Trash2, ArrowUpRight, Star, Clock, Search, Layers } from 'lucide-react';
import { PromptCard } from './PromptCard';

interface PromptHistoryProps {
  sessions: GenerationSession[];
  favorites: GeneratedPrompt[];
  onSelectSession: (session: GenerationSession) => void;
  onDeleteSession: (sessionId: string) => void;
  onClearHistory: () => void;
  onToggleFavorite: (prompt: GeneratedPrompt) => void;
  onCopyText: (text: string, label: string) => void;
  activeView: 'history' | 'favorites';
  setActiveView: (view: 'history' | 'favorites') => void;
}

export const PromptHistory: React.FC<PromptHistoryProps> = ({
  sessions,
  favorites,
  onSelectSession,
  onDeleteSession,
  onClearHistory,
  onToggleFavorite,
  onCopyText,
  activeView,
  setActiveView,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const filteredSessions = sessions.filter((s) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.topic.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.visualStyle.toLowerCase().includes(q)
    );
  });

  const filteredFavorites = favorites.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.angleTitle.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.visualStyle.toLowerCase().includes(q) ||
      p.breakdown.subject.toLowerCase().includes(q)
    );
  });

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-Navigation */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg inline-flex">
            <button
              type="button"
              onClick={() => setActiveView('history')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeView === 'history'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Session History ({sessions.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveView('favorites')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeView === 'favorites'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Saved Prompts ({favorites.length})
            </button>
          </div>
        </div>

        {/* Search input & clear button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search past prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-slate-900"
            />
          </div>

          {activeView === 'history' && sessions.length > 0 && (
            <div>
              {showClearConfirm ? (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      onClearHistory();
                      setShowClearConfirm(false);
                    }}
                    className="px-2.5 py-1.5 bg-rose-600 text-white text-xs font-semibold rounded-lg hover:bg-rose-700 transition-colors"
                  >
                    Confirm Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(false)}
                    className="px-2.5 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-200 transition-colors"
                  title="Clear all history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SESSIONS VIEW */}
      {activeView === 'history' && (
        <>
          {filteredSessions.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
              <History className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">
                {sessions.length === 0 ? 'No Prompt History Yet' : 'No matching sessions found'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {sessions.length === 0
                  ? 'Generate your first set of prompts and they will automatically save here in your browser.'
                  : 'Try searching with a different keyword.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formatDate(session.timestamp)}</span>
                      </div>
                      <span className="font-mono tabular-nums text-slate-600 font-medium">
                        {session.prompts.length} prompts
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-2">
                      {session.topic}
                    </h4>

                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <span>{session.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{session.visualStyle}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{session.aspectRatio}</span>
                    </div>

                    <p className="text-xs text-slate-500 mt-3 line-clamp-2 italic">
                      "{session.prompts[0]?.breakdown.subject.slice(0, 110)}..."
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => onDeleteSession(session.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      title="Delete this session"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectSession(session)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-slate-700 p-1 rounded"
                    >
                      <span>Load 5 Prompts</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* FAVORITES VIEW */}
      {activeView === 'favorites' && (
        <>
          {filteredFavorites.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
              <Star className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">
                {favorites.length === 0 ? 'No Saved Prompts' : 'No matching saved prompts'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {favorites.length === 0
                  ? 'Click the star icon on any prompt card in the studio to save it here for quick access.'
                  : 'Try searching with a different keyword.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFavorites.map((fav, idx) => (
                <PromptCard
                  key={fav.id}
                  prompt={fav}
                  index={idx}
                  isFavorited={true}
                  onToggleFavorite={onToggleFavorite}
                  onCopyText={onCopyText}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
