// src/configs/ParticleConfigs.ts

import { ParticleType, RenderMode, ParticleOptions } from "../types/particleTypes";

/**
 * Maximum number of particles allowed for performance reasons
 */
export const MAX_PARTICLE_COUNT = 500;

/**
 * Default frame rate for animations
 */
export const DEFAULT_FRAME_RATE = 60;

/**
 * Maximum loop iterations to prevent infinite loops
 */
export const MAX_ANIMATION_ITERATIONS = 10000;

/**
 * Timeout for asset loading in milliseconds
 */
export const ASSET_LOAD_TIMEOUT = 10000;

/**
 * Default particle options by type
 */
export const DEFAULT_PARTICLE_OPTIONS: Record<ParticleType | 'default', ParticleOptions> = {
  [ParticleType.SNOW]: {
    count: 100,
    speed: { min: 1, max: 3 },
    size: { min: 2, max: 8 },
    opacity: { min: 0.6, max: 1.0 },
    fadeThreshold: 0.9,
    fadeSpeed: 0.02,
    rotation: { speed: 0.5 },
    renderMode: RenderMode.CANVAS,
    assetPaths: []
  },

  [ParticleType.RAIN]: {
    count: 150,
    speed: { min: 15, max: 25 },
    size: { min: 1, max: 3 },
    opacity: { min: 0.2, max: 0.5 },
    fadeThreshold: 0.9,
    fadeSpeed: 0.05,
    renderMode: RenderMode.CANVAS,
    assetPaths: []
  },

  [ParticleType.LEAF]: {
    count: 50,
    speed: { min: 1, max: 3 },
    size: { min: 15, max: 30 },
    opacity: { min: 0.7, max: 1.0 },
    fadeThreshold: 0.8,
    fadeSpeed: 0.02,
    rotation: { speed: 2 },
    wind: 3,
    renderMode: RenderMode.CANVAS,
    assetPaths: []
  },

  [ParticleType.SAKURA]: {
    count: 80,
    speed: { min: 1, max: 2 },
    size: { min: 8, max: 15 },
    opacity: { min: 0.7, max: 1.0 },
    fadeThreshold: 0.8,
    fadeSpeed: 0.02,
    rotation: { speed: 1 },
    wind: 2,
    renderMode: RenderMode.CANVAS,
    assetPaths: []
  },

  // Default fallback option
  'default': {
    count: 50,
    speed: { min: 1, max: 3 },
    size: { min: 3, max: 8 },
    opacity: { min: 0.5, max: 1.0 },
    fadeThreshold: 0.8,
    fadeSpeed: 0.02,
    renderMode: RenderMode.CANVAS,
    assetPaths: []
  },
};

/**
 * Error messages for consistent error handling
 */
export const ERROR_MESSAGES = {
  CONTAINER_NOT_FOUND: "Container element not found",
  CANVAS_CREATION_FAILED: "Failed to create canvas element",
  CONTEXT_ACQUISITION_FAILED: "Failed to get canvas context",
  ASSET_LOAD_FAILED: "Failed to load particle assets",
  ASSET_LOAD_TIMEOUT: "Asset loading timed out",
  INVALID_RENDER_MODE: "Invalid render mode specified",
  PARTICLE_COUNT_EXCEEDED: "Particle count exceeds maximum allowed",
  ANIMATION_LOOP_EXCEEDED: "Animation loop exceeded maximum iterations"
};
