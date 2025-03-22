// src/utils/animations/renderers/CanvasRenderer.ts

import { ParticleState, ParticleType } from "../../../types/particleTypes";
import { ERROR_MESSAGES } from "../../../configs/ParticleConfigs";

/**
 * Handles canvas-based particle rendering
 */
export class CanvasRenderer {
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
   * Clear the canvas
   * @param ctx - Canvas rendering context
   * @param width - Canvas width
   * @param height - Canvas height
   */
  public static clearCanvas(
    ctx: CanvasRenderingContext2D | null,
    width: number,
    height: number
  ): void {
    this.assertContextAvailable(ctx);
    ctx!.clearRect(0, 0, width, height);
  }
  
  /**
   * Render a particle on canvas
   * @param ctx - Canvas rendering context
   * @param particle - Particle state
   * @param type - Particle type
   */
  public static renderParticle(
    ctx: CanvasRenderingContext2D | null,
    particle: ParticleState,
    type: ParticleType
  ): void {
    this.assertContextAvailable(ctx);
    
    ctx!.save();
    ctx!.globalAlpha = particle.opacity;
    ctx!.translate(particle.x, particle.y);
    ctx!.rotate(particle.rotation * Math.PI / 180);
    
    // Render based on particle type
    switch (type) {
      case ParticleType.SNOW:
        this.renderSnowflake(ctx!, particle);
        break;
      case ParticleType.RAIN:
        this.renderRaindrop(ctx!, particle);
        break;
      case ParticleType.LEAF:
        this.renderLeaf(ctx!, particle);
        break;
      case ParticleType.SAKURA:
        this.renderSakura(ctx!, particle);
        break;
      default:
        this.renderDefault(ctx!, particle);
    }
    
    ctx!.restore();
  }
  
  /**
   * Draw a snowflake particle
   */
  private static renderSnowflake(
    ctx: CanvasRenderingContext2D,
    particle: ParticleState
  ): void {
    const size = particle.width;
    const color = particle.color || "#ffffff";
    
    ctx.fillStyle = color;
    
    // Draw a 6-pointed snowflake
    for (let i = 0; i < 6; i++) {
      ctx.save();
      ctx.rotate(Math.PI * 2 * i / 6);
      
      // Draw main arm
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -size / 2);
      ctx.lineTo(size / 10, -size / 2.5);
      ctx.lineTo(0, -size / 3);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    }
  }
  
  /**
   * Draw a raindrop particle
   */
  private static renderRaindrop(
    ctx: CanvasRenderingContext2D,
    particle: ParticleState
  ): void {
    const width = particle.width / 3;
    const height = particle.height;
    const color = particle.color || "#a3d5ff";
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(-width / 2, -height / 2, width, height);
    ctx.fill();
  }
  
  /**
   * Draw a leaf particle
   */
  private static renderLeaf(
    ctx: CanvasRenderingContext2D,
    particle: ParticleState
  ): void {
    const size = particle.width;
    const color = particle.color || "#795548";
    
    ctx.fillStyle = color;
    
    // Draw leaf shape
    ctx.beginPath();
    ctx.ellipse(0, 0, size / 2, size / 3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw stem
    ctx.beginPath();
    ctx.moveTo(0, -size / 3);
    ctx.lineTo(0, size / 2);
    ctx.lineWidth = size / 10;
    ctx.strokeStyle = color;
    ctx.stroke();
  }
  
  /**
   * Draw a sakura petal
   */
  private static renderSakura(
    ctx: CanvasRenderingContext2D,
    particle: ParticleState
  ): void {
    const size = particle.width;
    const color = particle.color || "#ffb7c5";
    
    ctx.fillStyle = color;
    
    // Draw heart-like petal shape
    ctx.beginPath();
    ctx.moveTo(0, -size / 4);
    ctx.bezierCurveTo(
      size / 2, -size / 2,
      size / 2, size / 4,
      0, size / 3
    );
    ctx.bezierCurveTo(
      -size / 2, size / 4,
      -size / 2, -size / 2,
      0, -size / 4
    );
    ctx.fill();
    
    // Draw center line
    ctx.beginPath();
    ctx.moveTo(0, -size / 4);
    ctx.lineTo(0, size / 3);
    ctx.lineWidth = size / 20;
    ctx.strokeStyle = "#ffffff33";
    ctx.stroke();
  }
  
  /**
   * Draw a default particle shape
   */
  private static renderDefault(
    ctx: CanvasRenderingContext2D,
    particle: ParticleState
  ): void {
    const halfWidth = particle.width / 2;
    const halfHeight = particle.height / 2;
    const color = particle.color || "#ffffff";
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, halfWidth, 0, Math.PI * 2);
    ctx.fill();
  }
}
