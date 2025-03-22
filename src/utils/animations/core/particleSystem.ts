// src/utils/animations/core/particleSystem.ts

import { 
    ParticleType, 
    ParticleOptions, 
    AnimationRenderMode,
    InitResult 
} from '../../../types/animations';
  import { ParticleEngine } from './particleEngine';
  import { loadSvgAssets, loadImageAssets, areAssetsAvailable } from '../assetLoader';
  
  /**
   * Map to track active particle engines
   */
  const activeEngines: Map<string, ParticleEngine> = new Map();
  
  /**
   * Initializes a particle animation system
   * 
   * @param containerId - ID of the container element
   * @param particleType - Type of particles to animate
   * @param options - Configuration options for particles
   * @returns Promise resolving to initialization result
   */
  export async function initializeParticleSystem(
    containerId: string,
    particleType: ParticleType,
    options: ParticleOptions
  ): Promise<InitResult> {
    try {
      // Validate inputs
      if (!containerId) {
        return { success: false, error: 'Container ID is required' };
      }
      
      const container = document.getElementById(containerId);
      if (!container) {
        return { success: false, error: `Container element with ID "${containerId}" not found` };
      }
      
      if (!Object.values(ParticleType).includes(particleType)) {
        return { success: false, error: `Invalid particle type: ${particleType}` };
      }
      
      // Ensure we have options
      options = options || {} as ParticleOptions;
      
      // Generate a unique key for this animation
      const engineKey = `particleEngine_${containerId}_${particleType}`;
      
      // Check if engine already exists
      if (activeEngines.has(engineKey)) {
        // Dispose existing engine
        const existing = activeEngines.get(engineKey);
        existing?.dispose();
        activeEngines.delete(engineKey);
      }
      
      // Verify asset availability if using SVG or IMAGE mode
      if (options.renderMode === AnimationRenderMode.SVG || 
          options.renderMode === AnimationRenderMode.IMAGE) {
        
        if (!options.assetPaths || options.assetPaths.length === 0) {
          // Try to check a default directory location
          const extension = options.renderMode === AnimationRenderMode.SVG ? 'svg' : 'png';
          const defaultDirectory = `/assets/${extension}s/${particleType}/`;
          
          const assetsAvailable = await areAssetsAvailable(defaultDirectory, extension);
          
          if (assetsAvailable) {
            // Use default directory if available
            options.assetPaths = [defaultDirectory];
          } else {
            // Fall back to CANVAS mode if assets aren't available
            console.warn(`No assets found for ${particleType}, falling back to CANVAS mode`);
            options.renderMode = AnimationRenderMode.CANVAS;
          }
        }
      }
      
      // Create and initialize the particle engine
      const engine = new ParticleEngine(containerId, particleType, options);
      
      await engine.initialize();
      
      // Start the animation
      engine.start();
      
      // Store the engine
      activeEngines.set(engineKey, engine);
      
      // Expose the engine globally for debugging
      (window as any)[engineKey] = engine;
      
      return { 
        success: true, 
        engineKey 
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { 
        success: false, 
        error: `Failed to initialize particle system: ${errorMessage}` 
      };
    }
  }
  
  /**
   * Stops and disposes a particle animation
   * 
   * @param containerId - ID of the container element
   * @param particleType - Type of particles to stop
   * @returns Boolean indicating success
   */
  export function disposeParticleSystem(
    containerId: string,
    particleType: ParticleType
  ): boolean {
    try {
      const engineKey = `particleEngine_${containerId}_${particleType}`;
      
      // Check if engine exists
      if (!activeEngines.has(engineKey)) {
        console.warn(`No active particle system found for ${particleType} in ${containerId}`);
        return false;
      }
      
      // Get and dispose the engine
      const engine = activeEngines.get(engineKey);
      engine?.dispose();
      
      // Remove from active engines
      activeEngines.delete(engineKey);
      
      // Remove global reference
      delete (window as any)[engineKey];
      
      return true;
    } catch (error) {
      console.error('Error disposing particle system:', error);
      return false;
    }
  }
  
  /**
   * Pauses a particle animation
   * 
   * @param containerId - ID of the container element
   * @param particleType - Type of particles to pause
   * @returns Boolean indicating success
   */
  export function pauseParticleSystem(
    containerId: string,
    particleType: ParticleType
  ): boolean {
    try {
      const engineKey = `particleEngine_${containerId}_${particleType}`;
      
      // Check if engine exists
      if (!activeEngines.has(engineKey)) {
        console.warn(`No active particle system found for ${particleType} in ${containerId}`);
        return false;
      }
      
      // Stop the engine
      const engine = activeEngines.get(engineKey);
      engine?.stop();
      
      return true;
    } catch (error) {
      console.error('Error pausing particle system:', error);
      return false;
    }
  }
  
  /**
   * Resumes a paused particle animation
   * 
   * @param containerId - ID of the container element
   * @param particleType - Type of particles to resume
   * @returns Boolean indicating success
   */
  export function resumeParticleSystem(
    containerId: string,
    particleType: ParticleType
  ): boolean {
    try {
      const engineKey = `particleEngine_${containerId}_${particleType}`;
      
      // Check if engine exists
      if (!activeEngines.has(engineKey)) {
        console.warn(`No active particle system found for ${particleType} in ${containerId}`);
        return false;
      }
      
      // Start the engine
      const engine = activeEngines.get(engineKey);
      engine?.start();
      
      return true;
    } catch (error) {
      console.error('Error resuming particle system:', error);
      return false;
    }
  }
  
  /**
   * Gets statistics for an active particle system
   * 
   * @param containerId - ID of the container element
   * @param particleType - Type of particles to get stats for
   * @returns Statistics object or null if not found
   */
  export function getParticleSystemStats(
    containerId: string,
    particleType: ParticleType
  ): any {
    try {
      const engineKey = `particleEngine_${containerId}_${particleType}`;
      
      // Check if engine exists
      if (!activeEngines.has(engineKey)) {
        return null;
      }
      
      // Get stats from engine
      const engine = activeEngines.get(engineKey);
      return engine?.getStats();
    } catch (error) {
      console.error('Error getting particle system stats:', error);
      return null;
    }
  }
  
  /**
   * Disposes all active particle systems
   * 
   * @returns Number of disposed systems
   */
  export function disposeAllParticleSystems(): number {
    try {
      const count = activeEngines.size;
      
      // Dispose all engines
      activeEngines.forEach(engine => {
        engine.dispose();
      });
      
      // Clear the map
      activeEngines.clear();
      
      return count;
    } catch (error) {
      console.error('Error disposing all particle systems:', error);
      return 0;
    }
  }
  