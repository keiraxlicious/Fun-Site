// src/utils/animations.snow.drawer.ts
import { SnowAnimationEngine, SnowParticle, RenderMode, SVGOptions } from './animations.snow.helper';

/**
 * Interface for snow drawer implementations
 */
export interface SnowDrawer {
    /**
     * Draws a single frame of the snow animation
     */
    drawFrame(): void;
}

/**
 * Factory options for creating snow drawers
 */
interface SnowDrawerOptions {
    ctx: CanvasRenderingContext2D;
    engine: SnowAnimationEngine;
    color: string;
    svgPath?: string;
    imagePath?: string;
}

/**
 * Factory function to create the appropriate snow drawer based on render mode
 * @param mode - The rendering mode (CANVAS, SVG, IMAGE)
 * @param options - Options for the drawer
 * @returns The appropriate snow drawer implementation
 * @throws {Error} If an invalid mode is provided or required options are missing
 */
export function createSnowDrawer(mode: RenderMode, options: SnowDrawerOptions): SnowDrawer {
    // NASA guideline: Validate parameters
    if (!options.ctx) {
        throw new Error('Context is required for all drawing modes');
    }
    
    if (!options.engine) {
        throw new Error('SnowAnimationEngine is required for all drawing modes');
    }
    
    // Create appropriate drawer based on mode
    switch (mode) {
        case 'CANVAS':
            return new CanvasSnowDrawer(options.ctx, options.engine, options.color);
        case 'SVG':
            if (!options.svgPath) {
                throw new Error('SVG path is required for SVG rendering mode');
            }
            return new SVGSnowDrawer(options.ctx, options.engine, options.color, options.svgPath);
        case 'IMAGE':
            if (!options.imagePath) {
                throw new Error('Image path is required for IMAGE rendering mode');
            }
            return new ImageSnowDrawer(options.ctx, options.engine, options.imagePath);
        default:
            // This should never happen due to type safety, but we'll check anyway
            throw new Error(`Unsupported render mode: ${mode}`);
    }
}

/**
 * Canvas implementation of snow drawer
 */
export class CanvasSnowDrawer implements SnowDrawer {
    constructor(
        private readonly ctx: CanvasRenderingContext2D,
        private readonly engine: SnowAnimationEngine,
        private readonly color: string = '#FFFFFF'
    ) {
        // NASA guideline: Validate parameters and handle errors
        if (!ctx) {
            throw new Error('Canvas context is required for CanvasSnowDrawer');
        }
        
        if (!engine) {
            throw new Error('SnowAnimationEngine is required for CanvasSnowDrawer');
        }
        
        // Parse color to ensure it's valid
        try {
            this.parseColor(color);
        } catch (error) {
            console.error('Invalid color format:', error);
            this.color = '#FFFFFF'; // Default to white on error
        }
    }

    public drawFrame(): void {
        const particles = this.engine.getParticles();
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        // NASA guideline: Fixed upper bounds on iterations
        const particleCount = particles.length;
        if (particleCount > 1000) {
            console.warn(`Excessive particle count: ${particleCount}`);
        }
        
        const { r, g, b } = this.parseColor(this.color);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = particles[i];
            // NASA guideline: Add assertions
            if (!this.isValidParticle(particle)) {
                console.warn('Invalid particle detected, skipping');
                continue;
            }
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity})`;
            this.ctx.fill();
        }
    }
    
    /**
     * Validates that a particle has all required properties and they are within bounds
     * @param particle - The particle to validate
     * @returns True if the particle is valid
     */
    private isValidParticle(particle: SnowParticle): boolean {
        return (
            particle !== null &&
            typeof particle.x === 'number' &&
            typeof particle.y === 'number' &&
            typeof particle.size === 'number' &&
            typeof particle.opacity === 'number' &&
            !isNaN(particle.x) &&
            !isNaN(particle.y) &&
            !isNaN(particle.size) &&
            !isNaN(particle.opacity) &&
            particle.size > 0 &&
            particle.opacity >= 0 &&
            particle.opacity <= 1
        );
    }
    
    /**
     * Parses a color string into RGB components
     * @param color - The color string (hex, rgb, or rgba)
     * @returns Object with r, g, b components (0-255)
     */
    private parseColor(color: string): { r: number; g: number; b: number } {
        // Handle hex colors
        if (color.startsWith('#')) {
            const hex = color.slice(1);
            const bigint = parseInt(hex, 16);
            
            if (hex.length === 3) {
                // #RGB format
                const r = ((bigint >> 8) & 15) * 17;
                const g = ((bigint >> 4) & 15) * 17;
                const b = (bigint & 15) * 17;
                return { r, g, b };
            } else {
                // #RRGGBB format
                const r = (bigint >> 16) & 255;
                const g = (bigint >> 8) & 255;
                const b = bigint & 255;
                return { r, g, b };
            }
        }
        
        // Handle rgb/rgba colors
        if (color.startsWith('rgb')) {
            const match = color.match(/\d+/g);
            if (match && match.length >= 3) {
                const r = parseInt(match[0], 10);
                const g = parseInt(match[1], 10);
                const b = parseInt(match[2], 10);
                return { r, g, b };
            }
        }
        
        // Default to white if parsing fails
        console.warn(`Could not parse color: ${color}, using white`);
        return { r: 255, g: 255, b: 255 };
    }
}
// Update in src/utils/animations.snow.drawer.ts

export class SVGSnowDrawer implements SnowDrawer {
    private svgElements: SVGElement[]  = [];
    private loadPromises: Promise<void>[] = [];
    private isLoaded = false;
    private particleSvgMap: Map<SnowParticle, number> = new Map();
    
    constructor(
        private readonly ctx: CanvasRenderingContext2D,
        private readonly engine: SnowAnimationEngine,
        private readonly color: string = '#FFFFFF',
        private readonly svgOptions: string | SVGOptions
    ) {
        // NASA guideline: Validate parameters
        if (!ctx) {
            throw new Error('Canvas context is required for SVGSnowDrawer');
        }
        
        if (!engine) {
            throw new Error('SnowAnimationEngine is required for SVGSnowDrawer');
        }
        
        // Initialize SVGs based on options
        this.initializeSVGs();
    }
    
    /**
     * Initializes SVGs based on the provided options
     */
    private initializeSVGs(): void {
        // Handle legacy string path
        if (typeof this.svgOptions === 'string') {
            this.loadPromises.push(this.loadSVG(this.svgOptions, 0));
            return;
        }
        
        // Handle array of paths
        if (this.svgOptions.paths && this.svgOptions.paths.length > 0) {
            this.svgOptions.paths.forEach((path, index) => {
                this.loadPromises.push(this.loadSVG(path, index));
            });
        }
        
        // Handle inline SVGs
        if (this.svgOptions.inlineSVGs && this.svgOptions.inlineSVGs.length > 0) {
            this.svgOptions.inlineSVGs.forEach((svgString, index) => {
                this.loadInlineSVG(svgString, index);
            });
        }
        
        // If no SVGs were provided, log an error
        if (this.loadPromises.length === 0 && this.svgElements.length === 0) {
            console.error('No SVGs provided to SVGSnowDrawer');
        }
        
        // Wait for all SVGs to load
        Promise.all(this.loadPromises)
            .then(() => {
                this.isLoaded = true;
                console.log(`Loaded ${this.svgElements.length} SVGs successfully`);
                
                // Apply color to all SVGs if specified
                if (typeof this.svgOptions !== 'string' && this.svgOptions.color) {
                    this.applySVGColor(this.svgOptions.color);
                } else {
                    this.applySVGColor(this.color);
                }
                
                // Map particles to SVGs
                this.mapParticlesToSVGs();
            })
            .catch(error => {
                console.error('Error loading SVGs:', error);
                this.isLoaded = false;
            });
    }
    
    /**
     * Maps each particle to an SVG element
     */
    private mapParticlesToSVGs(): void {
        const particles = this.engine.getParticles();
        const svgCount = this.svgElements.length;
        
        if (svgCount === 0) return;
        
        particles.forEach(particle => {
            // Randomly select an SVG for each particle or assign in sequence
            const randomize = typeof this.svgOptions !== 'string' && 
                              this.svgOptions.randomizeSelection !== false;
            
            const svgIndex = randomize
                ? Math.floor(Math.random() * svgCount)
                : particle.id % svgCount; // Use particle ID or create a unique ID
                
            this.particleSvgMap.set(particle, svgIndex);
        });
    }
    
    /**
     * Loads the SVG from the specified path
     * @param path - Path to the SVG file
     * @param index - Index to store the SVG at
     * @returns Promise that resolves when SVG is loaded
     */
    private async loadSVG(path: string, index: number): Promise<void> {
        try {
            const response = await fetch(path);
            
            if (!response.ok) {
                throw new Error(`Failed to load SVG: ${response.status} ${response.statusText}`);
            }
            
            const svgText = await response.text();
            this.parseAndStoreSVG(svgText, index);
            
        } catch (error) {
            console.error(`Error loading SVG at path ${path}:`, error);
            throw error;
        }
    }
    
    /**
     * Loads an inline SVG string
     * @param svgString - Inline SVG content
     * @param index - Index to store the SVG at
     */
    private loadInlineSVG(svgString: string, index: number): void {
        try {
            this.parseAndStoreSVG(svgString, index);
        } catch (error) {
            console.error('Error parsing inline SVG:', error);
        }
    }
    
    /**
     * Parses SVG string and stores the element
     * @param svgString - SVG content as string
     * @param index - Index to store the SVG at
     */
    private parseAndStoreSVG(svgString: string, index: number): void {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
        
        // Check for parsing errors
        const parserError = svgDoc.querySelector('parsererror');
        if (parserError) {
            throw new Error('SVG parsing error: ' + parserError.textContent);
        }
        
        // Store the SVG element
        this.svgElements[index] = svgDoc.documentElement;
    }
    
    /**
     * Applies the specified color to all SVGs
     * @param color - The color to apply
     */
    private applySVGColor(color: string): void {
        this.svgElements.forEach(svg => {
            if (!svg) return;
            
            // Find all shapes in the SVG
            const shapes = svg.querySelectorAll('path, circle, rect, ellipse, polygon, polyline');
            
            shapes.forEach(shape => {
                // Apply fill color
                shape.setAttribute('fill', color);
                
                // If stroke exists, update it too
                if (shape.hasAttribute('stroke')) {
                    shape.setAttribute('stroke', color);
                }
            });
        });
    }

    public async drawFrame(): Promise<void> {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        // If no SVGs are loaded, use fallback
        if (!this.isLoaded || this.svgElements.length === 0) {
            this.fallbackDraw();
            return;
        }
        
        const particles = this.engine.getParticles();
        
        // NASA guideline: Fixed upper bounds on iterations
        const particleCount = Math.min(particles.length, 1000);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = particles[i];
            
            // NASA guideline: Add assertions
            if (!this.isValidParticle(particle)) {
                continue;
            }
            
            // Get the SVG index for this particle
            const svgIndex = this.particleSvgMap.get(particle) || 0;
            const svg = this.svgElements[svgIndex % this.svgElements.length];
            
            if (!svg) {
                continue;
            }
            
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            
            // Position and scale
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate((particle.rotation * Math.PI) / 180);
            this.ctx.scale(particle.size / 24, particle.size / 24); // Assuming SVG is 24x24
            
            // Draw SVG using XMLSerializer to get string and Image data
            const svgString = new XMLSerializer().serializeToString(svg);
            const img = new Image();
            img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
            
            // Center the image
            this.ctx.drawImage(img, -12, -12, 24, 24);
            
            this.ctx.restore();
        }
    }
    private fallbackDraw(): void {
        const particles = this.engine.getParticles();
        const { r, g, b } = this.parseColor(this.color);
        
        for (const particle of particles) {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity})`;
            this.ctx.fill();
        }
    }
    private isValidParticle(particle: SnowParticle): boolean {
        return (
            particle !== null &&
            typeof particle.x === 'number' &&
            typeof particle.y === 'number' &&
            typeof particle.size === 'number' &&
            typeof particle.opacity === 'number' &&
            !isNaN(particle.x) &&
            !isNaN(particle.y) &&
            !isNaN(particle.size) &&
            !isNaN(particle.opacity) &&
            particle.size > 0 &&
            particle.opacity >= 0 &&
            particle.opacity <= 1
        );
    }
    private parseColor(color: string): { r: number; g: number; b: number } {
        // Handle hex colors
        if (color.startsWith('#')) {
            const hex = color.slice(1);
            const bigint = parseInt(hex, 16);
            
            if (hex.length === 3) {
                // #RGB format
                const r = ((bigint >> 8) & 15) * 17;
                const g = ((bigint >> 4) & 15) * 17;
                const b = (bigint & 15) * 17;
                return { r, g, b };
            } else {
                // #RRGGBB format
                const r = (bigint >> 16) & 255;
                const g = (bigint >> 8) & 255;
                const b = bigint & 255;
                return { r, g, b };
            }
        }
        
        // Handle rgb/rgba colors
        if (color.startsWith('rgb')) {
            const match = color.match(/\d+/g);
            if (match && match.length >= 3) {
                const r = parseInt(match[0], 10);
                const g = parseInt(match[1], 10);
                const b = parseInt(match[2], 10);
                return { r, g, b };
            }
        }
        
        // Default to white if parsing fails
        return { r: 255, g: 255, b: 255 };
    }
    // Rest of the methods (fallbackDraw, isValidParticle, parseColor) remain the same
    // ...
}

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
export class ImageSnowDrawer implements SnowDrawer {
    private image: HTMLImageElement | null = null;
    private isLoaded = false;
    
    constructor(
        private readonly ctx: CanvasRenderingContext2D,
        private readonly engine: SnowAnimationEngine,
        private readonly imagePath: string
    ) {
        // NASA guideline: Validate parameters
        if (!ctx) {
            throw new Error('Canvas context is required for ImageSnowDrawer');
        }
        
        if (!engine) {
            throw new Error('SnowAnimationEngine is required for ImageSnowDrawer');
        }
        
        if (!imagePath) {
            throw new Error('Image path is required for ImageSnowDrawer');
        }
        
        // Load the image
        this.loadImage();
    }
    
    /**
 * Loads the image from the specified path
 */
private loadImage(): void {
    this.image = new Image();
    this.image.onload = () => {
        this.isLoaded = true;
        console.log('Snow image loaded successfully');
    };
    this.image.onerror = (error) => {
        console.error('Failed to load snow image:', error);
        this.isLoaded = false;
    };
    this.image.src = this.imagePath;
}

public drawFrame(): void {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    
    // If image not loaded, fall back to circles
    if (!this.isLoaded || !this.image) {
        this.fallbackDraw();
        return;
    }
    
    const particles = this.engine.getParticles();
    
    // NASA guideline: Fixed upper bounds on iterations
    const particleCount = Math.min(particles.length, 1000);
    
    for (let i = 0; i < particleCount; i++) {
        const particle = particles[i];
        
        // NASA guideline: Add assertions
        if (!this.isValidParticle(particle)) {
            continue;
        }
        
        this.ctx.save();
        this.ctx.globalAlpha = particle.opacity;
        
        // Position and scale
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate((particle.rotation * Math.PI) / 180);
        
        // Draw image centered on particle position
        const size = particle.size * 2; // Double size for visibility
        this.ctx.drawImage(
            this.image,
            -size / 2,
            -size / 2,
            size,
            size
        );
        
        this.ctx.restore();
    }
}

/**
 * Fallback drawing method using circles if image fails to load
 */
private fallbackDraw(): void {
    const particles = this.engine.getParticles();
    
    for (const particle of particles) {
        // Skip invalid particles
        if (!this.isValidParticle(particle)) {
            continue;
        }
        
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        this.ctx.fill();
    }
}

/**
 * Validates that a particle has all required properties
 * @param particle - The particle to validate
 * @returns True if the particle is valid
 */
private isValidParticle(particle: SnowParticle): boolean {
    return (
        particle !== null &&
        typeof particle.x === 'number' &&
        typeof particle.y === 'number' &&
        typeof particle.size === 'number' &&
        typeof particle.opacity === 'number' &&
        !isNaN(particle.x) &&
        !isNaN(particle.y) &&
        !isNaN(particle.size) &&
        !isNaN(particle.opacity) &&
        particle.size > 0 &&
        particle.opacity >= 0 &&
        particle.opacity <= 1
    );
}
}

