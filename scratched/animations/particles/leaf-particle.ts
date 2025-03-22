// src/utils/animations/particles/leaf-particle.ts
import { ParticleBase } from '../core/particle-base';
import { ParticleConfig, Vector2D, ParticleOptions } from '../core/types';

export class LeafParticle extends ParticleBase {
  private wind: number;
  private gravity: number;
  private swayAmount: number;
  private swayFrequency: number;
  private rotationSpeed: number;
  private swayOffset: number;
  private fallPattern: number;
  
  /**
   * Creates a falling leaf particle
   * @param config - Configuration parameters for the particle
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param wind - Wind effect strength
   * @param gravity - Gravity effect strength
   */
  constructor(
    config: ParticleConfig,
    canvasWidth: number,
    canvasHeight: number,
    wind: number = 0.5,
    gravity: number = 0.5,
    fadeThreshold: number = 0.9,
    fadeSpeed: number = 0.03
  ) {
    super(config, canvasWidth, canvasHeight, fadeThreshold, fadeSpeed);
    
    // Set leaf-specific properties
    this.wind = wind;
    this.gravity = gravity;
    this.swayAmount = Math.random() * 3 + 2;
    this.swayFrequency = Math.random() * 3 + 1;
    this.rotationSpeed = (Math.random() - 0.5) * 2;
    this.swayOffset = Math.random() * Math.PI * 2;
    this.fallPattern = Math.random() * 5;
  }
  
  /**
   * Update leaf particle with complex falling motion
   * @param deltaTime - Time elapsed since last update in seconds
   * @returns boolean indicating if the particle is still active
   */
  override update(deltaTime: number): boolean {
    // Apply gravity
    this.speed.y += this.gravity * deltaTime;
    
    // Apply wind base effect
    this.speed.x += this.wind * deltaTime * 0.2;
    
    // Apply swaying motion based on fall pattern
    const swayFactor = Math.sin(
      this.currentLifetime * this.swayFrequency + this.swayOffset
    );
    
    // Different fall patterns
    if (this.fallPattern < 1) {
      // Spiral fall
      this.speed.x += swayFactor * this.swayAmount * deltaTime;
      this.rotation += this.rotationSpeed * 5 * deltaTime;
    } else if (this.fallPattern < 3) {
      // Side-to-side fall
      this.speed.x += swayFactor * this.swayAmount * deltaTime;
      this.rotation += swayFactor * this.rotationSpeed * deltaTime;
    } else {
      // Tumbling fall
      this.speed.x += swayFactor * this.swayAmount * 0.5 * deltaTime;
      this.rotation += this.rotationSpeed * 10 * deltaTime;
    }
    
    // Limit terminal velocity
    const terminalVelocity = 5;
    if (this.speed.y > terminalVelocity) {
      this.speed.y = terminalVelocity;
    }
    
    // Limit horizontal speed
    const maxHorizontalSpeed = 3;
    if (Math.abs(this.speed.x) > maxHorizontalSpeed) {
      this.speed.x = Math.sign(this.speed.x) * maxHorizontalSpeed;
    }
    
    // Call base update
    return super.update(deltaTime);
  }
  
  /**
   * Create a new leaf particle
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param options - Particle options
   * @returns New leaf particle
   */
  static create(
    canvasWidth: number,
    canvasHeight: number,
    options: ParticleOptions
  ): LeafParticle {
    // Set random position above the screen
    const position: Vector2D = {
      x: Math.random() * canvasWidth,
      y: -Math.random() * 50 - 20,
    };
    
    // Set initial speed
    const speed: Vector2D = {
      x: (Math.random() - 0.5) * 2,
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
    
    // Set random color from autumn palette if not provided
    let color: string;
    if (options.colors && options.colors.length > 0) {
      color = options.colors[Math.floor(Math.random() * options.colors.length)];
    } else {
      // Default autumn colors
      const autumnColors = [
        `rgba(165, 42, 42, ${opacity})`,   // Brown
        `rgba(210, 105, 30, ${opacity})`,  // Chocolate
        `rgba(255, 69, 0, ${opacity})`,    // Red-orange
        `rgba(255, 140, 0, ${opacity})`,   // Dark orange
        `rgba(255, 165, 0, ${opacity})`,   // Orange
        `rgba(255, 215, 0, ${opacity})`,   // Gold
        `rgba(218, 165, 32, ${opacity})`,  // Goldenrod
        `rgba(128, 128, 0, ${opacity})`    // Olive
      ];
      color = autumnColors[Math.floor(Math.random() * autumnColors.length)];
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
    
    return new LeafParticle(
      config,
      canvasWidth,
      canvasHeight,
      options.wind || 0.5,
      options.gravity || 0.5,
      options.fadeThreshold || 0.9,
      options.fadeSpeed || 0.03
    );
  }
}
