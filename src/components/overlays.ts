// src/utils/animations/particleAnimations.ts

import { 
    initializeParticleSystem,
    disposeParticleSystem,
    pauseParticleSystem,
    resumeParticleSystem,
    getParticleSystemStats,
    disposeAllParticleSystems
  } from '../utils/animations/core/particleSystem';
  
  import { 
    ParticleType, 
    ParticleOptions, 
    AnimationRenderMode,
    InitResult
  } from '../types/animations';
  
  /**
   * Initializes a particle animation system
   * 
   * @param containerId - ID of the container element
   * @param particleType - Type of particles to animate
   * @param options - Configuration options for particles
   * @returns Promise resolving to initialization result
   */
  export async function initializeOverlays(
    containerId: string,
    particleType: ParticleType,
    options: ParticleOptions
  ): Promise<InitResult> {
    return await initializeParticleSystem(containerId, particleType, options);
  }
  
  /**
   * Creates default options for a particle type
   */
  export function getDefaultParticleOptions(
    particleType: ParticleType,
    customOptions: Partial<ParticleOptions> = {}
  ): ParticleOptions {
    // Base options common to all particle types
    const baseOptions: ParticleOptions = {
      renderMode: AnimationRenderMode.CANVAS,
      count: 50,
      speed: { min: 1, max: 3 },
      size: { min: 5, max: 20 },
      opacity: { min: 0.6, max: 1.0 },
      fadeThreshold: 0.8,
      fadeSpeed: 0.02
    };
    
    // Type-specific default options
    let typeOptions: Partial<ParticleOptions> = {};
    
    switch (particleType) {
      case ParticleType.SNOW:
        typeOptions = {
          renderMode: AnimationRenderMode.SVG,
          count: 100,
          speed: { min: 1, max: 3 },
          size: { min: 2, max: 8 },
          wind: 0.5,
          colors: ['#FFFFFF'],
          assetPaths: ['/assets/svgs/overlays/snow/']
        };
        break;
        
      case ParticleType.RAIN:
        typeOptions = {
          renderMode: AnimationRenderMode.CANVAS,
          count: 150,
          speed: { min: 15, max: 25 },
          size: { min: 10, max: 20 },
          opacity: { min: 0.2, max: 0.5 },
          colors: ['#A3D5FF'],
          gravity: 1.5
        };
        break;
        
      case ParticleType.SAKURA:
        typeOptions = {
          renderMode: AnimationRenderMode.IMAGE,
          count: 80,
          speed: { min: 1, max: 2 },
          size: { min: 8, max: 15 },
          rotation: { speed: 1, initial: 0 },
          wind: 1,
          colors: ['#FFB7C5'],
          assetPaths: ['/assets/images/overlays/sakura/']
        };
        break;
        
      case ParticleType.LEAF:
        typeOptions = {
          renderMode: AnimationRenderMode.CANVAS,
          count: 50,
          speed: { min: 1, max: 3 },
          size: { min: 15, max: 30 },
          rotation: { speed: 2, initial: 0 },
          wind: 3,
          colors: ['#A52A2A', '#8B4513', '#D2691E', '#CD853F', '#F4A460'],
          assetPaths: ['/assets/svgs/overlays/leaves/']
        };
        break;
        
      case ParticleType.HEART:
        typeOptions = {
          renderMode: AnimationRenderMode.CANVAS,
          count: 60,
          speed: { min: 1, max: 2 },
          size: { min: 10, max: 20 },
          pulse: { min: 0.8, max: 1.2 },
          colors: ['#FF4081'],
          assetPaths: ['/assets/svgs/overlays/hearts/']
        };
        break;
        
      case ParticleType.STAR:
        typeOptions = {
          renderMode: AnimationRenderMode.CANVAS,
          count: 100,
          speed: { min: 0.1, max: 0.3 },
          size: { min: 1, max: 4 },
          twinkle: { min: 0.5, max: 1.5 },
          colors: ['#FFFFFF', '#F0F8FF', '#FFFACD', '#FFE4B5'],
          assetPaths: ['/assets/svgs/overlays/stars/']
        };
        break;
    }
    
    // Merge base options, type-specific options, and custom options
    return {
      ...baseOptions,
      ...typeOptions,
      ...customOptions
    };
  }
  
  // Export the core functionality
  export {
    disposeParticleSystem,
    pauseParticleSystem,
    resumeParticleSystem,
    getParticleSystemStats,
    disposeAllParticleSystems
  };
  
  // Export types
  export {
    ParticleType,
    AnimationRenderMode
  };
  