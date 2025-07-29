import { ProductLabel } from '../types';

export const PRODUCT_LABELS = {
  MUST_HAVE: {
    text: 'MUST HAVE',
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-pink-500 to-purple-600',
    borderColor: 'border-pink-400'
  } as ProductLabel,
  
  BESTSELLER: {
    text: 'BESTSELLER',
    color: 'text-white', 
    bgColor: 'bg-gradient-to-r from-orange-500 to-red-500',
    borderColor: 'border-orange-400'
  } as ProductLabel,
  
  NEW_ARRIVAL: {
    text: 'NEW',
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-green-500 to-emerald-600',
    borderColor: 'border-green-400'
  } as ProductLabel,
  
  LIMITED_EDITION: {
    text: 'LIMITED',
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-yellow-500 to-amber-600',
    borderColor: 'border-yellow-400'
  } as ProductLabel,
  
  PREMIUM: {
    text: 'PREMIUM',
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-purple-600 to-indigo-700',
    borderColor: 'border-purple-400'
  } as ProductLabel,
  
  HOT_DEAL: {
    text: 'HOT DEAL',
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-red-500 to-pink-600',
    borderColor: 'border-red-400'
  } as ProductLabel,
  
  ECO_FRIENDLY: {
    text: 'ECO',
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-green-600 to-teal-600',
    borderColor: 'border-green-400'
  } as ProductLabel,
  
  STAFF_PICK: {
    text: 'STAFF PICK',
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-blue-500 to-cyan-600',
    borderColor: 'border-blue-400'
  } as ProductLabel,
  
  SALE: {
    text: 'SALE',
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-red-600 to-orange-600',
    borderColor: 'border-red-400'
  } as ProductLabel,
  
  COMBO_DEAL: {
    text: 'COMBO',
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-indigo-500 to-purple-600',
    borderColor: 'border-indigo-400'
  } as ProductLabel
} as const;

export type LabelType = keyof typeof PRODUCT_LABELS;
