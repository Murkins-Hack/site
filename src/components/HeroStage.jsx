import React, { useState } from 'react';
import BlurText from './react-bits/BlurText';
import Turntable360 from './turntable/Turntable360';
import { CAMERA_PRESETS } from '../data/products';
import { Compass, Rotate3d, Layers, SunMedium } from 'lucide-react';

export default function HeroStage({
  activeProduct,
}) {
  const [activePreset, setActivePreset] = useState(CAMERA_PRESETS[1]); // Default 02 / 3/4 ANGLE
  const [dynamicHeading, setDynamicHeading] = useState(45);

  const handleAngleChange = (deg) => {
    setDynamicHeading(deg);

    // Auto-sync closest camera preset
    const diff = (a, b) => {
      let d = Math.abs(a - b) % 360;
      return d > 180 ? 360 - d : d;
    };

    let closest = CAMERA_PRESETS[0];
    let minDiff = 360;
    CAMERA_PRESETS.forEach((preset) => {
      const d = diff(deg, preset.targetAngle);
      if (d < minDiff) {
        minDiff = d;
        closest = preset;
      }
    });

    if (minDiff < 20 && closest.id !== activePreset.id) {
      setActivePreset(closest);
    }
  };

  const handleSelectPreset = (preset) => {
    setActivePreset(preset);
    setDynamicHeading(preset.targetAngle);
  };

  // Telemetry title label
  const telemetryAngleLabel =
    activePreset.id === 'three-quarter'
      ? '02 / 3/4 BEAUTY QUARTER (DYNAMIC)'
      : activePreset.fullName.toUpperCase();

  const productCode = activeProduct.id === 'track-1' ? 'TRACK.1' : activeProduct.title.toUpperCase();

  return (
    <section className="hero-turntable-stage relative w-full min-h-[86vh] lg:min-h-[92vh] flex flex-col justify-between overflow-hidden border-b border-white/[0.08] bg-[#000000]">
      {/* Subtle Depth Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,25,25,0.45)_0%,rgba(0,0,0,1)_80%)]" />

      {/* Top Header Information & Hero Title */}
      <div className="relative z-20 pt-8 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center flex flex-col items-center">
        {/* Minimalist Sub-badge: SUMMER 2026 // DROP 01 */}
        <div className="pill-badge inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/[0.1] rounded-full mb-3 sm:mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-neutral-300 uppercase">
            {activeProduct ? activeProduct.badge : 'SUMMER 2026 // DROP 01'}
          </span>
        </div>

        {/* Monumental Brutalist Title: MONOCHROME APEX */}
        <h1 className="main-title font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase text-white mb-2 select-none">
          <BlurText
            text="MONOCHROME APEX"
            delay={40}
            animateBy="letters"
            direction="top"
            className="justify-center"
          />
        </h1>

        {/* Micro-copy Hint */}
        <div className="drag-instructions inline-flex items-center gap-2 text-neutral-500 font-mono text-[10px] sm:text-xs tracking-widest uppercase mt-2 py-1 px-3 bg-black/40 border border-white/[0.05]">
          <Rotate3d className="w-3.5 h-3.5 text-neutral-400" />
          <span>DRAG HORIZONTALLY TO ROTATE 360° • SCROLL TO EXPLORE</span>
        </div>
      </div>

      {/* Central 360 Turntable Viewport Stage (550px–650px centerpiece) */}
      <div
        id="model-viewport"
        className="canvas-viewport relative z-10 w-full flex-1 min-h-[380px] sm:min-h-[440px] md:min-h-[500px] flex items-center justify-center my-2"
      >
        <Turntable360
          activeProduct={activeProduct}
          activeCameraPreset={activePreset}
          onDynamicAngleChange={handleAngleChange}
        />
      </div>

      {/* Camera Preset Switcher Controls (Above Telemetry) */}
      <div className="angle-controls relative z-20 w-full max-w-2xl mx-auto px-4 pb-4">
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1 bg-[#0d0d0d]/90 backdrop-blur-md border border-white/[0.08]">
          {CAMERA_PRESETS.map((preset) => {
            const isCurrent = activePreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-3.5 sm:px-5 py-2 font-mono text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-200 focus:outline-none flex items-center gap-1.5 font-bold ${
                  isCurrent
                    ? 'bg-[#ffffff] text-[#000000] shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                    : 'bg-transparent text-[#888888] hover:text-[#ffffff] hover:bg-white/[0.06]'
                }`}
              >
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Telemetry Status Bar */}
      <footer className="telemetry-bar relative z-20 w-full bg-[#0a0a0a] border-t border-white/[0.08] px-4 sm:px-6 lg:px-8 py-3.5 text-neutral-400 font-mono text-[10px] sm:text-xs tracking-widest uppercase">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          {/* Left: Active Angle */}
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-white shrink-0 animate-pulse" />
            <span className="text-white font-semibold">
              {productCode} — {telemetryAngleLabel} ({dynamicHeading.toString().padStart(3, '0')}°)
            </span>
          </div>

          {/* Center: Component Panels */}
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-300 font-semibold tracking-wider">
              {activeProduct.panels}
            </span>
          </div>

          {/* Right: Lighting Profile */}
          <div className="flex items-center gap-2">
            <SunMedium className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-300 font-semibold">
              {activeProduct.lightingProfile}
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
}
