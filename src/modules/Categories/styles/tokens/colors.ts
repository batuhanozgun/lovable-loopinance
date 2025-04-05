
// Kategori modülü için renk sabitler
export const categoryColors = {
  // Ana renkler
  primary: {
    blue: "#4285F4",
    green: "#0F9D58", 
    red: "#DB4437",
    yellow: "#F4B400",
  },
  
  // Pastel renkler
  pastel: {
    blue: "#B3D1FF",
    green: "#B6E5D3", 
    yellow: "#FFF0B3",
    orange: "#FFCBA5",
    purple: "#D5C5F7",
    red: "#FFBEC9",  // Pink yerine kırmızının pasteli
  },
  
  // Nötr renkler
  neutral: {
    gray: "#9AA0A6",
    darkGray: "#5F6368",
    lightGray: "#DADCE0",
    black: "#202124",
    white: "#FFFFFF",
  },
  
  // İşlev renkleri
  functional: {
    expense: "#DB4437", // Harcamalar için kırmızı
    income: "#0F9D58",  // Gelirler için yeşil
    transfer: "#4285F4", // Transferler için mavi
    saving: "#F4B400",  // Tasarruflar için sarı
  }
};

// Tüm renkleri düz bir dizi olarak dışarı aktar
export const flatCategoryColors = [
  ...Object.values(categoryColors.primary),
  ...Object.values(categoryColors.pastel),
  ...Object.values(categoryColors.neutral),
];

// Kategoriler için varsayılan renk paleti
export const defaultCategoryPalette = [
  categoryColors.primary.blue,
  categoryColors.primary.green,
  categoryColors.primary.red,
  categoryColors.primary.yellow,
  categoryColors.pastel.purple,
  categoryColors.pastel.orange,
];
