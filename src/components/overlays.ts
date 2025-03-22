// src/components/overlays.ts

import { 
  initializeParticles 
} from "../utils/animations/MagicParticles";
import { 
  ParticleType, 
  ParticleOptions, 
  RenderMode,
  ParticleCategory 
} from "../types/particleTypes";

// Types for overlay configuration
export type AnimationRenderMode = "CANVAS" | "SVG" | "DOM";

// Base animation options
export interface BaseAnimationOptions {
  renderMode: AnimationRenderMode;
  color?: string;
  maxParticles: number;
  assetDirectory?: string;
  svgPath?: string | string[];
  imagePath?: string | string[];
  fallbackImage?: string;
}

// Specific animation option interfaces
export interface SnowAnimationOptions extends BaseAnimationOptions {
  sizeRange: [number, number];
  fallSpeedRange: [number, number];
}

export interface RainAnimationOptions extends BaseAnimationOptions {
  lengthRange: [number, number];
  fallSpeedRange: [number, number];
  thicknessRange: [number, number];
}

export interface LeafAnimationOptions extends BaseAnimationOptions {
  sizeRange: [number, number];
  fallSpeedRange: [number, number];
  rotationSpeedRange: [number, number];
  swayAmplitude: number;
  colors?: string[];
}

// Add more specific options as needed...

// Overlay option definition
export interface OverlayOption {
  id: string;
  name: string;
  particleType: string;
  category: ParticleCategory;
  config: BaseAnimationOptions;
  path?: string;
}

// Define available overlays
export const OVERLAY_OPTIONS: OverlayOption[] = [
  {
    id: "snow",
    name: "Snowfall",
    particleType: "snow",
    category: ParticleCategory.FALLING,
    config: {
      renderMode: "SVG" as AnimationRenderMode,
      color: "#FFFFFF",
      maxParticles: 100,
      sizeRange: [2, 8],
      fallSpeedRange: [1, 3],
      assetDirectory: "/assets/svgs/overlays/snow/",
      fallbackImage: "/assets/images/overlays/snow/"
    } as SnowAnimationOptions,
    path: "/snow.html"
  },
  
  // Add more overlay options as needed...
];

// Track active engine
let activeEngineKey: string | null = null;

/**
 * Initialize the default overlay effect
 * @param containerId - ID of container element
 * @param overlayId - ID of overlay to initialize
 */
export function initializeOverlays(
  containerId: string = "magic-canvas",
  overlayId?: string
): void {
  console.log("Initializing overlays...");
  
  // If no specific overlay is requested, try to get from URL or select random
  if (!overlayId) {
    const path = window.location.pathname;
    const queryParams = new URLSearchParams(window.location.search);
    const queryOverlay = queryParams.get("overlay");
    
    if (queryOverlay) {
      overlayId = queryOverlay;
    } else {
      const pathMatch = OVERLAY_OPTIONS.find(
        option => path.includes(`/${option.id}`)
      );
      
      if (pathMatch) {
        overlayId = pathMatch.id;
      } else {
        // Default to random effect
        const randomIndex = Math.floor(Math.random() * OVERLAY_OPTIONS.length);
        overlayId = OVERLAY_OPTIONS[randomIndex].id;
      }
    }
  }
  
  applyOverlayEffect(overlayId, containerId);
}

/**
 * Apply a specific overlay effect
 * @param overlayId - ID of overlay to apply
 * @param containerId - ID of container element
 */
export function applyOverlayEffect(
  overlayId: string,
  containerId: string = "magic-canvas"
): void {
  // Validate container exists
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID '${containerId}' not found`);
    return;
  }
  
  // Stop any existing animation
  if (activeEngineKey) {
    const engine = (window as any)[activeEngineKey];
    if (engine && typeof engine.dispose === "function") {
      engine.dispose();
      delete (window as any)[activeEngineKey];
    }
  }
  
  // Find requested overlay
  const overlay = OVERLAY_OPTIONS.find(option => option.id === overlayId);
  if (!overlay) {
    console.error(`Overlay with ID '${overlayId}' not found`);
    return;
  }
  
  console.log(`Applying overlay: ${overlay.name}`);
  
  // Map overlay ID to ParticleType
  const typeMap: Record<string, ParticleType> = {
    "snow": ParticleType.SNOW,
    "rain": ParticleType.RAIN,
    "leaves": ParticleType.LEAF,
    "sakura": ParticleType.SAKURA,
    "hearts": ParticleType.HEART_FLOATING,
    "stars": ParticleType.STAR
    // Add more mappings as needed
  };
  
  const particleType = typeMap[overlayId];
  
  if (!particleType) {
    console.error(`Unknown particle type for overlay: ${overlayId}`);
    return;
  }
  
  // Convert overlay config to particle options
  const options = convertConfigToParticleOptions(overlay.config);
  
  // Initialize the animation
  initializeParticles(containerId, particleType, options).then(() => {
    activeEngineKey = `particleEngine_${containerId}_${particleType}`;
    console.log(`Overlay applied: ${overlay.name}`);
    
    // Update URL with query param for current effect
    const url = new URL(window.location.href);
    url.searchParams.set("overlay", overlayId);
    window.history.replaceState({}, "", url.toString());
  }).catch(error => {
    console.error("Failed to initialize overlay:", error);
  });
}

/**
 * Convert overlay config to particle options
 * @param config - Overlay configuration
 * @returns Particle options
 */
function convertConfigToParticleOptions(config: BaseAnimationOptions): ParticleOptions {
  // Create base options object
  const options: ParticleOptions = {
    count: config.maxParticles,
    speed: { min: 1, max: 3 },
    size: { min: 5, max: 20 },
    opacity: { min: 0.6, max: 1.0 },
    fadeThreshold: 0.8,
    fadeSpeed: 0.02,
    assetPaths: []
  };
  
  // Handle asset paths
  if (config.assetDirectory) {
    options.assetPaths = [config.assetDirectory];
  } else {
    if (config.svgPath) {
      if (Array.isArray(config.svgPath)) {
        options.assetPaths.push(...config.svgPath);
      } else {
        options.assetPaths.push(config.svgPath);
      }
    }
    
    if (config.imagePath) {
      if (Array.isArray(config.imagePath)) {
        options.assetPaths.push(...config.imagePath);
      } else {
        options.assetPaths.push(config.imagePath);
      }
    }
  }
  
  // Add fallback image if needed
  if (config.fallbackImage && options.assetPaths.length === 0) {
    options.assetPaths.push(config.fallbackImage);
  }
  
  // Add size and speed configurations
  const specificConfig = config as any;
  
  if (specificConfig.sizeRange) {
    options.size = {
      min: specificConfig.sizeRange[0],
      max: specificConfig.sizeRange[1]
    };
  }
  
  if (specificConfig.fallSpeedRange) {
    options.speed = {
      min: specificConfig.fallSpeedRange[0],
      max: specificConfig.fallSpeedRange[1]
    };
  }
  
  // Add colors
  if (specificConfig.colors) {
    options.colors = specificConfig.colors;
  } else if (config.color) {
    options.colors = [config.color];
  }
  
  // Map render mode
  if (config.renderMode) {
    switch (config.renderMode) {
      case "SVG":
        options.renderMode = RenderMode.SVG;
        break;
      case "CANVAS":
        options.renderMode = RenderMode.CANVAS;
        break;
      case "DOM":
        options.renderMode = RenderMode.IMAGE;
        break;
    }
  }
  
  return options;
}

/**
 * Disable any active overlay effects
 */
export function disableOverlays(): void {
  if (activeEngineKey) {
    const engine = (window as any)[activeEngineKey];
    if (engine && typeof engine.dispose === "function") {
      engine.dispose();
      delete (window as any)[activeEngineKey];
      activeEngineKey = null;
      
      // Update URL
      const url = new URL(window.location.href);
      url.searchParams.delete("overlay");
      window.history.replaceState({}, "", url.toString());
      
      console.log("Overlays disabled");
    }
  }
}
