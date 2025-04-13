
# Storybook Kurulumu

Storybook'u tam olarak kurmak için aşağıdaki adımları izleyin:

1. Projenize Storybook bağımlılıklarını ekleyin:
```
npm install -D storybook@latest @storybook/react@latest @storybook/react-vite@latest @storybook/blocks@latest @storybook/addon-essentials@latest @storybook/addon-interactions@latest @storybook/addon-links@latest @storybook/addon-styling@latest @storybook/addon-a11y@latest @storybook/testing-library@latest
```

2. package.json dosyasına aşağıdaki scriptleri ekleyin:
```json
"scripts": {
  // Diğer scriptler...
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}
```

3. Storybook'u başlatmak için:
```
npm run storybook
```

4. Storybook build çıktısı almak için:
```
npm run build-storybook
```

## Projedeki Bileşenler için Hikaye Dosyaları

Proje yapısında şu hikaye dosyaları oluşturuldu:

- `src/components/ui/button.stories.jsx` - Button bileşeni hikayeleri
- `src/components/ui/card.stories.jsx` - Card bileşeni hikayeleri

Daha fazla bileşen eklemek için benzer bir yapı izleyebilirsiniz.
