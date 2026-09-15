import React from 'react';
import TiltedCard from './react-bits/TiltedCard';
import SpotlightCard from './react-bits/SpotlightCard';
import RippleButton from './react-bits/RippleButton';
import { ArrowUpRight, Eye } from 'lucide-react';

export default function CatalogMatrix({
  products,
  allProductsCount = 5,
  activeProduct,
  onInspectProduct,
  onQuickSelect,
  onOpenDetail,
}) {
  return (
    <section
      id="catalog-matrix"
      className="catalog-matrix relative z-20 w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-[1520px] mx-auto bg-[#000000]"
    >
      {/* Matrix Header */}
      <header className="matrix-header flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/[0.08] pb-6 mb-10 gap-4">
        <div>
          <span className="matrix-label font-mono text-[11px] tracking-widest text-neutral-500 uppercase block mb-1">
            // CATALOG MATRIX
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight uppercase">
            CURATED ARCHIVAL SELECTION
          </h2>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
          <span className="item-count font-mono text-xs tracking-widest text-neutral-400 uppercase">
            SHOWING {products.length} OF {allProductsCount} ITEMS
          </span>
        </div>
      </header>

      {/* 5-Column Responsive Cards Grid */}
      <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {products.map((item) => {
          const isCurrentlyInspected = activeProduct && activeProduct.id === item.id;

          return (
            <article key={item.id} className="archival-card flex flex-col h-full">
              {/* React Bits: TiltedCard physics + SpotlightCard glow */}
              <TiltedCard
                maxTilt={8}
                scale={1.02}
                perspective={900}
                glare={true}
                glareOpacity={0.12}
                containerClassName="h-full"
                className="h-full flex flex-col"
              >
                <SpotlightCard
                  spotlightColor="rgba(255, 255, 255, 0.08)"
                  borderColor="rgba(255, 255, 255, 0.28)"
                  className={`flex flex-col justify-between h-full p-4 sm:p-5 bg-[#0e0e0e] border transition-all duration-300 ${
                    isCurrentlyInspected
                      ? 'border-white/50 ring-1 ring-white/30 bg-[#121212]'
                      : 'border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  {/* Top Row: Index (/01), Category Tag, and INSPECT 3D Trigger */}
                  <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/[0.06] text-[10px] font-mono tracking-widest uppercase">
                    <div className="flex items-center gap-1.5">
                      <span className="text-white font-bold">/{item.code}</span>
                      <span className="text-neutral-500">•</span>
                      <span className="text-neutral-400">{item.category}</span>
                    </div>

                    {/* INSPECT 3D Badge Trigger */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onInspectProduct(item);
                      }}
                      className={`flex items-center gap-1 px-2 py-1 font-mono text-[9px] tracking-wider uppercase transition-all duration-200 ${
                        isCurrentlyInspected
                          ? 'bg-white text-black font-bold shadow-[0_0_10px_rgba(255,255,255,0.4)]'
                          : 'bg-black/60 text-neutral-300 border border-white/15 hover:bg-white hover:text-black hover:border-white'
                      }`}
                      title="Inspect in 3D Turntable"
                    >
                      {isCurrentlyInspected ? (
                        <>
                          <Eye className="w-2.5 h-2.5" />
                          <span>INSPECTING</span>
                        </>
                      ) : (
                        <>
                          <span>INSPECT 3D</span>
                          <ArrowUpRight className="w-2.5 h-2.5" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Centered Product Cut-out Image Inside Dark Framed Stage (#161616) */}
                  <div
                    onClick={() => onOpenDetail(item)}
                    className="relative group/thumb w-full aspect-[4/3] bg-[#161616] border border-white/[0.05] overflow-hidden mb-4 flex items-center justify-center cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-3 group-hover/thumb:scale-105 transition-transform duration-500"
                    />

                    {/* Quick view spec hover trigger */}
                    <span className="opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[8px] text-neutral-300 tracking-wider uppercase">
                      DETAILS ↗
                    </span>
                  </div>

                  {/* Product Title & 2-Line Technical Description */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="mb-4">
                      <h3
                        onClick={() => onOpenDetail(item)}
                        className="font-display font-bold text-sm sm:text-base text-white tracking-tight uppercase hover:underline cursor-pointer line-clamp-1 mb-1"
                      >
                        {item.title}
                      </h3>
                      <p className="font-mono text-[10px] text-neutral-400 tracking-wide line-clamp-2 leading-relaxed h-[30px]">
                        {item.subtitle} — {item.features[0]}
                      </p>
                    </div>

                    {/* Price & Solid White Rectangular Action Button: + QUICK SELECT */}
                    <div>
                      <div className="flex items-center justify-between font-mono pb-2.5 mb-2.5 border-b border-white/[0.06]">
                        <span className="text-[10px] text-neutral-500 uppercase">PRICE</span>
                        <span className="text-sm sm:text-base font-bold text-white">
                          {item.priceFormatted}
                        </span>
                      </div>

                      <RippleButton
                        onClick={() => onQuickSelect(item)}
                        className="w-full py-2.5 bg-[#ffffff] hover:bg-neutral-200 text-[#000000] font-mono font-bold text-[10px] tracking-widest uppercase transition-colors"
                      >
                        <span>+ QUICK SELECT</span>
                      </RippleButton>
                    </div>
                  </div>
                </SpotlightCard>
              </TiltedCard>
            </article>
          );
        })}
      </div>
    </section>
  );
}
