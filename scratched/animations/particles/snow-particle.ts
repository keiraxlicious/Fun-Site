// src/utils/animations/particles/snow-particle.ts
import { ParticleBase } from '../core/particle-base';
import { ParticleConfig, Vector2D, ParticleOptions } from '../core/types';

export class SnowParticle extends ParticleBase {
  private baseX: number = 0;
  private driftFactor: number = 0;
  private rotationSpeed: number = 0;
  private options: ParticleOptions;
  
  /**
   * Factory method to create a new snow particle
   * @param containerWidth - Width of the container
   * @param containerHeight - Height of the container
   * @param options - Configuration options for snow particles
   * @returns A new configured SnowParticle instance
   */
  static create(
    containerWidth: number,
    containerHeight: number,
    options: ParticleOptions
  ): SnowParticle {
    // Generate a unique ID for the particle
    const id = Math.floor(Math.random() * 1000000);
    
    // Create the base configuration
    const config: ParticleConfig = {
      position: {
        x: Math.random() * containerWidth,
        y: Math.random() * containerHeight * -1 - 50 // Start above the viewport
      },
      speed: {
        x: 0, // Will be modified by drift
        y: Math.random() * (options.speed.max - options.speed.min) + options.speed.min
      },
      size: Math.random() * (options.size.max - options.size.min) + options.size.min,
      opacity: Math.random() * (options.opacity.max - options.opacity.min) + options.opacity.min,
      rotation: Math.random() * 360
    };
    
    // Create the particle with the proper constructor parameters
    const particle = new SnowParticle(
      config,
      containerWidth,
      containerHeight,
      options.fadeThreshold || 0.8,
      options.fadeSpeed || 0.02
    );
    
    // Store options for later use
    particle.options = options;
    
    // Set additional properties
    particle.baseX = config.position.x;
    particle.driftFactor = Math.random() * 0.1;
    particle.rotationSpeed = (Math.random() - 0.5) * 2;
    
    return particle;
  }
  
  /**
   * Creates a snow particle 
   * @param config - Initial configuration
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param fadeThreshold - Screen height percentage where fade begins
   * @param fadeSpeed - Speed of the fade effect
   */
  constructor(
    config: ParticleConfig,
    canvasWidth: number,
    canvasHeight: number,
    fadeThreshold: number = 0.8,
    fadeSpeed: number = 0.02
  ) {
    super(config, canvasWidth, canvasHeight, fadeThreshold, fadeSpeed);
    this.baseX = config.position.x;
    this.options = {
      count: 100,
      speed: { min: 1, max: 3 },
      size: { min: 5, max: 20 },
      opacity: { min: 0.6, max: 1.0 }
    };
  }
  
  /**
   * Update the snow particle's state
   * @param deltaTime - Time elapsed since last update
   * @returns boolean indicating if the particle is still active
   */
  update(deltaTime: number): boolean {
    // Call the parent update method first
    if (!super.update(deltaTime)) {
      return false;
    }
    
    // Apply horizontal drift (sine wave motion)
    this.position.x = this.baseX + Math.sin(this.position.y * this.driftFactor) * 50;
    
    // Apply wind if specified
    if (this.options?.wind) {
      this.position.x += this.options.wind * deltaTime * 60;
      this.baseX += this.options.wind * deltaTime * 60 * 0.1; // Gradually shift the base position
    }
    
    // Update rotation
    this.rotation += this.rotationSpeed * deltaTime * 60;
    
    // Check if out of bounds
    if (this.position.y > this.canvasHeight + 50 || this.position.x < -50 || 
        this.position.x > this.canvasWidth + 50 || this.opacity <= 0) {
      this.resetWithNewValues();
      return true; // The particle is still active, just reset
    }
    
    return true;
  }
  
  /**
   * Reset the particle with custom configuration
   * @param config - New configuration (optional)
   */
  reset(config?: ParticleConfig): void {
    if (config) {
      // If config is provided, use parent reset method
      super.reset(config);
      this.baseX = config.position.x;
    } else {
      // Otherwise, generate new values
      this.resetWithNewValues();
    }
  }
  
  /**
   * Helper method to reset particle with new random values
   */
  private resetWithNewValues(): void {
    // Create new configuration
    const newConfig: ParticleConfig = {
      position: {
        x: Math.random() * this.canvasWidth,
        y: -50 - Math.random() * 100 // Start above the viewport
      },
      speed: {
        x: 0,
        y: Math.random() * (this.options?.speed?.max - this.options?.speed?.min) + 
           (this.options?.speed?.min || 1)
      },
      size: Math.random() * (this.options?.size?.max - this.options?.size?.min) + 
            (this.options?.size?.min || 2),
      opacity: Math.random() * (this.options?.opacity?.max - this.options?.opacity?.min) + 
              (this.options?.opacity?.min || 0.5),
      rotation: Math.random() * 360
    };
    
    // Use the parent reset method
    super.reset(newConfig);
    
    // Set additional properties
    this.baseX = newConfig.position.x;
    this.rotationSpeed = (Math.random() - 0.5) * 2;
    this.driftFactor = Math.random() * 0.1;
  }
}
