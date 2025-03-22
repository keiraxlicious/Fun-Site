// src/utils/animations/particles/sakura-particle.ts
import { ParticleBase } from '../core/particle-base';
import { ParticleConfig, Vector2D, ParticleOptions } from '../core/types';

export class SakuraParticle extends ParticleBase {
  private wind: number;
  private swayAmount: number;
  private swayFrequency: number;
  private swayOffset: number;
  
  /**
   * Creates a sakura petal particle
   * @param config - Configuration parameters for the particle
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param wind - Wind strength and direction
   */
  constructor(
    config: ParticleConfig,
    canvasWidth: number,
    canvasHeight: number,
    wind: number = 0,
    fadeThreshold: number = 0.8,
    fadeSpeed: number = 0.02
  ) {
    super(config, canvasWidth, canvasHeight, fadeThreshold, fadeSpeed);
    
    // Set sakura-specific properties
    this.wind = wind;
    this.swayAmount = Math.random() * 2 + 1;
    this.swayFrequency = Math.random() * 2 + 1;
    this.swayOffset = Math.random() * Math.PI * 2;
  }
  
  /**
   * Update the sakura particle with sway motion
   * @param deltaTime - Time elapsed since last update in seconds
   * @returns boolean indicating if the particle is still active
   */
  override update(deltaTime: number): boolean {
    // Apply wind effect to horizontal speed
    this.speed.x += this.wind * deltaTime * 0.1;
    
    // Apply sway motion
    this.speed.x += Math.sin(
      this.currentLifetime * this.swayFrequency + this.swayOffset
    ) * this.swayAmount * deltaTime;
    
    // Adjust rotation based on horizontal movement
    this.rotation += this.speed.x * 15 * deltaTime;
    
    // Call base class update
    return super.update(deltaTime);
  }
  
  /**
   * Create a new sakura particle
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param options - Particle options
   * @returns New sakura particle
   */
  static create(
    canvasWidth: number,
    canvasHeight: number,
    options: ParticleOptions
  ): SakuraParticle {
    // Set random position above the screen
    const position: Vector2D = {
      x: Math.random() * canvasWidth,
      y: -Math.random() * 50 - 20,
    };
    
    // Set random speed
    const speed: Vector2D = {
      x: (Math.random() - 0.5) * 0.5,
      y: Math.random() * 
        (options.speed.max - options.speed.min) + 
        options.speed.min,
    };
    
    // Set random size
    const size = Math.random() * 
      (options.size.max - options.size.min) + 
      options.size.min;
    
    // Set random opacity
    const opacity = Math.random() * 
      (options.opacity.max - options.opacity.min) + 
      options.opacity.min;
    
    // Set random rotation
    const rotation = Math.random() * 360;
    
    // Set random color if colors provided
    let color: string | undefined;
    if (options.colors && options.colors.length > 0) {
      color = options.colors[Math.floor(Math.random() * options.colors.length)];
    } else {
      // Default to light pink if no colors provided
      color = `rgba(255, ${200 + Math.floor(Math.random() * 55)}, ${
        200 + Math.floor(Math.random() * 55)
      }, ${opacity})`;
    }
    
    // Create configuration
    const config: ParticleConfig = {
      position,
      speed,
      size,
      opacity,
      rotation,
      color,
    };
    
    return new SakuraParticle(
      config,
      canvasWidth,
      canvasHeight,
      options.wind || 0,
      options.fadeThreshold || 0.8,
      options.fadeSpeed || 0.02
    );
  }
}
