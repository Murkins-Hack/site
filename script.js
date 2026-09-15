import { createFerrofluid } from './ferrofluid.js';
import { initDecryptedText } from './decryptedText.js';

/**
 * MURK1INSHOPSPORTFOLIO — DARK GLASSMORPHISM STOREFRONT (SEPTEMBER 2026)
 * Real Clean Product Photography // No Human Portraits // No White Box
 * React Bits Implementations: Ferrofluid, DecryptedText, Logo Loop, Glass Surface
 */

// ==========================================================================
// 1. БАЗА ТОВАРОВ (ТОЛЬКО ЧИСТАЯ ПРЕДМЕТНАЯ СЪЕМКА // 4 ТОПОВЫХ ФЛАГМАНА)
// ==========================================================================
const PRODUCTS = [
  {
    id: 'track-1-black',
    code: '01',
    brand: 'BALENCIAGA',
    title: "Balenciaga Track.1 'Triple Black'",
    shortTitle: 'Track.1 Triple Black',
    category: 'footwear',
    categoryLabel: 'ОБУВЬ',
    price: 1050,
    priceFormatted: '1 050 €',
    badge: 'ФЛАГМАН',
    badgeClass: 'badge-ice',
    description: '176 структурных сегментов. Сложный индустриальный силуэт, адаптированный под осенний сезон среди туманных хребтов.',
    image: 'images/balenciaga-track-hero-transparent.png',
    imageClass: 'contain-fit',
    sizes: ['40 EU', '41 EU', '42 EU', '43 EU', '44 EU', '45 EU'],
    defaultSize: '42 EU',
    techTitle: '176 PROCEDURAL PANELS',
    techDesc: 'DYNAMIC MULTI-CAGE CHASSIS',
    headlineLine1: 'BALENCIAGA',
    headlineLine2: 'TRACK.1',
    material: 'Многослойный полимер & mesh-сетка',
  },
  {
    id: 'balenciaga-bomber',
    code: '02',
    brand: 'BALENCIAGA',
    title: 'Balenciaga Paris Oversized Bomber Jacket',
    shortTitle: 'Бомбер Balenciaga Paris',
    category: 'outerwear',
    categoryLabel: 'КУРТКИ',
    price: 1650,
    priceFormatted: '1 650 €',
    badge: 'АРХИВ',
    badgeClass: 'badge-ice',
    description: 'Матовый тяжелый японский нейлон, массивная латунная молния, эластичные трикотажные манжеты и фирменный оверсайз-крой.',
    image: 'images/real-bomber.png',
    imageClass: 'contain-fit',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    defaultSize: 'L',
    techTitle: 'JAPANESE TECH NYLON',
    techDesc: 'OVERSIZED MONOLITH BOMBER',
    headlineLine1: 'BALENCIAGA',
    headlineLine2: 'PARIS BOMBER',
    material: '100% Плотный водоотталкивающий нейлон',
  },
  {
    id: 'balenciaga-hoodie',
    code: '03',
    brand: 'BALENCIAGA',
    title: 'Balenciaga Political Campaign Logo Hoodie',
    shortTitle: 'Худи Political Campaign',
    category: 'outerwear',
    categoryLabel: 'КУРТКИ',
    price: 980,
    priceFormatted: '980 €',
    badge: 'LIMITED',
    badgeClass: 'badge-ice',
    description: 'Тяжелый органический хлопковый футер плотностью 520 GSM с архивной вышивкой Political Campaign на спине.',
    image: 'images/real-hoodie.png',
    imageClass: 'contain-fit',
    sizes: ['S', 'M', 'L', 'XL'],
    defaultSize: 'L',
    techTitle: '520 GSM HEAVYWEIGHT',
    techDesc: 'ORGANIC COTTON CAMPAIGN HOODIE',
    headlineLine1: 'BALENCIAGA',
    headlineLine2: 'CAMPAIGN HOODIE',
    material: '100% Органический плотный хлопок (520 GSM)',
  },
  {
    id: 'balenciaga-adidas-tee',
    code: '04',
    brand: 'BALENCIAGA',
    title: 'Balenciaga × adidas Oversized T-Shirt',
    shortTitle: 'Футболка Balenciaga × adidas',
    category: 'tops',
    categoryLabel: 'ФУТБОЛКИ',
    price: 690,
    priceFormatted: '690 €',
    badge: 'КОЛЛАБ',
    badgeClass: 'badge-ice',
    description: 'Плотный хлопковый трикотаж джерси, классические трехполосные лампасы на плечах и двойной микрологотип.',
    image: 'images/real-vintage-tee.png',
    imageClass: 'contain-fit',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    defaultSize: 'L',
    techTitle: 'COLLABORATIVE 3-STRIPES',
    techDesc: 'VINTAGE WASH JERSEY OVERSIZED TEE',
    headlineLine1: 'BALENCIAGA',
    headlineLine2: '× ADIDAS TEE',
    material: '100% Винтажный плотный трикотаж джерси',
  },
];

// ==========================================================================
// 2. ГЛОБАЛЬНОЕ СОСТОЯНИЕ
// ==========================================================================
let _activeCategory = 'all';
let _searchFilterQuery = '';
let cartCollection = [];
let wishlistRegistry = new Set();
let _modalSelectedItem = null;
let _modalPickedSize = '';
let _toastHideTimer = null;
let _currentHeroProductId = 'track-1-black';
const _cardSelectedSizes = {};

// Инициализация выбранных размеров по умолчанию для каждого товара
PRODUCTS.forEach((p) => {
  _cardSelectedSizes[p.id] = p.defaultSize;
});

// ==========================================================================
// 3. ИНИЦИАЛИЗАЦИЯ
// ==========================================================================
function initApp() {
  try { initHeroDropRail(); } catch (e) { console.warn('initHeroDropRail error:', e); }
  try { renderCatalogMatrix(); } catch (e) { console.warn('renderCatalogMatrix error:', e); }
  try { initHeaderNavigation(); } catch (e) { console.warn('initHeaderNavigation error:', e); }
  try { initCategoryFilters(); } catch (e) { console.warn('initCategoryFilters error:', e); }
  try { initCatalogSearch(); } catch (e) { console.warn('initCatalogSearch error:', e); }
  try { initCartSlideDrawer(); } catch (e) { console.warn('initCartSlideDrawer error:', e); }
  try { initSizePickerModal(); } catch (e) { console.warn('initSizePickerModal error:', e); }
  try { initMobileBottomDock(); } catch (e) { console.warn('initMobileBottomDock error:', e); }
  try { initLucideIcons(); } catch (e) { console.warn('initLucideIcons error:', e); }

  // React Bits Effects
  try { initAtmosphericFog(); } catch (e) { console.warn('initAtmosphericFog error:', e); }
  try { initKineticBlurHeadline(); } catch (e) { console.warn('initKineticBlurHeadline error:', e); }
  try { initHeroSneakerMouseParallax(); } catch (e) { console.warn('initHeroSneakerMouseParallax error:', e); }

  // React Bits: Ferrofluid Interactive Shader Background
  try {
    const ferrofluidEl = document.getElementById('heroFerrofluidContainer');
    if (ferrofluidEl && typeof createFerrofluid === 'function') {
      createFerrofluid(ferrofluidEl, {
        colors: ['#a7c7fc', '#a7c9ff', '#ffffff'],
        speed: 0.5,
        scale: 1,
        turbulence: 1,
        fluidity: 0.1,
        rimWidth: 0.2,
        sharpness: 3,
        shimmer: 1,
        glow: 2,
        flowDirection: 'down',
        opacity: 0.9,
        mouseInteraction: true,
        mouseStrength: 1,
        mouseRadius: 0.3,
      });
    }
  } catch (e) {
    console.warn('Ferrofluid WebGL init skipped:', e);
  }

  // React Bits: DecryptedText Component for "ТОП ТОВАРЫ" and interactive items
  try {
    if (typeof initDecryptedText === 'function') {
      initDecryptedText('[data-decrypted]', {
        speed: 35,
        revealDirection: 'center',
        characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+',
      });
    }
  } catch (e) {
    console.warn('DecryptedText init error:', e);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function initLucideIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// ==========================================================================
// 4. REACT BITS: FOG CANVAS ATMOSPHERE
// ==========================================================================
function initAtmosphericFog() {
  const canvas = document.getElementById('heroFogCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  // React Bits Particles: тонкие световые микрочастицы и мягкая атмосферная дымка
  const particles = [];
  const count = 45;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.8 + Math.random() * 1.8,
      baseAlpha: 0.2 + Math.random() * 0.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -0.2 - Math.random() * 0.35, // медленно дрейфуют вверх
      isBlue: Math.random() > 0.4,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.02,
    });
  }

  function renderFogLoop() {
    ctx.clearRect(0, 0, width, height);

    // Мягкая нижняя атмосферная виньетка
    const mistGrad = ctx.createLinearGradient(0, height * 0.5, 0, height);
    mistGrad.addColorStop(0, 'rgba(5, 7, 12, 0)');
    mistGrad.addColorStop(0.7, 'rgba(10, 20, 45, 0.18)');
    mistGrad.addColorStop(1, 'rgba(5, 7, 12, 0.6)');
    ctx.fillStyle = mistGrad;
    ctx.fillRect(0, height * 0.5, width, height * 0.5);

    // Отрисовка парящих частиц
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += p.pulseSpeed;

      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      const alpha = Math.max(0.1, p.baseAlpha + Math.sin(p.pulse) * 0.18);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      if (p.isBlue) {
        ctx.fillStyle = `rgba(96, 165, 250, ${alpha.toFixed(3)})`;
        ctx.shadowColor = 'rgba(59, 130, 246, 0.6)';
        ctx.shadowBlur = 6;
      } else {
        ctx.fillStyle = `rgba(240, 246, 255, ${(alpha * 0.7).toFixed(3)})`;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.shadowBlur = 4;
      }
      ctx.fill();
    });

    // Сброс тени для других операций
    ctx.shadowBlur = 0;

    requestAnimationFrame(renderFogLoop);
  }

  requestAnimationFrame(renderFogLoop);
}

// ==========================================================================
// 5. REACT BITS: KINETIC BLUR HEADLINE REVEAL
// ==========================================================================
function initKineticBlurHeadline() {
  const chars = document.querySelectorAll('.kinetic-char');
  if (!chars.length) return;

  chars.forEach((char, idx) => {
    setTimeout(() => {
      char.classList.add('is-revealed');
    }, 150 + idx * 45);
  });
}

// ==========================================================================
// 6. HERO SNEAKER MOUSE PARALLAX (ЧИСТЫЙ ВЫРЕЗ БЕЗ БЕЛОГО БОКСА)
// ==========================================================================
function initHeroSneakerMouseParallax() {
  const stage = document.getElementById('heroVisualStage');
  const wrapper = document.getElementById('sneakerTiltWrapper');
  const shadow = document.getElementById('sneakerContactShadow');
  if (!stage || !wrapper) return;

  let targetRotX = 0;
  let targetRotY = 0;
  let targetTransX = 0;
  let targetTransY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let currentTransX = 0;
  let currentTransY = 0;

  // Слушаем курсор без блокировки скролла
  window.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (window.innerWidth / 2);
    const normY = (e.clientY - centerY) / (window.innerHeight / 2);

    targetRotY = normX * 14;
    targetRotX = -normY * 11;
    targetTransX = normX * 22;
    targetTransY = normY * 14;
  });

  // Мобильный тач-параллакс без блокировки вертикального скролла
  stage.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      const rect = stage.getBoundingClientRect();
      const touch = e.touches[0];
      const normX = (touch.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const normY = (touch.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      targetRotY = Math.max(-1, Math.min(1, normX)) * 10;
      targetRotX = -Math.max(-1, Math.min(1, normY)) * 8;
      targetTransX = Math.max(-1, Math.min(1, normX)) * 14;
      targetTransY = Math.max(-1, Math.min(1, normY)) * 10;
    }
  }, { passive: true });

  stage.addEventListener('touchend', () => {
    targetRotX = 0;
    targetRotY = 0;
    targetTransX = 0;
    targetTransY = 0;
  }, { passive: true });

  // Гироскоп на смартфонах (если поддерживается)
  if (typeof window.DeviceOrientationEvent !== 'undefined') {
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const normX = Math.max(-1, Math.min(1, e.gamma / 25));
        const normY = Math.max(-1, Math.min(1, (e.beta - 40) / 25));
        targetRotY = normX * 8;
        targetRotX = -normY * 6;
        targetTransX = normX * 12;
        targetTransY = normY * 8;
      }
    }, { passive: true });
  }

  function animateSneaker() {
    currentRotX += (targetRotX - currentRotX) * 0.08;
    currentRotY += (targetRotY - currentRotY) * 0.08;
    currentTransX += (targetTransX - currentTransX) * 0.08;
    currentTransY += (targetTransY - currentTransY) * 0.08;

    wrapper.style.transform = `translate3d(${currentTransX.toFixed(2)}px, ${currentTransY.toFixed(2)}px, 0) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;

    if (shadow) {
      const shadowShift = currentTransX * 1.5;
      shadow.style.transform = `translateX(calc(-50% + ${shadowShift.toFixed(2)}px)) scale(${1 - Math.abs(currentTransY) * 0.006})`;
    }

    requestAnimationFrame(animateSneaker);
  }

  requestAnimationFrame(animateSneaker);
}

// ==========================================================================
// 7. REACT BITS: GLASS SURFACE MOUSE SPOTLIGHT BINDING
// ==========================================================================
function bindGlassSpotlight(cardEl) {
  cardEl.addEventListener('mousemove', (e) => {
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardEl.style.setProperty('--mouse-x', `${x}px`);
    cardEl.style.setProperty('--mouse-y', `${y}px`);
  });
}

// ==========================================================================
// 8. РЕНДЕРИНГ МАТРИЦЫ КАТАЛОГА ТОВАРОВ
// ==========================================================================
function getFilteredItems() {
  return PRODUCTS.filter((item) => {
    const categoryMatch =
      _activeCategory === 'all' ||
      item.category === _activeCategory;

    const query = _searchFilterQuery.toLowerCase().trim();
    const searchMatch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.brand.toLowerCase().includes(query) ||
      item.categoryLabel.toLowerCase().includes(query);

    return categoryMatch && searchMatch;
  });
}

// ==========================================================================
// 8. ИНТЕРАКТИВНЫЙ HERO DROP RAIL И ПЕРЕКЛЮЧАТЕЛЬ АЙТЕМОВ
// ==========================================================================
function initHeroDropRail() {
  const railContainer = document.getElementById('heroDropRail');
  if (!railContainer) return;

  railContainer.innerHTML = PRODUCTS.map((item) => {
    const isActive = item.id === _currentHeroProductId;
    return `
      <div
        class="hero-rail-item ${isActive ? 'is-active' : ''}"
        id="railItem-${item.id}"
        onclick="switchHeroProduct('${item.id}')"
        role="button"
        tabindex="0"
      >
        <div class="rail-item-thumb-wrap">
          <img src="${item.image}" alt="${item.shortTitle}" class="rail-item-thumb">
        </div>
        <div class="rail-item-info">
          <div class="rail-item-code-row">
            <span class="rail-code">/${item.code}</span>
            <span class="rail-status-dot">● В НАЛИЧИИ</span>
          </div>
          <div class="rail-item-title">${item.shortTitle}</div>
          <div class="rail-item-price">${item.priceFormatted}</div>
        </div>
      </div>
    `;
  }).join('');
}

window.switchHeroProduct = function (productId) {
  const item = PRODUCTS.find((p) => p.id === productId);
  if (!item) return;

  _currentHeroProductId = productId;

  // Обновляем активный элемент в дроп-рейле
  document.querySelectorAll('.hero-rail-item').forEach((el) => {
    el.classList.toggle('is-active', el.id === `railItem-${productId}`);
  });

  // Плавное обновление визуальной сцены в Hero
  const imgEl = document.getElementById('heroSneakerCutout');
  const titleEl = document.getElementById('heroTitle');
  const descEl = document.querySelector('.hero-copy .body-copy');
  const priceEl = document.getElementById('heroPriceValue');
  const techTitle = document.getElementById('heroTechTitle');
  const techDesc = document.getElementById('heroTechDesc');

  if (imgEl) {
    imgEl.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
    imgEl.style.opacity = '0';
    imgEl.style.transform = 'scale(0.95)';
    setTimeout(() => {
      imgEl.src = item.image;
      imgEl.alt = item.title;
      imgEl.style.opacity = '1';
      imgEl.style.transform = 'scale(1)';
    }, 200);
  }

  if (titleEl) {
    titleEl.innerHTML = `
      <span class="title-line">${item.headlineLine1.split('').map((c) => `<span class="kinetic-char is-revealed">${c}</span>`).join('')}</span>
      <span class="title-line">${item.headlineLine2.split('').map((c) => `<span class="kinetic-char is-revealed">${c}</span>`).join('')}</span>
    `;
  }

  if (descEl) descEl.textContent = item.description;
  if (priceEl) priceEl.textContent = item.priceFormatted;
  if (techTitle) techTitle.textContent = item.techTitle;
  if (techDesc) techDesc.textContent = item.techDesc;
};

// ==========================================================================
// 8B. ИНЛАЙН СЕЛЕКТОР РАЗМЕРОВ И БЫСТРОЕ ДОБАВЛЕНИЕ В КОРЗИНУ
// ==========================================================================
window.selectCardSize = function (productId, size) {
  _cardSelectedSizes[productId] = size;
  const label = document.getElementById(`selectedSizeLabel-${productId}`);
  if (label) label.textContent = size;

  const chipsWrap = document.getElementById(`sizeChips-${productId}`);
  if (chipsWrap) {
    chipsWrap.querySelectorAll('.size-chip').forEach((btn) => {
      btn.classList.toggle('is-active', btn.textContent.trim() === size);
    });
  }
};

window.quickAddToCart = function (productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const size = _cardSelectedSizes[productId] || product.defaultSize;
  addItemToCart(product, size);

  // Визуальный отклик на кнопке
  const btn = document.getElementById(`addBtn-${productId}`);
  if (btn) {
    const originalHTML = btn.innerHTML;
    btn.classList.add('is-success');
    btn.innerHTML = `<i data-lucide="check"></i> <span>ДОБАВЛЕНО В КОРЗИНУ ✓</span>`;
    initLucideIcons();

    setTimeout(() => {
      btn.classList.remove('is-success');
      btn.innerHTML = originalHTML;
      initLucideIcons();
    }, 1200);
  }
};

// ==========================================================================
// 8C. РЕНДЕРИНГ МАТРИЦЫ КАТАЛОГА ТОВАРОВ
// ==========================================================================
function renderCatalogMatrix() {
  const grid = document.getElementById('productsGrid');
  const emptyState = document.getElementById('matrixEmptyState');
  const stats = document.getElementById('matrixStats');
  if (!grid) return;

  const items = getFilteredItems();

  if (stats) {
    stats.textContent = `● ${items.length} АЙТЕМОВ В НАЛИЧИИ`;
  }

  if (items.length === 0) {
    grid.style.display = 'none';
    if (emptyState) emptyState.style.display = 'flex';
    return;
  }

  grid.style.display = 'grid';
  if (emptyState) emptyState.style.display = 'none';

  grid.innerHTML = items
    .map((product) => {
      const isSaved = wishlistRegistry.has(product.id);
      const selectedSize = _cardSelectedSizes[product.id] || product.defaultSize;

      return `
        <article class="product-card glass-card" id="card-${product.id}">
          <div class="card-head">
            <div class="card-badge-group">
              <span class="card-badge-pill ${product.badgeClass}">${product.badge}</span>
              <span class="stock-pill in-stock"><span class="stock-dot"></span> В НАЛИЧИИ</span>
            </div>
            <button
              class="wishlist-toggle ${isSaved ? 'is-active' : ''}"
              onclick="event.stopPropagation(); toggleProductWishlist('${product.id}')"
              aria-label="${isSaved ? 'Удалить из избранного' : 'Добавить в избранное'}"
            >
              <i data-lucide="heart"></i>
            </button>
          </div>

          <div class="product-media-frame" onclick="openSizeConfigModal('${product.id}')">
            <img
              src="${product.image}"
              alt="${product.title}"
              class="${product.imageClass}"
              loading="lazy"
            >
            <div class="frame-zoom-hint">
              <i data-lucide="maximize-2"></i>
              <span>ОБЗОР</span>
            </div>
          </div>

          <div class="product-meta">
            <div class="meta-top">
              <div class="meta-code-row">
                <span class="code-tag">АРТ. /${product.code} • ${product.categoryLabel}</span>
                <span class="brand-tag">${product.brand}</span>
              </div>
              <h3 class="product-name" onclick="openSizeConfigModal('${product.id}')">${product.title}</h3>
              <p class="product-specs">${product.description}</p>
              <div class="product-materials-chip">
                <i data-lucide="layers"></i>
                <span>${product.material || 'Премиальные архивные материалы'}</span>
              </div>
            </div>

            <div class="meta-bottom">
              <!-- Инлайн выбор размера прямо на карточке -->
              <div class="inline-size-picker">
                <div class="inline-size-header">
                  <span class="size-title-label">ВЫБЕРИТЕ РАЗМЕР:</span>
                  <span class="selected-size-indicator" id="selectedSizeLabel-${product.id}">${selectedSize}</span>
                </div>
                <div class="size-chips-grid" id="sizeChips-${product.id}">
                  ${product.sizes.map((sz) => `
                    <button
                      type="button"
                      class="size-chip ${sz === selectedSize ? 'is-active' : ''}"
                      onclick="event.stopPropagation(); selectCardSize('${product.id}', '${sz}')"
                    >
                      ${sz}
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- Блок цены и мгновенного добавления в корзину -->
              <div class="price-action-bar">
                <div class="price-stack">
                  <span class="price-spec-label">ЦЕНА В ЕВРО (EUR)</span>
                  <span class="price-bold">${product.priceFormatted}</span>
                </div>
                <button
                  class="add-to-cart-btn"
                  id="addBtn-${product.id}"
                  onclick="event.stopPropagation(); quickAddToCart('${product.id}')"
                  aria-label="Добавить в корзину"
                >
                  <i data-lucide="shopping-bag"></i>
                  <span>+ В КОРЗИНУ</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  // Применяем световое пятно Glass Surface к каждой карточке
  document.querySelectorAll('.glass-card').forEach((card) => {
    bindGlassSpotlight(card);
  });

  initLucideIcons();
}

// ==========================================================================
// 9. КАТЕГОРИИ И ПОИСК
// ==========================================================================
function initCategoryFilters() {
  const pills = document.querySelectorAll('[data-filter]');

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const cat = pill.getAttribute('data-filter');
      _activeCategory = cat;

      document.querySelectorAll('[data-filter]').forEach((p) => {
        p.classList.toggle('is-active', p.getAttribute('data-filter') === cat);
      });

      renderCatalogMatrix();
    });
  });
}

window.resetActiveCategory = function () {
  _activeCategory = 'all';
  _searchFilterQuery = '';
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('[data-filter]').forEach((p) => {
    p.classList.toggle('is-active', p.getAttribute('data-filter') === 'all');
  });

  renderCatalogMatrix();
};

window.toggleSearchOverlay = function (forceState) {
  const searchBar = document.getElementById('searchOverlayBar');
  const searchInput = document.getElementById('searchInput');
  if (!searchBar) return;

  const willOpen = typeof forceState === 'boolean' ? forceState : !searchBar.classList.contains('is-open');
  searchBar.classList.toggle('is-open', willOpen);

  if (willOpen && searchInput) {
    setTimeout(() => searchInput.focus(), 80);
  }
};

function initCatalogSearch() {
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const closeBtn = document.getElementById('searchCloseIcon');

  if (searchBtn) {
    searchBtn.addEventListener('click', () => window.toggleSearchOverlay());
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      _searchFilterQuery = searchInput.value;
      renderCatalogMatrix();
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.toggleSearchOverlay(false);
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      _searchFilterQuery = '';
      window.toggleSearchOverlay(false);
      renderCatalogMatrix();
    });
  }

  // Keyboard shortcut Cmd+K or Ctrl+K
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      window.toggleSearchOverlay();
    }
  });
}

// ==========================================================================
// 10. ШАПКА И МОБИЛЬНОЕ МЕНЮ
// ==========================================================================
function initHeaderNavigation() {
  const header = document.getElementById('siteHeader');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawerNav');

  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }
  }, { passive: true });

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('is-open');
    });

    mobileDrawer.querySelectorAll('.mobile-nav-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
      });
    });
  }
}

// ==========================================================================
// 10.1 МОБИЛЬНЫЙ ПЛАВАЮЩИЙ ДОК НАВИГАЦИИ (FLOATING BOTTOM DOCK)
// ==========================================================================
function initMobileBottomDock() {
  const dockSearchBtn = document.getElementById('dockSearchBtn');
  const dockWishlistBtn = document.getElementById('dockWishlistBtn');
  const dockCartBtn = document.getElementById('dockCartBtn');
  const dockCatalogBtn = document.getElementById('dockCatalogBtn');

  if (dockSearchBtn) {
    dockSearchBtn.addEventListener('click', () => window.toggleSearchOverlay());
  }

  if (dockCartBtn) {
    dockCartBtn.addEventListener('click', () => openCartDrawer());
  }

  if (dockWishlistBtn) {
    dockWishlistBtn.addEventListener('click', () => {
      if (wishlistRegistry.size === 0) {
        displayBoutiqueToast('ИЗБРАННОЕ ПУСТО', 'Нажмите на сердце на карточке товара');
      } else {
        const catTarget = document.getElementById('catalogMatrix');
        if (catTarget) {
          catTarget.scrollIntoView({ behavior: 'smooth' });
        }
        displayBoutiqueToast('ИЗБРАННОЕ', `Сохранено ${wishlistRegistry.size} поз.`);
      }
    });
  }

  if (dockCatalogBtn) {
    dockCatalogBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetActiveCategory();
      const catTarget = document.getElementById('catalogMatrix');
      if (catTarget) {
        catTarget.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// ==========================================================================
// 11. МОДАЛЬНОЕ ОКНО КОНФИГУРАЦИИ РАЗМЕРА
// ==========================================================================
function initSizePickerModal() {
  const backdrop = document.getElementById('sizeModalBackdrop');
  const closeBtn = document.getElementById('closeSizeModalBtn');
  const confirmBtn = document.getElementById('modalConfirmBtn');

  if (closeBtn) closeBtn.addEventListener('click', closeSizeModal);

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeSizeModal();
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (!_modalSelectedItem) return;
      addItemToCart(_modalSelectedItem, _modalPickedSize);
      closeSizeModal();
      openCartDrawer();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSizeModal();
      closeCartDrawer();
    }
  });
}

window.openSizeConfigModal = function (productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  _modalSelectedItem = product;
  _modalPickedSize = product.defaultSize;

  const backdrop = document.getElementById('sizeModalBackdrop');
  const imgEl = document.getElementById('modalImg');
  const badgeEl = document.getElementById('modalBadge');
  const catEl = document.getElementById('modalCategory');
  const titleEl = document.getElementById('modalItemTitle');
  const descEl = document.getElementById('modalItemDesc');
  const priceEl = document.getElementById('modalItemPrice');
  const sizeLabelEl = document.getElementById('activeSizeLabel');
  const gridEl = document.getElementById('modalSizeChipsGrid');

  if (imgEl) {
    imgEl.src = product.image;
    imgEl.className = `modal-product-img ${product.imageClass}`;
  }
  if (badgeEl) badgeEl.textContent = product.badge;
  if (catEl) catEl.textContent = product.categoryLabel;
  if (titleEl) titleEl.textContent = product.title;
  if (descEl) descEl.textContent = product.description;
  if (priceEl) priceEl.textContent = product.priceFormatted;
  if (sizeLabelEl) sizeLabelEl.textContent = _modalPickedSize;

  if (gridEl) {
    gridEl.innerHTML = '';
    product.sizes.forEach((size) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `size-chip-btn ${size === _modalPickedSize ? 'is-selected' : ''}`;
      chip.textContent = size;

      chip.addEventListener('click', () => {
        _modalPickedSize = size;
        if (sizeLabelEl) sizeLabelEl.textContent = size;
        gridEl.querySelectorAll('.size-chip-btn').forEach((c) => c.classList.remove('is-selected'));
        chip.classList.add('is-selected');
      });

      gridEl.appendChild(chip);
    });
  }

  if (backdrop) backdrop.classList.add('is-open');
};

function closeSizeModal() {
  const backdrop = document.getElementById('sizeModalBackdrop');
  if (backdrop) backdrop.classList.remove('is-open');
}

// ==========================================================================
// 12. SLIDE-OUT КОРЗИНА (GLASS DRAWER)
// ==========================================================================
function initCartSlideDrawer() {
  const openBtn = document.getElementById('openCartBtn');
  const closeBtn = document.getElementById('closeCartBtn');
  const backdrop = document.getElementById('cartBackdrop');
  const checkoutBtn = document.getElementById('checkoutBtn');

  if (openBtn) openBtn.addEventListener('click', openCartDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
  if (backdrop) backdrop.addEventListener('click', closeCartDrawer);

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', processCheckout);
  }
}

window.openCartDrawer = function () {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cartBackdrop');
  if (drawer) drawer.classList.add('is-open');
  if (backdrop) backdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  renderCartContent();
};

window.closeCartDrawer = function () {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cartBackdrop');
  if (drawer) drawer.classList.remove('is-open');
  if (backdrop) backdrop.classList.remove('is-open');
  document.body.style.overflow = '';
};

function addItemToCart(product, size) {
  const key = `${product.id}__${size}`;
  const existing = cartCollection.find((item) => item.key === key);

  if (existing) {
    existing.quantity += 1;
  } else {
    cartCollection.push({
      key,
      product,
      size,
      quantity: 1,
    });
  }

  updateCartCounterBadges();
  renderCartContent();
  displayBoutiqueToast('ДОБАВЛЕНО В КОРЗИНУ', `${product.shortTitle} [ ${size} ]`);
}

function updateCartCounterBadges() {
  const count = cartCollection.reduce((sum, it) => sum + it.quantity, 0);
  const headerCount = document.getElementById('cartHeaderCount');
  const drawerCount = document.getElementById('drawerCartBadge');
  const dockBadge = document.getElementById('dockCartBadge');

  if (headerCount) headerCount.textContent = count;
  if (drawerCount) drawerCount.textContent = count;
  if (dockBadge) {
    dockBadge.textContent = count;
    dockBadge.style.display = count > 0 ? 'inline-flex' : 'none';
  }
}

function renderCartContent() {
  const emptyView = document.getElementById('cartEmptyState');
  const itemsBox = document.getElementById('cartItemsContainer');
  const footerPanel = document.getElementById('drawerFooter');
  const subtotalEl = document.getElementById('subtotalPriceVal');
  const totalEl = document.getElementById('totalPriceVal');
  const checkoutBadge = document.getElementById('checkoutTotalBadge');

  if (!itemsBox) return;
  itemsBox.innerHTML = '';

  updateCartCounterBadges();

  if (cartCollection.length === 0) {
    if (emptyView) emptyView.style.display = 'flex';
    if (footerPanel) footerPanel.style.display = 'none';
    return;
  }

  if (emptyView) emptyView.style.display = 'none';
  if (footerPanel) footerPanel.style.display = 'flex';

  let subtotal = 0;

  cartCollection.forEach((item, index) => {
    const cost = item.product.price * item.quantity;
    subtotal += cost;

    const row = document.createElement('div');
    row.className = 'cart-item-card';
    row.innerHTML = `
      <div class="item-thumb-box">
        <img src="${item.product.image}" alt="${item.product.title}">
      </div>

      <div class="item-details">
        <div>
          <h4 class="item-title">${item.product.shortTitle}</h4>
          <span class="item-size-spec">РАЗМЕР: ${item.size}</span>
          <div class="item-cost">${formatCurrencyEur(cost)}</div>
        </div>

        <div class="item-actions-row">
          <div class="qty-stepper">
            <button class="step-btn" onclick="stepItemQuantity(${index}, -1)" aria-label="Уменьшить">-</button>
            <span class="current-qty">${item.quantity}</span>
            <button class="step-btn" onclick="stepItemQuantity(${index}, 1)" aria-label="Увеличить">+</button>
          </div>

          <button class="item-delete-link" onclick="deleteCartRow(${index})" aria-label="Удалить">
            УДАЛИТЬ ✕
          </button>
        </div>
      </div>
    `;

    itemsBox.appendChild(row);
  });

  const totalFormatted = formatCurrencyEur(subtotal);
  if (subtotalEl) subtotalEl.textContent = totalFormatted;
  if (totalEl) totalEl.textContent = totalFormatted;
  if (checkoutBadge) checkoutBadge.textContent = totalFormatted;

  initLucideIcons();
}

window.stepItemQuantity = function (index, delta) {
  if (!cartCollection[index]) return;
  cartCollection[index].quantity += delta;
  if (cartCollection[index].quantity <= 0) {
    cartCollection.splice(index, 1);
  }
  renderCartContent();
};

window.deleteCartRow = function (index) {
  if (!cartCollection[index]) return;
  const name = cartCollection[index].product.shortTitle;
  cartCollection.splice(index, 1);
  renderCartContent();
  displayBoutiqueToast('УДАЛЕНО ИЗ КОРЗИНЫ', name);
};

function processCheckout() {
  if (cartCollection.length === 0) return;
  const total = cartCollection.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
  const totalStr = formatCurrencyEur(total);

  alert(`✦ ЗАКАЗ СФОРМИРОВАН В MURK1INSHOPSPORTFOLIO ✦\n\nСумма: ${totalStr}\nПозиций: ${cartCollection.length}\nКурьерская доставка: Бесплатно (ЕС и СНГ)\n\nСпасибо за выбор архивной осенней коллекции.`);

  cartCollection = [];
  renderCartContent();
  closeCartDrawer();
  displayBoutiqueToast('ЗАКАЗ УСПЕШНО ОФОРМЛЕН', `Сумма: ${totalStr}`);
}

// ==========================================================================
// 13. ИЗБРАННОЕ (WISHLIST)
// ==========================================================================
window.toggleProductWishlist = function (productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  if (wishlistRegistry.has(productId)) {
    wishlistRegistry.delete(productId);
    displayBoutiqueToast('УДАЛЕНО ИЗ ИЗБРАННОГО', product.shortTitle);
  } else {
    wishlistRegistry.add(productId);
    displayBoutiqueToast('ДОБАВЛЕНО В ИЗБРАННОЕ', product.shortTitle);
  }

  const badge = document.getElementById('wishlistBadge');
  const dockBadge = document.getElementById('dockWishlistBadge');
  const count = wishlistRegistry.size;

  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
  if (dockBadge) {
    dockBadge.textContent = count;
    dockBadge.style.display = count > 0 ? 'inline-flex' : 'none';
  }

  renderCatalogMatrix();
};

// ==========================================================================
// 14. СЕРВИСНЫЕ МОДАЛКИ И ПОДПИСКА
// ==========================================================================
window.handleClubSubscribe = function (e) {
  e.preventDefault();
  const input = document.getElementById('newsletterEmail');
  const successEl = document.getElementById('clubSuccess');

  if (input && input.value) {
    if (successEl) successEl.style.display = 'block';
    displayBoutiqueToast('ДОСТУП ОТКРЫТ', 'Вы добавлены в закрытый клуб дропов.');
    input.value = '';
    setTimeout(() => {
      if (successEl) successEl.style.display = 'none';
    }, 4000);
  }
};

window.showServiceModal = function (type) {
  const notices = {
    delivery: 'БЕСПЛАТНАЯ КУРЬЕРСКАЯ ДОСТАВКА // ЕС И СНГ\n\nВсе архивные заказы доставляются застрахованным экспрессом DHL / СДЭК с трекинг-номером и подтверждением вручения.',
    returns: 'ВОЗВРАТ И ПРИМЕРКА 14 ДНЕЙ\n\nВы можете примерить вещь и вернуть её в течение 14 дней с сохранением всех пломб и оригинальной упаковки.',
    auth: 'ДВОЙНАЯ АУТЕНТИФИКАЦИЯ LEGIT CHECK\n\nКаждая пара обуви и вещь проверяются экспертами на фабричную подлинность перед отправкой.',
    sizes: 'ТАБЛИЦА РАЗМЕРОВ\n\nОбувь: европейская сетка EU 40–45.\nОдежда: оригинальный оверсайз-крой Vetements и Balenciaga.',
  };

  alert(notices[type] || 'MURK1INSHOPSPORTFOLIO — КЛИЕНТСКИЙ СЕРВИС');
};

// ==========================================================================
// 15. ТОАСТ-ОПОВЕЩЕНИЕ
// ==========================================================================
function displayBoutiqueToast(title, caption) {
  const toast = document.getElementById('glassToast');
  const titleEl = document.getElementById('toastTitle');
  const capEl = document.getElementById('toastCaption');

  if (!toast) return;

  if (titleEl) titleEl.textContent = title;
  if (capEl) capEl.textContent = caption;

  toast.classList.add('is-visible');

  if (_toastHideTimer) clearTimeout(_toastHideTimer);
  _toastHideTimer = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2800);
}

// ==========================================================================
// 16. УТИЛИТА ФОРМАТИРОВАНИЯ ЦЕН
// ==========================================================================
function formatCurrencyEur(amount) {
  return `${amount.toLocaleString('ru-RU')} €`;
}

// ==========================================================================
// 17. ЭКСПОРТ ДЛЯ ИНЛАЙН ОБРАБОТЧИКОВ СОБЫТИЙ (HTML ONCLICK)
// ==========================================================================
window.toggleProductWishlist = toggleProductWishlist;
window.openSizeConfigModal = openSizeConfigModal;
window.closeSizeConfigModal = closeSizeModal;
window.resetActiveCategory = resetActiveCategory;
window.stepItemQuantity = stepItemQuantity;
window.deleteCartRow = deleteCartRow;
window.changeCartItemQty = stepItemQuantity;
window.removeCartItem = deleteCartRow;
window.executeCheckout = processCheckout;
window.openCart = openCartDrawer;
window.closeCart = closeCartDrawer;
window.openCartDrawer = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;
window.switchHeroProduct = switchHeroProduct;
window.selectCardSize = selectCardSize;
window.quickAddToCart = quickAddToCart;



