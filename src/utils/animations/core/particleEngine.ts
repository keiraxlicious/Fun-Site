// src/utils/animations/core/particleEngine.ts

import { 
    ParticleConfig, 
    AnimationRenderMode, 
    ParticleType, 
    ParticleOptions,
    ParticleStats
} from '../../../types/animations';
  import { ParticleFactory } from './particleFactory';
  import { ParticleRenderer } from './particleRenderer';
  import { loadSvgAssets, loadImageAssets } from '../assetLoader';
  
  /**
   * Default frame rate limit
   */
  const DEFAULT_FPS_LIMIT = 60;
  
  /**
   * Maximum number of particles to process per frame
   */
  const MAX_PARTICLES_PER_FRAME = 1000;
  
  /**
   * Particle engine class for managing particle animations
   */
  export class ParticleEngine {
    private container: HTMLElement;
    private particleType: ParticleType;
    private options: ParticleOptions;
    private factory: ParticleFactory;
    private renderer: ParticleRenderer;
    private particles: ParticleConfig[] = [];
    private running: boolean = false;
    private animationFrameId: number | null = null;
    private lastFrameTime: number = 0;
    private assets: (SVGElement | HTMLImageElement)[] = [];
    private fpsLimit: number;
    private frameInterval: number;
    private stats: ParticleStats = {
      particleCount: 0,
      frameTime: 0,
      fps: 0,
      memoryUsage: 0
    };
  
    /**
     * Creates a new ParticleEngine instance
     * 
     * @param containerId - ID of the container element
     * @param particleType - Type of particles to animate
     * @param options - Configuration options for particles
     */
    constructor(
      containerId: string,
      particleType: ParticleType,
      options: ParticleOptions
    ) {
      // Get container element
      const container = document.getElementById(containerId);
      if (!container) {
        throw new Error(`Container element with ID "${containerId}" not found`);
      }
      this.container = container;
      
      // Validate particle type
      if (!Object.values(ParticleType).includes(particleType)) {
        throw new Error(`Invalid particle type: ${particleType}`);
      }
      this.particleType = particleType;
      
      // Apply default options
      this.options = this.applyDefaultOptions(options);
      
      // Set FPS limit
      this.fpsLimit = DEFAULT_FPS_LIMIT;
      this.frameInterval = 1000 / this.fpsLimit;
      
      // Create renderer
      this.renderer = new ParticleRenderer(
        { container: this.container },
        this.particleType
      );
      
      // Create factory
      const width = this.container.clientWidth || window.innerWidth;
      const height = this.container.clientHeight || window.innerHeight;
      this.factory = new ParticleFactory(
        this.particleType,
        this.options,
        width,
        height
      );
    }
  
    /**
     * Applies default options to user-provided options
     * 
     * @param options - User-provided options
     * @returns Options with defaults applied
     */
    private applyDefaultOptions(options: ParticleOptions): ParticleOptions {
      return {
        renderMode: AnimationRenderMode.CANVAS,
        // count: options.count || 50,
        // speed: options.speed || { min: 1, max: 3 },
        // size: options.size || { min: 5, max: 20 },
        // opacity: options.opacity || { min: 0.6, max: 1 },
        wind: options.wind || 0,
        gravity: options.gravity || 0,
        fadeThreshold: options.fadeThreshold || 0.8,
        fadeSpeed: options.fadeSpeed || 0.02,
        ...options
      };
    }
  
    /**
     * Initializes the particle engine
     * 
     * @returns Promise that resolves when initialization is complete
     */
    public async initialize(): Promise<void> {
      try {
        // Load assets if paths are provided
        if (this.options.assetPaths && this.options.assetPaths.length > 0) {
          await this.loadAssets();
        }
        
        // Initialize renderer with chosen render mode
        const renderMode = this.options.renderMode || AnimationRenderMode.CANVAS;
        const success = this.renderer.initialize(renderMode);
        
        if (!success) {
          throw new Error(`Failed to initialize renderer with mode ${renderMode}`);
        }
        
        // Create initial particles
        this.createParticles();
        
        // Add resize event handler
        window.addEventListener('resize', this.handleResize.bind(this));
        
        console.log(`Particle engine initialized with ${this.particles.length} ${this.particleType} particles`);
      } catch (error) {
        console.error('Failed to initialize particle engine:', error);
        throw error;
      }
    }
  
    /**
     * Loads assets based on render mode
     * 
     * @returns Promise that resolves when assets are loaded
     */
    private async loadAssets(): Promise<void> {
      if (!this.options.assetPaths || this.options.assetPaths.length === 0) {
        return;
      }
      
      try {
        const renderMode = this.options.renderMode || AnimationRenderMode.CANVAS;
        
        if (renderMode === AnimationRenderMode.SVG) {
          // Load SVG assets
          this.assets = await loadSvgAssets(this.options.assetPaths);
        } else if (renderMode === AnimationRenderMode.IMAGE) {
          // Load image assets
          this.assets = await loadImageAssets(this.options.assetPaths);
        }
        
        console.log(`Loaded ${this.assets.length} assets for ${this.particleType} particles`);
      } catch (error) {
        console.error('Failed to load assets:', error);
        // Continue with empty assets array
        this.assets = [];
      }
    }
  
    /**
     * Creates initial particles
     */
    private createParticles(): void {
      const count = Math.min(this.options.count, MAX_PARTICLES_PER_FRAME);
      this.particles = this.factory.createParticles(count);
      this.stats.particleCount = this.particles.length;
    }
  
    /**
     * Starts the animation loop
     * 
     * @returns This instance for chaining
     */
    public start(): ParticleEngine {
      if (this.running) {
        return this;
      }
      
      this.running = true;
      this.lastFrameTime = performance.now();
      this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
      
      return this;
    }
  
    /**
     * Animation loop callback
     * 
     * @param timestamp - Current time in milliseconds
     */
    private animate(timestamp: number): void {
      // Throttle frame rate 
      const elapsed = timestamp - this.lastFrameTime;
      
      if (elapsed < this.frameInterval) {
        // Schedule next frame without updating
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
        return;
      }
      
      // Calculate FPS
      this.stats.fps = 1000 / elapsed;
      this.lastFrameTime = timestamp;
      
      const startTime = performance.now();
      
      // Update particles
      this.updateParticles();
      
      // Render particles
      this.renderer.render(this.particles);
      
      // Update statistics
      this.stats.frameTime = performance.now() - startTime;
      this.stats.particleCount = this.particles.length;
      this.updateMemoryStats();
      
      // Schedule next frame if still running
      if (this.running) {
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
      }
    }
  
    /**
     * Updates all particles for the current frame
     */
    private updateParticles(): void {
      const width = this.container.clientWidth || window.innerWidth;
      const height = this.container.clientHeight || window.innerHeight;
      
      // Process particles up to the limit
      const particlesToProcess = Math.min(this.particles.length, MAX_PARTICLES_PER_FRAME);
      
      for (let i = 0; i < particlesToProcess; i++) {
        const particle = this.particles[i];
        
        if (!this.updateParticle(particle, width, height)) {
          // If particle needs to be reset, replace it with a new one
          this.particles[i] = this.factory.createParticle();
          // Position new particle at the top
          this.particles[i].position.y = 0;
          // Randomize x position
          this.particles[i].position.x = Math.random() * width;
        }
      }
    }
  
    /**
     * Updates a single particle
     * 
     * @param particle - Particle to update
     * @param width - Container width
     * @param height - Container height
     * @returns False if particle needs to be reset, true otherwise
     */
    private updateParticle(
      particle: ParticleConfig, 
      width: number, 
      height: number
    ): boolean {
      // Update position
      particle.position.x += particle.speed.x;
      particle.position.y += particle.speed.y;
      
      // Apply wind and gravity if configured
      if (this.options.wind) {
        particle.position.x += this.options.wind * 0.01;
      }
      
      if (this.options.gravity) {
        particle.speed.y += this.options.gravity * 0.01;
      }
      
      // Update rotation if applicable
      if (particle.rotation !== undefined && this.options.rotation) {
        particle.rotation += this.options.rotation.speed;
        
        // Keep rotation in 0-360 range
        if (particle.rotation >= 360) {
          particle.rotation -= 360;
        } else if (particle.rotation < 0) {
          particle.rotation += 360;
        }
      }
      
      // Update lifetime if applicable
      if (particle.maxLifetime !== undefined) {
        particle.currentLifetime = (particle.currentLifetime || 0) + 1;
        
        // If lifetime expired, reset particle
        if (particle.currentLifetime >= particle.maxLifetime) {
          return false;
        }
      }
      
      // Handle special effects based on particle type
      switch (this.particleType) {
        case ParticleType.STAR:
          // Twinkle effect
          if (this.options.twinkle) {
            const twinkleFactor = 0.05; // Speed of opacity change
            const twinkleMin = this.options.twinkle.min;
            const twinkleMax = this.options.twinkle.max;
            
            // Generate a sine wave to vary opacity
            const time = Date.now() * 0.001; // Convert to seconds
            const uniqueOffset = particle.id * 0.1; // Unique offset per particle
            particle.opacity = twinkleMin + (Math.sin(time + uniqueOffset) + 1) * 0.5 * (twinkleMax - twinkleMin);
          }
          break;
          
        case ParticleType.HEART:
          // Pulse effect
          if (this.options.pulse) {
            const pulseFactor = 0.02; // Speed of size change
            const pulseMin = this.options.pulse.min;
            const pulseMax = this.options.pulse.max;
            
            // Generate a sine wave to vary size
            const time = Date.now() * 0.001; // Convert to seconds
            const uniqueOffset = particle.id * 0.1; // Unique offset per particle
            const pulseMagnitude = pulseMin + (Math.sin(time + uniqueOffset) + 1) * 0.5 * (pulseMax - pulseMin);
            
            // Apply pulse to size
            const baseSize = particle.size / pulseMagnitude;
            particle.size = baseSize * pulseMagnitude;
          }
          break;
      }
      
      // Handle fading when particles approach the bottom of the screen
      if (this.options.fadeThreshold) {
        const fadeStart = height * this.options.fadeThreshold;
        
        if (particle.position.y > fadeStart) {
          // Calculate how far into the fade zone we are (0 to 1)
          const fadeProgress = (particle.position.y - fadeStart) / (height - fadeStart);
          
          // Reduce opacity based on fade progress
          particle.opacity -= this.options.fadeSpeed || 0.02;
          
          // If completely transparent, reset the particle
          if (particle.opacity <= 0) {
            return false;
          }
        }
      }
      
      // Check if particle is out of bounds
      const isOutOfBounds =
        particle.position.x < -particle.size * 2 ||
        particle.position.x > width + particle.size * 2 ||
        particle.position.y > height + particle.size * 2;
      
      return !isOutOfBounds;
    }
  
    /**
     * Updates memory usage statistics
     */
    private updateMemoryStats(): void {
      // Rough estimate of memory usage
      // Each particle is approximately 100 bytes
      const particleMemory = this.particles.length * 100;
      
      // Asset memory (rough estimate)
      const assetMemory = this.assets.length * 5000;
      
      // Total memory in KB
      this.stats.memoryUsage = (particleMemory + assetMemory) / 1024;
    }
  
    /**
     * Handles window resize events
     */
    private handleResize(): void {
      // Debounce resize handler
      if ((window as any).particleResizeTimeout) {
        window.clearTimeout((window as any).particleResizeTimeout);
      }
      
      (window as any).particleResizeTimeout = window.setTimeout(() => {
        const width = this.container.clientWidth || window.innerWidth;
        const height = this.container.clientHeight || window.innerHeight;
        
        // Update renderer dimensions
        this.renderer.resize();
        
        // Update factory dimensions
        this.factory.updateDimensions(width, height);
        
        console.log(`Resized particle engine to ${width}x${height}`);
      }, 200);
    }
  
    /**
     * Stops the animation loop
     * 
     * @returns This instance for chaining
     */
    public stop(): ParticleEngine {
      this.running = false;
      
      if (this.animationFrameId !== null) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      
      return this;
    }
  
    /**
     * Sets the FPS limit for the animation
     * 
     * @param fps - Frames per second limit
     * @returns This instance for chaining
     */
    public setFpsLimit(fps: number): ParticleEngine {
      if (fps <= 0) {
        console.error('FPS limit must be positive');
        return this;
      }
      
      this.fpsLimit = Math.min(Math.max(fps, 1), 120);
      this.frameInterval = 1000 / this.fpsLimit;
      
      return this;
    }
  
    /**
     * Gets current statistics
     * 
     * @returns Current particle statistics
     */
    public getStats(): ParticleStats {
      return { ...this.stats };
    }
  
    /**
     * Cleans up all resources used by the engine
     */
    public dispose(): void {
      // Stop animation
      this.stop();
      
      // Remove event listeners
      window.removeEventListener('resize', this.handleResize.bind(this));
      
      // Clean up renderer
      this.renderer.cleanup();
      
      // Clear arrays
      this.particles = [];
      this.assets = [];
      
      console.log('Particle engine disposed');
    }
  }
  