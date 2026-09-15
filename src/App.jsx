import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroStage from './components/HeroStage';
import CatalogMatrix from './components/CatalogMatrix';
import CartDrawer from './components/CartDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import Particles from './components/react-bits/Particles';
import { PRODUCTS } from './data/products';
import { Check } from 'lucide-react';

export default function App() {
  // State
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeProduct, setActiveProduct] = useState(PRODUCTS[0]); // Balenciaga Track.1
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState(null);
  const [notification, setNotification] = useState(null);

  // Filter products by category
  const filteredProducts =
    activeCategory === 'ALL'
      ? PRODUCTS
      : PRODUCTS.filter((item) => item.category === activeCategory);

  // Bag handlers
  const handleAddToCart = (product, size) => {
    const itemSize = size || product.defaultSize;
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.id === product.id && i.selectedSize === itemSize
      );
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.selectedSize === itemSize
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, selectedSize: itemSize, quantity: 1 }];
    });

    // Show luxury brutalist toast
    setNotification({
      title: 'ADDED TO ARCHIVAL BAG',
      message: `${product.title} [ ${itemSize} ]`,
    });
    setTimeout(() => {
      setNotification(null);
    }, 2400);
  };

  const handleUpdateQuantity = (id, size, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.selectedSize === size))
    );
  };

  const handleUpdateSize = (id, oldSize, newSize) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === oldSize
          ? { ...item, selectedSize: newSize }
          : item
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Inspect 3D handler
  const handleInspectProduct = (product) => {
    setActiveProduct(product);
    // Smooth scroll to hero stage if user is down the page
    const stage = document.getElementById('model-viewport');
    if (stage) {
      stage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="storefront relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      {/* React Bits: Particles Floating Dust Motes in Background */}
      <Particles
        particleCount={45}
        speed={0.12}
        particleColors={['#ffffff', '#cccccc', '#777777']}
        moveParticlesOnHover={true}
        particleHoverFactor={1.2}
        alpha={0.22}
        particleBaseSize={1.1}
      />

      {/* Top Nav Header */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Hero 3D Stage Section */}
      <HeroStage
        activeProduct={activeProduct}
        onOpenQuickSelect={() => handleAddToCart(activeProduct)}
      />

      {/* Catalog Matrix Section */}
      <CatalogMatrix
        products={filteredProducts}
        allProductsCount={PRODUCTS.length}
        activeProduct={activeProduct}
        onInspectProduct={handleInspectProduct}
        onQuickSelect={(item) => handleAddToCart(item)}
        onOpenDetail={setSelectedDetailProduct}
      />

      {/* Bottom Brutalist Vault Footer */}
      <footer className="relative z-20 border-t border-white/[0.08] bg-[#080808] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-neutral-500 font-mono text-xs uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-white inline-block" />
            <span className="text-white font-bold">B / V — ARCHIVE</span>
            <span>// PARIS • DIGITAL REPRODUCTION RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span>60 FPS WEBGL PIPELINE</span>
            <span>REACT BITS ANIMATIONS</span>
            <span>VAULT CIPHER 0x7B</span>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onUpdateSize={handleUpdateSize}
        onClearCart={handleClearCart}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedDetailProduct}
        isOpen={!!selectedDetailProduct}
        onClose={() => setSelectedDetailProduct(null)}
        onInspect3D={handleInspectProduct}
        onAddToBag={handleAddToCart}
      />

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-white text-black font-mono text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-fade-in">
          <Check className="w-4 h-4 text-black shrink-0" />
          <div>
            <div className="font-bold">{notification.title}</div>
            <div className="text-[10px] text-neutral-700">{notification.message}</div>
          </div>
        </div>
      )}
    </main>
  );
}
