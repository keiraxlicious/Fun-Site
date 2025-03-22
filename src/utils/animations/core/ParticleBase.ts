// src/utils/animations/core/ParticleBase.ts

import { 
    ParticleState, 
    ParticleOptions 
  } from "../../../types/particleTypes";
  import { 
    MAX_ANIMATION_ITERATIONS 
  } from "../../../configs/ParticleConfigs";
  import { AssetRenderer } from "../renderers/AssetRenderer";
  
  /**
   * Factory for creating and managing particles
   */
  export class ParticleFactory {
    /**
     * Create an array of particle states
     * @param options - Configuration options
     * @param canvasWidth - Width of canvas
     * @param canvasHeight - Height of canvas
     * @param assets - Optional loaded assets
     * @returns Array of particle states
     */
    public static createParticles(
      options: ParticleOptions,
      canvasWidth: number,
      canvasHeight: number,
      assets: HTMLImageElement[] = []
    ): ParticleState[] {
      const particles: ParticleState[] = [];
      const count = Math.min(options.count, MAX_ANIMATION_ITERATIONS);
      
      // Assert iteration count is valid
      this.assertIterationCount(count);
      
      for (let i = 0; i < count; i++) {
        // Create particle with random properties
        const particle = this.createRandomParticle(
          options, 
          canvasWidth, 
          canvasHeight
        );
        
        // Assign asset if available
        if (assets.length > 0) {
          AssetRenderer.assignRandomAsset(particle, assets);
        }
        
        // Validate particle state
        this.assertParticleValid(particle);
        
        // Add to array
        particles.push(particle);
      }
      
      return particles;
    }
    
    /**
     * Create a random particle
     * @param options - Configuration options
     * @param canvasWidth - Width of canvas
     * @param canvasHeight - Height of canvas
     * @returns Randomly generated particle
     */
    private static createRandomParticle(
      options: ParticleOptions,
      canvasWidth: number,
      canvasHeight: number
    ): ParticleState {
      // Random size within range
      const size = this.getRandomInRange(options.size.min, options.size.max);
      
      // Random position
      const x = Math.random() * canvasWidth;
      const y = Math.random() * canvasHeight;
      
      // Random speeds
      const speedX = this.getRandomInRange(
        -options.speed.max / 10, 
        options.speed.max / 10
      );
      const speedY = this.getRandomInRange(
        options.speed.min, 
        options.speed.max
      );
      
      // Random opacity
      const opacity = this.getRandomInRange(
        options.opacity.min, 
        options.opacity.max
      );
      
      // Random rotation
      const rotation = Math.random() * 360;
      
      // Random color if available
      let color = "#FFFFFF";
      if (options.colors && options.colors.length > 0) {
        const colorIndex = Math.floor(Math.random() * options.colors.length);
        color = options.colors[colorIndex];
      }
      
      return {
        x,
        y,
        width: size,
        height: size,
        speedX,
        speedY,
        opacity,
        rotation,
        color
      };
    }
    
    /**
     * Get a random number in a range
     * @param min - Minimum value
     * @param max - Maximum value
     * @returns Random number in range
     */
    private static getRandomInRange(min: number, max: number): number {
      return min + Math.random() * (max - min);
    }
    
    /**
     * Assert that iteration count is valid
     * @param count - Number of iterations
     */
    private static assertIterationCount(count: number): void {
      if (count > MAX_ANIMATION_ITERATIONS) {
        throw new Error("Iteration count exceeds maximum allowed");
      }
    }
    
    /**
     * Assert that particle is valid
     * @param particle - Particle to validate
     */
    private static assertParticleValid(particle: ParticleState): void {
      if (
        isNaN(particle.x) || 
        isNaN(particle.y) || 
        isNaN(particle.width) || 
        isNaN(particle.height) ||
        isNaN(particle.speedX) ||
        isNaN(particle.speedY)
      ) {
        throw new Error("Invalid particle state created");
      }
    }
  }
  