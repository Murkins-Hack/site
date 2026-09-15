import React, { useState, useRef, useEffect, useCallback } from 'react';

/**
 * 360° Interactive Canvas Turntable / Dynamic High-Res Viewport
 * - High-res cut-out imagery on a clean transparent canvas
 * - Multi-layered studio lighting shadows underneath
 * - Subtle circular radar/floor rings (rgba(255,255,255,0.06))
 * - Real-time horizontal drag with momentum and inertia damping (friction: 0.92)
 * - Zero event hijacking: Native vertical page scroll is 100% unhindered
 * - Cursor states: grab -> grabbing
 */
export default function Turntable360({
  activeProduct,
  activeCameraPreset,
  onDynamicAngleChange,
  className = '',
}) {
  const containerRef = useRef(null);
  const [currentAngle, setCurrentAngle] = useState(45); // Start at 3/4 beauty quarter
  const [isDragging, setIsDragging] = useState(false);

  // Physics & Animation state
  const stateRef = useRef({
    angle: 45,
    targetAngle: null,
    isLerpingPreset: false,
    angularVelocity: 0,
    friction: 0.92, // exact requested friction
    isDragging: false,
    startX: 0,
    previousX: 0,
    animFrameId: null,
  });

  // Camera preset snapping / smooth interpolation
  useEffect(() => {
    if (!activeCameraPreset) return;
    const target = activeCameraPreset.targetAngle ?? 45;
    const state = stateRef.current;
    state.targetAngle = target;
    state.isLerpingPreset = true;
    state.angularVelocity = 0;
  }, [activeCameraPreset]);

  // Main 60 FPS Render & Momentum Loop
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time) => {
      const _delta = (time - lastTime) / 1000;
      lastTime = time;
      const state = stateRef.current;

      // 1. Preset Smooth Lerp
      if (state.isLerpingPreset && state.targetAngle !== null) {
        let diff = state.targetAngle - state.angle;
        // Shortest angular path
        while (diff < -180) diff += 360;
        while (diff > 180) diff -= 360;

        if (Math.abs(diff) < 0.5) {
          state.angle = state.targetAngle;
          state.isLerpingPreset = false;
        } else {
          state.angle += diff * 0.12;
        }

        // Normalize
        state.angle = (state.angle % 360 + 360) % 360;
        setCurrentAngle(state.angle);
        if (onDynamicAngleChange) onDynamicAngleChange(Math.round(state.angle));
      }

      // 2. Inertia Damping on Free Drag
      else if (!state.isDragging && Math.abs(state.angularVelocity) > 0.01) {
        state.angle += state.angularVelocity;
        state.angularVelocity *= state.friction; // 0.92 friction

        if (Math.abs(state.angularVelocity) < 0.01) {
          state.angularVelocity = 0;
        }

        // Normalize
        state.angle = (state.angle % 360 + 360) % 360;
        setCurrentAngle(state.angle);
        if (onDynamicAngleChange) onDynamicAngleChange(Math.round(state.angle));
      }

      state.animFrameId = requestAnimationFrame(animate);
    };

    const frameId = requestAnimationFrame(animate);
    stateRef.current.animFrameId = frameId;
    return () => cancelAnimationFrame(frameId);
  }, [onDynamicAngleChange]);

  // Pointer / Mouse Down (ONLY horizontal drag, NEVER hijacks wheel)
  const handlePointerDown = (e) => {
    // Only left click or primary touch
    if (e.button !== undefined && e.button !== 0) return;

    const state = stateRef.current;
    state.isDragging = true;
    state.isLerpingPreset = false;
    state.angularVelocity = 0;
    state.startX = e.clientX;
    state.previousX = e.clientX;
    setIsDragging(true);

    const handlePointerMove = (moveEvent) => {
      if (!state.isDragging) return;
      const deltaX = moveEvent.clientX - state.previousX;
      state.previousX = moveEvent.clientX;

      // Spin rotation
      const speed = 0.45; // Degrees per pixel
      state.angularVelocity = deltaX * speed;
      state.angle = ((state.angle + deltaX * speed) % 360 + 360) % 360;

      setCurrentAngle(state.angle);
      if (onDynamicAngleChange) onDynamicAngleChange(Math.round(state.angle));
    };

    const handlePointerUp = () => {
      state.isDragging = false;
      setIsDragging(false);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  };

  // Select appropriate cut-out artwork based on current turntable angle
  const getProductDisplay = useCallback(() => {
    if (!activeProduct) return { src: '', flip: false, relAngle: 0 };

    // If product has dedicated angles (e.g. Balenciaga Track.1)
    if (activeProduct.angles) {
      const a = (currentAngle % 360 + 360) % 360;

      // 03 / FRONTAL: 337.5° to 22.5°
      if (a >= 337.5 || a < 22.5) {
        let rel = a >= 337.5 ? a - 360 : a;
        return { src: activeProduct.angles.frontal, flip: false, relAngle: rel * 0.4 };
      }
      // 02 / 3/4 ANGLE: 22.5° to 67.5°
      if (a >= 22.5 && a < 67.5) {
        return { src: activeProduct.angles.threeQuarter, flip: false, relAngle: (a - 45) * 0.35 };
      }
      // 01 / PROFILE (Lateral): 67.5° to 112.5°
      if (a >= 67.5 && a < 112.5) {
        return { src: activeProduct.angles.profile, flip: false, relAngle: (a - 90) * 0.3 };
      }
      // 3/4 REAR: 112.5° to 157.5°
      if (a >= 112.5 && a < 157.5) {
        return { src: activeProduct.angles.rearHeel, flip: false, relAngle: (a - 135) * 0.35 };
      }
      // 04 / REAR HEEL: 157.5° to 202.5°
      if (a >= 157.5 && a < 202.5) {
        return { src: activeProduct.angles.rearHeel, flip: false, relAngle: (a - 180) * 0.4 };
      }
      // 3/4 REAR (Opposite): 202.5° to 247.5°
      if (a >= 202.5 && a < 247.5) {
        return { src: activeProduct.angles.rearHeel, flip: true, relAngle: (a - 225) * 0.35 };
      }
      // 01 / PROFILE (Medial, flipped): 247.5° to 292.5°
      if (a >= 247.5 && a < 292.5) {
        return { src: activeProduct.angles.profile, flip: true, relAngle: (a - 270) * 0.3 };
      }
      // 02 / 3/4 ANGLE (Opposite, flipped): 292.5° to 337.5°
      return { src: activeProduct.angles.threeQuarter, flip: true, relAngle: (a - 315) * 0.35 };
    }

    // Default single asset with pseudo 3D angle rotation
    const rel = (currentAngle % 180) - 90;
    return {
      src: activeProduct.image,
      flip: currentAngle > 180,
      relAngle: rel * 0.3,
    };
  }, [activeProduct, currentAngle]);

  const { src, flip, relAngle } = getProductDisplay();

  // Dynamic light sheen position tracking angle (3-Point Studio Rim)
  const lightSheenX = Math.round(((currentAngle % 360) / 360) * 100);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      className={`relative w-full h-full flex flex-col items-center justify-center select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${className}`}
      style={{ touchAction: 'pan-y' }}
      title="Drag horizontally to rotate 360°"
    >
      {/* 1. Subtle Radar / Floor Ground Calibration Rings (rgba(255,255,255,0.06)) */}
      <div className="pointer-events-none absolute bottom-6 sm:bottom-10 inset-x-0 flex items-center justify-center">
        <div className="relative w-[340px] sm:w-[480px] md:w-[580px] h-[90px] sm:h-[130px]">
          {/* Base elliptical ring */}
          <div className="absolute inset-0 rounded-[50%] border border-white/[0.06]" />

          {/* Outer concentric elliptical ring */}
          <div className="absolute inset-[-18px] sm:inset-[-24px] rounded-[50%] border border-white/[0.03]" />

          {/* Subtle pulsating radar ring */}
          <div className="absolute inset-[-6px] rounded-[50%] border border-white/[0.08] animate-pulse" />

          {/* Subtle crosshair ticks */}
          <div className="absolute top-1/2 left-0 w-3 h-px bg-white/[0.12]" />
          <div className="absolute top-1/2 right-0 w-3 h-px bg-white/[0.12]" />
          <div className="absolute top-0 left-1/2 w-px h-3 bg-white/[0.12]" />
          <div className="absolute bottom-0 left-1/2 w-px h-3 bg-white/[0.12]" />
        </div>
      </div>

      {/* 2. Multi-Layered Studio Lighting Ground Shadows Underneath */}
      <div className="pointer-events-none absolute bottom-8 sm:bottom-12 inset-x-0 flex items-center justify-center z-10">
        {/* Deep contact shadow */}
        <div
          className="w-[280px] sm:w-[420px] md:w-[500px] h-[32px] sm:h-[45px] rounded-[50%] transition-transform duration-100"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.5) 45%, transparent 75%)',
            transform: `scaleX(${1 - Math.abs(Math.sin((currentAngle * Math.PI) / 180)) * 0.1})`,
          }}
        />
        {/* Soft ambient floor shadow */}
        <div
          className="absolute w-[360px] sm:w-[520px] md:w-[620px] h-[55px] sm:h-[75px] rounded-[50%] -z-10"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(12,12,12,0.7) 0%, rgba(5,5,5,0.3) 50%, transparent 80%)',
          }}
        />
      </div>

      {/* 3. Central Hero Centerpiece (Massive, Front & Center, 550px–650px) */}
      <div className="relative z-20 w-full max-w-[560px] sm:max-w-[640px] md:max-w-[700px] aspect-[16/10] flex items-center justify-center p-2 sm:p-4">
        <div
          className="relative w-full h-full flex items-center justify-center transform-gpu will-change-transform"
          style={{
            transform: `perspective(1200px) rotateY(${relAngle}deg) scale(${
              isDragging ? 1.02 : 1
            }) ${flip ? 'scaleX(-1)' : ''}`,
            transition: isDragging
              ? 'none'
              : 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          {/* Crisp High-Res Product Cut-out Image */}
          <img
            src={src}
            alt={activeProduct.title}
            draggable={false}
            className="w-full h-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)] pointer-events-none select-none transition-opacity duration-150"
          />

          {/* Dynamic 3-Point Studio Rim Light Specular Sweep */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-screen opacity-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(ellipse 260px 180px at ${lightSheenX}% 40%, rgba(255,255,255,0.4) 0%, transparent 70%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
