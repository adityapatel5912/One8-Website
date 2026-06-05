/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  url: string;
}

export const products: Product[] = [
  {
    id: "seam-xviii-spike",
    name: "PUMA × ONE8 SEAM XVIII SPIKES",
    category: "Professional Footwear",
    price: 7999,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=900",
    description: "The elite cricket spike engineered for ultimate multi-directional traction, lightweight response, and persistent comfort during long hours on the field.",
    url: "https://one8.com/pages/seam-xviii"
  },
  {
    id: "cover-drive-cleat",
    name: "PUMA × ONE8 COVER DRIVE CLEATS",
    category: "Training Footwear",
    price: 5499,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=900",
    description: "Multi-activity training cleat featuring a low-profile rubber outsole, advanced cushioning, and dynamic lateral stability inspired by Virat Kohli’s stroke play.",
    url: "https://one8.com/pages/cover-drive"
  },
  {
    id: "basket-classic-one8",
    name: "PUMA × ONE8 BASKET CLASSIC",
    category: "Lifestyle Footwear",
    price: 6999,
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=900",
    description: "The iconic retro leather sneaker elevated with signature gold Virat Kohli branding, minimalist aesthetic touches, and ultimate everyday comfort.",
    url: "https://one8.com/products/basket-classic"
  },
  {
    id: "wired-run-one8",
    name: "PUMA × ONE8 WIRED RUN",
    category: "Running Footwear",
    price: 3499,
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=900",
    description: "Breathable run sneaker featuring athletic mesh upper, flexible IMEVA midsole, and a branded elastic strap offering uncompromised slip-on lock.",
    url: "https://one8.com/products/wired-run"
  },
  {
    id: "one8-intense-edp",
    name: "ONE8 INTENSE EAU DE PARFUM",
    category: "Fragrances",
    price: 1499,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=900",
    description: "A rich, long-lasting premium scent designed for high-intensity lifestyles. Composed of fresh maritime top notes blended with deep elements of dry amber and cedarwood.",
    url: "https://one8.com/products/intense-fragrance"
  },
  {
    id: "one8-gold-edp",
    name: "ONE8 GOLD COUTURE EDP",
    category: "Fragrances",
    price: 1899,
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=800",
    description: "Couture release featuring warm spicy notes, dark patchouli, layered under dry tobacco leaves. The pinnacle of post-game executive confidence.",
    url: "https://one8.com/products/gold-couture-perfume"
  },
  {
    id: "puma-one8-training-tee",
    name: "PUMA × ONE8 CORE DRYCELL TEE",
    category: "Apparel",
    price: 1999,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800",
    description: "Equipped with signature dryCELL moisture control technology, designed side-by-side with Virat Kohli to sustain high-yield gym and athletic movements.",
    url: "https://one8.com/products/training-tee"
  },
  {
    id: "one8-select-boots",
    name: "ONE8 SELECT LEATHER CHELSEA BOOTS",
    category: "Premium Footwear",
    price: 10999,
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=800",
    description: "Artisanal Chelsea boots handcrafted out of authentic high-sheen Italian calf leather, complete with debossed stitching and elegant premium comfort insoles.",
    url: "https://one8.com/products/select-chelsea-boots"
  }
];
