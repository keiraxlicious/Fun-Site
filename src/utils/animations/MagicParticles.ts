// src/utils/animations/core/ParticleEngine.ts

import { 
    ParticleType, 
    ParticleOptions, 
    ParticleState, 
    RenderMode 
  } from "../../types/particleTypes";
  import { 
    DEFAULT_PARTICLE_OPTIONS, 
    DEFAULT_FRAME_RATE,
    MAX_ANIMATION_ITERATIONS,
    ERROR_MESSAGES
  } from "../../configs/ParticleConfigs";
  
  /**
   * Core animation engine for particles
   */
  export class ParticleEngine {
    // DOM elements
    protected container: HTMLElement;
    protected canvas: HTMLCanvasElement | null = null;
    protected ctx: CanvasRenderingContext2D | null = null;
    
    // Animation state
    protected options: ParticleOptions;
    protected type: ParticleType;
    protected particles: ParticleState[] = [];
    protected assets: HTMLImageElement[] = [];
    protected frameInterval: number;
    protected animationFrameId: number | null = null;
    protected lastFrameTime: number = 0;
    protected iterationCount: number = 0;
    protected isDisposed: boolean = false;
  
    /**
     * Create a new particle engine
     * @param containerId - ID of the container element
     * @param type - Type of particles to generate
     * @param options - Optional configuration
     */
    constructor(
      containerId: string,
      type: ParticleType,
      options?: Partial<ParticleOptions>
    ) {
      // Find container element
      const container = document.getElementById(containerId);
      if (!container) {
        throw new Error(ERROR_MESSAGES.CONTAINER_NOT_FOUND);
      }
      this.container = container;
      
      // Store particle type
      this.type = type;
      
      // Merge default options with provided options
      this.options = {
        ...this.getDefaultOptions(type),
        ...options
      };
      
      // Validate particle count
      this.assertParticleCount(this.options.count);
      
      // Set frame interval based on target frame rate
      this.frameInterval = 1000 / DEFAULT_FRAME_RATE;
    }
    
    /**
     * Get default options for particle type
     * @param type - Particle type
     * @returns Default options
     */
    protected getDefaultOptions(type: ParticleType): ParticleOptions {
      return DEFAULT_PARTICLE_OPTIONS[type] || DEFAULT_PARTICLE_OPTIONS.default;
    }
    
    /**
     * Assert that particle count is valid
     * @param count - Number of particles
     */
    protected assertParticleCount(count: number): void {
      if (count > MAX_ANIMATION_ITERATIONS) {
        throw new Error(ERROR_MESSAGES.PARTICLE_COUNT_EXCEEDED);
      }
    }
    
    /**
     * Initialize canvas for rendering
     */
    protected initializeCanvas(): void {
      this.canvas = document.createElement("canvas");
      this.assertCanvasCreated(this.canvas);
      
      this.canvas.width = this.container.clientWidth;
      this.canvas.height = this.container.clientHeight;
      this.canvas.style.position = "absolute";
      this.canvas.style.top = "0";
      this.canvas.style.left = "0";
      this.canvas.style.pointerEvents = "none";
      this.canvas.id = "magic-canvas";
      
      this.ctx = this.canvas.getContext("2d");
      this.assertContextAcquired(this.ctx);
      
      this.container.appendChild(this.canvas);
    }
    
    /**
     * Assert that canvas was created successfully
     * @param canvas - Canvas to check
     */
    protected assertCanvasCreated(canvas: HTMLCanvasElement | null): void {
      if (!canvas) {
        throw new Error(ERROR_MESSAGES.CANVAS_CREATION_FAILED);
      }
    }
    
    /**
     * Assert that context was acquired successfully
     * @param ctx - Context to check
     */
    protected assertContextAcquired(ctx: CanvasRenderingContext2D | null): void {
      if (!ctx) {
        throw new Error(ERROR_MESSAGES.CONTEXT_ACQUISITION_FAILED);
      }
    }
    
    /**
     * Assert that animation loop hasn't exceeded maximum iterations
     */
    protected assertAnimationLoopCount(): void {
      if (this.iterationCount > MAX_ANIMATION_ITERATIONS) {
        this.dispose();
        throw new Error(ERROR_MESSAGES.ANIMATION_LOOP_EXCEEDED);
      }
    }
  }
  