// src/utils/animations/particle-factory.ts
import { ParticleEngine } from './core/particle-engine';
import { ParticleBase } from './core/particle-base';
import { CanvasDrawer } from './core/canvas-drawer';
import { SVGDrawer } from './core/svg-drawer';
import { ParticleOptions, ParticleType, AnimationRenderMode } from './core/types';
import { SnowParticle } from './particles/snow-particle';
import { SakuraParticle } from './particles/sakura-particle';
import { RainParticle } from './particles/rain-particle';
import { LeafParticle } from './particles/leaf-particle';
import { HeartParticle } from './particles/heart-particle';
import { StarParticle } from './particles/star-particle';

export async function createParticleAnimation(
  containerId: string,
  type: ParticleType,
  options: ParticleOptions
): Promise<ParticleEngine<ParticleBase>> {
  console.log(`Initializing particle animation: ${type} in ${containerId}`);
  console.log('Options:', JSON.stringify(options));
  
  // Set default options
  const defaultOptions: ParticleOptions = {
    count: 50,
    speed: { min: 1, max: 3 },
    size: { min: 5, max: 20 },
    opacity: { min: 0.6, max: 1.0 },
    fadeThreshold: 0.8,
    fadeSpeed: 0.02,
    wind: 0,
    gravity: 0.5,
    interactWithElements: false,
    renderMode: AnimationRenderMode.CANVAS
  };
  
  // Merge defaults with provided options
  const mergedOptions: ParticleOptions = {
    ...defaultOptions,
    ...options
  };
  
  console.log(`Using render mode: ${mergedOptions.renderMode}`);
  
  // Create drawer based on render mode
  let drawer;
  
  if (mergedOptions.renderMode === AnimationRenderMode.SVG && 
      Array.isArray(mergedOptions.assetPaths) &&
      mergedOptions.assetPaths.length > 0) {
    console.log(`Creating SVG drawer with paths:`, mergedOptions.assetPaths);
    drawer = new SVGDrawer(containerId, mergedOptions.assetPaths);
  } else {
    // For CANVAS and IMAGE modes (or if SVG paths aren't provided), use CanvasDrawer
    console.log(`Creating Canvas drawer for ${type} particles`);
    drawer = new CanvasDrawer(containerId, type, mergedOptions.assetPaths || []);
  }
  
  // Type guard for factory functions to ensure they have the correct signature
  type ParticleFactory = (
    containerWidth: number, 
    containerHeight: number, 
    options: ParticleOptions
  ) => ParticleBase;
  
  // Create appropriate factory function based on particle type
  let particleFactory: ParticleFactory;
  
  switch (type) {
    case ParticleType.SNOW:
      particleFactory = SnowParticle.create;
      break;
      
    case ParticleType.SAKURA:
      particleFactory = SakuraParticle.create;
      break;
      
    case ParticleType.RAIN:
      particleFactory = RainParticle.create;
      break;
      
    case ParticleType.LEAF:
      particleFactory = LeafParticle.create;
      break;
      
    case ParticleType.HEART:
      particleFactory = HeartParticle.create;
      break;
      
    case ParticleType.STAR:
      particleFactory = StarParticle.create;
      break;
      
    default:
      throw new Error(`Unsupported particle type: ${type}`);
  }
  
  // Create and initialize the engine
  const engine = new ParticleEngine(
    containerId,
    particleFactory,
    drawer,
    mergedOptions
  );
  
  await engine.initialize();
  
  return engine;
}


/**
 * Initialize particles system with the specified configuration
 * @param containerId - ID of the container element
 * @param type - Type of particle effect to create
 * @param options - Configuration options for particles
 * @returns Promise that resolves when animation has started
 */
export async function initParticles(
  containerId: string,
  type: ParticleType,
  options: ParticleOptions
): Promise<void> {
  try {
    const engine = await createParticleAnimation(containerId, type, options);
    engine.start();
    
    // Store the engine globally for later access (cleanup, etc.)
    const engineKey = `particleEngine_${containerId}_${type}`;
    (window as any)[engineKey] = engine;
    
    return;
  } catch (error) {
    console.error('Failed to initialize particles:', error);
    throw error;
  }
}
/**
 * Converts animation options from overlay config to particle options
 * @param config - The animation options from overlay config
 * @returns Standardized ParticleOptions
 */
function mapAnimationOptionsToParticleOptions(config: any): ParticleOptions {
  // Default options
  const options: ParticleOptions = {
    count: 100,
    speed: { min: 1, max: 3 },
    size: { min: 5, max: 20 },
    opacity: { min: 0.6, max: 1.0 },
    fadeThreshold: 0.8,
    fadeSpeed: 0.02,
    wind: 0,
    gravity: 0.5,
    interactWithElements: false
  };
  
  // Map specific config properties
  if (config) {
    if (config.maxParticles) options.count = config.maxParticles;
    if (config.sizeRange) options.size = { min: config.sizeRange[0], max: config.sizeRange[1] };
    if (config.fallSpeedRange) options.speed = { min: config.fallSpeedRange[0], max: config.fallSpeedRange[1] };
    if (config.color) options.colors = [config.color];
    if (config.svgPath) options.assetPaths = config.svgPath;
    if (config.renderMode) options.renderMode = config.renderMode;
  }
  
  return options;
}
