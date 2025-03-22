// src/utils/animations/core/types.ts
export enum AnimationRenderMode {
  CANVAS = 'CANVAS',
  SVG = 'SVG',
  IMAGE = 'IMAGE'
}

export type Vector2D = {
  x: number;
  y: number;
};

export type ParticleConfig = {
  speed: Vector2D;
  position: Vector2D;
  size: number;
  opacity: number;
  rotation?: number;
  color?: string;
  maxLifetime?: number;
  currentLifetime?: number;
};

export enum ParticleType {
  SNOW = 'snow',
  RAIN = 'rain',
  SAKURA = 'sakura',
  LEAF = 'leaf',
  HEART = 'heart',
  STAR = 'star'
}

export interface ParticleOptions {
  renderMode?: AnimationRenderMode;
  count: number;
  speed: {
    min: number;
    max: number;
  };
  size: {
    min: number;
    max: number;
  };
  opacity: {
    min: number;
    max: number;
  };
  rotation?: {
    speed: number;
    initial?: number;
  };
  wind?: number;
  gravity?: number;
  colors?: string[];
  fadeThreshold?: number; // % of screen height where fade begins
  fadeSpeed?: number;
  interactWithElements?: boolean;
  assetPaths?: string[];
  pulse?: {
    min: number;
    max: number;
  };
  twinkle?: {
    min: number;
    max: number;
  };
}
