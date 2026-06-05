import { useCart } from "../context/CartContext";
import { X, ShoppingBag, Radio, Shield, Fingerprint, Award, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Product } from "../lib/products";

// Bespoke Premium Details for each curated product
interface PremiumSpecs {
  materials: string;
  weight: string;
  designerNotes: string;
  technicalDetails: string[];
  features: { icon: any; title: string; desc: string }[];
}

const PRODUCT_PREMIUM_DETAILS_MAP: Record<string, PremiumSpecs> = {
  "seam-xviii-spike": {
    materials: "Carbon-Fiber Mesh / 100% Full Grain Kangaroo Leather Overlays / Dynamic spikes plate",
    weight: "260g (Superlight Speed Frame)",
    designerNotes: "Designed hand-in-hand with Virat Kohli for extreme lateral load during dynamic run-ups. Features customizable 11-spike arrays to adapt to varying wicket moisture coefficients.",
    technicalDetails: [
      "Ultra-low profile EVA cushioning base",
      "Reinforced carbon-fiber heel block stabilizer",
      "Dynamic multi-directional pivot spikes layout",
      "Dual strap system for customized midfoot tension locking"
    ],
    features: [
      { icon: Fingerprint, title: "AUTHENTIC BIOMETRICS", desc: "Designed around professional speed biomechanics blueprints." },
      { icon: Shield, title: "HEAVY-IMPACT GUARD", desc: "Reinforced toe protection matrix resists dense friction abrasion." }
    ]
  },
  "cover-drive-cleat": {
    materials: "Premium Knitted Mesh upper / Ergonomic EVA-backed midsole / High tensile traction rubber",
    weight: "295g (Pro Stability Chassis)",
    designerNotes: "Precision structured to handle maximum ground reaction forces during defensive stances and rapid stroke-making. Combines raw luxury skin comfort with explosive energy return.",
    technicalDetails: [
      "Signature PRO-GLIDE multi-terrain layout",
      "Dual density midsole providing plush impact absorption",
      "Engineered flexible groove frame to assist swift twist-and-turn pivot actions",
      "Ortholite premium ventilation sockliner"
    ],
    features: [
      { icon: TrendingUp, title: "ENERGY RETURN METER", desc: "Engineered cell geometry pushes energy response dynamically." },
      { icon: Award, title: "ELITE CERTIFIED", desc: "Designed, tested, and vetted under elite cricket pitch standards." }
    ]
  },
  "basket-classic-one8": {
    materials: "100% Pure Italian Calf-Leather / Debossed Gold Branding / Solid Rubber Flat Sole",
    weight: "340g (Premium Heritage Build)",
    designerNotes: "A meticulous redesign of PUMA's timeless retro basketball style. Infused with 24k-gold debossed typography, custom vintage textures, and a custom cushioned arch structure.",
    technicalDetails: [
      "Full premium calf leather collar linings",
      "Refined stitched perimeter rubber cupsole",
      "Symmetrical lace system with dual metallic-tipped options",
      "Unique low-profile tongue design with integrated Virat Kohli script"
    ],
    features: [
      { icon: Fingerprint, title: "COUTURE BRANDING", desc: "Exclusive Virat Kohli signature embossed precisely in precious gold." },
      { icon: Shield, title: "LIFETIME REINFORCED", desc: "Stitched side cups ensure total separation resilience over years." }
    ]
  },
  "wired-run-one8": {
    materials: "Engineered Flow Mesh Upper / Ultra-soft elastic tension bands / IMEVA molded midsole",
    weight: "210g (Zero-Gravity Active)",
    designerNotes: "The ultimate hyper-accessible daily trainer. Minimal layout allows maximum lightweight airflow, making it the perfect companion for pre-workout sessions, cardio work, and daily street commutes.",
    technicalDetails: [
      "Integrated elastic midfoot tension lock system",
      "Molded featherweight EVA compression midsole",
      "Enhanced heel pull tab for swift slip-on accessibility",
      "Segmented rubber outsole reinforcements for dynamic heel-to-toe flex"
    ],
    features: [
      { icon: Radio, title: "FLOW SYSTEM", desc: "Continuous double-weave mesh permits maximum moisture-wick escape." },
      { icon: Award, title: "ACTIVE-STABILIZED", desc: "High elastic cross strap reduces lateral ankle roll dynamically." }
    ]
  },
  "one8-intense-edp": {
    materials: "Natural Maritime Oils / Deep Cedarwood / Premium Dry Amber Extract",
    weight: "100ml / 3.4 FL OZ",
    designerNotes: "An olfactory blueprint representing pure focus. Blending high-energy marine dynamic vapors with underlying smoky wood tones, it mirrors the shift from intense physical exertion to post-game confidence.",
    technicalDetails: [
      "Engineered long-lasting formulation (8-10 hour sillage projection)",
      "High concentration Eau de Parfum grade elements",
      "Custom monolithic magnetic charcoal glass container",
      "High dispersion executive mist spray nozzle"
    ],
    features: [
      { icon: Fingerprint, title: "SIGNATURE BLEND", desc: "Artisanal compound curated by elite master perfumers." },
      { icon: Shield, title: "PRECISION PROJECT", desc: "Stays locked to fiber or biological base for prolonged aromatic output." }
    ]
  },
  "one8-gold-edp": {
    materials: "Spicy Cardamom Vapors / Dark patchouli base / Aged Dry Tobacco Leaf extracts",
    weight: "100ml / 3.4 FL OZ",
    designerNotes: "The pinnacle of our fragrance line. Gold Couture fragrance is built for the premium celebratory events. Designed to invoke luxury, warmth, and command attention in any boardroom or victory event.",
    technicalDetails: [
      "Couture level spicy-woody character formulation",
      "Rich formulation with 18% essential oil concentration",
      "Weighted premium clear glass bottle with embedded custom gold core",
      "Sealed with a magnetic matte black protective cap"
    ],
    features: [
      { icon: Award, title: "COUTURE EDITION", desc: "Limited run release formulated for luxury lifestyle connoisseurs." },
      { icon: TrendingUp, title: "PROJECT DYNAMICS", desc: "Reacts unique to body heats, projecting a distinct dry tobacco tone." }
    ]
  },
  "puma-one8-training-tee": {
    materials: "88% Recycled Poly-Performance Blend / 12% Cool-Touch Elastane",
    weight: "120g (Feather Breathable Tech)",
    designerNotes: "A dryCELL engineered high-cut athletic tee. Tested during training sessions of the highest workload, keeping the athlete's temperature stable and sweat-evaporated without cling or drag.",
    technicalDetails: [
      "Integrated flatlock stitching systems to prevent dynamic seam chafing",
      "Underarm custom ventilation air slits",
      "Subtle reflective silver 'one8' heat transfer insignia",
      "Dropped athletic tail hem for better range of motion during squats"
    ],
    features: [
      { icon: Radio, title: "DRYCELL MATRIX", desc: "Instantly routes moisture drops away from skin surface pores." },
      { icon: Shield, title: "ANTI-BACTERIAL", desc: "Silver-ion fabric treatment terminates sweat-induced fabric decay." }
    ]
  },
  "one8-select-boots": {
    materials: "Premium Handpicked Italian Calfskins / Authentic elastic side panels / Hand-welted soles",
    weight: "480g (Executive Artisanal Quality)",
    designerNotes: "Individually handcrafted Chelsea boots representing the high-end apparel limits of One8. Merging pristine Italian calf hides with solid welted outsoles to fit clean lines of tailored luxury suits.",
    technicalDetails: [
      "Custom layered leather and memory foam high-comfort insole system",
      "Traditional Goodyear leather storm welt structure",
      "Precision tapered ankle profile for smart sleek pairing",
      "Durable non-slip rubber pad inserts embedded in the heel"
    ],
    features: [
      { icon: Fingerprint, title: "HAND CRAFTED", desc: "Individually hand-welted, dyed, and verified in master ateliers." },
      { icon: Shield, title: "INVESTMENT GRADE", desc: "Resoleable structure ensures a lifetime of premium utility." }
    ]
  }
};

export default function ProductDetailModal() {
  const { selectedProduct, closeProductDetails, addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("UK 9");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "notes">("specs");

  // Reset default selection state on product change
  useEffect(() => {
    setSelectedSize("UK 9");
    setQuantity(1);
    setActiveTab("specs");
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const specs = PRODUCT_PREMIUM_DETAILS_MAP[selectedProduct.id] || {
    materials: "Premium composite technical elements",
    weight: "Standard Spec Weight",
    designerNotes: "An outstanding athletic element designed to augment performance boundaries and match aesthetic purity.",
    technicalDetails: [
      "Elite tier structural design alignment",
      "Ergonomic fitment engineering",
      "Built for continuous training flexibility"
    ],
    features: [
      { icon: Award, title: "PREMIUM GRADE", desc: "Certified and authorized under high-end quality assurance cycles." }
    ]
  };

  const isFragrance = selectedProduct.category.toLowerCase().includes("fragrance");
  const sizes = isFragrance ? ["50ml", "100ml"] : ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"];

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedSize);
    closeProductDetails();
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="fixed inset-0 z-500 overflow-y-auto px-4 py-6 sm:px-6 flex items-center justify-center" id="product-detail-modal">
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-500"
        onClick={closeProductDetails}
      />

      {/* Main modal canvas */}
      <div className="relative bg-near-black border border-white/5 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row rounded-none text-left custom-scrollbar">
        {/* Subtle texture layer */}
        <div className="absolute inset-0 bg-grain opacity-5 pointer-events-none" />

        {/* Floating Close Action */}
        <button
          onClick={closeProductDetails}
          className="absolute top-5 right-5 z-40 bg-near-black/60 hover:bg-white/10 hover:text-gold border border-white/5 p-2 transition-colors cursor-pointer text-white/50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Interactive Image panel */}
        <div className="w-full md:w-1/2 bg-black flex flex-col justify-between relative overflow-hidden group min-h-[350px] md:min-h-[500px]">
          {/* Subtle gradient banner */}
          <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5">
            <span className="text-[9px] font-mono tracking-widest text-[#555] uppercase">
              ACTIVE ROSTER PRODUCT INDEX
            </span>
            <span className="text-white/30 text-[10px] font-mono font-bold tracking-widest uppercase">
              CERTIFICATE // COUTURE LABS
            </span>
          </div>

          {/* Grayscale Product display */}
          <div className="w-full h-full flex items-center justify-center p-8 relative">
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full max-w-[340px] md:max-w-full h-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700 brightness-[0.7] group-hover:brightness-[0.9]"
            />
          </div>

          {/* Footer of Image container */}
          <div className="p-6 relative z-15 bg-gradient-to-t from-[#0E0F11] to-transparent">
            <span className="text-[9px] font-mono text-gold tracking-widest uppercase font-bold">
              ★ SPEC-018 // HIGH PERFORMANCE DEPLOYMENT
            </span>
          </div>
        </div>

        {/* Right Info pane with rich detailed grid configuration */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5 relative z-10">
          <div className="space-y-6">
            {/* Header branding details */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-gold font-bold uppercase">
                {selectedProduct.category}
              </span>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight uppercase leading-snug">
                {selectedProduct.name}
              </h2>
              <div className="flex justify-between items-baseline pt-1">
                <span className="font-mono text-lg font-black text-white">
                  ₹{selectedProduct.price.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 tracking-wider">
                  ✓ READY IN WAREHOUSE
                </span>
              </div>
            </div>

            {/* Description Block */}
            <p className="text-xs text-white/50 leading-relaxed font-light">
              {selectedProduct.description}
            </p>

            {/* Dynamic Sizing selector */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
                  {isFragrance ? "VOLUME CAPACITY" : "SELECT SPECIFICATION SIZING"}
                </span>
                <span className="text-[9px] font-mono text-gold uppercase">
                  {isFragrance ? "COMPOUND CONTENT" : "STANDARD FIT (READY)"}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-[10px] font-mono transition-all duration-300 border font-bold ${
                      selectedSize === size
                        ? "bg-gold text-near-black border-gold"
                        : "bg-[#0E1012] text-white/60 border-white/5 hover:border-white/20"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Details Switchable tab layout */}
            <div className="border border-white/5 bg-[#0A0C0E] p-4 relative space-y-3">
              <div className="flex border-b border-white/5 pb-2 gap-4">
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`text-[9.5px] font-mono tracking-widest uppercase font-bold transition-colors ${
                    activeTab === "specs" ? "text-gold" : "text-white/30 hover:text-white"
                  }`}
                >
                  SPEC DETAILS
                </button>
                <button
                  onClick={() => setActiveTab("notes")}
                  className={`text-[9.5px] font-mono tracking-widest uppercase font-bold transition-colors ${
                    activeTab === "notes" ? "text-gold" : "text-white/30 hover:text-white"
                  }`}
                >
                  DESIGNER LOGS
                </button>
              </div>

              {activeTab === "specs" ? (
                <div className="space-y-2 text-[10px] font-mono">
                  <div className="flex justify-between text-white/30">
                    <span className="uppercase">COMPOSITION:</span>
                    <span className="text-white text-right font-light line-clamp-1">{specs.materials}</span>
                  </div>
                  <div className="flex justify-between text-white/30">
                    <span className="uppercase">WEIGHT INDEX:</span>
                    <span className="text-white text-right font-light">{specs.weight}</span>
                  </div>
                  <div className="space-y-1 pt-1.5 border-t border-white/5">
                    <p className="text-white/25 uppercase text-[9px] tracking-wider mb-1">TECHNICAL REGISTER:</p>
                    {specs.technicalDetails.map((detail, index) => (
                      <div key={index} className="flex gap-2 items-start text-white/60 leading-normal font-light">
                        <span className="text-gold">▪</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[11px] text-white/60 leading-relaxed font-light italic">
                    "{specs.designerNotes}"
                  </p>
                  <p className="text-[9px] font-mono text-white/30 truncate">
                    // AUTHENTICATION LOGGED AT OFFICE FOR CREATIVE DIRECTION // 2026
                  </p>
                </div>
              )}
            </div>

            {/* Interlaced Features Grid highlighting craftsmanship */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              {specs.features.map((feat, index) => {
                const IconComp = feat.icon;
                return (
                  <div key={index} className="flex gap-2.5 items-start">
                    <div className="p-1.5 border border-white/10 text-gold bg-black/45">
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <div className="space-y-0.5">
                      <h5 className="font-mono text-[9px] font-black text-white uppercase tracking-wider">{feat.title}</h5>
                      <p className="text-[9.5px] text-white/45 leading-normal font-light">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quantity & Action Checkout block */}
          <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
            <div className="flex gap-4 items-center">
              {/* Quantity selector */}
              <div className="flex flex-col gap-1">
                <span className="text-[8.5px] font-mono text-white/30 uppercase tracking-widest">QUANTITY</span>
                <div className="flex items-center border border-white/10 overflow-hidden bg-black h-11 w-32 justify-between">
                  <button
                    onClick={decrementQuantity}
                    className="px-3.5 h-full text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs text-white font-bold select-none">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="px-3.5 h-full text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Loadout CTA */}
              <button
                onClick={handleAddToCart}
                id="modal-add-to-cart-cta"
                className="flex-grow h-11 self-end relative overflow-hidden bg-gold hover:bg-gold-hover text-near-black font-mono text-[10px] tracking-widest font-black uppercase transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-gold/15"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                ADD TO LOADOUT DECK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
