import { useCart } from "../context/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  } = useCart();

  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [checkoutOrderId, setCheckoutOrderId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const randomId = "18-" + Math.floor(100000 + Math.random() * 900000);
      setCheckoutOrderId(randomId);
      setIsProcessing(false);
      setCheckoutComplete(true);
    }, 1500);
  };

  const handleCloseSuccess = () => {
    clearCart();
    setCheckoutComplete(false);
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-500 overflow-hidden" id="luxury-cart-overlay">
      {/* Black backdrop with high-end blur */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-500"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* Cart panel container wrapper */}
        <div className="w-screen max-w-md bg-near-black border-l border-white/5 flex flex-col shadow-2xl relative">
          {/* Grain texture layer */}
          <div className="absolute inset-0 bg-grain opacity-5 pointer-events-none z-0" />

          {/* Header Panel */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-gold" />
              <h2 className="font-display font-black text-base tracking-widest text-white uppercase">
                YOUR DECK <span className="text-gold">({cartCount})</span>
              </h2>
            </div>
            <button
              id="close-cart-btn"
              onClick={() => setIsCartOpen(false)}
              className="p-1 px-2.5 border border-white/5 hover:border-gold text-white/50 hover:text-gold font-mono text-[9px] tracking-widest uppercase transition-colors"
            >
              CLOSE [ESC]
            </button>
          </div>

          {!checkoutComplete ? (
            <>
              {/* Product list panel */}
              <div className="flex-grow overflow-y-auto p-6 relative z-10 space-y-4 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-white/20">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Your deck is empty</h4>
                      <p className="text-xs text-white/40 max-w-xs mx-auto">
                        There are no elite gear pieces in your loadout. Choose from our curated collection list index.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-5 py-2.5 border border-gold text-gold font-mono text-[10px] tracking-widest uppercase hover:bg-gold hover:text-near-black transition-colors"
                    >
                      BROWSE GEAR INDEX
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="group flex gap-4 bg-[#0E1012] border border-white/5 p-4 relative"
                      id={`cart-item-${item.product.id}`}
                    >
                      {/* Left thumbnail image */}
                      <div className="w-20 h-24 flex-shrink-0 bg-black overflow-hidden relative border border-white/5">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover grayscale"
                        />
                      </div>

                      {/* Content panel */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-display text-xs text-white font-bold leading-tight uppercase line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                              className="text-white/25 hover:text-red-500 transition-colors p-0.5"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex gap-3 text-[9px] font-mono tracking-wider text-white/40 uppercase">
                            <span>CAT: {item.product.category}</span>
                            <span className="text-gold font-bold">SIZE: {item.selectedSize}</span>
                          </div>
                        </div>

                        {/* Quantity and Price row */}
                        <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5">
                          {/* Quantity selectors */}
                          <div className="flex items-center border border-white/10 overflow-hidden bg-black">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                              className="px-2 py-1 text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="px-2 font-mono text-xs text-white select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                              className="px-2 py-1 text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          <span className="font-mono text-xs font-black text-white">
                            ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom Totals panel */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/5 bg-[#0A0C0E] relative z-10 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between font-mono text-xs text-white/40">
                      <span>LOADOUT SUB-TOTAL</span>
                      <span className="text-white">₹{cartTotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between font-mono text-xs text-white/40">
                      <span>COUTURE LOGISTICS FEE</span>
                      <span className="text-gold font-semibold uppercase text-[10px]">COMPLIMENTARY</span>
                    </div>
                    <div className="pt-2 border-t border-white/5 flex justify-between items-baseline">
                      <span className="font-display font-black text-sm tracking-widest text-white uppercase">GRAND TOTAL</span>
                      <span className="font-mono text-lg font-black text-gold">
                        ₹{cartTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      id="cart-checkout-cta"
                      disabled={isProcessing}
                      onClick={handleCheckout}
                      className="w-full relative overflow-hidden py-4 bg-gold hover:bg-gold-hover text-near-black text-xs font-mono font-black tracking-widest uppercase transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 border-2 border-near-black border-t-transparent rounded-full animate-spin" />
                          CRYPTOGRAPHIC REGISTERING...
                        </span>
                      ) : (
                        <>
                          RESERVE ACTIVE ASSEMBLY
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                    <button
                      onClick={clearCart}
                      className="w-full py-2 bg-transparent text-[10px] font-mono tracking-widest text-white/30 hover:text-white transition-colors uppercase text-center"
                    >
                      CLEAR DECK INDEX
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Successful Checkout Confirmation Screen */
            <div className="flex-grow p-6 flex flex-col justify-between relative z-10 bg-gradient-to-b from-[#0E1012] to-black">
              <div className="space-y-6 pt-12 text-center">
                <div className="w-16 h-16 rounded-full border border-gold border-dashed flex items-center justify-center mx-auto text-gold animate-spin-slow">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-[0.3em] text-gold font-bold uppercase">
                    ASSEMBLY SECURED
                  </span>
                  <h3 className="font-display font-black text-2xl text-white tracking-tight uppercase leading-snug">
                    TRANSACTION REGISTERED
                  </h3>
                  <div className="bg-near-black border border-white/5 py-3 px-4 rounded-none max-w-xs mx-auto">
                    <p className="font-mono text-[9px] text-[#444] tracking-widest uppercase">CRYPTOGRAPHIC REGISTRY ID</p>
                    <p className="font-mono text-sm text-gold font-black mt-1">{checkoutOrderId}</p>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed max-w-sm mx-auto pt-2">
                    Your luxury Puma × One8 specification gear has been locked to your ID. A concierge dispatch courier is compiling your premium carbon elements layout.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 border border-white/5 bg-near-black/50 space-y-1.5 text-[10px] font-mono text-left">
                  <div className="flex justify-between text-white/40">
                    <span>SECURITY HASH</span>
                    <span className="text-white/60">SHA-256//VALIDATED</span>
                  </div>
                  <div className="flex justify-between text-white/40">
                    <span>RELEASE STAMP</span>
                    <span className="text-white/60">2026 SPECIFICATION</span>
                  </div>
                  <div className="flex justify-between text-white/40">
                    <span>STATUS REPORT</span>
                    <span className="text-gold font-bold">PREPARING FOR DISPATCH</span>
                  </div>
                </div>

                <button
                  onClick={handleCloseSuccess}
                  className="w-full py-4 bg-gold text-near-black text-xs font-mono font-black tracking-widest uppercase transition-all duration-300 transform active:scale-95"
                >
                  RETURN TO ARCHIVES
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
