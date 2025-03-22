// src/utils/animations/effects/FloatingEffect.ts

import { 
  ParticleState, 
  ParticleOptions 
} from "../../../types/particleTypes";
import { MAX_ANIMATION_ITERATIONS } from "../../../configs/ParticleConfigs";

/**
 * Handles behavior for floating particles
 */
export class FloatingEffect {
  /**
   * Update floating particles
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
      
      // Use sine waves for natural-looking movement
      const time = Date.now() * 0.001;
      const particleOffset = i * 0.7; // Offset to prevent synchronization
      
      // Generate x-movement based on sine wave
      p.speedX = Math.sin(time + particleOffset) * 
                (options.speed.max / 4) * timeScale;
      
      // For true floating, y-speed is slower and more gentle
      const floatStrength = options.speed.min / 2;
      p.speedY = Math.cos(time * 0.8 + particleOffset) * 
               floatStrength * timeScale;
      
      // Apply rotation if specified
      if (options.rotation) {
        p.rotation += options.rotation.speed * 0.2 * timeScale;
        // Normalize rotation
        if (p.rotation >= 360) p.rotation -= 360;
      }
      
      // Apply pulse effect if specified
      if (options.pulse) {
        const pulseScale = options.pulse.min + 
          Math.sin(time * 0.5 + particleOffset) * 
          (options.pulse.max - options.pulse.min) * 0.5;
        
        const baseSize = (p.width + p.height) / 2 / pulseScale;
        p.width = baseSize * pulseScale;
        p.height = baseSize * pulseScale;
      }
      
      // Apply twinkle effect if specified (common for fireflies)
      if (options.twinkle) {
        p.opacity = options.opacity.min + 
          (Math.sin(time * 0.5 + particleOffset * 3) + 1) * 0.5 * 
          (options.opacity.max - options.opacity.min);
      }
      
      // Move the particle
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Handle boundaries with soft clamping
      // Instead of wrapping, we gently push particles back into view
      if (p.x < -p.width) {
        p.speedX = Math.abs(p.speedX); // Push right
      } else if (p.x > canvasWidth) {
        p.speedX = -Math.abs(p.speedX); // Push left
      }
      
      if (p.y < -p.height) {
        p.speedY = Math.abs(p.speedY); // Push down
      } else if (p.y > canvasHeight) {
        p.speedY = -Math.abs(p.speedY); // Push up
      }
      
      // Validate particle bounds
      this.assertParticleInBounds(p, canvasWidth * 2, canvasHeight * 2);
    }
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
      particle.y = Math.random() * maxHeight / 2;
      console.warn("Particle position out of reasonable bounds - reset");
    }
  }
}
