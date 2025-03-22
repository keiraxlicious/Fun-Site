// src/utils/animations/effects/FallingEffect.ts

import { 
    ParticleState, 
    ParticleOptions 
  } from "../../../types/particleTypes";
  import { MAX_ANIMATION_ITERATIONS } from "../../../configs/ParticleConfigs";
  
  /**
   * Handles behavior for falling particles
   */
  export class FallingEffect {
    /**
     * Update falling particles
     * @param particles - Array of particles
     * @param options - Particle options
     * @param canvasWidth - Canvas width
     * @param canvasHeight - Canvas height
     * @param deltaTime - Time since last update
     */
    public static updateParticles(
      particles: ParticleState[],
      options: ParticleOptions,
      canvasWidth: number,
      canvasHeight: number,
      deltaTime: number
    ): void {
      // Assert we have a valid particle count
      this.assertParticleCount(particles.length);
      
      // Time scaling factor for consistent animation speed
      const timeScale = deltaTime / (1000 / 60);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Apply wind effect if specified
        if (options.wind) {
          p.speedX = Math.sin(Date.now() * 0.001 + i) * options.wind * timeScale;
        }
        
        // Apply rotation if specified
        if (options.rotation) {
          p.rotation += options.rotation.speed * timeScale;
          // Normalize rotation
          if (p.rotation >= 360) p.rotation -= 360;
        }
        
        // Apply pulse effect if specified
        if (options.pulse) {
          const pulseScale = options.pulse.min + 
            Math.sin(Date.now() * 0.003 + i) * 
            (options.pulse.max - options.pulse.min) * 0.5;
          
          const baseSize = (p.width + p.height) / 2 / pulseScale;
          p.width = baseSize * pulseScale;
          p.height = baseSize * pulseScale;
        }
        
        // Apply twinkle effect if specified
        if (options.twinkle) {
          p.opacity = options.opacity.min + 
            (Math.sin(Date.now() * 0.005 + i * 0.2) + 1) * 0.5 * 
            (options.opacity.max - options.opacity.min);
        }
        
        // Move the particle
        p.x += p.speedX * timeScale;
        p.y += p.speedY * timeScale;
        
        // Reset if off-screen
        if (p.y > canvasHeight) {
          p.y = -p.height;
          p.x = Math.random() * canvasWidth;
          p.opacity = this.getRandomInRange(
            options.opacity.min, 
            options.opacity.max
          );
        }
        
        // Handle horizontal wrapping
        if (p.x < -p.width) {
          p.x = canvasWidth;
        } else if (p.x > canvasWidth) {
          p.x = -p.width;
        }
        
        // Fade out near bottom
        const fadeThresholdY = canvasHeight * options.fadeThreshold;
        if (p.y > fadeThresholdY) {
          const fadeRatio = (p.y - fadeThresholdY) / 
                            (canvasHeight - fadeThresholdY);
          p.opacity -= options.fadeSpeed * fadeRatio * timeScale;
          
          // Ensure opacity doesn't go negative
          if (p.opacity < 0) p.opacity = 0;
        }
        
        // Validate particle bounds
        this.assertParticleInBounds(p, canvasWidth * 2, canvasHeight * 2);
      }
    }
    
    /**
     * Get a random number in a range
     * @param min - Minimum value
     * @param max - Maximum value
     * @returns Random number
     */
    private static getRandomInRange(min: number, max: number): number {
      return min + Math.random() * (max - min);
    }
    
    /**
     * Assert that particle count is valid
     * @param count - Number of particles
     */
    private static assertParticleCount(count: number): void {
      if (count > MAX_ANIMATION_ITERATIONS) {
        throw new Error("Particle count exceeds maximum allowed");
      }
    }
    
    /**
     * Assert that particle is in reasonable bounds
     * @param particle - Particle to check
     * @param maxWidth - Maximum allowed width
     * @param maxHeight - Maximum allowed height
     */
    private static assertParticleInBounds(
      particle: ParticleState,
      maxWidth: number,
      maxHeight: number
    ): void {
      if (
        Math.abs(particle.x) > maxWidth || 
        Math.abs(particle.y) > maxHeight
      ) {
        // Recovery action: reset particle position
        particle.x = Math.random() * maxWidth / 2;
        particle.y = -particle.height;
        console.warn("Particle position out of reasonable bounds - reset");
      }
    }
  }
  