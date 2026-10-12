import React, { useState } from 'react';
import { StockCategory, VisualStyle, AspectRatio } from '../types';
import { STOCK_CATEGORIES, VISUAL_STYLES, ASPECT_RATIOS, TOPIC_SUGGESTIONS } from '../data/categories';
import { Sparkles, RefreshCw, AlertCircle, Wand2 } from 'lucide-react';

interface PromptFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  category: StockCategory;
  setCategory: (cat: StockCategory) => void;
  visualStyle: VisualStyle;
  setVisualStyle: (style: VisualStyle) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ar: AspectRatio) => void;
  onGenerate: () => void;
  onRegenerate: () => void;
  isGenerating: boolean;
  hasPrompts: boolean;
}

export const PromptForm: React.FC<PromptFormProps> = ({
  topic,
  setTopic,
  category,
  setCategory,
  visualStyle,
  setVisualStyle,
  aspectRatio,
  setAspectRatio,
  onGenerate,
  onRegenerate,
  isGenerating,
  hasPrompts,
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setValidationError('Please enter a topic or select one from the suggestions below.');
      return;
    }
    setValidationError(null);
    onGenerate();
  };

  const handleSuggestionClick = (suggestion: (typeof TOPIC_SUGGESTIONS)[0]) => {
    setTopic(suggestion.topic);
    setCategory(suggestion.category);
    setVisualStyle(suggestion.style);
    setValidationError(null);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-7">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Topic Input Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="topic-input" className="text-sm font-semibold text-slate-900">
              Stock Topic or Concept <span className="text-rose-500">*</span>
            </label>
            <span className="text-xs text-slate-500">e.g. Winter Aesthetic, Eco-Friendly Products</span>
          </div>
          
          <div className="relative">
            <input
              id="topic-input"
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="e.g. Winter Aesthetic, Eco-Friendly Products, Remote Work Collaboration..."
              className={`w-full px-4 py-3 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 bg-white transition-colors focus-visible:outline-2 focus-visible:outline-slate-900 ${
                validationError ? 'border-rose-400 focus-visible:outline-rose-500' : 'border-slate-300 hover:border-slate-400'
              }`}
              disabled={isGenerating}
            />
          </div>

          {/* Validation Feedback */}
          {validationError && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-rose-600 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Quick Inspiration Topics */}
          <div className="mt-3">
            <span className="text-xs text-slate-500 mr-2">Try quick topic:</span>
            <div className="inline-flex flex-wrap gap-1.5 mt-1">
              {TOPIC_SUGGESTIONS.slice(0, 6).map((item) => (
                <button
                  key={item.topic}
                  type="button"
                  onClick={() => handleSuggestionClick(item)}
                  className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 rounded-md transition-colors"
                >
                  {item.topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dropdowns Row: Category & Visual Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Category Dropdown */}
          <div>
            <label htmlFor="category-select" className="block text-sm font-semibold text-slate-900 mb-1.5">
              Category
            </label>
            <select
              id="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value as StockCategory)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white hover:border-slate-400 focus-visible:outline-2 focus-visible:outline-slate-900 transition-colors"
              disabled={isGenerating}
            >
              {STOCK_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label} ({cat.description.split(',')[0]})
                </option>
              ))}
            </select>
          </div>

          {/* Visual Style Dropdown */}
          <div>
            <label htmlFor="style-select" className="block text-sm font-semibold text-slate-900 mb-1.5">
              Visual Style
            </label>
            <select
              id="style-select"
              value={visualStyle}
              onChange={(e) => setVisualStyle(e.target.value as VisualStyle)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white hover:border-slate-400 focus-visible:outline-2 focus-visible:outline-slate-900 transition-colors"
              disabled={isGenerating}
            >
              {VISUAL_STYLES.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.label} - {st.description.slice(0, 32)}...
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Aspect Ratio Selector */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Aspect Ratio
          </label>
          <div className="grid grid-cols-5 gap-2">
            {ASPECT_RATIOS.map((ar) => {
              const isSelected = aspectRatio === ar.id;
              return (
                <button
                  key={ar.id}
                  type="button"
                  onClick={() => setAspectRatio(ar.id)}
                  disabled={isGenerating}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-center transition-all ${
                    isSelected
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {/* Aspect Ratio Visual Indicator Box */}
                  <div className="h-6 flex items-center justify-center mb-1.5">
                    <div
                      className={`border ${
                        isSelected ? 'border-white bg-white/20' : 'border-slate-400 bg-slate-100'
                      } rounded-xs`}
                      style={{
                        width:
                          ar.id === '16:9'
                            ? '24px'
                            : ar.id === '3:2'
                            ? '21px'
                            : ar.id === '4:3'
                            ? '19px'
                            : ar.id === '1:1'
                            ? '16px'
                            : '12px',
                        height:
                          ar.id === '9:16'
                            ? '22px'
                            : ar.id === '1:1'
                            ? '16px'
                            : ar.id === '4:3'
                            ? '14px'
                            : ar.id === '3:2'
                            ? '14px'
                            : '13px',
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold tabular-nums leading-none">
                    {ar.label}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Selected: <span className="font-semibold text-slate-700">{aspectRatio}</span> —{' '}
            {ASPECT_RATIOS.find((r) => r.id === aspectRatio)?.bestFor}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="submit"
            disabled={isGenerating}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 disabled:opacity-60 transition-all shadow-xs focus-visible:outline-2 focus-visible:outline-slate-900 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Generating 5 Stock Prompts...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-amber-400" />
                <span>Generate 5 Professional Prompts</span>
              </>
            )}
          </button>

          {hasPrompts && (
            <button
              type="button"
              onClick={onRegenerate}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-300 bg-white text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 text-slate-600 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>Regenerate Variations</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
