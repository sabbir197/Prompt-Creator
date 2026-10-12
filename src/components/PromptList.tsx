import React, { useState } from 'react';
import { GeneratedPrompt, StockCategory, VisualStyle, AspectRatio } from '../types';
import { PromptCard } from './PromptCard';
import { Copy, RefreshCw, Check, Download, Layers } from 'lucide-react';

interface PromptListProps {
  prompts: GeneratedPrompt[];
  topic: string;
  category: StockCategory;
  visualStyle: VisualStyle;
  aspectRatio: AspectRatio;
  onRegenerate: () => void;
  isGenerating: boolean;
  favorites: GeneratedPrompt[];
  onToggleFavorite: (prompt: GeneratedPrompt) => void;
  onCopyText: (text: string, label: string) => void;
}

export const PromptList: React.FC<PromptListProps> = ({
  prompts,
  topic,
  category,
  visualStyle,
  aspectRatio,
  onRegenerate,
  isGenerating,
  favorites,
  onToggleFavorite,
  onCopyText,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyAll = () => {
    const combined = prompts
      .map(
        (p, idx) =>
          `### ${idx + 1}. ${p.angleTitle} (${p.category} | ${p.visualStyle} | ${p.aspectRatio})\n\n` +
          `[SUBJECT]: ${p.breakdown.subject}\n` +
          `[COMPOSITION]: ${p.breakdown.composition}\n` +
          `[LIGHTING]: ${p.breakdown.lighting}\n` +
          `[BACKGROUND]: ${p.breakdown.background}\n` +
          `[VISUAL STYLE]: ${p.breakdown.visualStyle}\n\n` +
          `FULL PROMPT:\n${p.fullPrompt}\n\n` +
          `MIDJOURNEY:\n/imagine prompt: ${p.midjourneyPrompt}\n\n` +
          `STOCK TITLE: ${p.recommendedStockTitle}\n` +
          `KEYWORDS: ${p.keywords.join(', ')}\n`
      )
      .join('\n----------------------------------------\n\n');

    onCopyText(combined, 'All 5 prompts');
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handleExportText = () => {
    const textContent = prompts
      .map(
        (p, idx) =>
          `# ${idx + 1}. ${p.angleTitle}\n` +
          `Category: ${p.category} | Style: ${p.visualStyle} | Aspect Ratio: ${p.aspectRatio}\n\n` +
          `[PROMPT BREAKDOWN]\n` +
          `- Subject: ${p.breakdown.subject}\n` +
          `- Composition: ${p.breakdown.composition}\n` +
          `- Lighting: ${p.breakdown.lighting}\n` +
          `- Background: ${p.breakdown.background}\n` +
          `- Style: ${p.breakdown.visualStyle}\n\n` +
          `[READY PROMPT]\n${p.fullPrompt}\n\n` +
          `[MIDJOURNEY]\n/imagine prompt: ${p.midjourneyPrompt}\n\n` +
          `[ADOBE STOCK METADATA]\n` +
          `Title: ${p.recommendedStockTitle}\n` +
          `Keywords: ${p.keywords.join(', ')}\n` +
          `Commercial Note: ${p.commercialValueTip}\n\n`
      )
      .join('\n=======================================================\n\n');

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `StockPrompts-${topic.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onCopyText('Exported all prompts to .txt file', 'File Export');
  };

  return (
    <div className="space-y-6">
      {/* List Header Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Generated for "{topic}"</span>
            <span aria-hidden="true">·</span>
            <span>{category}</span>
            <span aria-hidden="true">·</span>
            <span>{visualStyle}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{aspectRatio}</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">
            5 Commercial Stock Variations
          </h2>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            type="button"
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-xs cursor-pointer"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>All 5 Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy All 5</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleExportText}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export .TXT</span>
          </button>

          <button
            type="button"
            onClick={onRegenerate}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>
        </div>
      </div>

      {/* Prompts Cards */}
      <div className="space-y-4">
        {prompts.map((prompt, index) => {
          const isFav = favorites.some((f) => f.id === prompt.id);
          return (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              index={index}
              isFavorited={isFav}
              onToggleFavorite={onToggleFavorite}
              onCopyText={onCopyText}
            />
          );
        })}
      </div>
    </div>
  );
};
