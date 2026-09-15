/**
 * DecryptedText Component / Utility (from React Bits)
 * Vanilla JS implementation matching React Bits logic:
 * - Scrambles characters with customizable character pool
 * - Progressive reveal (start / center / end / sequential)
 * - Triggers on hover or view
 */

export function initDecryptedText(selectorOrElement, userOptions = {}) {
  const elements = typeof selectorOrElement === 'string' 
    ? document.querySelectorAll(selectorOrElement) 
    : (selectorOrElement instanceof NodeList || Array.isArray(selectorOrElement) ? selectorOrElement : [selectorOrElement]);

  elements.forEach(element => {
    if (!element) return;
    
    const text = element.getAttribute('data-decrypted') || element.textContent.trim();
    const speed = Number(element.getAttribute('data-speed')) || userOptions.speed || 45;
    const revealDirection = element.getAttribute('data-reveal-dir') || userOptions.revealDirection || 'start';
    const characters = userOptions.characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    const useOriginalCharsOnly = userOptions.useOriginalCharsOnly || false;

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter(c => c !== ' ')
      : characters.split('');

    let isAnimating = false;
    let intervalId = null;

    const shuffleText = (revealedSet) => {
      return text.split('').map((char, i) => {
        if (char === ' ') return ' ';
        if (revealedSet.has(i)) return `<span class="decrypted-char revealed">${char}</span>`;
        const randomChar = availableChars[Math.floor(Math.random() * availableChars.length)];
        return `<span class="decrypted-char encrypted">${randomChar}</span>`;
      }).join('');
    };

    const getNextIndex = (revealedSet) => {
      const len = text.length;
      if (revealDirection === 'start') {
        for (let i = 0; i < len; i++) if (!revealedSet.has(i)) return i;
      } else if (revealDirection === 'end') {
        for (let i = len - 1; i >= 0; i--) if (!revealedSet.has(i)) return i;
      } else if (revealDirection === 'center') {
        const middle = Math.floor(len / 2);
        const offset = Math.floor(revealedSet.size / 2);
        const idx = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;
        if (idx >= 0 && idx < len && !revealedSet.has(idx)) return idx;
        for (let i = 0; i < len; i++) if (!revealedSet.has(i)) return i;
      }
      return 0;
    };

    const runDecrypt = () => {
      if (isAnimating) return;
      isAnimating = true;
      clearInterval(intervalId);

      const revealedIndices = new Set();
      element.innerHTML = shuffleText(revealedIndices);

      intervalId = setInterval(() => {
        if (revealedIndices.size < text.length) {
          const nextIdx = getNextIndex(revealedIndices);
          revealedIndices.add(nextIdx);
          element.innerHTML = shuffleText(revealedIndices);
        } else {
          clearInterval(intervalId);
          isAnimating = false;
          element.innerHTML = text.split('').map(c => 
            c === ' ' ? ' ' : `<span class="decrypted-char revealed">${c}</span>`
          ).join('');
        }
      }, speed);
    };

    // Set initial text
    element.innerHTML = text.split('').map(c => 
      c === ' ' ? ' ' : `<span class="decrypted-char revealed">${c}</span>`
    ).join('');

    // Attach hover trigger
    element.addEventListener('mouseenter', runDecrypt);

    // View trigger
    if (element.getAttribute('data-animate-on') === 'view' || userOptions.animateOn === 'view') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            runDecrypt();
            observer.disconnect();
          }
        });
      }, { threshold: 0.2 });
      observer.observe(element);
    }
  });
}
