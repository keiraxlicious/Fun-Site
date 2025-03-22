// src/utils/animations/core/types.ts

/**
 * Enum for available particle animation rendering modes
 */
export enum AnimationRenderMode {
    CANVAS = 'CANVAS',
    SVG = 'SVG',
    IMAGE = 'IMAGE'
  }
  
  /**
   * Type for representing a 2D vector with x and y coordinates
   */
  export type Vector2D = {
    x: number;
    y: number;
  };
  
  /**
   * Base particle configuration with standard properties
   */
  export type ParticleConfig = {
    id: number;               // Unique identifier for the particle
    speed: Vector2D;          // Speed in pixels per frame
    position: Vector2D;       // Current position on screen
    size: number;             // Size in pixels 
    opacity: number;          // Opacity value between 0 and 1
    rotation?: number;        // Rotation in degrees
    color?: string;           // CSS color string
    maxLifetime?: number;     // Maximum lifetime in frames
    currentLifetime?: number; // Current lifetime in frames
    assetIndex?: number;      // Index of asset to use for rendering
  };
  
  /**
   * Enum for supported particle types
   */
  export enum ParticleType {
    SNOW = 'snow',
    RAIN = 'rain',
    SAKURA = 'sakura',
    LEAF = 'leaf',
    HEART = 'heart',
    STAR = 'star'
  }
  
  /**
   * Configuration options for particles
   */
  export interface ParticleOptions {
    renderMode?: AnimationRenderMode;
    count: number;                    // Number of particles to create
    speed: {                          // Speed range
      min: number;
      max: number;
    };
    size: {                           // Size range
      min: number;
      max: number;
    };
    opacity: {                        // Opacity range
      min: number;
      max: number;
    };
    rotation?: {                      // Rotation configuration
      speed: number;
      initial?: number;
    };
    wind?: number;                    // Horizontal force
    gravity?: number;                 // Vertical force
    colors?: string[];                // Array of colors to use
    fadeThreshold?: number;           // % of screen height where fade begins
    fadeSpeed?: number;               // Speed of fading out
    interactWithElements?: boolean;   // Whether particles interact with page elements
    assetPaths?: string[];            // Paths to SVG or image assets
    pulse?: {                         // Pulsing effect configuration
      min: number;
      max: number;
    };
    twinkle?: {                       // Twinkling effect configuration
      min: number;
      max: number;
    };
  }
  
  /**
   * Interface for particle system runtime statistics
   */
  export interface ParticleStats {
    particleCount: number;           // Current number of particles
    frameTime: number;               // Time to render last frame (ms)
    fps: number;                     // Current frames per second
    memoryUsage: number;             // Estimated memory usage in KB
  }
  
  /**
   * Result object from particle initialization
   */
  export interface InitResult {
    success: boolean;
    engineKey?: string;
    error?: string;
  }
  