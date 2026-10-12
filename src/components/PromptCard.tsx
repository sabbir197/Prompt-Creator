import React, { useState } from 'react';
import { GeneratedPrompt } from '../types';
import { Copy, Check, Star, Sparkles, Tag, ChevronDown, ChevronUp, Layers, Compass } from 'lucide-react';

interface PromptCardProps {
  prompt: GeneratedPrompt;
  index: number;
  isFavorited: boolean;
  onToggleFavorite: (prompt: GeneratedPrompt) => void;
  onCopyText: (text: string, label: string) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  index,
  isFavorited,
  onToggleFavorite,
  onCopyText,
}) => {
  const [activeView, setActiveView] = useState<'breakdown' | 'fullPrompt' | 'metadata'>('breakdown');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string, label: string) => {
    onCopyText(text, label);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  };

  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all overflow-hidden">
      {/* Card Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="font-mono text-slate-700 font-semibold tabular-nums">0{index + 1}</span>
              <span aria-hidden="true">·</span>
              <span>{prompt.category}</span>
              <span aria-hidden="true">·</span>
              <span>{prompt.visualStyle}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono font-semibold text-slate-700">{prompt.aspectRatio}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              {prompt.angleTitle}
            </h3>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Favorite Button */}
            <button
              type="button"
              onClick={() => onToggleFavorite(prompt)}
              aria-label={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
              className={`p-2 rounded-lg border transition-colors ${
                isFavorited
                  ? 'border-amber-300 bg-amber-50 text-amber-600'
                  : 'border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorited ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>

            {/* Copy Full Prompt Button */}
            <button
              type="button"
              onClick={() => handleCopy(prompt.fullPrompt, 'full', 'Full prompt')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
            >
              {copiedKey === 'full' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* View Switcher Tabs (Structured Breakdown / Full Prompt / Contributor Metadata) */}
        <div className="flex items-center gap-1 mt-4 pt-3 border-t border-slate-200/60">
          <button
            type="button"
            onClick={() => setActiveView('breakdown')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeView === 'breakdown'
                ? 'bg-slate-900 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Structured Breakdown
          </button>
          <button
            type="button"
            onClick={() => setActiveView('fullPrompt')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeView === 'fullPrompt'
                ? 'bg-slate-900 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Ready-to-Paste Prompt
          </button>
          <button
            type="button"
            onClick={() => setActiveView('metadata')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeView === 'metadata'
                ? 'bg-slate-900 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Stock Title & Tags
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6">
        {/* VIEW 1: STRUCTURED BREAKDOWN */}
        {activeView === 'breakdown' && (
          <div className="space-y-3.5 text-sm">
            {/* Subject */}
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                1. Subject
              </span>
              <p className="text-slate-800 leading-relaxed font-normal">
                {prompt.breakdown.subject}
              </p>
            </div>

            {/* Composition */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                2. Composition & Framing
              </span>
              <p className="text-slate-800 leading-relaxed font-normal">
                {prompt.breakdown.composition}
              </p>
            </div>

            {/* Lighting */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                3. Lighting
              </span>
              <p className="text-slate-800 leading-relaxed font-normal">
                {prompt.breakdown.lighting}
              </p>
            </div>

            {/* Background */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                4. Background & Environment
              </span>
              <p className="text-slate-800 leading-relaxed font-normal">
                {prompt.breakdown.background}
              </p>
            </div>

            {/* Visual Style */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                5. Visual Style & Rendering
              </span>
              <p className="text-slate-800 leading-relaxed font-normal">
                {prompt.breakdown.visualStyle}
              </p>
            </div>
          </div>
        )}

        {/* VIEW 2: READY-TO-PASTE FULL PROMPTS */}
        {activeView === 'fullPrompt' && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Universal / Adobe Firefly Prompt
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(prompt.fullPrompt, 'full-view', 'Firefly Prompt')}
                  className="text-xs text-slate-600 hover:text-slate-900 font-medium inline-flex items-center gap-1"
                >
                  {copiedKey === 'full-view' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'full-view' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed font-mono text-slate-800 select-all">
                {prompt.fullPrompt}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Midjourney v6.1 Command
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(prompt.midjourneyPrompt, 'mj', 'Midjourney Prompt')}
                  className="text-xs text-slate-600 hover:text-slate-900 font-medium inline-flex items-center gap-1"
                >
                  {copiedKey === 'mj' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'mj' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed font-mono text-slate-800 select-all">
                /imagine prompt: {prompt.midjourneyPrompt}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: STOCK METADATA (TITLE & TAGS) */}
        {activeView === 'metadata' && (
          <div className="space-y-4 text-sm">
            {/* Recommended Stock Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Recommended Adobe Stock Title
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(prompt.recommendedStockTitle, 'title', 'Title')}
                  className="text-xs text-slate-600 hover:text-slate-900 font-medium inline-flex items-center gap-1"
                >
                  {copiedKey === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'title' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900">
                {prompt.recommendedStockTitle}
              </p>
            </div>

            {/* Recommended Stock Keywords */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Adobe Stock Keywords ({prompt.keywords.length} tags)
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(prompt.keywords.join(', '), 'tags', 'Keywords')}
                  className="text-xs text-slate-600 hover:text-slate-900 font-medium inline-flex items-center gap-1"
                >
                  {copiedKey === 'tags' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'tags' ? 'Copied Tags' : 'Copy Tags (CSV)'}</span>
                </button>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-700 leading-relaxed">
                {prompt.keywords.join(', ')}
              </div>
            </div>

            {/* Copy Space & Commercial Tip */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <span className="text-xs font-bold text-slate-900 block">
                Copy Space Layout
              </span>
              <p className="text-xs text-slate-600">
                {prompt.copySpaceLocation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Commercial Insight */}
      <div className="px-5 py-3 sm:px-6 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="line-clamp-1">{prompt.commercialValueTip}</span>
        </div>
      </div>
    </article>
  );
};
