
// Mock data for category examples
import { ICategory, ISubCategory } from '../types';

export const mockCategories: ICategory[] = [
  {
    id: 'cat-1',
    name: 'Yiyecek & İçecek',
    icon: '🍽️',
    color: '#DB4437',
    order: 1,
    sub_categories: [
      { id: 'sub-1', name: 'Restoran', parent_id: 'cat-1', order: 1 },
      { id: 'sub-2', name: 'Market', parent_id: 'cat-1', order: 2 },
      { id: 'sub-3', name: 'Kafe', parent_id: 'cat-1', order: 3 }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-2',
    name: 'Ulaşım',
    icon: '🚗',
    color: '#4285F4',
    order: 2,
    sub_categories: [
      { id: 'sub-4', name: 'Toplu Taşıma', parent_id: 'cat-2', order: 1 },
      { id: 'sub-5', name: 'Taksi', parent_id: 'cat-2', order: 2 }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-3',
    name: 'Alışveriş',
    icon: '🛍️',
    color: '#0F9D58',
    order: 3,
    sub_categories: [
      { id: 'sub-6', name: 'Giyim', parent_id: 'cat-3', order: 1 },
      { id: 'sub-7', name: 'Elektronik', parent_id: 'cat-3', order: 2 }
    ],
    created_at: new Date().toISOString()
  }
];

export const selectedCategory: ICategory = mockCategories[0];
export const selectedSubCategory: ISubCategory = selectedCategory.sub_categories ? selectedCategory.sub_categories[0] : { id: '', name: '', parent_id: '', order: 0 };
