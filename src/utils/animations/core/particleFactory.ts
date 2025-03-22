// src/utils/animations/core/particleFactory.ts

import { 
    ParticleConfig, 
    ParticleType, 
    Vector2D, 
    ParticleOptions 
} from '../../../types/animations';
  
  /**
   * Factory class for creating various particle types
   */
  export class ParticleFactory {
    private particleType: ParticleType;
    private options: ParticleOptions;
    private canvasWidth: number;
    private canvasHeight: number;
    private nextId: number = 0;
  
    /**
     * Creates a new ParticleFactory instance
     * 
     * @param particleType - Type of particles to create
     * @param options - Configuration options for particles
     * @param canvasWidth - Width of the canvas
     * @param canvasHeight - Height of the canvas
     */
    constructor(
      particleType: ParticleType,
      options: ParticleOptions,
      canvasWidth: number,
      canvasHeight: number
    ) {
      // Validate inputs
      if (!Object.values(ParticleType).includes(particleType)) {
        throw new Error(`Invalid particle type: ${particleType}`);
      }
      
      if (!options) {
        throw new Error('Particle options are required');
      }
      
      if (canvasWidth <= 0 || canvasHeight <= 0) {
        throw new Error('Canvas dimensions must be positive');
      }
      
      this.particleType = particleType;
      this.options = options;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
    }
  
    /**
     * Creates a set of random particles
     * 
     * @param count - Number of particles to create
     * @returns Array of particle configurations
     */
    public createParticles(count: number): ParticleConfig[] {
      // Validate count
      const safeCount = Math.min(Math.max(count, 0), 1000);
      if (safeCount !== count) {
        console.warn(`Adjusted particle count from ${count} to ${safeCount}`);
      }
      
      const particles: ParticleConfig[] = [];
      
      // Create specified number of particles
      for (let i = 0; i < safeCount; i++) {
        if (i >= 1000) {
          console.error("Particle count exceeded maximum bound");
          break;
        }
        
        particles.push(this.createParticle());
      }
      
      return particles;
    }
  
    /**
     * Creates a single random particle
     * 
     * @returns Particle configuration
     */
    public createParticle(): ParticleConfig {
      const id = this.nextId++;
      const position = this.getRandomPosition();
      const size = this.getRandomSize();
      const speed = this.getRandomSpeed();
      const opacity = this.getRandomOpacity();
      const rotation = this.getRandomRotation();
      const color = this.getRandomColor();
      
      // Base particle configuration
      const particle: ParticleConfig = {
        id,
        position,
        size,
        speed,
        opacity,
        color
      };
      
      // Add rotation if needed
      if (rotation !== undefined) {
        particle.rotation = rotation;
      }
      
      // Add asset index if we have assets
      if (this.options.assetPaths && this.options.assetPaths.length > 0) {
        particle.assetIndex = Math.floor(Math.random() * this.options.assetPaths.length);
      }
      
      // Add lifetime if needed
      if (this.particleType === ParticleType.STAR || this.particleType === ParticleType.HEART) {
        particle.maxLifetime = this.getRandomLifetime();
        particle.currentLifetime = 0;
      }
      
      return particle;
    }
  
    /**
     * Generates a random position
     * 
     * @returns Random position vector
     */
    private getRandomPosition(): Vector2D {
      return {
        x: Math.random() * this.canvasWidth,
        y: Math.random() * this.canvasHeight
      };
    }
  
    /**
     * Generates a random size within configured bounds
     * 
     * @returns Random size
     */
    private getRandomSize(): number {
      const minSize = this.options.size?.min || 5;
      const maxSize = this.options.size?.max || 20;
      
      return minSize + Math.random() * (maxSize - minSize);
    }
  
    /**
     * Generates a random speed vector within configured bounds
     * 
     * @returns Random speed vector
     */
    private getRandomSpeed(): Vector2D {
      const minSpeed = this.options.speed?.min || 1;
      const maxSpeed = this.options.speed?.max || 3;
      const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
      
      // Default direction is downward
      let x = 0;
      let y = speed;
      
      // Add horizontal movement for specific particle types
      switch (this.particleType) {
        case ParticleType.SNOW:
        case ParticleType.LEAF:
        case ParticleType.SAKURA:
          // Add some horizontal drift
          x = (Math.random() - 0.5) * (this.options.wind || 1);
          break;
        
        case ParticleType.RAIN:
          // Rain falls mostly straight down
          x = (Math.random() - 0.5) * 0.3;
          break;
          
        case ParticleType.HEART:
        case ParticleType.STAR:
          // Hearts and stars can move in various directions
          const angle = Math.random() * Math.PI * 2;
          x = Math.cos(angle) * speed * 0.2;
          y = Math.sin(angle) * speed * 0.2;
          break;
      }
      
      return { x, y };
    }
  
    /**
     * Generates a random opacity within configured bounds
     * 
     * @returns Random opacity value
     */
    private getRandomOpacity(): number {
      const minOpacity = this.options.opacity?.min || 0.5;
      const maxOpacity = this.options.opacity?.max || 1.0;
      
      return minOpacity + Math.random() * (maxOpacity - minOpacity);
    }
  
    /**
     * Generates a random rotation if applicable for the particle type
     * 
     * @returns Random rotation or undefined if not applicable
     */
    private getRandomRotation(): number | undefined {
      // Only certain particle types use rotation
      switch (this.particleType) {
        case ParticleType.LEAF:
        case ParticleType.SAKURA:
          // Initial rotation is random
          return Math.random() * 360;
          
        default:
          return undefined;
      }
    }
  
    /**
     * Selects a random color from configured options
     * 
     * @returns Random color string
     */
    private getRandomColor(): string {
      // Use colors array if provided
      if (this.options.colors && this.options.colors.length > 0) {
        const colorIndex = Math.floor(Math.random() * this.options.colors.length);
        return this.options.colors[colorIndex];
      }
      
      // Default colors based on particle type
      switch (this.particleType) {
        case ParticleType.SNOW:
          return '#FFFFFF';
        case ParticleType.RAIN:
          return '#A3D5FF';
        case ParticleType.LEAF:
          return ['#A52A2A', '#8B4513', '#D2691E', '#CD853F', '#F4A460'][Math.floor(Math.random() * 5)];
        case ParticleType.SAKURA:
          return '#FFB7C5';
        case ParticleType.HEART:
          return '#FF4081';
        case ParticleType.STAR:
          return ['#FFFFFF', '#F0F8FF', '#FFFACD', '#FFE4B5'][Math.floor(Math.random() * 4)];
        default:
          return '#FFFFFF';
      }
    }
  
    /**
     * Generates a random lifetime for particles that use it
     * 
     * @returns Random lifetime value in frames
     */
    private getRandomLifetime(): number {
      // Base lifetime range
      const minLifetime = 100;
      const maxLifetime = 300;
      
      return minLifetime + Math.random() * (maxLifetime - minLifetime);
    }
  
    /**
     * Updates factory dimensions when canvas size changes
     * 
     * @param width - New canvas width
     * @param height - New canvas height
     */
    public updateDimensions(width: number, height: number): void {
      if (width <= 0 || height <= 0) {
        console.error('Invalid dimensions provided');
        return;
      }
      
      this.canvasWidth = width;
      this.canvasHeight = height;
    }
  }
  