
// Kategori stil kılavuzu sabitleri
export const categoryStyleGuide = {
  sections: [
    {
      id: 'colors',
      title: 'Renkler',
      description: 'Kategoriler için kullanılan renk palette',
    },
    {
      id: 'badges',
      title: 'Rozetler',
      description: 'Kategori ve alt kategorileri görüntülemek için kullanılan rozetler',
    },
    {
      id: 'cards',
      title: 'Kartlar',
      description: 'Kategori bilgilerini görüntülemek için kullanılan kart bileşenleri',
    },
    {
      id: 'typography',
      title: 'Tipografi',
      description: 'Kategori metinleri için kullanılan yazı stilleri',
    },
    {
      id: 'pageHeadings',
      title: 'Sayfa Başlıkları',
      description: 'Modül sayfalarında kullanılan başlık stilleri',
    },
    {
      id: 'buttons',
      title: 'Butonlar',
      description: 'Kategori yönetimi için kullanılan butonlar',
    },
    {
      id: 'forms',
      title: 'Formlar',
      description: 'Kategori oluşturma ve düzenleme formları',
    },
  ],
  elements: {
    badge: {
      variants: ['default', 'outline', 'secondary', 'muted'],
      sizes: ['sm', 'default', 'lg'],
    },
    card: {
      variants: ['default', 'selected', 'interactive'],
      sizes: ['sm', 'default', 'lg'],
    },
    subcardCard: {
      variants: ['default', 'selected', 'nested'],
      sizes: ['sm', 'default', 'lg'],
    },
    button: {
      variants: ['default', 'secondary', 'outline', 'ghost', 'link', 'destructive'],
      sizes: ['sm', 'default', 'lg', 'icon'],
    },
    pageHeading: {
      levels: ['h1', 'h2', 'h3'],
      weights: ['normal', 'medium', 'semibold', 'bold'],
      spacings: ['none', 'tight', 'normal', 'relaxed'],
      aligns: ['left', 'center', 'right'],
      emphasis: ['normal', 'muted', 'primary'],
    },
  },
};
