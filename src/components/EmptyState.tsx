import React from 'react';
import { Sparkles, ShieldCheck, Camera, Layers, ArrowRight } from 'lucide-react';
import { TOPIC_SUGGESTIONS } from '../data/categories';
import { StockCategory, VisualStyle } from '../types';

interface EmptyStateProps {
  onSelectTopic: (topic: string, category: StockCategory, style: VisualStyle) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectTopic }) => {
  return (
    <div className="space-y-6">
      {/* Hero Welcome Container */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-md mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Commercial AI Stock Engine</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Generate 5 High-Demand Stock Photo Prompts in Seconds
          </h2>

          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Engineered specifically for Adobe Stock, Midjourney, and Adobe Firefly creators.
            Every generation provides 5 distinct, commercially cleared visual angles with complete descriptions of subject, composition, lighting, background, and visual style.
          </p>
        </div>

        {/* 5 Angles Explained */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-8 pt-6 border-t border-slate-100">
          <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-200/60">
            <span className="text-xs font-mono font-semibold text-slate-400">01</span>
            <h4 className="text-xs font-bold text-slate-900 mt-1">Hero Banner</h4>
            <p className="text-xs text-slate-500 mt-0.5">Wide framing with clean negative space for marketing text.</p>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-200/60">
            <span className="text-xs font-mono font-semibold text-slate-400">02</span>
            <h4 className="text-xs font-bold text-slate-900 mt-1">Authentic Action</h4>
            <p className="text-xs text-slate-500 mt-0.5">Natural lifestyle interaction and documentary realism.</p>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-200/60">
            <span className="text-xs font-mono font-semibold text-slate-400">03</span>
            <h4 className="text-xs font-bold text-slate-900 mt-1">Macro Detail</h4>
            <p className="text-xs text-slate-500 mt-0.5">Shallow depth of field emphasizing tactile surface textures.</p>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-200/60">
            <span className="text-xs font-mono font-semibold text-slate-400">04</span>
            <h4 className="text-xs font-bold text-slate-900 mt-1">Studio Flatlay</h4>
            <p className="text-xs text-slate-500 mt-0.5">90-degree overhead knolling with balanced product spacing.</p>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-200/60">
            <span className="text-xs font-mono font-semibold text-slate-400">05</span>
            <h4 className="text-xs font-bold text-slate-900 mt-1">Conceptual Art</h4>
            <p className="text-xs text-slate-500 mt-0.5">Atmospheric visual metaphors commanding top commercial licenses.</p>
          </div>
        </div>
      </div>

      {/* Suggested Starter Topics */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3">
          Popular Stock Topics (Click to Try Immediately)
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TOPIC_SUGGESTIONS.map((s) => (
            <button
              key={s.topic}
              type="button"
              onClick={() => onSelectTopic(s.topic, s.category, s.style)}
              className="text-left p-3.5 rounded-lg border border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50/60 transition-all group flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-slate-900 group-hover:text-slate-950 block">
                  {s.topic}
                </span>
                <span className="text-xs text-slate-500 mt-0.5 block">
                  {s.category} · {s.style}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
