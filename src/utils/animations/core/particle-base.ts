// src/utils/animations/core/particle-base.ts
import { ParticleConfig, Vector2D } from './types';

export class ParticleBase {
  // Properties with explicit accessibility modifiers
  protected position: Vector2D;
  protected speed: Vector2D;
  protected size: number;
  protected opacity: number;
  protected rotation: number;
  protected color: string | undefined;
  protected maxLifetime: number;
  protected currentLifetime: number;
  protected readonly canvasWidth: number;
  protected readonly canvasHeight: number;
  protected fadeThreshold: number;
  protected fadeSpeed: number;

  /**
   * Creates a base particle with common properties
   * @param config - Configuration parameters for the particle
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param fadeThreshold - % of screen height where fade begins (0-1)
   * @param fadeSpeed - Speed of the fade effect (0-1)
   */
  constructor(
    config: ParticleConfig, 
    canvasWidth: number, 
    canvasHeight: number,
    fadeThreshold: number = 0.8,
    fadeSpeed: number = 0.02
  ) {
    // Validate parameters
    if (canvasWidth <= 0 || canvasHeight <= 0) {
      throw new Error('Canvas dimensions must be positive values');
    }
    
    if (fadeThreshold < 0 || fadeThreshold > 1) {
      throw new Error('Fade threshold must be between 0 and 1');
    }

    this.position = { ...config.position };
    this.speed = { ...config.speed };
    this.size = config.size;
    this.opacity = config.opacity;
    this.rotation = config.rotation || 0;
    this.color = config.color;
    this.maxLifetime = config.maxLifetime || Infinity;
    this.currentLifetime = config.currentLifetime || 0;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fadeThreshold = fadeThreshold;
    this.fadeSpeed = fadeSpeed;
  }

  /**
   * Updates the particle position and properties
   * @param deltaTime - Time elapsed since last update in milliseconds
   * @returns boolean indicating if the particle is still active
   */
  update(deltaTime: number): boolean {
    // Increment lifetime
    this.currentLifetime += deltaTime;
    if (this.currentLifetime >= this.maxLifetime) {
      return false;
    }

    // Update position based on speed
    this.position.x += this.speed.x * deltaTime;
    this.position.y += this.speed.y * deltaTime;

    // Check if particle is off-screen
    if (
      this.position.x < -this.size * 2 || 
      this.position.x > this.canvasWidth + this.size * 2 ||
      this.position.y > this.canvasHeight + this.size * 2
    ) {
      return false;
    }

    // Fade when near bottom of screen
    if (this.position.y / this.canvasHeight > this.fadeThreshold) {
      this.opacity = Math.max(0, this.opacity - this.fadeSpeed);
      if (this.opacity <= 0) {
        return false;
      }
    }

    return true;
  }

  /**
   * Gets the current particle state
   * @returns Copy of the current particle state
   */
  getState(): ParticleConfig {
    return {
      position: { ...this.position },
      speed: { ...this.speed },
      size: this.size,
      opacity: this.opacity,
      rotation: this.rotation,
      color: this.color,
      maxLifetime: this.maxLifetime,
      currentLifetime: this.currentLifetime
    };
  }

  /**
   * Resets the particle with new configuration
   * @param config - New configuration for the particle
   */
  reset(config: ParticleConfig): void {
    this.position = { ...config.position };
    this.speed = { ...config.speed };
    this.size = config.size;
    this.opacity = config.opacity;
    this.rotation = config.rotation || 0;
    this.color = config.color;
    this.maxLifetime = config.maxLifetime || Infinity;
    this.currentLifetime = config.currentLifetime || 0;
  }
}
