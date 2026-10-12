import React from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, FileText, Image as ImageIcon } from 'lucide-react';

interface ContributorTipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContributorTipsModal: React.FC<ContributorTipsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden text-slate-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-slate-900" />
            <h2 id="modal-title" className="text-base font-bold text-slate-900">
              Adobe Stock Generative AI Contributor Guide
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-sm">
          <section className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>1. Generative AI Tagging Requirement</span>
            </div>
            <p className="text-slate-600 pl-6 leading-relaxed">
              When uploading AI-generated images to the Adobe Stock Contributor Portal, you must select the checkbox stating{' '}
              <strong className="text-slate-800">"Created using generative AI tools"</strong>. Adobe accepts illustrations and photos generated with Firefly, Midjourney, and Stable Diffusion.
            </p>
          </section>

          <section className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>2. Commercial Clearance & No Trademarks</span>
            </div>
            <p className="text-slate-600 pl-6 leading-relaxed">
              Stock buyers license images for commercial advertising. Never include recognizable brand logos (e.g. Apple, Nike), real public figures or celebrities, patented designs, or copyrighted characters. Prompts generated in StockPrompt Studio automatically avoid specific trademarks.
            </p>
          </section>

          <section className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <ImageIcon className="w-4 h-4 text-blue-600 shrink-0" />
              <span>3. Incorporate Negative & Copy Space</span>
            </div>
            <p className="text-slate-600 pl-6 leading-relaxed">
              Images with clean negative space (uncluttered sky, table, or wall) sell up to 3x more often because graphic designers require room for headlines, logo placement, and ad copy. Our generator includes deliberate copy space framing.
            </p>
          </section>

          <section className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>4. Technical Quality Standards</span>
            </div>
            <ul className="list-disc pl-10 space-y-1 text-slate-600">
              <li>Minimum resolution: 4 Megapixels (JPEG format, 100% quality).</li>
              <li>Inspect fingers, eyes, symmetrical patterns, and text artifacts prior to submission.</li>
              <li>Upscale images using a clean 2x or 4x AI upscaler if needed to exceed 4000px on the longest edge.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>5. Titles & Keywords Metadata</span>
            </div>
            <p className="text-slate-600 pl-6 leading-relaxed">
              Provide descriptive titles in natural English (e.g., "Minimalist eco friendly cosmetic packaging on travertine stone with copy space"). Add 15–30 specific keywords without keyword stuffing. StockPrompt Studio provides pre-calculated titles and keywords on every prompt card!
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Got It, Back to Studio
          </button>
        </div>
      </div>
    </div>
  );
};
