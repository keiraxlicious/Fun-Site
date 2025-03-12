// // src/utils/animations/particles/star-particle.ts
// import { ParticleBase } from '../core/particle-base';
// import { ParticleConfig, Vector2D, ParticleOptions } from '../core/types';

// export class StarParticle extends ParticleBase {
//   private twinkleFrequency: number;
//   private twinkleAmount: number;
//   private twinkleOffset: number;
//   private originalOpacity: number;
//   private driftSpeed: Vector2D;
  
//   /**
//    * Creates a twinkling star particle
//    * @param config - Configuration parameters for the particle
//    * @param canvasWidth - Width of the canvas
//    * @param canvasHeight - Height of the canvas
//    */
//   constructor(
//     config: ParticleConfig,
//     canvasWidth: number,
//     canvasHeight: number
//   ) {
//     super(config, canvasWidth, canvasHeight, 1.0, 0.01);
    
//     // Set star-specific properties
//     this.twinkleFrequency = Math.random() * 3 + 0.5;
//     this.twinkleAmount = Math.random() * 0.5 + 0.3;
//     this.twinkleOffset = Math.random() * Math.PI * 2;
//     this.originalOpacity = config.opacity;
    
//     // Very slow drift
//     this.driftSpeed = {
//       x: (Math.random() - 0.5) * 0.1,``
//       y: (Math.random() - 0.5) * 0.1
//     };
//   }
  
//   /**
//    * Update star particle with twinkling effect
//    * @param deltaTime - Time elapsed since last update in seconds
//    * @returns boolean indicating if the particle is still active
//    */
//   override update(deltaTime: number): boolean {
//     // Apply twinkling effect
//     const twinkleFactor = 0.5 + Math.sin(
//       this.currentLifetime * this.twinkleFrequency + this.twinkleOffset
//     ) * this.twinkleAmount;
    
//     this.opacity = this.originalOpacity * twinkleFactor;
    
//     // Apply very slow drift
//     this.position.x += this.driftSpeed.x * deltaTime;
//     this.position.y += this.driftSpeed.y * deltaTime;
    
//     // No boundary check - stars stay visible
//     this.currentLifetime += deltaTime;
    
//     // Stars live indefinitely in normal operation
//     if (this.currentLifetime >= this.maxLifetime) {
//       return false;
//     }
    
//     return true;
//   }
  
//   /**
//    * Create a new star particle
//    * @param canvasWidth - Width of the canvas
//    * @param canvasHeight - Height of the canvas
//    * @param options - Particle options
//    * @returns New star particle
//    */
//   static create(
//     canvasWidth: number,
//     canvasHeight: number,
//     options: ParticleOptions
//   ): StarParticle {
//     // Random position anywhere on screen
//     const position: Vector2D = {
//       x: Math.random() * canvasWidth,
//       y: Math.random() * canvasHeight,
//     };
    
//     // Stars are stationary with just a twinkle
//     const speed: Vector2D = { x: 0, y: 0 };
    
//     // Random size with some stars larger than others
//     const sizeDistribution = Math.random();
//     let size;
    
//     if (sizeDistribution > 0.8) {
//       // Larger stars (20% of stars)
//       size = options.size.min + (options.size.max - options.size.min) * 
//         (0.7 + Math.random() * 0.3);
//     } else {
//       // Normal stars (80% of stars)
//       size = options.size.min + (options.size.max - options.size.min) * 
//         Math.random() * 0.7;
//     }
    
//     // Random opacity
//     const opacity = options.opacity.min + 
//       (options.opacity.max - options.opacity.min) * Math.random();
    
//     // Star colors tend toward white/blue/yellow
//     let color: string;
//     if (options.colors && options.colors.length > 0) {
//       color = options.colors[Math.floor(Math.random() * options.colors.length)];
//     } else {
//       // Default star colors with distribution
//       const colorType = Math.random();
//       if (colorType < 0.6) {
//         // White/blue-white (60%)
//         const blueWhite = 220 + Math.floor(Math.random() * 35);
//         color = `rgba(${blueWhite}, ${blueWhite}, 255, ${opacity})`;
//       } else if (colorType < 0.9) {
//         // Yellow-white (30%)
//         const yellowWhite = 220 + Math.floor(Math.random() * 35);
//         color = `rgba(255, 255, ${yellowWhite}, ${opacity})`;
//       } else {
//         // Reddish (10%)
//         const redTint = 180 + Math.floor(Math.random() * 75);
//         color = `rgba(255, ${redTint}, ${redTint}, ${opacity})`;
//       }
//     }
    
//     // Create configuration with very long lifetime
//     const config: ParticleConfig = {
//       position,
//       speed,
//       size,
//       opacity,
//       color,
//       maxLifetime: 60 * 60 * 24, // 24 hours in seconds - effectively permanent
//     };
    
//     return new StarParticle(config, canvasWidth, canvasHeight);
//   }
// }
