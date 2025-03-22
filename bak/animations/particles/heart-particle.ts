// src/utils/animations/particles/heart-particle.ts
import { ParticleBase } from '../core/particle-base';
import { ParticleConfig, Vector2D, ParticleOptions } from '../core/types';

export class HeartParticle extends ParticleBase {
  private sway: number;
  private swayFrequency: number;
  private swayOffset: number;
  private rotationSpeed: number;
  private pulseAmount: number;
  private pulseFrequency: number;
  private pulseOffset: number;
  private originalSize: number;
  
  /**
   * Creates a floating heart particle
   * @param config - Configuration parameters for the particle
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   */
  constructor(
    config: ParticleConfig,
    canvasWidth: number,
    canvasHeight: number,
    fadeThreshold: number = 0.9,
    fadeSpeed: number = 0.02
  ) {
    super(config, canvasWidth, canvasHeight, fadeThreshold, fadeSpeed);
    
    // Set heart-specific properties
    this.sway = (Math.random() - 0.5) * 1.5;
    this.swayFrequency = Math.random() * 1.5 + 0.5;
    this.swayOffset = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.5;
    this.pulseAmount = Math.random() * 0.2 + 0.1;
    this.pulseFrequency = Math.random() * 2 + 1;
    this.pulseOffset = Math.random() * Math.PI * 2;
    this.originalSize = config.size;
  }
  
  /**
   * Update heart particle with floating and pulsing effects
   * @param deltaTime - Time elapsed since last update in seconds
   * @returns boolean indicating if the particle is still active
   */
  override update(deltaTime: number): boolean {
    // Apply gentle sway
    this.speed.x += Math.sin(
      this.currentLifetime * this.swayFrequency + this.swayOffset
    ) * this.sway * deltaTime;
    
    // Apply gentle floating effect (slightly counteract gravity)
    this.speed.y *= 0.98;
    
    // Apply gentle rotation
    this.rotation += this.rotationSpeed * deltaTime * 30;
    
    // Apply pulsing effect to size
    const pulseFactor = Math.sin(
      this.currentLifetime * this.pulseFrequency + this.pulseOffset
    );
    this.size = this.originalSize * (1 + pulseFactor * this.pulseAmount);
    
    // Limit horizontal speed
    const maxHorizontalSpeed = 1.5;
    if (Math.abs(this.speed.x) > maxHorizontalSpeed) {
      this.speed.x = Math.sign(this.speed.x) * maxHorizontalSpeed;
    }
    
    // Limit vertical speed
    const maxVerticalSpeed = 2;
    if (Math.abs(this.speed.y) > maxVerticalSpeed) {
      this.speed.y = Math.sign(this.speed.y) * maxVerticalSpeed;
    }
    
    // Call base update
    return super.update(deltaTime);
  }
  
  /**
   * Create a new heart particle
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param options - Particle options
   * @returns New heart particle
   */
  static create(
    canvasWidth: number,
    canvasHeight: number,
    options: ParticleOptions
  ): HeartParticle {
    // Random position anywhere on screen but biased toward top
    const position: Vector2D = {
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight * 0.7,
    };
    
    // Set initial gentle floating speed
    const speed: Vector2D = {
      x: (Math.random() - 0.5) * 0.5,
      y: Math.random() * -1 - 0.5, // Upward initial movement
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
    
    // Set random pastel color if not provided
    let color: string;
    if (options.colors && options.colors.length > 0) {
      color = options.colors[Math.floor(Math.random() * options.colors.length)];
    } else {
      // Default pastel colors
      const pastelColors = [
        `rgba(255, 182, 193, ${opacity})`, // Light pink
        `rgba(255, 160, 122, ${opacity})`, // Light salmon
        `rgba(216, 191, 216, ${opacity})`, // Thistle (light purple)
        `rgba(173, 216, 230, ${opacity})`, // Light blue
        `rgba(240, 128, 128, ${opacity})`, // Light coral
        `rgba(255, 182, 193, ${opacity})`, // Light pink
        `rgba(221, 160, 221, ${opacity})`, // Plum
        `rgba(176, 224, 230, ${opacity})`, // Powder blue
        `rgba(255, 222, 173, ${opacity})`, // Navajo white
        `rgba(250, 250, 210, ${opacity})`  // Light goldenrod yellow
      ];
      color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
    }
    
    // Create configuration
    const config: ParticleConfig = {
      position,
      speed,
      size,
      opacity,
      rotation,
      color,
      // Set random lifetime
      maxLifetime: 10 + Math.random() * 20,
    };
    
    return new HeartParticle(
      config,
      canvasWidth,
      canvasHeight,
      options.fadeThreshold || 0.9,
      options.fadeSpeed || 0.02
    );
  }
}
