import React, { useState } from 'react'
import Instructions from './components/Instructions'
import DrillingPuzzle from './components/DrillingPuzzle'
import './App.css'

function App() {
  const [currentStage, setCurrentStage] = useState(0)
  const [showInstructions, setShowInstructions] = useState(true)

  const stages = [
    { name: 'Öndelik (Surface Hole)', description: 'Yüzey deliği açma işlemi - 12 1/4" çap' },
    { name: '26" Sondaj', description: '26 inç delik açma - Büyük çaplı sondaj' },
    { name: '20" Casing', description: '20 inç muhafaza borusu yerleştirme ve çimentolama' },
    { name: '17 1/2" Sondaj', description: '17 1/2 inç delik açma - Ara sondaj aşaması' },
    { name: '13 3/8" Casing', description: '13 3/8 inç muhafaza borusu yerleştirme ve çimentolama' },
    { name: '12 1/4" Sondaj', description: '12 1/4 inç delik açma - Üretim deliği' },
    { name: '9 5/8" Casing', description: '9 5/8 inç muhafaza borusu yerleştirme ve çimentolama' },
    { name: '8 1/2" Sondaj', description: '8 1/2 inç delik açma - Son sondaj aşaması' },
    { name: '7" Casing', description: '7 inç muhafaza borusu - Filtre liner yerleştirme' },
    { name: '3 1/2" Akış', description: '3 1/2 inç üretim borusu - Hidrokarbon akışı' }
  ]

  const handleStageComplete = (stageIndex) => {
    if (stageIndex === -1) {
      // Eğitimi tekrar başlat - ilk aşamaya git
      setCurrentStage(0)
    } else {
      // Normal aşama geçişi
      setCurrentStage(stageIndex + 1)
    }
  }

  const handleStartGame = () => {
    setShowInstructions(false)
  }

  if (showInstructions) {
    return (
      <div className="App">
        <Instructions />
        <div className="start-button-container">
          <button className="start-button" onClick={handleStartGame}>
            🚀 Eğitime Başla
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <nav className="stages-nav">
        {stages.map((stage, index) => (
          <button
            key={index}
            className={`stage-button ${index === currentStage ? 'active' : ''} ${index < currentStage ? 'completed' : ''}`}
            onClick={() => setCurrentStage(index)}
          >
            {stage.name}
          </button>
        ))}
      </nav>
      <DrillingPuzzle
        currentStage={currentStage}
        onStageComplete={handleStageComplete}
        stages={stages}
      />
    </div>
  )
}

export default App
