// Three.js configuration for better performance and error handling
export const threeConfig = {
  // Performance settings
  antialias: true,
  alpha: true,
  powerPreference: "high-performance" as WebGLPowerPreference,
  
  // Error handling
  onError: (error: Error) => {
    console.warn('Three.js error:', error);
  },
  
  // Context handling
  onContextLost: (event: Event) => {
    event.preventDefault();
    console.warn('WebGL context lost, attempting to restore...');
  },
  
  onContextRestored: () => {
    console.log('WebGL context restored');
  }
};

// OrbitControls configuration
export const orbitControlsConfig = {
  enablePan: false,
  minDistance: 3,
  maxDistance: 8,
  autoRotate: true,
  autoRotateSpeed: 0.5,
  enableDamping: true,
  dampingFactor: 0.05,
  enableZoom: true,
  enableRotate: true
};

// Lighting configuration
export const lightingConfig = {
  ambient: {
    intensity: 0.3
  },
  spotLight: {
    position: [5, 5, 5] as [number, number, number],
    angle: 0.3,
    penumbra: 1,
    intensity: 2,
    castShadow: true,
    shadowMapSize: 2048
  },
  pointLight: {
    position: [0, 3, 0] as [number, number, number],
    intensity: 0.5,
    color: "#d4af37"
  }
};

