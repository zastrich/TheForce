import React, { useEffect } from 'react'
import { HandTrackerProvider, useHandTracker } from '@theforce/react'
import './App.css'

function HandTrackingDemo() {
  const { handLandmarks, isTracking, initialize, stop } = useHandTracker()

  const startTracking = async () => {
    await initialize()
  }

  const stopTracking = async () => {
    await stop()
  }

  const handleClick = (event) => {
    event.target.classList.add('clicked')
    setTimeout(() => {
      event.target.classList.remove('clicked')
    }, 3000)
  }

  return (
    <div className="app">
      <div className="container">
        <h1>🎯 TheForce React - Hand Tracking</h1>
        
        <div className={`status ${isTracking ? 'tracking' : 'stopped'}`}>
          Status: {isTracking ? `Tracking (${handLandmarks.length} hands)` : 'Stopped'}
        </div>

        <div className="controls">
          <button 
            className="start-btn" 
            onClick={startTracking}
            disabled={isTracking}
          >
            Start Tracking
          </button>
          <button 
            className="stop-btn" 
            onClick={stopTracking}
            disabled={!isTracking}
            data-hoverable="true"
          >
            Stop Tracking
          </button>
        </div>

        <div className="hoverable-demo">
          <div className="hoverable-item" data-hoverable="true" onClick={handleClick}>
            <h3>Button 1</h3>
            <p>Touch me</p>
          </div>
          <div className="hoverable-item" data-hoverable="true" onClick={handleClick}>
            <h3>Button 2</h3>
            <p>Hover with your hand</p>
          </div>
          <div className="hoverable-item" data-hoverable="true" onClick={handleClick}>
            <h3>Button 3</h3>
            <p>Control virtual mouse</p>
          </div>
          <div className="hoverable-item" data-hoverable="true" onClick={handleClick}>
            <h3>Button 4</h3>
            <p>And steady to click</p>
          </div>
        </div>

        <div className="info">
          <h3>How to use:</h3>
          <ul>
            <li>Allow camera access when prompted</li>
            <li>Click "Start Tracking" to begin hand tracking</li>
            <li>Use your hand to control the virtual cursor</li>
            <li>Hover over the buttons above to see them highlight</li>
            <li>Hold your hand steady for 1 second to trigger button action</li>
            <li>Point at "Stop Tracking" to end the session</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function App() {
  const config = {
    hoverDelay: 1000,
    sensitivityX: 4,
    sensitivityY: 4,
  };

  return (
    <HandTrackerProvider config={config}>
      <HandTrackingDemo />
    </HandTrackerProvider>
  );
}

export default App