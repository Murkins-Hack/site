import React, { useEffect, useRef, useState } from 'react';

/**
 * React Bits - BlurText Component
 * Staggered letter-by-letter or word-by-word blur and translate entrance animation.
 */
export default function BlurText({
  text = '',
  delay = 50,
  animateBy = 'letters', // 'letters' | 'words'
  direction = 'top', // 'top' | 'bottom'
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = 'cubic-bezier(0.2, 0.65, 0.3, 0.9)',
  onAnimationComplete,
  className = '',
}) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom =
    direction === 'top'
      ? { filter: 'blur(12px)', opacity: 0, transform: 'translate3d(0, -25px, 0)' }
      : { filter: 'blur(12px)', opacity: 0, transform: 'translate3d(0, 25px, 0)' };

  const defaultTo = [
    {
      filter: 'blur(0px)',
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
    },
  ];

  const from = animationFrom || defaultFrom;
  const to = animationTo || defaultTo;

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {elements.map((segment, index) => {
        const isSpace = segment === ' ';
        const delayMs = index * delay;

        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              transition: `all 0.8s ${easing}`,
              transitionDelay: inView ? `${delayMs}ms` : '0ms',
              ...(inView ? to[0] : from),
              whiteSpace: isSpace ? 'pre' : 'normal',
            }}
            onTransitionEnd={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {segment}
            {animateBy === 'words' && index < elements.length - 1 ? '\u00A0' : ''}
          </span>
        );
      })}
    </span>
  );
}
