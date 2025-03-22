// src/utils/animations/core/image-drawer.ts
import { ParticleBase } from './particle-base';
import { ParticleDrawer, DrawerOptions } from './drawer-interface';

export interface ImageDrawerOptions extends DrawerOptions {
  assetPaths: string[];
}

export class ImageDrawer<T extends ParticleBase> implements ParticleDrawer<T> {
  private images: HTMLImageElement[] = [];
  private particleAssetMap: Map<number, number> = new Map();
  private isLoaded: boolean = false;
  
  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly options: ImageDrawerOptions
  ) {}
  
  public async initialize(): Promise<void> {
    try {
      // Load images
      if (this.options.assetPaths && this.options.assetPaths.length > 0) {
        const loadPromises = this.options.assetPaths.map((path, index) => 
          this.loadImage(path, index)
        );
        await Promise.all(loadPromises);
      } else {
        throw new Error('No image paths provided');
      }
      
      // Create mapping between particles and images
      this.mapParticlesToAssets();
      
      this.isLoaded = true;
    } catch (error) {
      console.error('Error initializing Image drawer:', error);
      this.isLoaded = false;
    }
  }
  
  public drawFrame(particles: ReadonlyArray<T>): void {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    
    // If not loaded, use fallback
    if (!this.isLoaded || this.images.length === 0) {
      this.fallbackDraw(particles);
      return;
    }
    
    // Draw each particle
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      const state = particle.getState();
      
      // Get image for this particle
      const imageIndex = this.particleAssetMap.get(i) || 0;
      const image = this.images[imageIndex % this.images.length];
      if (!image) continue;
      
      // Save context state
      this.ctx.save();
      
      // Apply opacity
      this.ctx.globalAlpha = state.opacity;
      
      // Apply transformations
      this.ctx.translate(state.position.x, state.position.y);
      if (state.rotation !== undefined) {
        this.ctx.rotate((state.rotation * Math.PI) / 180);
      }
      
      // Scale based on particle size
      const size = state.size;
      
      // Center image on particle position
      this.ctx.drawImage(image, -size/2, -size/2, size, size);
      
      // Restore context state
      this.ctx.restore();
    }
  }
  
  public cleanup(): void {
    // Clear references
    this.images = [];
    this.particleAssetMap.clear();
  }
  
  private async loadImage(path: string, index: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.images[index] = img;
        resolve();
      };
      
      img.onerror = (error) => {
        console.error(`Failed to load image at ${path}`, error);
        reject(new Error(`Failed to load image at ${path}`));
      };
      
      img.src = path;
    });
  }
  
  private mapParticlesToAssets(): void {
    const assetCount = this.images.length;
    if (assetCount === 0) return;
    
    // Clear existing map
    this.particleAssetMap.clear();
    
    // Assign images to particles
    for (let i = 0; i < 1000; i++) { // Pre-map for up to 1000 particles
      const isRandom = this.options.randomizeAssets !== false;
      const assetIndex = isRandom 
        ? Math.floor(Math.random() * assetCount)
        : i % assetCount;
      
      this.particleAssetMap.set(i, assetIndex);
    }
  }
  
  private fallbackDraw(particles: ReadonlyArray<T>): void {
    for (const particle of particles) {
      const state = particle.getState();
      
      this.ctx.beginPath();
      this.ctx.arc(
        state.position.x, 
        state.position.y, 
        state.size / 2, 
        0, 
        Math.PI * 2
      );
      this.ctx.fillStyle = `rgba(255, 255, 255, ${state.opacity})`;
      this.ctx.fill();
    }
  }
}
