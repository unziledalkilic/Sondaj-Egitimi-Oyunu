# 🛢️ Petrol Kuyusu Sondaj Yapbozu

Petrol ve gaz kuyusu sondaj süreçlerini öğrenmek için tasarlanmış interaktif bir yapboz oyunu. Öğrenciler, her aşamada gerekli ekipmanları doğru sırayla ve doğru yere yerleştirerek sondaj süreçlerini öğrenirler.

## 🎯 Proje Amacı

Bu proje, petrol mühendisliği öğrencilerinin:
- Sondaj süreçlerini görsel olarak anlamasını
- Her aşamada kullanılan ekipmanları tanımasını
- Kuyu tamamlama sürecini adım adım öğrenmesini
- Teknik terimleri pratik yaparak pekiştirmesini

sağlamayı amaçlamaktadır.

## 🎮 Oyun Özellikleri

### 10 Aşamalı Sondaj Süreci
1. **Öndelik** - İlk hazırlık aşaması
2. **26" Sondaj** - En geniş çaplı delik açma
3. **20" Casing** - İlk muhafaza borusu yerleştirme
4. **17 1/2" Sondaj** - Daha küçük çapta delme
5. **13 3/8" Casing** - İkinci muhafaza borusu ve çimentolama
6. **12 1/4" Sondaj** - Üçüncü delme aşaması
7. **9 5/8" Casing** - Üçüncü muhafaza borusu ve çimentolama
8. **8 1/2" Sondaj** - Dördüncü delme aşaması
9. **7" Casing** - Filtreli liner/üretim borusu
10. **3 1/2" Akış** - Üretim borusu (tubing) yerleştirme

### Ekipman Türleri
- **Sondaj Boruları** (HWDP, DP 4IF)
- **Matkap Uçları** (Bit)
- **Matkap Destekleri** (Bit Sup)
- **Sondaj Yakaları** (DC - Drill Collar)
- **Muhafaza Boruları** (Casing)
- **Çimento Ekipmanları** (Top/Bottom Plug, Float Collar/Shoe)
- **Bağlantı Elemanları** (XO - Crossover)
- **Üretim Ekipmanları** (Filter Liner, Tubing)

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn

### Kurulum Adımları

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd drilling-puzzle-game
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

4. **Tarayıcıda açın:**
```
http://localhost:3000
```

### Build ve Production

```bash
# Production build
npm run build

# Build önizleme
npm run preview
```

## 🎨 Teknik Özellikler

### Teknolojiler
- **React 18** - Modern React hooks ve functional components
- **Vite** - Hızlı build tool ve dev server
- **CSS3** - Modern CSS özellikleri ve animasyonlar
- **HTML5** - Semantic HTML ve modern web standartları

### Özellikler
- **Drag & Drop** - Sürükle-bırak ile parça yerleştirme
- **Responsive Design** - Mobil ve masaüstü uyumlu
- **Interactive UI** - Görsel geri bildirimler ve animasyonlar
- **Stage Management** - Aşama bazlı ilerleme sistemi
- **Real-time Feedback** - Anlık oyun durumu güncellemeleri

### Dosya Yapısı
```
src/
├── components/
│   ├── DrillingPuzzle.jsx    # Ana oyun bileşeni
│   ├── PuzzlePiece.jsx       # Yapboz parçası bileşeni
│   ├── WellArea.jsx          # Kuyu alanı bileşeni
│   ├── Header.jsx            # Üst menü bileşeni
│   └── Instructions.jsx      # Talimatlar modal bileşeni
├── App.jsx                   # Ana uygulama bileşeni
├── main.jsx                  # React entry point
└── index.css                 # Global stiller
```

## 🎯 Nasıl Oynanır

1. **Talimatları Okuyun** - Oyun başlangıcında detaylı talimatlar gösterilir
2. **Parçaları Sürükleyin** - Sağ taraftaki parçaları sol taraftaki kuyu alanına sürükleyin
3. **Doğru Sırayla Yerleştirin** - Her aşamada gerekli parçaları doğru sırayla yerleştirin
4. **Aşamayı Tamamlayın** - Tüm parçalar yerleştirildiğinde aşama tamamlanır
5. **Sonraki Aşamaya Geçin** - Bir sonraki aşamaya geçerek süreci öğrenin

## 🔧 Özelleştirme

### Yeni Aşama Ekleme
`DrillingPuzzle.jsx` dosyasındaki `stagePieces` objesine yeni aşama ekleyebilirsiniz:

```javascript
const stagePieces = {
  // ... mevcut aşamalar
  10: [ // Yeni aşama
    { id: 'new-piece', name: 'Yeni Parça', type: 'new-type', size: '5"', color: '#FF0000' }
  ]
}
```

### Yeni Parça Tipi Ekleme
`PuzzlePiece.jsx` dosyasındaki `getPieceIcon` ve `getPieceColor` fonksiyonlarını güncelleyin.

### Stil Değişiklikleri
Her bileşenin kendi CSS dosyası bulunmaktadır. Renkleri, boyutları ve animasyonları bu dosyalardan özelleştirebilirsiniz.

## 📱 Responsive Tasarım

Oyun, farklı ekran boyutlarında optimal deneyim sunar:
- **Desktop** (1200px+): Yan yana layout
- **Tablet** (768px-1200px): Dikey layout
- **Mobile** (<768px): Mobil optimize edilmiş layout

## 🎨 Görsel Tasarım

- **Modern UI/UX** - Glassmorphism ve gradient tasarım
- **Renk Kodlaması** - Her ekipman tipi için özel renkler
- **Animasyonlar** - Smooth transitions ve hover efektleri
- **İkonlar** - Emoji tabanlı görsel tanımlayıcılar

## 🔍 Gelecek Geliştirmeler

- [ ] Ses efektleri ve müzik
- [ ] Çoklu dil desteği
- [ ] İlerleme kaydetme
- [ ] Skor sistemi
- [ ] Zamanlayıcı
- [ ] 3D görselleştirme
- [ ] Çok oyunculu mod
- [ ] Quiz sistemi

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.


---

**Not:** Bu proje eğitim amaçlı geliştirilmiştir ve gerçek sondaj operasyonlarında kullanılmamalıdır.
