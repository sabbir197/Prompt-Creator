/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StockCategory, VisualStyle, AspectRatio, GeneratedPrompt, GenerationSession } from './types';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { PromptList } from './components/PromptList';
import { PromptHistory } from './components/PromptHistory';
import { EmptyState } from './components/EmptyState';
import { ContributorTipsModal } from './components/ContributorTipsModal';
import { Toast, ToastMessage } from './components/Toast';
import { generatePromptsForTopic } from './utils/promptGenerator';
import {
  loadHistoryFromStorage,
  saveSessionToStorage,
  deleteSessionFromStorage,
  clearHistoryFromStorage,
  loadFavoritesFromStorage,
  toggleFavoriteInStorage,
} from './utils/storage';

export default function App() {
  const [topic, setTopic] = useState<string>('Winter Aesthetic');
  const [category, setCategory] = useState<StockCategory>('Nature');
  const [visualStyle, setVisualStyle] = useState<VisualStyle>('Photorealistic');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');

  const [prompts, setPrompts] = useState<GeneratedPrompt[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [sessions, setSessions] = useState<GenerationSession[]>([]);
  const [favorites, setFavorites] = useState<GeneratedPrompt[]>([]);

  const [activeTab, setActiveTab] = useState<'generator' | 'history' | 'favorites'>('generator');
  const [historySubView, setHistorySubView] = useState<'history' | 'favorites'>('history');
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Load saved history & favorites on mount
  useEffect(() => {
    const loadedSessions = loadHistoryFromStorage();
    const loadedFavorites = loadFavoritesFromStorage();
    setSessions(loadedSessions);
    setFavorites(loadedFavorites);
  }, []);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({
      id: `${Date.now()}-${Math.random()}`,
      type,
      text,
    });
  };

  const handleCopyText = async (text: string, label: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older environments
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      showToast(`${label} copied to clipboard!`, 'success');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      showToast('Could not copy to clipboard', 'error');
    }
  };

  const handleGenerate = () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    // Smooth transition simulation for polish
    setTimeout(() => {
      const newPrompts = generatePromptsForTopic(topic, category, visualStyle, aspectRatio);
      setPrompts(newPrompts);

      const newSession: GenerationSession = {
        id: `session-${Date.now()}`,
        topic: topic.trim(),
        category,
        visualStyle,
        aspectRatio,
        timestamp: Date.now(),
        prompts: newPrompts,
      };

      const updatedSessions = saveSessionToStorage(newSession);
      setSessions(updatedSessions);
      setIsGenerating(false);
      showToast('Generated 5 commercial stock prompts!', 'success');
    }, 450);
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  const handleSelectTopicFromEmptyState = (
    suggestedTopic: string,
    suggestedCategory: StockCategory,
    suggestedStyle: VisualStyle
  ) => {
    setTopic(suggestedTopic);
    setCategory(suggestedCategory);
    setVisualStyle(suggestedStyle);

    setIsGenerating(true);
    setTimeout(() => {
      const newPrompts = generatePromptsForTopic(suggestedTopic, suggestedCategory, suggestedStyle, aspectRatio);
      setPrompts(newPrompts);

      const newSession: GenerationSession = {
        id: `session-${Date.now()}`,
        topic: suggestedTopic,
        category: suggestedCategory,
        visualStyle: suggestedStyle,
        aspectRatio,
        timestamp: Date.now(),
        prompts: newPrompts,
      };

      const updated = saveSessionToStorage(newSession);
      setSessions(updated);
      setIsGenerating(false);
      showToast(`Generated 5 prompts for "${suggestedTopic}"!`, 'success');
    }, 450);
  };

  const handleSelectSession = (session: GenerationSession) => {
    setTopic(session.topic);
    setCategory(session.category);
    setVisualStyle(session.visualStyle);
    setAspectRatio(session.aspectRatio);
    setPrompts(session.prompts);
    setActiveTab('generator');
    showToast(`Loaded prompts for "${session.topic}"`, 'info');
  };

  const handleDeleteSession = (sessionId: string) => {
    const updated = deleteSessionFromStorage(sessionId);
    setSessions(updated);
    showToast('Session removed from history', 'info');
  };

  const handleClearHistory = () => {
    clearHistoryFromStorage();
    setSessions([]);
    showToast('Prompt history cleared', 'info');
  };

  const handleToggleFavorite = (prompt: GeneratedPrompt) => {
    const { favorites: updatedFavorites, isFavorited } = toggleFavoriteInStorage(prompt);
    setFavorites(updatedFavorites);
    if (isFavorited) {
      showToast('Saved to Favorites!', 'success');
    } else {
      showToast('Removed from Favorites', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'history') setHistorySubView('history');
          if (tab === 'favorites') setHistorySubView('favorites');
        }}
        historyCount={sessions.length}
        favoritesCount={favorites.length}
        onOpenGuidelines={() => setIsGuidelinesOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* SUBVIEW: PROMPT STUDIO GENERATOR */}
        {activeTab === 'generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form Controls (sticky on large screens) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              <PromptForm
                topic={topic}
                setTopic={setTopic}
                category={category}
                setCategory={setCategory}
                visualStyle={visualStyle}
                setVisualStyle={setVisualStyle}
                aspectRatio={aspectRatio}
                setAspectRatio={setAspectRatio}
                onGenerate={handleGenerate}
                onRegenerate={handleRegenerate}
                isGenerating={isGenerating}
                hasPrompts={prompts.length > 0}
              />

              {/* Contributor Quick Advice Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs text-xs text-slate-600 space-y-2">
                <span className="font-bold text-slate-900 block">
                  Commercial Stock Pro Tip:
                </span>
                <p className="leading-relaxed">
                  All 5 prompts include dedicated negative space and specify zero copyrighted brand logos or trademarks, ensuring high acceptance rates on Adobe Stock.
                </p>
              </div>
            </div>

            {/* Right Column: Prompts List or Empty State */}
            <div className="lg:col-span-7">
              {prompts.length > 0 ? (
                <PromptList
                  prompts={prompts}
                  topic={topic}
                  category={category}
                  visualStyle={visualStyle}
                  aspectRatio={aspectRatio}
                  onRegenerate={handleRegenerate}
                  isGenerating={isGenerating}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  onCopyText={handleCopyText}
                />
              ) : (
                <EmptyState onSelectTopic={handleSelectTopicFromEmptyState} />
              )}
            </div>
          </div>
        )}

        {/* SUBVIEW: HISTORY & SAVED FAVORITES */}
        {(activeTab === 'history' || activeTab === 'favorites') && (
          <PromptHistory
            sessions={sessions}
            favorites={favorites}
            onSelectSession={handleSelectSession}
            onDeleteSession={handleDeleteSession}
            onClearHistory={handleClearHistory}
            onToggleFavorite={handleToggleFavorite}
            onCopyText={handleCopyText}
            activeView={historySubView}
            setActiveView={(view) => {
              setHistorySubView(view);
              setActiveTab(view);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            StockPrompt Studio · Built for Adobe Stock, Midjourney & Firefly contributors
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsGuidelinesOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              Submission Guidelines
            </button>
            <span aria-hidden="true">·</span>
            <span>Local Prompt Engine (No API key required)</span>
          </div>
        </div>
      </footer>

      {/* Modals & Toasts */}
      <ContributorTipsModal
        isOpen={isGuidelinesOpen}
        onClose={() => setIsGuidelinesOpen(false)}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
