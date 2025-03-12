// src/types/interfaces.ts
// Add global definitions for window extensions
declare global {
    interface Window {
        particlesJS: (id: string, config: any) => void;
        pJSDom: any[];
        resizeTimeout: number;
    }
}

/**
 * Interface for social media button configuration
 */
export interface SocialButton {
    id: string;
    name: string;
    icon: string;
    svg: string,
    url: string;
    color: string;
}

/**
 * Supported rendering modes for animations
 */
export type AnimationRenderMode = 'CANVAS' | 'SVG' | 'IMAGE';

/**
 * Base interface for animation configuration options
 */
export interface AnimationBaseOptions {
    renderMode: AnimationRenderMode;
    color: string;
    maxParticles?: number;
}

/**
 * Interface for snow animation options
 */
export interface SnowAnimationOptions extends AnimationBaseOptions {
    sizeRange?: [number, number];
    fallSpeedRange?: [number, number];
    driftAmplitude?: number;
    svgPath?: string;
    imagePath?: string;
}

/**
 * Interface for rain animation options
 */
export interface RainAnimationOptions extends AnimationBaseOptions {
    lengthRange?: [number, number];
    fallSpeedRange?: [number, number];
    thicknessRange?: [number, number];
    svgPath?: string;
    imagePath?: string;
}

/**
 * Interface for leaf animation options
 */
export interface LeafAnimationOptions extends AnimationBaseOptions {
    sizeRange?: [number, number];
    fallSpeedRange?: [number, number];
    rotationSpeedRange?: [number, number];
    swayAmplitude?: number;
    svgPath?: string;
    imagePath?: string;
    colors?: string[];
}

/**
 * Interface for heart animation options
 */
export interface HeartAnimationOptions extends AnimationBaseOptions {
    sizeRange?: [number, number];
    fallSpeedRange?: [number, number];
    pulseRange?: [number, number];
    svgPath?: string;
    imagePath?: string;
}

/**
 * Interface for sakura petal animation options
 */
export interface SakuraPetalAnimationOptions extends AnimationBaseOptions {
    sizeRange?: [number, number];
    fallSpeedRange?: [number, number];
    rotationSpeedRange?: [number, number];
    svgPath?: string;
    imagePath?: string;
}

/**
 * Interface for the overlay animation options
 */
export interface OverlayOption {
    id: string;
    name: string;
    particleType: string;
    config: AnimationBaseOptions;
}

/**
 * Interface for particle settings
 */
export interface ParticleSettings {
    particles: {
        number: { value: number; density: { enable: boolean; value_area: number } };
        color: { value: string };
        shape: { 
            type: string; 
            stroke: { width: number; color: string } 
        };
        opacity: { value: number; random: boolean; anim: object };
        size: { value: number; random: boolean; anim: object };
        line_linked: { enable: boolean; distance: number; color: string; opacity: number; width: number };
        move: { enable: boolean; speed: number; direction: string; random: boolean; straight: boolean; out_mode: string; bounce: boolean };
    };
    interactivity: {
        detect_on: string;
        events: object;
        modes: object;
    };
    retina_detect: boolean;
}

/**
 * Interface for animation particle properties
 */
export interface SnowParticle {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    rotation?: number;
    rotationSpeed?: number;
    shouldReset?: boolean;
}

/**
 * Interface for rain drop properties
 */
export interface RainDrop {
    x: number;
    y: number;
    length: number;
    speed: number;
    thickness: number;
    opacity: number;
}

/**
 * Interface for leaf properties
 */
export interface Leaf {
    x: number;
    y: number;
    size: number;
    speed: number;
    rotation: number;
    rotationSpeed: number;
    color: string;
    sway: number;
}

/**
 * Interface for heart properties
 */
export interface Heart {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    pulse: number;
}

/**
 * Interface for sakura petal properties
 */
export interface SakuraPetal {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    rotation: number;
    rotationSpeed: number;
}
