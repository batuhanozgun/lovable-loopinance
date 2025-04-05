
// Mock data for category examples
import { ICategory, ISubCategory } from '../types';

export const mockCategories: ICategory[] = [
  {
    id: 'cat-1',
    name: 'Yiyecek & İçecek',
    icon: '🍽️',
    color: '#DB4437', // Stil rehberi için ekstra özellik
    user_id: 'user-1',
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sub_categories: [
      { 
        id: 'sub-1', 
        name: 'Restoran', 
        category_id: 'cat-1', 
        sort_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      { 
        id: 'sub-2', 
        name: 'Market', 
        category_id: 'cat-1', 
        sort_order: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      { 
        id: 'sub-3', 
        name: 'Kafe', 
        category_id: 'cat-1', 
        sort_order: 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  },
  {
    id: 'cat-2',
    name: 'Ulaşım',
    icon: '🚗',
    color: '#4285F4', // Stil rehberi için ekstra özellik
    user_id: 'user-1',
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sub_categories: [
      { 
        id: 'sub-4', 
        name: 'Toplu Taşıma', 
        category_id: 'cat-2', 
        sort_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      { 
        id: 'sub-5', 
        name: 'Taksi', 
        category_id: 'cat-2', 
        sort_order: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  },
  {
    id: 'cat-3',
    name: 'Alışveriş',
    icon: '🛍️',
    color: '#0F9D58', // Stil rehberi için ekstra özellik
    user_id: 'user-1',
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sub_categories: [
      { 
        id: 'sub-6', 
        name: 'Giyim', 
        category_id: 'cat-3', 
        sort_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      { 
        id: 'sub-7', 
        name: 'Elektronik', 
        category_id: 'cat-3', 
        sort_order: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  }
];

export const selectedCategory: ICategory = mockCategories[0];
export const selectedSubCategory: ISubCategory = selectedCategory.sub_categories ? selectedCategory.sub_categories[0] : { 
  id: '', 
  name: '', 
  category_id: '', 
  sort_order: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};
