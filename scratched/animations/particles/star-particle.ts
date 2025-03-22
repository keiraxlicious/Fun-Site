// src/utils/animations/particles/star-particle.ts
import { ParticleBase } from '../core/particle-base';
import { ParticleConfig, ParticleOptions } from '../core/types';

export class StarParticle extends ParticleBase {
  private twinkleSpeed: number;
  private twinkleDirection: number;
  private maxOpacity: number;
  private minOpacity: number;
  private baseSize: number;
  private sizeVariation: number;

  constructor(
    config: ParticleConfig, 
    canvasWidth: number, 
    canvasHeight: number, 
    fadeThreshold?: number, 
    fadeSpeed?: number
  ) {
    super(config, canvasWidth, canvasHeight, fadeThreshold, fadeSpeed);
    
    // Star-specific properties
    this.twinkleSpeed = 0.01 + Math.random() * 0.03;
    this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
    
    // Get opacity from configuration
    this.maxOpacity = config.opacity || 1.0;
    this.minOpacity = this.maxOpacity * 0.3; // 30% of max opacity as minimum
    
    // Store original size for variation
    this.baseSize = config.size;
    this.sizeVariation = this.baseSize * 0.2;
  }

  update(deltaTime: number): boolean {
    // Update twinkling effect
    this.twinkle(deltaTime);
    
    // Call parent update to handle standard behavior
    return super.update(deltaTime);
  }

  private twinkle(deltaTime: number): void {
    // Update opacity for twinkle effect
    // Assuming we can access properties directly as they might be protected in ParticleBase
    if (typeof this.opacity !== 'undefined') {
      let newOpacity = this.opacity + this.twinkleSpeed * this.twinkleDirection * deltaTime;
      
      // Reverse direction at opacity limits
      if (newOpacity >= this.maxOpacity) {
        newOpacity = this.maxOpacity;
        this.twinkleDirection = -1;
      } else if (newOpacity <= this.minOpacity) {
        newOpacity = this.minOpacity;
        this.twinkleDirection = 1;
      }
      
      // Update the particle's opacity
      this.opacity = newOpacity;
      
      // Slight size variation based on opacity
      if (typeof this.size !== 'undefined') {
        const sizeVariation = (newOpacity - this.minOpacity) / (this.maxOpacity - this.minOpacity);
        this.size = this.baseSize + this.sizeVariation * sizeVariation;
      }
    }
  }

  // Factory method for creating star particles
  static create(
    canvasWidth: number,
    canvasHeight: number,
    options: ParticleOptions
  ): ParticleBase {
    // Convert options to config
    const config: ParticleConfig = {
      position: {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight
      },
      speed: {
        x: 0, // Stars don't move horizontally
        y: 0  // Stars don't move vertically
      },
      size: options.size ? 
        options.size.min + Math.random() * (options.size.max - options.size.min) : 
        3,
      opacity: options.opacity ? 
        options.opacity.min + Math.random() * (options.opacity.max - options.opacity.min) : 
        1.0,
      color: options.colors ? 
        options.colors[Math.floor(Math.random() * options.colors.length)] : 
        '#FFFFFF'
    };
    
    // Create the star particle
    return new StarParticle(
      config, 
      canvasWidth, 
      canvasHeight, 
      options.fadeThreshold, 
      options.fadeSpeed
    );
  }
}
