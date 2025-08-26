import React from 'react'
import './PuzzlePiece.css'

const PuzzlePiece = React.memo(({ piece, onDrop, isPlaced }) => {
  const handleClick = () => {
    if (!isPlaced) {
      onDrop(piece.id)
    }
  }

  const getPieceIcon = () => {
    return '🔧'
  }

  return (
    <div 
      className={`puzzle-piece ${isPlaced ? 'placed' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`${piece.name} parçasını seç`}
    >
      <div className="piece-icon">{getPieceIcon()}</div>
      <div className="piece-name">{piece.name}</div>
      <div className="piece-size">{piece.size}</div>
    </div>
  )
})

PuzzlePiece.displayName = 'PuzzlePiece'

export default PuzzlePiece
