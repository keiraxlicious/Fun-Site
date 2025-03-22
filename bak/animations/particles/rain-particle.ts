// src/utils/animations/particles/rain-particle.ts
import { ParticleBase } from '../core/particle-base';
import { ParticleConfig, Vector2D, ParticleOptions } from '../core/types';

export class RainParticle extends ParticleBase {
  private readonly gravity: number;
  private readonly wind: number;
  private readonly length: number;
  
  /**
   * Creates a rain drop particle
   * @param config - Configuration parameters for the particle
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param gravity - Gravity effect strength
   * @param wind - Wind effect strength
   */
  constructor(
    config: ParticleConfig,
    canvasWidth: number,
    canvasHeight: number,
    gravity: number = 9.8,
    wind: number = 0,
    fadeThreshold: number = 0.9,
    fadeSpeed: number = 0.05
  ) {
    super(config, canvasWidth, canvasHeight, fadeThreshold, fadeSpeed);
    
    this.gravity = gravity;
    this.wind = wind;
    this.length = config.size * 2; // Raindrop length is proportional to size
  }
  
  /**
   * Update rain particle with gravity and wind effects
   * @param deltaTime - Time elapsed since last update in seconds
   * @returns boolean indicating if the particle is still active
   */
  override update(deltaTime: number): boolean {
    // Apply gravity
    this.speed.y += this.gravity * deltaTime;
    
    // Apply wind
    this.speed.x += this.wind * deltaTime;
    
    // Limit terminal velocity
    const terminalVelocity = 15;
    if (this.speed.y > terminalVelocity) {
      this.speed.y = terminalVelocity;
    }
    
    // Call base update
    return super.update(deltaTime);
  }
  
  /**
   * Get the current rain particle state including length
   */
  override getState(): ParticleConfig & { length?: number } {
    const state = super.getState();
    return {
      ...state,
      length: this.length
    };
  }
  
  /**
   * Create a new rain particle
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param options - Particle options
   * @returns New rain particle
   */
  static create(
    canvasWidth: number,
    canvasHeight: number,
    options: ParticleOptions
  ): RainParticle {
    // Set random position above the screen
    const position: Vector2D = {
      x: Math.random() * canvasWidth,
      y: -Math.random() * 50,
    };
    
    // Set rain-specific speed
    const speedY = Math.random() * 
      (options.speed.max - options.speed.min) + 
      options.speed.min;
    
    // Slight angle based on wind
    const windEffect = options.wind || 0;
    const speed: Vector2D = {
      x: windEffect * 0.1,
      y: speedY,
    };
    
    // Rain drops are thin
    const size = Math.random() * 
      (options.size.max - options.size.min) + 
      options.size.min;
    
    // Set random opacity
    const opacity = Math.random() * 
      (options.opacity.max - options.opacity.min) + 
      options.opacity.min;
    
    // Water-like colors with blue tint
    let color: string;
    if (options.colors && options.colors.length > 0) {
      color = options.colors[Math.floor(Math.random() * options.colors.length)];
    } else {
      // Default blue-tinted water color
      const blueBase = 190 + Math.floor(Math.random() * 65);
      color = `rgba(${blueBase - 40}, ${blueBase - 20}, ${blueBase}, ${opacity})`;
    }
    
    // Create configuration
    const config: ParticleConfig = {
      position,
      speed,
      size,
      opacity,
      color,
    };
    
    return new RainParticle(
      config,
      canvasWidth,
      canvasHeight,
      options.gravity || 9.8,
      options.wind || 0,
      options.fadeThreshold || 0.9,
      options.fadeSpeed || 0.05
    );
  }
}
