<template>
  <div class="app">
    <div class="container">
      <h1>🎯 TheForce Vue - Hand Tracking</h1>
      
      <div :class="['status', isTracking ? 'tracking' : 'stopped']">
        Status: {{ isTracking ? `Tracking (${handLandmarks.length} hands)` : 'Stopped' }}
      </div>

      <div class="video-container">
        <video 
          ref="videoRef" 
          autoplay 
          muted 
          playsinline
          class="video"
        />
      </div>

      <div class="controls">
        <button 
          class="start-btn" 
          @click="startTracking"
          :disabled="isTracking || !stream"
        >
          Start Tracking
        </button>
        <button 
          class="stop-btn" 
          @click="stopTracking"
          :disabled="!isTracking"
        >
          Stop Tracking
        </button>
      </div>

      <div class="hoverable-demo">
        <Hoverable class="hoverable-item">
          <h3>Button 1</h3>
          <p>Hover with your hand</p>
        </Hoverable>
        <Hoverable class="hoverable-item">
          <h3>Button 2</h3>
          <p>Point your index finger</p>
        </Hoverable>
        <Hoverable class="hoverable-item">
          <h3>Button 3</h3>
          <p>Try different gestures</p>
        </Hoverable>
        <Hoverable class="hoverable-item">
          <h3>Button 4</h3>
          <p>Virtual mouse control</p>
        </Hoverable>
      </div>

      <div class="info">
        <h3>How to use:</h3>
        <ul>
          <li>Allow camera access when prompted</li>
          <li>Click "Start Tracking" to begin hand tracking</li>
          <li>Point your index finger at the screen to control the virtual cursor</li>
          <li>Hover over the buttons above to see them highlight</li>
          <li>Hold your finger steady for 2 seconds to trigger hover events</li>
          <li>Click "Stop Tracking" to end the session</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useHandTracker, Hoverable } from '@theforce/vue'

const { handLandmarks, isTracking, initialize, stop } = useHandTracker()
const videoRef = ref(null)
const stream = ref(null)

onMounted(async () => {
  await initializeCamera()
})

onUnmounted(() => {
  cleanup()
})

const initializeCamera = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: 'user'
      }
    })
    videoRef.value.srcObject = mediaStream
    stream.value = mediaStream
  } catch (error) {
    console.error('Error accessing camera:', error)
    alert('Unable to access camera. Please check permissions.')
  }
}

const startTracking = async () => {
  if (videoRef.value && stream.value) {
    await initialize(videoRef.value)
  }
}

const stopTracking = async () => {
  await stop()
}

const cleanup = () => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
  }
}
</script>

<style scoped>
.app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  max-width: 800px;
  width: 100%;
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.video-container {
  position: relative;
  width: 100%;
  max-width: 640px;
  margin: 0 auto 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.video {
  width: 100%;
  height: auto;
  display: block;
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

button {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.start-btn {
  background: #4CAF50;
  color: white;
}

.start-btn:hover:not(:disabled) {
  background: #45a049;
}

.stop-btn {
  background: #f44336;
  color: white;
}

.stop-btn:hover:not(:disabled) {
  background: #da190b;
}

.status {
  text-align: center;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-weight: 500;
}

.status.tracking {
  background: #e8f5e8;
  color: #2e7d32;
}

.status.stopped {
  background: #ffebee;
  color: #c62828;
}

.info {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.info h3 {
  margin-top: 0;
  color: #333;
}

.info ul {
  margin: 10px 0;
  padding-left: 20px;
}

.info li {
  margin: 5px 0;
  color: #666;
}

.hoverable-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.hoverable-item {
  padding: 20px;
  background: #f0f0f0;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.hoverable-item:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
}

.hoverable-item.hovered {
  background: #4CAF50;
  color: white;
  border-color: #45a049;
}
</style> 