// src/utils/animations/assets/AssetLoader.ts

import { ASSET_LOAD_TIMEOUT, ERROR_MESSAGES } from "../../../configs/ParticleConfigs";

/**
 * Handles loading assets for particle rendering
 */
export class AssetLoader {
  /**
   * Load assets from provided paths
   * @param paths - Paths to asset files
   * @returns Promise resolving to loaded image elements
   */
  public static async loadAssets(paths: string[]): Promise<HTMLImageElement[]> {
    // If no paths provided, return empty array
    if (!paths || paths.length === 0) {
      return [];
    }
    
    // Validate paths
    this.assertValidPaths(paths);
    
    try {
      // Load assets with timeout protection
      const loadedAssets = await Promise.race([
        this.loadAllAssets(paths),
        this.createTimeout()
      ]);
      
      return loadedAssets as HTMLImageElement[];
    } catch (error) {
      console.error(ERROR_MESSAGES.ASSET_LOAD_FAILED, error);
      return [];
    }
  }
  
  /**
   * Create a timeout promise
   * @returns Promise that rejects after timeout
   */
  private static createTimeout(): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(ERROR_MESSAGES.ASSET_LOAD_TIMEOUT));
      }, ASSET_LOAD_TIMEOUT);
    });
  }
  
  /**
   * Load all assets from provided paths
   * @param paths - Paths to asset files
   * @returns Promise resolving to loaded images
   */
  private static async loadAllAssets(paths: string[]): Promise<HTMLImageElement[]> {
    const promises: Promise<HTMLImageElement>[] = [];
    
    // Cap at 20 assets to prevent excessive loading
    const MAX_ASSETS = 20;
    const cappedPaths = paths.slice(0, MAX_ASSETS);
    
    // Load each asset
    for (const path of cappedPaths) {
      promises.push(this.loadSingleAsset(path));
    }
    
    return Promise.all(promises);
  }
  
  /**
   * Load a single asset
   * @param path - Path to asset file
   * @returns Promise resolving to loaded image
   */
  private static loadSingleAsset(path: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load asset: ${path}`));
      
      img.src = path;
    });
  }
  
  /**
   * Assert that paths are valid
   * @param paths - Paths to validate
   */
  private static assertValidPaths(paths: string[]): void {
    if (!Array.isArray(paths)) {
      throw new Error("Asset paths must be an array");
    }
    
    if (paths.length > 0) {
      const hasValidPath = paths.some(path => 
        typeof path === 'string' && path.trim().length > 0
      );
      
      if (!hasValidPath) {
        throw new Error("No valid asset paths provided");
      }
    }
  }
}
