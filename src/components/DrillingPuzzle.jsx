import React, { useState, useEffect, useMemo, useCallback } from 'react'
import PuzzlePiece from './PuzzlePiece'
import WellArea from './WellArea'
import './DrillingPuzzle.css'

function DrillingPuzzle({ currentStage, onStageComplete, stages }) {
  const [placedPieces, setPlacedPieces] = useState([])
  const [availablePieces, setAvailablePieces] = useState([])
  const [isStageComplete, setIsStageComplete] = useState(false)
  const [isOrderCorrect, setIsOrderCorrect] = useState(null)
  const [selectedPiece, setSelectedPiece] = useState(null)
  const [notification, setNotification] = useState(null)

  // Her aşama için gerekli parçalar (Görsel diyagrama göre)
  const stagePieces = {
    0: [ // Öndelik (Surface Hole) - 4 parça
      { id: 'hwdp-1', name: 'HWDP', type: 'drill-pipe', size: '12 1/4"', color: '#ffffff', order: 1, description: 'Heavy Weight Drill Pipe (Ağırlık Sondaj Borusu)' },
      { id: 'dp-4if-1', name: '4 IF', type: 'drill-pipe', size: '4"', color: '#ffffff', order: 2, description: '4 Inch IF Bağlantılı Sondaj Borusu' },
      { id: 'bit-sup-1', name: 'Bit Sub', type: 'bit-support', size: '6 5/8"', color: '#ffffff', order: 3, description: 'Bit Sub (Matkap Desteği)' },
      { id: 'bit-1', name: 'Bit', type: 'bit', size: '12 1/4"', color: '#ffffff', order: 4, description: 'Drill Bit (Matkap Ucu)' }
    ],
    1: [ // 26" Sondaj (26" Drilling) - 7 parça
      { id: 'hwdp-2', name: 'HWDP', type: 'drill-pipe', size: '26"', color: '#ffffff', order: 1, description: 'Heavy Weight Drill Pipe (Ağırlık Sondaj Borusu)' },
      { id: 'dp-4if-2', name: '4 IF', type: 'drill-pipe', size: '4"', color: '#ffffff', order: 2, description: '4 Inch IF Bağlantılı Sondaj Borusu' },
      { id: 'sup-1', name: 'Sub', type: 'support', size: '6 5/8"', color: '#ffffff', order: 3, description: 'Sub (Bağlantı Elemanı)' },
      { id: 'dc-8-1', name: '8" DC', type: 'drill-collar', size: '8"', color: '#ffffff', order: 4, description: '8" Drill Collar (Sondaj Ağırlığı)' },
      { id: 'bit-sup-2', name: 'Bit Sub', type: 'bit-support', size: '7 5/8"', color: '#ffffff', order: 5, description: 'Bit Sub (Matkap Desteği)' },
      { id: 'bit-2', name: 'Bit', type: 'bit', size: '26"', color: '#ffffff', order: 6, description: 'Drill Bit (Matkap Ucu)' }
    ],
    2: [ // 20" Casing (20" Muhafaza Borusu) - 3 parça
      { id: 'casing-20', name: '20" Casing', type: 'casing', size: '20"', color: '#ffffff', order: 1, description: '20" Surface Casing (Yüzey Muhafaza Borusu)' },
      { id: 'slip-liner', name: 'Slip Liner', type: 'liner', size: '20"', color: '#ffffff', order: 2, description: 'Slip Liner (Kaydırma Liner\'ı)' },
      { id: 'rat-hole', name: '2m Rat Hole', type: 'hole', size: '2m', color: '#ffffff', order: 3, description: '2 Metre Rat Hole (Fare Deliği)' }
    ],
    3: [ // 17 1/2" Sondaj (17 1/2" Drilling) - 8 parça
      { id: 'dp-4if-3', name: 'DP 4IF', type: 'drill-pipe', size: '4"', color: '#ffffff', order: 1, description: 'Drill Pipe 4 Inch IF' },
      { id: 'hwdp-3', name: 'HWDP', type: 'drill-pipe', size: '17 1/2"', color: '#ffffff', order: 2, description: 'Heavy Weight Drill Pipe' },
      { id: 'sup-2', name: 'Sub', type: 'support', size: '6 5/8"', color: '#ffffff', order: 3, description: 'Sub (Bağlantı Elemanı)' },
      { id: 'dc-8-2', name: '8" DC', type: 'drill-collar', size: '8"', color: '#ffffff', order: 4, description: '8" Drill Collar' },
      { id: 'xo-1', name: 'XO', type: 'crossover', size: '7 5/8"', color: '#ffffff', order: 5, description: 'Crossover (Geçiş Elemanı)' },
      { id: 'bit-sup-3', name: 'Bit Sub', type: 'bit-support', size: '7 5/8"', color: '#ffffff', order: 6, description: 'Bit Sub (Matkap Desteği)' },
      { id: 'bit-3', name: 'Bit', type: 'bit', size: '17 1/2"', color: '#ffffff', order: 7, description: 'Drill Bit (Matkap Ucu)' }
    ],
    4: [ // 13 3/8" Casing (13 3/8" Muhafaza Borusu) - 6 parça
      { id: 'casing-13-3-8', name: '13 3/8" Casing', type: 'casing', size: '13 3/8"', color: '#ffffff', order: 1, description: '13 3/8" Intermediate Casing (Ara Muhafaza Borusu)' },
      { id: 'top-plug-1', name: 'Top Plug', type: 'cement-plug', size: '13 3/8"', color: '#ffffff', order: 2, description: 'Top Cement Plug (Üst Çimento Tıkacı)' },
      { id: 'bottom-plug-1', name: 'Bottom Plug', type: 'cement-plug', size: '13 3/8"', color: '#ffffff', order: 3, description: 'Bottom Cement Plug (Alt Çimento Tıkacı)' },
      { id: 'float-collar-1', name: 'Float Collar', type: 'float-collar', size: '13 3/8"', color: '#ffffff', order: 4, description: 'Float Collar (Yüzdürme Yakası)' },
      { id: 'float-shoe-1', name: 'Float Shoe', type: 'float-shoe', size: '13 3/8"', color: '#ffffff', order: 5, description: 'Float Shoe (Yüzdürme Ayakkabısı)' }
    ],
    5: [ // 12 1/4" Sondaj (12 1/4" Drilling) - 7 parça
      { id: 'dp-4if-4', name: 'DP 4IF', type: 'drill-pipe', size: '4"', color: '#ffffff', order: 1, description: 'Drill Pipe 4 Inch IF' },
      { id: 'hwdp-4', name: 'HWDP', type: 'drill-pipe', size: '12 1/4"', color: '#ffffff', order: 2, description: 'Heavy Weight Drill Pipe' },
      { id: 'sup-3', name: 'Sub', type: 'support', size: '6 5/8"', color: '#ffffff', order: 3, description: 'Sub (Bağlantı Elemanı)' },
      { id: 'dc-8-3', name: '8" DC', type: 'drill-collar', size: '8"', color: '#ffffff', order: 4, description: '8" Drill Collar' },
      { id: 'bit-sup-4', name: 'Bit Sub', type: 'bit-support', size: '6 5/8"', color: '#ffffff', order: 5, description: 'Bit Sub (Matkap Desteği)' },
      { id: 'bit-4', name: 'Bit', type: 'bit', size: '12 1/4"', color: '#ffffff', order: 6, description: 'Drill Bit (Matkap Ucu)' }
    ],
    6: [ // 9 5/8" Casing (9 5/8" Muhafaza Borusu) - 6 parça
      { id: 'casing-9-5-8', name: '9 5/8" Casing', type: 'casing', size: '9 5/8"', color: '#ffffff', order: 1, description: '9 5/8" Production Casing (Üretim Muhafaza Borusu)' },
      { id: 'top-plug-2', name: 'Top Plug', type: 'cement-plug', size: '9 5/8"', color: '#ffffff', order: 2, description: 'Top Cement Plug (Üst Çimento Tıkacı)' },
      { id: 'bottom-plug-2', name: 'Bottom Plug', type: 'cement-plug', size: '9 5/8"', color: '#ffffff', order: 3, description: 'Bottom Cement Plug (Alt Çimento Tıkacı)' },
      { id: 'float-collar-2', name: 'Float Collar', type: 'float-collar', size: '9 5/8"', color: '#ffffff', order: 4, description: 'Float Collar (Yüzdürme Yakası)' },
      { id: 'float-shoe-2', name: 'Float Shoe', type: 'float-shoe', size: '9 5/8"', color: '#ffffff', order: 5, description: 'Float Shoe (Yüzdürme Ayakkabısı)' }
    ],
    7: [ // 8 1/2" Sondaj (8 1/2" Drilling) - 6 parça
      { id: 'dp-4if-5', name: 'DP 4IF', type: 'drill-pipe', size: '4"', color: '#ffffff', order: 1, description: 'Drill Pipe 4 Inch IF' },
      { id: 'hwdp-5', name: 'HWDP', type: 'drill-pipe', size: '8 1/2"', color: '#ffffff', order: 2, description: 'Heavy Weight Drill Pipe' },
      { id: 'dc-6-5-1', name: '6 1/2" DC', type: 'drill-collar', size: '6 1/2"', color: '#ffffff', order: 3, description: '6 1/2" Drill Collar' },
      { id: 'bit-sup-5', name: 'Bit Sub', type: 'bit-support', size: '4 1/2"', color: '#ffffff', order: 4, description: 'Bit Sub (Matkap Desteği)' },
      { id: 'bit-5', name: 'Bit', type: 'bit', size: '8 1/2"', color: '#ffffff', order: 5, description: 'Drill Bit (Matkap Ucu)' }
    ],
    8: [ // 7" Casing (7" Muhafaza Borusu) - 2 parça
      { id: 'filter-liner', name: 'Filter Liner', type: 'filter-liner', size: '7"', color: '#ffffff', order: 1, description: 'Filter Liner (Filtre Liner\'ı)' },
      { id: 'shoe-1', name: 'Shoe', type: 'shoe', size: '7"', color: '#ffffff', order: 2, description: 'Liner Shoe (Liner Ayakkabısı)' }
    ],
    9: [ // 3 1/2" Akış (3 1/2" Flow) - 1 parça
      { id: 'tubing-3-5', name: '3 1/2" Tubing', type: 'tubing', size: '3 1/2"', color: '#ffffff', order: 1, description: 'Production Tubing (Üretim Borusu)' }
    ]
  }

  // Memoized değerler - performans optimizasyonu
  const currentStagePieces = useMemo(() => stagePieces[currentStage] || [], [currentStage])
  const isAllPiecesPlaced = useMemo(() => placedPieces.length === currentStagePieces.length, [placedPieces.length, currentStagePieces.length])
  
  // Parçaları rastgele karıştır - useCallback ile optimize edildi
  const shufflePieces = useCallback((pieces) => {
    const shuffled = [...pieces]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [])

  // Aşama değiştiğinde parçaları sıfırla
  useEffect(() => {
    setPlacedPieces([])
    setIsStageComplete(false)
    setAvailablePieces(shufflePieces([...currentStagePieces]))
    setIsOrderCorrect(null)
    setSelectedPiece(null)
    setNotification(null)
  }, [currentStage, currentStagePieces, shufflePieces])

  // Parça yerleştirme - useCallback ile optimize edildi
  const handlePieceClick = useCallback((pieceId) => {
    const piece = availablePieces.find(p => p.id === pieceId)
    if (!piece) return

    // Parça zaten yerleştirilmişse hata ver
    if (placedPieces.find(p => p.id === pieceId)) {
      setNotification({ type: 'error', message: 'Bu parça zaten yerleştirilmiş!' })
      setTimeout(() => setNotification(null), 3000)
      return
    }

    // Parçayı seç (henüz yerleştirme)
    setSelectedPiece(piece)
    setNotification({ type: 'info', message: `${piece.name} seçildi! Şimdi slot'a tıklayın.` })
    setTimeout(() => setNotification(null), 3000)
  }, [availablePieces, placedPieces])

  // Slot'a parça yerleştirme - useCallback ile optimize edildi
  const placePieceInSlot = useCallback((slotPosition) => {
    if (!selectedPiece) {
      setNotification({ type: 'error', message: 'Önce bir parça seçin!' })
      setTimeout(() => setNotification(null), 3000)
      return
    }

    // Slot zaten dolu mu kontrol et
    if (placedPieces.find(p => p.slotPosition === slotPosition)) {
      setNotification({ type: 'error', message: 'Bu slot zaten dolu!' })
      setTimeout(() => setNotification(null), 3000)
      return
    }

    // Parçayı slot'a yerleştir
    const pieceWithSlot = { ...selectedPiece, slotPosition }
    setPlacedPieces(prev => [...prev, pieceWithSlot])
    setAvailablePieces(prev => prev.filter(p => p.id !== selectedPiece.id))
    
    // Seçimi temizle
    setSelectedPiece(null)
    
    // Başarı mesajı
    setNotification({ type: 'success', message: `${selectedPiece.name} ${slotPosition}. slot'a yerleştirildi!` })
    setTimeout(() => setNotification(null), 3000)
  }, [selectedPiece, placedPieces])

  // Aşamayı sıfırla - useCallback ile optimize edildi
  const resetStage = useCallback(() => {
    setPlacedPieces([])
    setAvailablePieces(shufflePieces([...currentStagePieces]))
    setIsStageComplete(false)
    setIsOrderCorrect(null)
    setSelectedPiece(null)
    setNotification(null)
  }, [currentStagePieces, shufflePieces])

  // Yanlış sıralama durumunda parçaları geri al - useCallback ile optimize edildi
  const returnPiecesToAvailable = useCallback(() => {
    setAvailablePieces(prev => shufflePieces([...prev, ...placedPieces]))
    setPlacedPieces([])
    setIsOrderCorrect(null)
    setSelectedPiece(null)
    setNotification({ type: 'warning', message: 'Sıralama yanlış! Parçalar geri alındı. Lütfen yukarıdan aşağıya doğru 1, 2, 3, 4... sırayla tekrar yerleştirin.' })
    setTimeout(() => setNotification(null), 5000)
  }, [placedPieces, shufflePieces])

  // Sıralama kontrolü - useCallback ile optimize edildi
  const checkOrder = useCallback(() => {
    if (placedPieces.length === 0) return false
    
    // Doğru sıra: 1. parça 1. slot'ta, 2. parça 2. slot'ta, 3. parça 3. slot'ta, 4. parça 4. slot'ta
    for (let i = 0; i < placedPieces.length; i++) {
      const expectedPieceOrder = i + 1
      const expectedSlotPosition = i + 1
      
      // Bu slot'ta hangi parça var?
      const pieceInSlot = placedPieces.find(p => p.slotPosition === expectedSlotPosition)
      
      if (!pieceInSlot || pieceInSlot.order !== expectedPieceOrder) {
        return false
      }
    }
    return true
  }, [placedPieces])

  // Kontrol butonu tıklama - useCallback ile optimize edildi
  const handleCheckOrder = useCallback(() => {
    const orderCorrect = checkOrder()
    setIsOrderCorrect(orderCorrect)
    if (orderCorrect) {
      setNotification({ type: 'success', message: `${currentStage + 1}. Aşama başarıyla tamamlandı!` })
      setTimeout(() => setNotification(null), 4000)
    } else {
      // Hata durumunda parçaları geri al
      returnPiecesToAvailable()
    }
  }, [checkOrder, currentStage, returnPiecesToAvailable])

  // Sonraki aşama butonu tıklama - useCallback ile optimize edildi
  const handleNextStage = useCallback(() => {
    if (isOrderCorrect) {
      setIsStageComplete(true)
      onStageComplete(currentStage)
    }
  }, [isOrderCorrect, currentStage, onStageComplete])

  // Aşamayı tamamla butonu tıklama - useCallback ile optimize edildi
  const handleCompleteStage = useCallback(() => {
    if (isOrderCorrect) {
      setIsStageComplete(true)
    }
  }, [isOrderCorrect])

  // Tamamlanma ekranı
  if (isStageComplete) {
    return (
      <div className="completion-message">

        {currentStage < stages.length - 1 ? null : (
          <div>
            <h3>🏆 Tüm Eğitim Tamamlandı!</h3>
                         <p>Sondaj sürecinin tüm 10 aşamasını başarıyla tamamladınız!</p>
            <p>Bu eğitimde öğrendikleriniz:</p>
            <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '20px auto', lineHeight: '1.6' }}>
              <li>Öndelik (Surface Hole) - Yüzey deliği açma işlemi</li>
              <li>26" Sondaj - Büyük çaplı delik açma</li>
              <li>20" Casing - Yüzey muhafaza borusu yerleştirme</li>
              <li>17 1/2" Sondaj - Ara delik açma işlemi</li>
              <li>13 3/8" Casing - Ara muhafaza borusu yerleştirme</li>
              <li>12 1/4" Sondaj - Üretim deliği açma işlemi</li>
              <li>9 5/8" Casing - Üretim muhafaza borusu yerleştirme</li>
              <li>8 1/2" Sondaj - Son sondaj işlemi</li>
              <li>7" Casing - Filtre liner yerleştirme</li>
              <li>3 1/2" Akış - Üretim borusu ve hidrokarbon akışı</li>
            </ul>
            <p><strong>🎯 Sondaj sürecini başarıyla öğrendiniz!</strong></p>
            <div style={{ marginTop: '30px' }}>
                             <button className="next-stage-button" onClick={() => {
                 // İlk aşamaya yönlendir
                 onStageComplete(-1) // -1 göndererek App.jsx'te currentStage'i 0 yap
               }}>
                 🔄 Eğitimi Tekrar Başlat
               </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="game-container">
      {notification && (
        <div className={`notification ${notification.type}`}>
          <div className="notification-content">
            <span className="notification-icon">
              {notification.type === 'success' && '✅'}
              {notification.type === 'error' && '❌'}
              {notification.type === 'warning' && '⚠️'}
              {notification.type === 'info' && 'ℹ️'}
            </span>
            <span className="notification-message">{notification.message}</span>
          </div>
        </div>
      )}


      
      <div className="puzzle-area">
        <WellArea 
          placedPieces={placedPieces}
          currentStage={currentStage}
          availablePieces={availablePieces}
          onSlotClick={placePieceInSlot}
        />
      </div>
      
      <div className="pieces-area">
        <div className="pieces-header">
          <h3>🔧 Kullanılabilir Parçalar</h3>
          {selectedPiece && (
            <div className="selected-piece-info">
              <p><strong>🎯 Seçili Parça:</strong> {selectedPiece.name} ({selectedPiece.size})</p>
              <p>Şimdi hangi slot'a yerleştirmek istediğinizi seçin</p>
            </div>
          )}
          <div className="progress-info">
            <span className="progress-text">
              {currentStage + 1}. Aşama: {placedPieces.length} / {stagePieces[currentStage]?.length || 0} parça yerleştirildi
            </span>
            {isOrderCorrect !== null && (
              <span className={`order-status ${isOrderCorrect ? 'correct' : 'incorrect'}`}>
                {isOrderCorrect ? '✅ Sıralama Doğru' : '❌ Sıralama Yanlış'}
              </span>
            )}
          </div>
          <div className="header-buttons">
            <button 
              className="check-btn" 
              onClick={handleCheckOrder}
              disabled={!isAllPiecesPlaced}
            >
              🔍 Kontrol Et
            </button>
                         {currentStage < stages.length - 1 ? (
               <button 
                 className="next-stage-btn" 
                 onClick={handleNextStage}
                 disabled={!isOrderCorrect}
               >
                 ➡️ Sonraki Aşama
               </button>
             ) : (
               <button 
                 className="next-stage-btn" 
                 onClick={handleCompleteStage}
                 disabled={!isOrderCorrect}
               >
                 🏆 Aşamayı Tamamla
               </button>
             )}
            <button className="reset-stage-btn" onClick={resetStage}>
              🔄 Aşamayı Sıfırla
            </button>
          </div>
        </div>
        
        <div className="pieces-list">
          {availablePieces.map(piece => (
            <PuzzlePiece
              key={piece.id}
              piece={piece}
              onDrop={handlePieceClick}
              isPlaced={false}
            />
          ))}
        </div>
        
        {availablePieces.length === 0 && (
          <div className="no-pieces">
            <p>✅ {currentStage + 1}. Aşama: Tüm parçalar yerleştirildi!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DrillingPuzzle