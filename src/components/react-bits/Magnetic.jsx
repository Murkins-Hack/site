import React, { useRef, useState } from 'react';

/**
 * React Bits - Magnetic Component
 * Applies a magnetic hover pull toward cursor position with spring return.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  springEasing = 'cubic-bezier(0.25, 1, 0.5, 1)',
  className = '',
  as = 'div',
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const Component = as;

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transform-gpu will-change-transform ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : `transform 0.6s ${springEasing}`,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
