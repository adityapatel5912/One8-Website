/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductStat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface CollectionCard {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  year: string;
  description: string;
}

export interface SocialPost {
  id: string;
  imageUrl: string;
  likes: string;
  comments: string;
  caption: string;
  date: string;
}

export interface NavLink {
  label: string;
  href: string;
}
