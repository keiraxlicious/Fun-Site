// src/utils/animations/core/drawer-interface.ts
import { ParticleBase } from './particle-base';

export type RenderMode = 'CANVAS' | 'SVG' | 'IMAGE';

export interface DrawerOptions {
  ctx: CanvasRenderingContext2D;
  color?: string | string[];
  assetPaths?: string[];
  inlineAssets?: string[];
  randomizeAssets?: boolean;
}

// This is the Drawer interface that was missing
export interface Drawer<T extends ParticleBase> {
  /**
   * Initialize drawer with necessary resources
   * @returns Promise that resolves when initialization is complete
   */
  initialize(): Promise<void>;
  
  /**
   * Draw a particle to the canvas/DOM
   * @param particle - Particle to draw
   * @param index - Index of the particle in the collection
   */
  drawParticle(particle: T, index: number): void;
  
  /**
   * Clear the drawing surface
   */
  clear(): void;
  
  /**
   * Release resources when the drawer is no longer needed
   */
  dispose(): void;
}

// The ParticleDrawer interface can extend Drawer if needed
export interface ParticleDrawer<T extends ParticleBase> {
  /**
   * Initializes the drawer, loading any necessary assets
   */
  initialize(): Promise<void>;
  
  /**
   * Draws a single frame of animation
   * @param particles - Array of particles to draw
   */
  drawFrame(particles: ReadonlyArray<T>): void;
  
  /**
   * Cleans up resources used by the drawer
   */
  cleanup(): void;
}
