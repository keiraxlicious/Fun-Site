// src/types/ParticleTypes.ts

/**
 * Defines the rendering mode for particles
 */
export enum RenderMode {
    /** Render using Canvas API */
    CANVAS = "canvas",
    /** Render using SVG elements */
    SVG = "svg",
    /** Render using Image elements */
    IMAGE = "image"
  }
  
  /**
   * Defines all available particle effect types
   */
  export enum ParticleType {
    // Falling particles
    SNOW = "snow",
    RAIN = "rain",
    LEAF = "leaf",
    SAKURA = "sakura",
    MONEY = "money",
    STAR = "star",
    CONFETTI = "confetti",
    HEART_FALLING = "heart_falling",
    
    // Floating particles
    BUBBLE = "bubble",
    FIREFLY = "firefly",
    CLOUD = "cloud",
    BALLOON = "balloon",
    PARTICLE = "particle",
    BUTTERFLY = "butterfly",
    HEART_FLOATING = "heart_floating"
  }
  
  /**
   * Defines a range of numeric values
   */
  export interface ValueRange {
    /** Minimum value */
    min: number;
    /** Maximum value */
    max: number;
  }
  
  /**
   * Configuration options for particles
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
    /** Path to assets (images/SVGs) */
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
    renderMode?: RenderMode;
  }
  
  /**
   * State of an individual particle
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
    /** Reference to image if applicable */
    asset?: HTMLImageElement;
    /** Color value for canvas rendering */
    color?: string;
  }
  
  /**
   * Categories of particle effects
   */
  export enum ParticleCategory {
    FALLING = "falling",
    FLOATING = "floating",
    ROTATING = "rotating",
    INTERACTIVE = "interactive"
  }
  