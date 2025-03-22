// src/utils/animations/renderers/AssetRenderer.ts

import { ParticleState } from "../../../types/particleTypes";
import { ERROR_MESSAGES } from "../../../configs/ParticleConfigs";

/**
 * Handles SVG and image-based particle rendering
 */
export class AssetRenderer {
  /**
   * Assert that context is available
   * @param ctx - Canvas rendering context
   */
  private static assertContextAvailable(ctx: CanvasRenderingContext2D | null): void {
    if (!ctx) {
      throw new Error(ERROR_MESSAGES.CONTEXT_ACQUISITION_FAILED);
    }
  }
  
  /**
   * Assert that an asset is available
   * @param asset - Asset to check
   */
  private static assertAssetAvailable(asset: HTMLImageElement | undefined): void {
    if (!asset) {
      throw new Error("No asset available for particle");
    }
  }
  
  /**
   * Render an image-based particle
   * @param ctx - Canvas rendering context
   * @param particle - Particle state
   */
  public static renderImageParticle(
    ctx: CanvasRenderingContext2D | null,
    particle: ParticleState
  ): void {
    this.assertContextAvailable(ctx);
    
    if (!particle.asset) {
      console.warn("Particle has no asset to render");
      return;
    }
    
    this.assertAssetAvailable(particle.asset);
    
    const halfWidth = particle.width / 2;
    const halfHeight = particle.height / 2;
    
    ctx!.drawImage(
      particle.asset,
      -halfWidth,
      -halfHeight,
      particle.width,
      particle.height
    );
  }
  
  /**
   * Render an SVG-based particle (SVGs are loaded as Images)
   * @param ctx - Canvas rendering context
   * @param particle - Particle state
   */
  public static renderSvgParticle(
    ctx: CanvasRenderingContext2D | null,
    particle: ParticleState
  ): void {
    // SVGs are handled exactly like images once loaded
    this.renderImageParticle(ctx, particle);
  }
  
  /**
   * Get a random asset from an array
   * @param assets - Array of assets
   * @returns A randomly selected asset
   */
  public static getRandomAsset(assets: HTMLImageElement[]): HTMLImageElement | undefined {
    if (!assets || assets.length === 0) {
      return undefined;
    }
    
    const index = Math.floor(Math.random() * assets.length);
    return assets[index];
  }
  
  /**
   * Assign a random asset to a particle
   * @param particle - Particle to assign asset to
   * @param assets - Available assets
   */
  public static assignRandomAsset(
    particle: ParticleState,
    assets: HTMLImageElement[]
  ): void {
    particle.asset = this.getRandomAsset(assets);
  }
}
