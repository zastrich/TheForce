import { ref, onUnmounted, h, getCurrentInstance } from 'vue';
import { HandTracker, HandTrackerConfig } from '@theforce/core';

export function useHandTracker(config?: HandTrackerConfig) {
  const handLandmarks = ref<any[]>([]);
  const isTracking = ref(false);
  let tracker: HandTracker | null = null;

  const initialize = async (customConfig?: HandTrackerConfig) => {
    if (isTracking.value) return;

    const finalConfig = { ...config, ...customConfig };
    tracker = new HandTracker(finalConfig);

    tracker.onResults((results) => {
      handLandmarks.value = results.multiHandLandmarks || [];
    });

    await tracker.start();
    isTracking.value = true;
  };

  const stop = async () => {
    if (!tracker || !isTracking.value) return;

    await tracker.stop();
    tracker = null;
    isTracking.value = false;
    handLandmarks.value = [];
  };

  const restart = async (customConfig?: HandTrackerConfig) => {
    await stop();
    await initialize(customConfig);
  };

  // Only register onUnmounted if we're in a Vue component context
  // Check if we're in a component setup context
  try {
    if (typeof onUnmounted === 'function' && getCurrentInstance()) {
      onUnmounted(() => {
        if (tracker) {
          tracker.stop();
        }
      });
    }
  } catch (error) {
    // Not in a component context, skip onUnmounted
  }

  return {
    handLandmarks,
    isTracking,
    initialize,
    stop,
    restart,
  };
}

// Vue component for hoverable elements
export const Hoverable = {
  name: 'Hoverable',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props: any, { slots }: any) {
    return () => h('div', {
      class: ['force-hoverable', props.class]
    }, slots.default?.());
  }
};