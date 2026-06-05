/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductStat, CollectionCard, SocialPost, NavLink } from "./types";

export const BRAND_TAGLINE = "ALWAYS PLAY";
export const BRAND_TAGLINE_SUB = "COUTURE SPORTSWEAR BY VIRAT KOHLI";

export const BRAND_PHILOSOPHY = [
  "One8 was born from a singular conviction: that activewear should perform at the highest limits of human athleticism while expressing a distinct, cinematic aesthetic.",
  "Designed in partnership with Virat Kohli, the brand matches elite physical engineering with modern dark-luxury silhouettes.",
  "Whether you are dominating the pitch, conquering the track, or navigating the city lights, One8 stands as an uncompromised statement of intent."
];

export const NAV_LINKS: NavLink[] = [
  { label: "Story", href: "#story" },
  { label: "Reveal", href: "#reveal" },
  { label: "Showcase", href: "#showcase" },
  { label: "Collections", href: "#collections" },
  { label: "Social", href: "#social" }
];

export const PERFORMANCE_STATS: ProductStat[] = [
  {
    id: "stat-weight",
    value: 178,
    suffix: "g",
    label: "PROPULSIVE WEIGHT",
    description: "Vacuum-infused monofilament weave engineered to eliminate unnecessary bulk, aiding rapid acceleration."
  },
  {
    id: "stat-energy",
    value: 86,
    suffix: "%",
    label: "ENERGY CONSERVATION",
    description: "Proprietary NITRO-carbon compound yielding continuous vertical response and low muscle fatigue."
  },
  {
    id: "stat-carbon",
    value: 100,
    suffix: "%",
    label: "AEROSPACE GRADE CARBON",
    description: "S-curve carbon fiber insert providing rigid horizontal stability and forward spring motion."
  }
];

export const COLLECTIONS: CollectionCard[] = [
  {
    id: "coll-puma",
    title: "PUMA × ONE8 CORE",
    category: "Signature Collaboration",
    imageUrl: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800",
    year: "2026 SPEC",
    description: "The ultimate convergence of high-velocity track innovation and luxury street silhouettes."
  },
  {
    id: "coll-activewear",
    title: "TECHNICAL ACTIVEWEAR",
    category: "High Intensity",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800",
    year: "2026 SPEC",
    description: "Laser-perforated temperature-regulating compression wear built to sustain peak athletic output."
  },
  {
    id: "coll-footwear",
    title: "PRO PROPULSION FOOTWEAR",
    category: "Elite Running",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800",
    year: "2026 SPEC",
    description: "Shoes featuring dual-density cushion cores and full-carbon forward levering mechanisms."
  },
  {
    id: "coll-fragrances",
    title: "LUXURY SCENTS & INTENSITY",
    category: "Aromatic Colognes",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800",
    year: "2026 SPEC",
    description: "High-concentration executive fragrances mirroring sweat, drive, and ultimate sports victory."
  },
  {
    id: "coll-kids",
    title: "ONE8 ATHLETICS / KIDS",
    category: "Next-Gen Gear",
    imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800",
    year: "2026 SPEC",
    description: "Flexible, highly durable garments engineered to give children ultimate physical freedom."
  }
];

export const INSTAGRAM_POSTS: SocialPost[] = [
  {
    id: "ig-1",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600",
    likes: "24.5K",
    comments: "382",
    caption: "Virat Kohli in the all-new technical carbon line. Zero friction, total control. #AlwaysPlay #one8",
    date: "JUN 2026"
  },
  {
    id: "ig-2",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600",
    likes: "42.1K",
    comments: "912",
    caption: "Symmetrical design meets physical load. Building the foundations of ultimate athleticism. @one8store",
    date: "MAY 2026"
  },
  {
    id: "ig-3",
    imageUrl: "https://images.unsplash.com/photo-1607344645866-009c320b5ab8?q=80&w=600",
    likes: "18.9K",
    comments: "250",
    caption: "Golden details for the premium athlete. Crafted to inspire, engineered to persist. #LuxuryPerformance",
    date: "APR 2026"
  },
  {
    id: "ig-4",
    imageUrl: "https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=600",
    likes: "33.7K",
    comments: "441",
    caption: "Night training on the concrete boundaries. The city is your arena. Light up the darkness in active reflective. #one8",
    date: "MAR 2026"
  },
  {
    id: "ig-5",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600",
    likes: "51.2K",
    comments: "1.1K",
    caption: "Behind the lens with @virat.kohli. Designing the next evolution of active premium apparel. #CoutureMeetActive",
    date: "FEB 2026"
  },
  {
    id: "ig-6",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600",
    likes: "29.4K",
    comments: "318",
    caption: "Inhale focus, exhale boundaries. The mindful athlete prepares in absolute stillness. #One8Mind",
    date: "JAN 2026"
  }
];
