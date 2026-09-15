import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import RippleButton from './react-bits/RippleButton';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateSize,
  onClearCart,
}) {
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutComplete(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <aside className="relative z-10 w-full max-w-md h-full bg-[#0d0d0d] border-l border-white/[0.1] text-white flex flex-col justify-between shadow-2xl overflow-hidden animate-fade-in">
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 bg-white" />
            <h3 className="font-display font-bold text-lg tracking-tight uppercase">
              ARCHIVAL BAG [ {cartItems.reduce((acc, i) => acc + i.quantity, 0)} ]
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors focus:outline-none"
            aria-label="Close Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Completed Overlay Notification */}
        {checkoutComplete ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-white animate-bounce" />
            <h4 className="font-display font-extrabold text-2xl tracking-tight uppercase">
              ORDER CONFIRMED
            </h4>
            <p className="font-mono text-xs text-neutral-400 tracking-wider">
              ARCHIVAL ALLOCATION SECURED. VAULT DISPATCH INITIATED FOR 2026 RELEASE.
            </p>
            <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase">
              AUTHENTICATION CHIP #893-ARCH-002
            </span>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Bag State */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
            <div className="w-12 h-12 border border-dashed border-white/20 flex items-center justify-center mb-2">
              <span className="font-mono text-neutral-500 text-xs">00</span>
            </div>
            <p className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
              ARCHIVAL BAG EMPTY
            </p>
            <p className="font-mono text-[11px] text-neutral-600 uppercase max-w-xs">
              SELECT PIECES FROM THE MATRIX TO INITIALIZE ARCHIVAL ORDER.
            </p>
          </div>
        ) : (
          /* Cart Items List */
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-white/[0.06]">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="pt-4 first:pt-0 flex gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-[#161616] border border-white/[0.08] shrink-0 p-2 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display font-bold text-sm tracking-tight uppercase text-white">
                        {item.title}
                      </h4>
                      <span className="font-mono text-xs font-bold text-white">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>

                    {/* Size Selector */}
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="font-mono text-[10px] text-neutral-500 uppercase">
                        SIZE:
                      </span>
                      <select
                        value={item.selectedSize}
                        onChange={(e) => onUpdateSize(item.id, item.selectedSize, e.target.value)}
                        className="bg-[#1a1a1a] text-white border border-white/[0.1] font-mono text-[10px] px-2 py-0.5 rounded-none focus:outline-none"
                      >
                        {item.sizes.map((sz) => (
                          <option key={sz} value={sz}>
                            {sz}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex items-center justify-between mt-3 pt-2">
                    <div className="flex items-center border border-white/[0.1] bg-[#141414]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}
                        className="p-1 hover:bg-white/[0.1] text-neutral-400 hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs px-3 text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}
                        className="p-1 hover:bg-white/[0.1] text-neutral-400 hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id, item.selectedSize)}
                      className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Drawer Footer / Summary */}
        {!checkoutComplete && cartItems.length > 0 && (
          <div className="p-6 border-t border-white/[0.08] bg-[#0a0a0a] space-y-4">
            <div className="space-y-1.5 font-mono text-xs tracking-wider">
              <div className="flex justify-between text-neutral-400">
                <span>SUBTOTAL</span>
                <span className="text-white font-bold">${totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-500 text-[10px]">
                <span>ARCHIVAL FREIGHT</span>
                <span className="text-neutral-400">COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between text-neutral-500 text-[10px]">
                <span>VAULT AUTHENTICATION</span>
                <span className="text-neutral-400">INCLUDED // NFC</span>
              </div>
              <div className="border-t border-white/[0.08] pt-2 flex justify-between text-sm font-bold text-white">
                <span>TOTAL</span>
                <span className="font-mono text-base">${totalAmount.toLocaleString()} USD</span>
              </div>
            </div>

            <RippleButton
              onClick={handleCheckout}
              className="w-full py-3.5 bg-white hover:bg-neutral-200 text-black font-bold flex items-center justify-center gap-2"
            >
              <span>PROCEED TO ARCHIVAL CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </RippleButton>

            <div className="flex items-center justify-center gap-2 text-neutral-500 font-mono text-[9px] tracking-widest uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ENCRYPTED MONOCHROME VAULT TRANSACTION</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
