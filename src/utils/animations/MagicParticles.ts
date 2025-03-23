// src/utils/animations/MagicParticles.ts

import { 
  ParticleType, 
  ParticleOptions, 
  RenderMode 
} from "../../types/particleTypes";
import { ParticleEngine } from "./core/ParticleEngine";
import { ParticleFactory } from "./core/ParticleBase";
import { FallingEffect } from "./effects/FallingEffect";
import { FloatingEffect } from "./effects/FloatingEffect";
import { AssetLoader } from "./assets/AssetLoader";
import { CanvasRenderer } from "./renderers/CanvasRenderer";
import { AssetRenderer } from "./renderers/AssetRenderer";
import { MAX_ANIMATION_ITERATIONS } from "../../configs/ParticleConfigs";

// Track active engine instances
const activeEngines: Record<string, MagicParticleEngine> = {};

/**
 * Initialize a particle animation
 * @param containerId - ID of container element
 * @param type - Type of particles to generate
 * @param options - Particle configuration
 * @returns Promise resolving when initialized
 */
export async function initializeParticles(
  containerId: string,
  type: ParticleType,
  options?: Partial<ParticleOptions>
): Promise<void> {
  try {
    // Clean up existing engine if any
    const engineKey = `particleEngine_${containerId}_${type}`;
    if (activeEngines[engineKey]) {
      activeEngines[engineKey].dispose();
      delete activeEngines[engineKey];
    }
    
    // Create new engine
    const engine = new MagicParticleEngine(containerId, type, options);
    
    // Initialize and start
    await engine.initialize();
    engine.start();
    
    // Store reference
    activeEngines[engineKey] = engine;
    
    // Add to global scope for debugging
    (window as any)[engineKey] = engine;
  } catch (error) {
    console.error("Failed to initialize particles:", error);
    throw error;
  }
}

/**
 * Main particle engine implementation
 */
class MagicParticleEngine extends ParticleEngine {
  private isRunning: boolean = false;
  
  /**
   * Initialize the particle engine
   */
  public async initialize(): Promise<void> {
    // Initialize canvas
    this.initializeCanvas();
    
    // Load assets if needed
    await this.loadAssets();
    
    // Create particles
    this.createParticles();
  }
  
  /**
   * Load assets for particles
   */
  private async loadAssets(): Promise<void> {
    if (this.options.assetPaths && this.options.assetPaths.length > 0) {
      this.assets = await AssetLoader.loadAssets(this.options.assetPaths);
    }
  }
  
  /**
   * Create particle objects
   */
  private createParticles(): void {
    if (!this.canvas) {
      throw new Error("Canvas not initialized");
    }
    
    this.particles = ParticleFactory.createParticles(
      this.options,
      this.canvas.width,
      this.canvas.height,
      this.assets
    );
  }
  
  /**
   * Start the animation loop
   */
  public start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.animationLoop();
  }
  
  /**
   * Stop the animation loop
   */
  public stop(): void {
    this.isRunning = false;
    
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
  
  /**
   * Main animation loop
   */
  private animationLoop = (): void => {
    // Safety check against infinite loops
    this.iterationCount++;
    this.assertAnimationLoopCount();
    
    // Calculate delta time
    const now = performance.now();
    const deltaTime = now - this.lastFrameTime;
    this.lastFrameTime = now;
    
    // Clear canvas
    if (this.canvas && this.ctx) {
      CanvasRenderer.clearCanvas(this.ctx, this.canvas.width, this.canvas.height);
      
      // Update particles
      this.updateParticles(deltaTime);
      
      // Render particles
      this.renderParticles();
    }
    
    // Continue loop if running
    if (this.isRunning) {
      this.animationFrameId = requestAnimationFrame(this.animationLoop);
    }
  };
  
  /**
   * Update particle positions and states
   * @param deltaTime - Time since last update
   */
  private updateParticles(deltaTime: number): void {
    if (!this.canvas) return;
    
    // Categorize particle types
    const fallingTypes = [
      ParticleType.SNOW,
      ParticleType.RAIN,
      ParticleType.LEAF,
      ParticleType.SAKURA,
      ParticleType.MONEY,
      ParticleType.STAR,
      ParticleType.CONFETTI,
      ParticleType.HEART_FALLING
    ];
    
    const floatingTypes = [
      ParticleType.BUBBLE,
      ParticleType.FIREFLY,
      ParticleType.CLOUD,
      ParticleType.BALLOON,
      ParticleType.PARTICLE,
      ParticleType.BUTTERFLY,
      ParticleType.HEART_FLOATING
    ];
    
    const rotating = [
      ParticleType.GEARS,
      ParticleType.CLOCK_HANDS,
      ParticleType.ROTATING_STARS,
      ParticleType.MOONS
    ]
    const orbiting = [
      ParticleType.PLANETS,
      ParticleType.ATOMS
    ]
    const interactive = [
      ParticleType.INTERACTIVE_PARTICLES,
      ParticleType.SOUND_RESPONSIVE,
      ParticleType.COLOR_CHANGING
    ]
    const seasonal = [
      ParticleType.HALLOWEEN,
      ParticleType.CHRISTMAS,
      ParticleType.VALENTINES_DAY
    ]
    const nature = [
      ParticleType.WATER_RIPPLE,
      ParticleType.POLLEN,
      ParticleType.FEATHERS
    ]
    const abstract = [
      ParticleType.GEOMETRIC_SHAPES,
      ParticleType.LIQUID_SIMULATION,
      ParticleType.LIGHT_TRAILS
    ]
    
    // Update with appropriate effect
    if (fallingTypes.includes(this.type)) {
      FallingEffect.updateParticles(
        this.particles,
        this.options,
        this.canvas.width,
        this.canvas.height,
        deltaTime
      );
    } else if (floatingTypes.includes(this.type)) {
      FloatingEffect.updateParticles(
        this.particles,
        this.options,
        this.canvas.width,
        this.canvas.height,
        deltaTime
      );
    } else {
      // Default to falling behavior
      FallingEffect.updateParticles(
        this.particles,
        this.options,
        this.canvas.width,
        this.canvas.height,
        deltaTime
      );
    }
  }
  
  /**
   * Render all particles
   */
  private renderParticles(): void {
    if (!this.ctx) return;
    
    // Get render mode
    const renderMode = this.options.renderMode || RenderMode.CANVAS;
    
    // Render each particle
    for (const particle of this.particles) {
      this.ctx.save();
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.translate(particle.x, particle.y);
      this.ctx.rotate(particle.rotation * Math.PI / 180);
      
      // Choose rendering method based on mode
      switch (renderMode) {
        case RenderMode.CANVAS:
          CanvasRenderer.renderParticle(this.ctx, particle, this.type);
          break;
        case RenderMode.SVG:
          AssetRenderer.renderSvgParticle(this.ctx, particle);
          break;
        case RenderMode.IMAGE:
          AssetRenderer.renderImageParticle(this.ctx, particle);
          break;
        default:
          CanvasRenderer.renderParticle(this.ctx, particle, this.type);
      }
      
      this.ctx.restore();
    }
  }
  
  /**
   * Clean up resources
   */
  public dispose(): void {
    // Stop animation
    this.stop();
    
    // Remove canvas
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    
    // Clear arrays
    this.particles = [];
    this.assets = [];
    
    // Set disposed flag
    this.isDisposed = true;
  }
}

// Export types
export { ParticleType, ParticleOptions, RenderMode };
