// src/types/particles.ts

/**
 * Animation render mode options
 */
export enum AnimationRenderMode {
    /** Render using Canvas API */
    CANVAS = "canvas",
    /** Render using SVG elements */
    SVG = "svg",
    /** Render using Image elements */
    IMAGE = "image"
  }
  
  /**
   * Particle type identifiers
   */
  export enum ParticleType {
    // Falling types
    SNOW = "snow",
    RAIN = "rain",
    LEAF = "leaf",
    SAKURA = "sakura",
    MONEY = "money",
    STAR = "star",
    CONFETTI = "confetti",
    HEART_FALLING = "heart_falling",
    
    // Floating types
    BUBBLE = "bubble",
    FIREFLY = "firefly",
    CLOUD = "cloud",
    BALLOON = "balloon",
    PARTICLE = "particle",
    BUTTERFLY = "butterfly",
    HEART_FLOATING = "heart_floating"
  }
  
  /**
   * Range specification for numeric values
   */
  export interface ValueRange {
    /** Minimum value in the range */
    min: number;
    /** Maximum value in the range */
    max: number;
  }
  
  /**
   * Common particle options for all effects
   */
  export interface ParticleOptions {
    /** Number of particles to generate */
    count: number;
    /** Particle movement speed range */
    speed: ValueRange;
    /** Particle size range */
    size: ValueRange;
    /** Particle opacity range */
    opacity: ValueRange;
    /** Threshold for fade out (0-1) */
    fadeThreshold: number;
    /** Speed of fade effect */
    fadeSpeed: number;
    /** Path to image/SVG assets */
    assetPaths: string[];
    /** Optional color specification */
    colors?: string[];
    /** Optional rotation parameters */
    rotation?: {
      /** Rotation speed in degrees per frame */
      speed: number;
    };
    /** Wind effect amplitude */
    wind?: number;
    /** Pulsing effect parameters */
    pulse?: ValueRange;
    /** Twinkle effect parameters */
    twinkle?: ValueRange;
    /** Render mode for the particles */
    renderMode?: AnimationRenderMode;
  }
  
  /**
   * Base particle state interface
   */
  export interface ParticleState {
    /** X-coordinate position */
    x: number;
    /** Y-coordinate position */
    y: number;
    /** Particle width */
    width: number;
    /** Particle height */
    height: number;
    /** Movement speed on X-axis */
    speedX: number;
    /** Movement speed on Y-axis */
    speedY: number;
    /** Current opacity */
    opacity: number;
    /** Current rotation in degrees */
    rotation: number;
    /** Reference to image/SVG if applicable */
    asset?: HTMLImageElement | SVGElement;
    /** Color value for canvas rendering */
    color?: string;
  }
  