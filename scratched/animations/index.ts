// src/utils/animations/index.ts
import { createParticleAnimation } from './particle-factory';
import type { ParticleOptions } from './core/types';
import { ParticleType } from './core/types';

/**
 * Initialize the particle overlay system for a given container
 * @param containerId - ID of the container element
 * @param type - Type of particle effect to create
 * @param options - Configuration options for the effect
 * @returns Promise resolving when the animation is initialized and started
 */
export async function initializeOverlays(
  containerId: string,
  type: ParticleType,
  options: Partial<ParticleOptions> = {}
): Promise<void> {
  try {
  
    // Base default options for all particle types
    const baseDefaults: ParticleOptions = {
        count: 50,
        speed: { min: 1, max: 3 },
        size: { min: 5, max: 15 },
        opacity: { min: 0.6, max: 1.0 },
        wind: 0,
        gravity: 0,
        fadeThreshold: 0.9,
        fadeSpeed: 0.05,
        interactWithElements: false,
        assetPaths: []
      };
      
    let specificDefaults: Partial<ParticleOptions> = {};
    // Set type-specific defaults
    let defaultOptions: Partial<ParticleOptions> = {};
    
    switch (type) {
      case ParticleType.SAKURA:
        defaultOptions = {
          count: 30,
          speed: { min: 1, max: 2 },
          size: { min: 10, max: 20 },
          opacity: { min: 0.6, max: 0.9 },
          wind: 0.5,
          colors: ['#ffc6d9', '#ffcce1', '#ffe0e9', '#fff0f5']
        };
        break;
        
      case ParticleType.RAIN:
        defaultOptions = {
          count: 200,
          speed: { min: 10, max: 20 },
          size: { min: 1, max: 3 },
          opacity: { min: 0.2, max: 0.5 },
          wind: -1,
          gravity: 9.8,
          fadeThreshold: 0.95,
          fadeSpeed: 0.1
        };
        break;
        
      case ParticleType.LEAF:
        defaultOptions = {
          count: 15,
          speed: { min: 1, max: 3 },
          size: { min: 15, max: 25 },
          opacity: { min: 0.8, max: 1 },
          wind: 1.5,
          gravity: 0.5
        };
        break;
        
      case ParticleType.HEART:
        defaultOptions = {
          count: 20,
          speed: { min: 0.5, max: 1.5 },
          size: { min: 10, max: 25 },
          opacity: { min: 0.6, max: 0.9 }
        };
        break;
        
      case ParticleType.STAR:
        defaultOptions = {
          count: 100,
          speed: { min: 0, max: 0 },
          size: { min: 1, max: 4 },
          opacity: { min: 0.5, max: 1 }
        };
        break;
    }
    
    // Merge defaults with provided options - ensure required fields
    const mergedOptions: ParticleOptions = {
        ...baseDefaults,
        ...specificDefaults,
        ...options
      };
    
    // Create and start the animation
    const engine = await createParticleAnimation(
      containerId,
      type,
      mergedOptions
    );
    
    engine.start();
    
    // Store engine reference on window for potential cleanup
    const engineKey = `particleEngine_${containerId}_${type}`;
    (window as any)[engineKey] = engine;
    
    // Setup clean up on page unload
    window.addEventListener('beforeunload', () => {
      if ((window as any)[engineKey]) {
        (window as any)[engineKey].dispose();
        delete (window as any)[engineKey];
      }
    });
    
  } catch (error) {
    console.error('Failed to initialize particle overlay:', error);
    throw error;
  }
}

// Export types directly
export type { ParticleOptions } from './core/types';
export { ParticleType } from './core/types';
