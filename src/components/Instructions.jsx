import React from 'react'

function Instructions() {
  return (
    <div className="instructions">
             <h2>📚 Eğitim Amacı</h2>
       <p>
         Bu eğitim materyali, genel sondaj sürecini öğretmek amacıyla hazırlanmıştır. 
         Her aşamada gerekli ekipmanları doğru sırayla yerleştirerek sondaj sürecini anlayacaksınız.
       </p>

      <h2>🎯 Nasıl Kullanılır</h2>
      <ul>
        <li>Önce bir parçayı seçin</li>
        <li>Sonra yerleştirmek istediğiniz slot'a tıklayın</li>
        <li>Parçaları yukarıdan aşağıya doğru 1, 2, 3, 4... sırayla yerleştirin</li>
        <li>Tüm parçalar yerleştirildikten sonra "Kontrol Et" butonuna basın</li>
        <li>Doğru sıralama varsa "Sonraki Aşama" butonu aktif olur</li>
      </ul>

      <h2>🔧 Sondaj Aşamaları</h2>
      <ul>
        <li><strong>Öndelik:</strong> Yüzey deliği açma işlemi (12 1/4" çap)</li>
        <li><strong>26" Sondaj:</strong> Büyük çaplı delik açma (26 inç)</li>
        <li><strong>20" Casing:</strong> Yüzey muhafaza borusu yerleştirme ve çimentolama</li>
        <li><strong>17 1/2" Sondaj:</strong> Ara delik açma işlemi</li>
        <li><strong>13 3/8" Casing:</strong> Ara muhafaza borusu yerleştirme ve çimentolama</li>
        <li><strong>12 1/4" Sondaj:</strong> Üretim deliği açma işlemi</li>
        <li><strong>9 5/8" Casing:</strong> Üretim muhafaza borusu yerleştirme ve çimentolama</li>
        <li><strong>8 1/2" Sondaj:</strong> Son sondaj işlemi</li>
        <li><strong>7" Casing:</strong> Filtre liner yerleştirme</li>
        <li><strong>3 1/2" Akış:</strong> Üretim borusu - Hidrokarbon akışı</li>
      </ul>


    </div>
  )
}

export default Instructions
