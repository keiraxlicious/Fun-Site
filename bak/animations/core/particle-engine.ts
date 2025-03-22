// src/utils/animations/core/particle-engine.ts
import { ParticleBase } from './particle-base';
import { Drawer } from './drawer-interface';
import { ParticleOptions, ParticleType } from './types';

export class ParticleEngine<T extends ParticleBase> {
  private particles: T[] = [];
  private animationFrameId: number | null = null;
  private lastFrameTime: number = 0;
  private readonly maxParticles: number;
  private readonly containerId: string;
  private containerWidth: number = 0;
  private containerHeight: number = 0;
  private readonly fixedTimeStep: number = 1000 / 60; // Target 60 FPS
  private accumulatedTime: number = 0;
  private timeThreshold: number = 100; // Prevent massive time jumps
  private initialized: boolean = false;
  private readonly options: ParticleOptions;
  
  /**
   * Creates a particle animation engine
   * @param containerId - ID of the container element
   * @param particleFactory - Factory function to create particles
   * @param drawer - Drawer for rendering particles
   * @param options - Animation options
   */
  constructor(
    containerId: string,
    private readonly particleFactory: (containerWidth: number, containerHeight: number, options: ParticleOptions) => T,
    private readonly drawer: Drawer<T>,
    options: ParticleOptions
  ) {
    this.containerId = containerId;
    this.maxParticles = options.count;
    this.options = options;
    
    // Check that container exists
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with ID '${containerId}' not found`);
    }
    
    // Get container dimensions
    const rect = container.getBoundingClientRect();
    this.containerWidth = rect.width;
    this.containerHeight = rect.height;
    
    // Add resize listener with debounce
    let resizeTimeout: number | null = null;
    window.addEventListener('resize', () => {
      if (resizeTimeout !== null) {
        window.clearTimeout(resizeTimeout);
      }
      resizeTimeout = window.setTimeout(() => {
        this.handleResize();
      }, 200);
    });
  }
  
  /**
   * Initialize the particle engine
   * @returns Promise that resolves when initialization is complete
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }
    
    try {
      // Initialize drawer
      await this.drawer.initialize();
      
      // Create initial particles
      this.createInitialParticles();
      
      this.initialized = true;
    } catch (error) {
      console.error('Particle engine initialization error:', error);
      throw error;
    }
  }
  
  /**
   * Create the initial set of particles
   */
  private createInitialParticles(): void {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(
        this.particleFactory(this.containerWidth, this.containerHeight, this.options)
      );
    }
  }
  
  /**
   * Handle window resize by updating container dimensions
   */
  private handleResize(): void {
    const container = document.getElementById(this.containerId);
    if (container) {
      const rect = container.getBoundingClientRect();
      this.containerWidth = rect.width;
      this.containerHeight = rect.height;
    }
  }
  
  /**
   * Start the animation loop
   */
  start(): void {
    if (!this.initialized) {
      throw new Error('Engine must be initialized before starting');
    }
    
    if (this.animationFrameId !== null) {
      return; // Already running
    }
    
    this.lastFrameTime = performance.now();
    this.animationFrameId = requestAnimationFrame(this.animationLoop.bind(this));
  }
  
  /**
   * Stop the animation loop
   */
  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
  
  /**
   * Animation loop using fixed timestep for stable simulation
   * @param currentTime - Current time from requestAnimationFrame
   */
  private animationLoop(currentTime: number): void {
    if (this.animationFrameId === null) {
      return; // Animation was stopped
    }
    
    // Calculate delta time with upper limit to prevent large jumps
    let deltaTime = currentTime - this.lastFrameTime;
    if (deltaTime > this.timeThreshold) {
      deltaTime = this.timeThreshold;
    }
    
    this.lastFrameTime = currentTime;
    this.accumulatedTime += deltaTime;
    
    // Fixed time step loop
    while (this.accumulatedTime >= this.fixedTimeStep) {
      this.updateParticles(this.fixedTimeStep);
      this.accumulatedTime -= this.fixedTimeStep;
    }
    
    // Render current state
    this.renderParticles();
    
    // Continue animation loop
    this.animationFrameId = requestAnimationFrame(this.animationLoop.bind(this));
  }
  
  /**
   * Update all particles
   * @param deltaTime - Time elapsed since last update in milliseconds
   */
  private updateParticles(deltaTime: number): void {
    // Scale deltaTime to seconds for more intuitive physics
    const dt = deltaTime / 1000;
    
    // Update each particle
    for (let i = 0; i < this.particles.length; i++) {
      const isActive = this.particles[i].update(dt);
      
      // Replace inactive particles with new ones
      if (!isActive) {
        this.particles[i] = this.particleFactory(
          this.containerWidth,
          this.containerHeight,
          this.options
        );
      }
    }
  }
  
  /**
   * Render all particles
   */
  private renderParticles(): void {
    this.drawer.clear();
    
    for (let i = 0; i < this.particles.length; i++) {
      this.drawer.drawParticle(this.particles[i], i);
    }
  }
  
  /**
   * Update particle options
   * @param options - New options to apply
   */
  updateOptions(options: Partial<ParticleOptions>): void {
    // Update options object with new values
    Object.assign(this.options, options);
    
    // Update existing particles if count changes
    if (options.count !== undefined && options.count !== this.maxParticles) {
      const newCount = options.count;
      
      if (newCount > this.particles.length) {
        // Add more particles
        for (let i = this.particles.length; i < newCount; i++) {
          this.particles.push(
            this.particleFactory(this.containerWidth, this.containerHeight, this.options)
          );
        }
      } else if (newCount < this.particles.length) {
        // Remove excess particles
        this.particles = this.particles.slice(0, newCount);
      }
    }
  }
  
  /**
   * Clean up resources
   */
  dispose(): void {
    this.stop();
    this.drawer.dispose();
    this.particles = [];
  }
}
