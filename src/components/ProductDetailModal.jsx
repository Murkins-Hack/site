import React, { useState } from 'react';
import { X, ArrowUpRight, Check } from 'lucide-react';
import RippleButton from './react-bits/RippleButton';

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onInspect3D,
  onAddToBag,
}) {
  const [selectedSize, setSelectedSize] = useState(
    product ? product.defaultSize : ''
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToBag(product, selectedSize || product.defaultSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-3xl bg-[#0d0d0d] border border-white/[0.12] text-white overflow-hidden shadow-2xl animate-fade-in flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-white bg-black/60 border border-white/10 hover:border-white/30 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Big Product Image & Tech Specs */}
        <div className="w-full md:w-1/2 bg-[#141414] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/[0.08]">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
            <span>VAULT CODE: {product.code}</span>
            <span>{product.specs.edition}</span>
          </div>

          <div className="my-6 aspect-square w-full flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-64 object-contain"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-400 border-t border-white/[0.08] pt-3 uppercase">
            <div>
              <span className="text-neutral-600 block">ORIGIN</span>
              <span>{product.specs.origin}</span>
            </div>
            <div>
              <span className="text-neutral-600 block">WEIGHT</span>
              <span>{product.specs.weight}</span>
            </div>
            <div className="col-span-2 mt-1">
              <span className="text-neutral-600 block">COMPOSITION</span>
              <span>{product.specs.material}</span>
            </div>
          </div>
        </div>

        {/* Right: Info, Size selector & Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="inline-block px-2.5 py-0.5 bg-white/[0.06] border border-white/10 text-neutral-300 font-mono text-[10px] tracking-widest uppercase mb-2">
              {product.category}
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase mb-1">
              {product.title}
            </h3>
            <p className="font-mono text-sm text-neutral-400 mb-3">{product.subtitle}</p>

            <div className="font-mono text-2xl font-bold text-white mb-6">
              {product.priceFormatted}
            </div>

            {/* Architecture Details */}
            <div className="space-y-2 mb-6">
              <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider block">
                ARCHITECTURAL SPECIFICATIONS
              </span>
              <ul className="space-y-1.5">
                {product.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="font-mono text-[11px] text-neutral-300 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-white rounded-full shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex justify-between font-mono text-[11px] uppercase tracking-wider mb-2 text-neutral-400">
                <span>SELECT ARCHIVAL SIZE</span>
                <span className="text-white font-bold">{selectedSize}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 px-1 text-center font-mono text-xs uppercase border transition-all ${
                      selectedSize === sz
                        ? 'bg-white text-black font-bold border-white'
                        : 'bg-[#161616] text-neutral-300 border-white/[0.08] hover:border-white/30'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-white/[0.08]">
            <RippleButton
              onClick={handleAdd}
              className="w-full py-3.5 bg-white hover:bg-neutral-200 text-black font-bold flex items-center justify-center gap-2"
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>ADDED TO ARCHIVE BAG</span>
                </>
              ) : (
                <span>+ ADD TO ARCHIVE BAG</span>
              )}
            </RippleButton>

            <button
              onClick={() => {
                onInspect3D(product);
                onClose();
              }}
              className="w-full py-3 bg-black hover:bg-white/[0.08] text-white border border-white/20 hover:border-white font-mono text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2"
            >
              <span>INSPECT IN 3D TURNTABLE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
