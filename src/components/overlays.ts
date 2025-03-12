import { initializeOverlays as initParticles } from '../utils/animations';
import { ParticleType, ParticleOptions, AnimationRenderMode as ParticleAnimationRenderMode } from '../utils/animations/core/types';


// Types for overlay configurations
export type AnimationRenderMode = 'CANVAS' | 'SVG' | 'DOM';

// src/components/overlays.ts
export interface BaseAnimationOptions {
    renderMode: AnimationRenderMode;
    color?: string;
    maxParticles: number;
    assetDirectory?: string;  // Add directory path option
    svgPath?: string | string[];
    imagePath?: string | string[];
    fallbackImage?: string;  // Add fallback image option
  }


export interface SnowAnimationOptions extends BaseAnimationOptions {
    sizeRange: [number, number];
    fallSpeedRange: [number, number];
}

export interface RainAnimationOptions extends BaseAnimationOptions {
    lengthRange: [number, number];
    fallSpeedRange: [number, number];
    thicknessRange: [number, number];
}

export interface LeafAnimationOptions extends BaseAnimationOptions {
    sizeRange: [number, number];
    fallSpeedRange: [number, number];
    rotationSpeedRange: [number, number];
    swayAmplitude: number;
    colors?: string[];
}

export interface SakuraPetalAnimationOptions extends BaseAnimationOptions {
    sizeRange: [number, number];
    fallSpeedRange: [number, number];
    rotationSpeedRange: [number, number];
}

export interface HeartAnimationOptions extends BaseAnimationOptions {
    sizeRange: [number, number];
    fallSpeedRange: [number, number];
    pulseRange: [number, number];
}

export interface StarAnimationOptions extends BaseAnimationOptions {
    sizeRange: [number, number];
    twinkleRange: [number, number];
    colors?: string[];
}

export interface OverlayOption {
    id: string;
    name: string;
    particleType: string;
    config: BaseAnimationOptions;
    path?: string; // Path to dedicated page
}

// Define overlay options with configuration for each effect
export const OVERLAY_OPTIONS: OverlayOption[] = [
    {
        id: 'snow',
        name: 'Snowfall',
        particleType: 'snow',
        config: {
            renderMode: 'SVG' as AnimationRenderMode,
            color: '#FFFFFF',
            maxParticles: 100,
            sizeRange: [2, 8],
            fallSpeedRange: [1, 3],
            assetDirectory: '/assets/svgs/overlays/snow/',  // Directory instead of file list
            fallbackImage: '/assets/images/overlays/snow/'  // Fallback if directory loading fails
        } as SnowAnimationOptions,
        path: '/snow.html'
    },
    {
        id: 'rain',
        name: 'Rainfall',
        particleType: 'rain',
        config: {
            renderMode: 'CANVAS' as AnimationRenderMode,
            color: '#A3D5FF',
            maxParticles: 150,
            lengthRange: [10, 20],
            fallSpeedRange: [15, 25],
            thicknessRange: [1, 3],
            assetDirectory: '/assets/svgs/overlays/rain/',  // Directory instead of file list
            fallbackImage: '/assets/images/overlays/rain/'  // Fallback if directory loading fails
        } as RainAnimationOptions,
        path: '/rain.html'
    },
    {
        id: 'leaves',
        name: 'Falling Leaves',
        particleType: 'leaf',
        config: {
            renderMode: 'CANVAS' as AnimationRenderMode,
            color: '#795548',
            maxParticles: 50,
            sizeRange: [15, 30],
            fallSpeedRange: [1, 3],
            rotationSpeedRange: [-2, 2],
            swayAmplitude: 3,
            colors: ['#A52A2A', '#8B4513', '#D2691E', '#CD853F', '#F4A460'],
            assetDirectory: '/assets/svgs/overlays/leaves/',  // Directory instead of file list
            fallbackImage: '/assets/images/overlays/leaves/'  // Fallback if directory loading fails
        } as LeafAnimationOptions,
        path: '/leaves.html'
    },
    {
      id: 'sakura',
      name: 'Sakura Petals',
      particleType: 'sakura',
      config: {
          renderMode: 'CANVAS' as AnimationRenderMode,
          color: '#FFB7C5',
          maxParticles: 80,
          sizeRange: [8, 15],
          fallSpeedRange: [1, 2],
          rotationSpeedRange: [-1, 1],
          assetDirectory: '/assets/svgs/overlays/sakura/',  // Directory instead of file list
          fallbackImage: '/assets/images/overlays/sakura/'  // Fallback if directory loading fails
      } as SakuraPetalAnimationOptions,
      path: '/sakura.html'
  },
    {
        id: 'hearts',
        name: 'Floating Hearts',
        particleType: 'heart',
        config: {
            renderMode: 'CANVAS' as AnimationRenderMode,
            color: '#FF4081',
            maxParticles: 60,
            sizeRange: [10, 20],
            fallSpeedRange: [1, 2],
            pulseRange: [0.8, 1.2],
            assetDirectory: '/assets/svgs/overlays/hearts/',  // Directory instead of file list
            fallbackImage: '/assets/images/overlays/hearts/'  // Fallback if directory loading fails
        } as HeartAnimationOptions,
        path: '/hearts.html'
    },
    {
        id: 'stars',
        name: 'Starry Night',
        particleType: 'star',
        config: {
            renderMode: 'CANVAS' as AnimationRenderMode,
            maxParticles: 100,
            sizeRange: [1, 4],
            twinkleRange: [0.5, 1.5],
            colors: ['#FFFFFF', '#F0F8FF', '#FFFACD', '#FFE4B5'],
            assetDirectory: '/assets/svgs/overlays/stars/',  // Directory instead of file list
            fallbackImage: '/assets/images/overlays/stars/'  // Fallback if directory loading fails
        } as StarAnimationOptions,
        path: '/stars.html'
    }
];

// Track currently active overlay engine
let activeEngineKey: string | null = null;

/**
 * Initialize the default overlay effect
 * @param containerId - ID of the container element (default: 'magic-canvas')
 * @param overlayId - ID of the overlay to initialize (default: based on URI or 'sakura')
 */
export function initializeOverlays(
    containerId: string = 'magic-canvas',
    overlayId?: string
): void {
    console.log('Initializing overlays...');
    
    // If no specific overlay is requested, try to get from URL path
    if (!overlayId) {
        const path = window.location.pathname;
        const pathMatch = OVERLAY_OPTIONS.find(
            option => path.includes(`/${option.id}`)
        );
        
        if (pathMatch) {
            overlayId = pathMatch.id;
        } else {
            // Default to sakura if no match
            overlayId = 'sakura';
        }
    }
    
    applyOverlayEffect(overlayId, containerId);
}

/**
 * Apply a specific overlay effect
 * @param overlayId - ID of the overlay to apply
 * @param containerId - ID of the container element (default: 'magic-canvas')
 */
export function applyOverlayEffect(
    overlayId: string,
    containerId: string = 'magic-canvas'
): void {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID '${containerId}' not found`);
        return;
    }
    
    // Stop any existing animation
    if (activeEngineKey) {
        const engine = (window as any)[activeEngineKey];
        if (engine && typeof engine.dispose === 'function') {
            engine.dispose();
            delete (window as any)[activeEngineKey];
        }
    }
    
    // Find requested overlay
    const overlay = OVERLAY_OPTIONS.find(option => option.id === overlayId);
    if (!overlay) {
        console.error(`Overlay with ID '${overlayId}' not found`);
        return;
    }
    
    console.log(`Applying overlay: ${overlay.name}`);
    
    // Map overlay ID to ParticleType
    const typeMap: Record<string, ParticleType> = {
        'snow': ParticleType.SNOW,
        'rain': ParticleType.RAIN,
        'leaves': ParticleType.LEAF,
        'sakura': ParticleType.SAKURA,
        'hearts': ParticleType.HEART,
        'stars': ParticleType.STAR
    };
    
    const particleType = typeMap[overlayId];
    
    if (!particleType) {
        console.error(`Unknown particle type for overlay: ${overlayId}`);
        return;
    }
    
    // Convert overlay config to particle options
    const options = convertConfigToParticleOptions(overlay.config);
    
    // Initialize the animation
    initParticles(containerId, particleType, options).then(() => {
        activeEngineKey = `particleEngine_${containerId}_${particleType}`;
        console.log(`Overlay applied: ${overlay.name}`);
        
        // Update URL with query param for current effect (without page reload)
        const url = new URL(window.location.href);
        url.searchParams.set('overlay', overlayId);
        window.history.replaceState({}, '', url.toString());
    }).catch(error => {
        console.error('Failed to initialize overlay:', error);
    });
}

/**
 * Convert overlay config to particle options
 * @param config - Overlay configuration
 * @returns Particle options object
 */
function convertConfigToParticleOptions(config: BaseAnimationOptions): ParticleOptions {
    // Create the options object with all required properties
  const options: ParticleOptions = {
    count: config.maxParticles,
    speed: { min: 1, max: 3 },
    size: { min: 5, max: 20 },
    opacity: { min: 0.6, max: 1.0 },
    fadeThreshold: 0.8,
    fadeSpeed: 0.02,
    assetPaths: []
  };
    
    // Add asset paths if available
    // if (config.svgPath || config.imagePath) {
    //     options.assetPaths = [];
    //     // Support arrays of paths
    //     if (typeof config.svgPath === 'string') {
    //         options.assetPaths.push(config.svgPath);
    //     } else if (Array.isArray(config.svgPath)) {
    //         options.assetPaths.push(...config.svgPath);
    //     }
        
    //     if (typeof config.imagePath === 'string') {
    //         options.assetPaths.push(config.imagePath);
    //     } else if (Array.isArray(config.imagePath)) {
    //         options.assetPaths.push(...config.imagePath);
    //     }
    // }
    
    // Handle asset paths and directories
    if (config.assetDirectory) {
        // If a directory is specified, add it as a single path
        // The asset loader will handle scanning the directory
        options.assetPaths = [config.assetDirectory];
    } else {
        // Handle individual paths
        if (config.svgPath) {
        if (Array.isArray(config.svgPath)) {
            options.assetPaths.push(...config.svgPath);
        } else {
            options.assetPaths.push(config.svgPath);
        }
        }
        
        if (config.imagePath) {
        if (Array.isArray(config.imagePath)) {
            options.assetPaths.push(...config.imagePath);
        } else {
            options.assetPaths.push(config.imagePath);
        }
        }
    }
    
    // Add fallback image if specified
    if (config.fallbackImage && options.assetPaths.length === 0) {
        options.assetPaths.push(config.fallbackImage);
    }
    // Add size range if available
    const sizeConfig = config as any;
    if (sizeConfig.sizeRange) {
        options.size = {
            min: sizeConfig.sizeRange[0],
            max: sizeConfig.sizeRange[1]
        };
    }
    
    // Add fall speed range if available
    if (sizeConfig.fallSpeedRange) {
        options.speed = {
            min: sizeConfig.fallSpeedRange[0],
            max: sizeConfig.fallSpeedRange[1]
        };
    }
    
    // Add colors if available
    if (sizeConfig.colors) {
        options.colors = sizeConfig.colors;
    } else if (config.color) {
        options.colors = [config.color];
    }
    
    // Add rotation speed range if available
    if (sizeConfig.rotationSpeedRange) {
        options.rotation = {
            speed: (sizeConfig.rotationSpeedRange[0] + sizeConfig.rotationSpeedRange[1]) / 2
        };
    }
    
    // Add sway amplitude if available
    if (sizeConfig.swayAmplitude) {
        options.wind = sizeConfig.swayAmplitude;
    }
    
    // Add pulse range if available
    if (sizeConfig.pulseRange) {
        options.pulse = {
            min: sizeConfig.pulseRange[0],
            max: sizeConfig.pulseRange[1]
        };
    }
    
    // Add twinkle range if available
    if (sizeConfig.twinkleRange) {
        options.twinkle = {
            min: sizeConfig.twinkleRange[0],
            max: sizeConfig.twinkleRange[1]
        };
    }
    
    // Map render mode
    if (config.renderMode) {
        switch (config.renderMode) {
            case 'SVG':
                options.renderMode = ParticleAnimationRenderMode.SVG;
                break;
            case 'CANVAS':
                options.renderMode = ParticleAnimationRenderMode.CANVAS;
                break;
            case 'DOM':
                options.renderMode = ParticleAnimationRenderMode.IMAGE;
                break;
        }
    }
    
    return options;
}

/**
 * Disable any active overlay effects
 */
export function disableOverlays(): void {
    if (activeEngineKey) {
        const engine = (window as any)[activeEngineKey];
        if (engine && typeof engine.dispose === 'function') {
            engine.dispose();
            delete (window as any)[activeEngineKey];
            activeEngineKey = null;
            
            // Update URL to remove overlay param
            const url = new URL(window.location.href);
            url.searchParams.delete('overlay');
            window.history.replaceState({}, '', url.toString());
            
            console.log('Overlays disabled');
        }
    }
}
