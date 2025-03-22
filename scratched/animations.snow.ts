// src/utils/animations.snow.ts
import { SnowAnimationEngine, SNOW_CONFIG, RenderMode } from './animations.snow.helper';
import { createSnowDrawer } from './animations.snow.drawer';
import { SnowAnimationOptions } from '../src/types/interfaces';

/**
 * Initializes snow animation with configurable rendering options
 * @param canvas - The canvas element to render on
 * @param options - Configuration options for the snow animation
 * @throws {Error} If the canvas context cannot be retrieved or options are invalid
 */
export function initSnowAnimation(
    canvas: HTMLCanvasElement,
    options: SnowAnimationOptions
): void {
    // Validate options
    validateOptions(options, canvas);
    
    // Get and validate context
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Failed to get canvas rendering context');
    }

    // Setup canvas dimensions with proper DPR handling
    setupCanvas(canvas, ctx);

    // Create a custom config based on provided options
    const customConfig = {
        ...SNOW_CONFIG,
        MAX_PARTICLES: options.maxParticles ?? SNOW_CONFIG.MAX_PARTICLES,
        SIZE_RANGE: options.sizeRange ?? SNOW_CONFIG.SIZE_RANGE,
        FALL_SPEED_RANGE: options.fallSpeedRange ?? SNOW_CONFIG.FALL_SPEED_RANGE,
        DRIFT_AMPLITUDE: options.driftAmplitude ?? SNOW_CONFIG.DRIFT_AMPLITUDE
    };

    // Create engine and appropriate drawer
    const engine = new SnowAnimationEngine(
        customConfig, 
        options.renderMode,
        canvas, 
        ctx
    );
    
    const drawer = createSnowDrawer(
        options.renderMode,
        {
            ctx,
            engine,
            color: options.color,
            svgPath: options.svgPath,
            imagePath: options.imagePath
        }
    );

    // Animation loop with FPS monitoring
    let frameCount = 0;
    let lastFpsTime = performance.now();
    let fps = 0;
    
    // Store cleanup function for later use
    const cleanup = () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        engine.stop();
        window.removeEventListener('resize', resizeHandler);
    };
    
    const animate = () => {
        const now = performance.now();
        
        // Update FPS counter every second
        frameCount++;
        if (now - lastFpsTime >= 1000) {
            fps = Math.round((frameCount * 1000) / (now - lastFpsTime));
            frameCount = 0;
            lastFpsTime = now;
            // Optional: log or display FPS
        }
        
        drawer.drawFrame();
        animationFrameId = requestAnimationFrame(animate);
    };

    engine.start();
    let animationFrameId = requestAnimationFrame(animate);

    // Handle window resize
    const resizeHandler = debounce(() => {
        setupCanvas(canvas, ctx);
        engine.resize(canvas.width, canvas.height);
    }, 250);
    
    window.addEventListener('resize', resizeHandler);
    
    // Store cleanup function in canvas for later retrieval
    canvas.setAttribute('data-cleanup-function', 'true');
    (canvas as any)._snowCleanup = cleanup;
    
    // Return cleanup function
    return cleanup;
}

/**
 * Validates animation options for correctness
 * @param options - The animation options to validate
 * @param canvas - The canvas element to be used
 * @throws {Error} If options are invalid
 */
function validateOptions(options: SnowAnimationOptions, canvas: HTMLCanvasElement): void {
    if (!options) {
        throw new Error('Snow animation options are required');
    }
    
    if (!canvas) {
        throw new Error('Canvas element is required for snow animation');
    }
    
    if (options.renderMode === 'SVG' && !options.svgPath) {
        throw new Error('SVG path must be provided when using SVG render mode');
    }
    
    if (options.renderMode === 'IMAGE' && !options.imagePath) {
        throw new Error('Image path must be provided when using IMAGE render mode');
    }
    
    if (options.maxParticles && (options.maxParticles < 1 || options.maxParticles > 1000)) {
        throw new Error('maxParticles must be between 1 and 1000');
    }
}

/**
 * Sets up canvas with proper dimensions and device pixel ratio
 * @param canvas - The canvas element to set up
 * @param ctx - The rendering context
 */
function setupCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.offsetWidth;
    const displayHeight = canvas.offsetHeight;
    
    // Set canvas dimensions with DPR factored in
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    
    // Scale context to ensure correct rendering
    ctx.scale(dpr, dpr);
    
    // Reset display size to CSS pixels
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;
}

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 */
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: number | null = null;
    
    return function(...args: Parameters<T>): void {
        const later = () => {
            timeout = null;
            func(...args);
        };
        
        if (timeout !== null) {
            window.clearTimeout(timeout);
        }
        timeout = window.setTimeout(later, wait);
    };
}
