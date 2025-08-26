import React, { useMemo } from 'react'
import './WellArea.css'

const WellArea = React.memo(({ placedPieces, currentStage, availablePieces, onSlotClick }) => {
  // Memoized placement slots - performans optimizasyonu
  const placementSlots = useMemo(() => {
    const slots = []
    const totalPieces = availablePieces.length + placedPieces.length
    
    for (let i = 1; i <= totalPieces; i++) {
      const placedPiece = placedPieces.find(p => p.slotPosition === i)
      slots.push({
        position: i,
        isOccupied: !!placedPiece,
        piece: placedPiece
      })
    }
    
    return slots
  }, [placedPieces, availablePieces.length])

  const handleSlotClick = (slotPosition) => {
    onSlotClick(slotPosition)
  }

  return (
    <div className="well-container">
      <h3 className="well-title">Sondaj Kuyusu</h3>
      <div className="well-shaft">
        {placementSlots.map(slot => (
          <div 
            key={slot.position}
            className={`placement-slot ${slot.isOccupied ? 'occupied' : 'empty'}`}
            onClick={() => !slot.isOccupied && handleSlotClick(slot.position)}
            role={slot.isOccupied ? 'presentation' : 'button'}
            tabIndex={slot.isOccupied ? -1 : 0}
            onKeyDown={(e) => !slot.isOccupied && e.key === 'Enter' && handleSlotClick(slot.position)}
            aria-label={slot.isOccupied ? `${slot.piece.name} yerleştirildi` : `${slot.position}. slot'a parça yerleştir`}
          >
            {slot.isOccupied ? (
              <div className="slot-occupied">
                <div className="piece-name">{slot.piece.name}</div>
                <div className="piece-size">{slot.piece.size}</div>
              </div>
            ) : (
              <div className="slot-empty">
                <div className="slot-hint">Tıklayın</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
})

WellArea.displayName = 'WellArea'

export default WellArea
