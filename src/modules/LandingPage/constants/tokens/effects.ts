
/**
 * Effect tokens for the landing page components
 */

// Efekt (Effect) değerleri - gölgeler ve geçişler
export const effects = {
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  blur: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
};

// Z-index değerleri - katmanlar için
export const zIndex = {
  behind: -1,
  default: 0,
  overlay: 10,
  dropdown: 20,
  sticky: 30,
  fixed: 40,
  modal: 50,
  popover: 60,
  toast: 70,
  tooltip: 80,
};
