// src/utils/animations.snow.helper.ts
export type RenderMode = 'SVG' | 'CANVAS' | 'IMAGE';

export interface SnowflakeConfig {
    readonly MAX_PARTICLES: number;
    readonly SIZE_RANGE: [number, number];
    readonly DRIFT_AMPLITUDE: number;
    readonly OPACITY_RANGE: [number, number];
    readonly RECYCLE_OFFSET: number;
    readonly FALL_SPEED_RANGE: [number, number];
}

export const SNOW_CONFIG: SnowflakeConfig = {
    MAX_PARTICLES: 100,
    SIZE_RANGE: [2, 8],
    DRIFT_AMPLITUDE: 0.5,
    OPACITY_RANGE: [0.3, 1],
    RECYCLE_OFFSET: 50,
    FALL_SPEED_RANGE: [1, 3],
};

export class SnowAnimationEngine {
    private particles: SnowParticle[] = [];
    private animationFrameId: number | null = null;
    private lastFrameTime: number = 0;
    private canvasWidth: number;
    private canvasHeight: number;

    constructor(
        private readonly config: SnowflakeConfig,
        private readonly mode: RenderMode,
        private readonly canvas?: HTMLCanvasElement,
        private readonly ctx?: CanvasRenderingContext2D
    ) {
        this.validateParameters();
        
        // Set initial dimensions
        this.canvasWidth = this.canvas?.width || window.innerWidth;
        this.canvasHeight = this.canvas?.height || window.innerHeight;
        
        this.createParticles();
    }

    private validateParameters(): void {
        // NASA guideline: Add explicit validations with recovery actions
        if (!['SVG', 'CANVAS', 'IMAGE'].includes(this.mode)) {
            throw new Error(`Invalid render mode: ${this.mode}. Must be SVG, CANVAS, or IMAGE.`);
        }
        
        if (this.mode === 'CANVAS' && (!this.canvas || !this.ctx)) {
            throw new Error('Canvas and context required for CANVAS mode');
        }
        
        // Check config bounds
        if (this.config.MAX_PARTICLES <= 0 || this.config.MAX_PARTICLES > 1000) {
            throw new Error('MAX_PARTICLES must be between 1 and 1000');
        }
        
        if (this.config.SIZE_RANGE[0] > this.config.SIZE_RANGE[1]) {
            throw new Error('SIZE_RANGE lower bound must be less than or equal to upper bound');
        }
        
        if (this.config.FALL_SPEED_RANGE[0] > this.config.FALL_SPEED_RANGE[1]) {
            throw new Error('FALL_SPEED_RANGE lower bound must be less than or equal to upper bound');
        }
    }

    private createParticles(): void {
        for (let i = 0; i < this.config.MAX_PARTICLES; i++) {
            this.particles.push(new SnowParticle(this.config, this.canvasWidth, this.canvasHeight));
        }
    }

    public start(): void {
        if (this.animationFrameId) {
            console.warn('Animation already running.');
            return;
        }

        const animate = (timestamp: number) => {
            const deltaTime = timestamp - this.lastFrameTime;
            this.lastFrameTime = timestamp;
            
            // Limit delta time to prevent large jumps after tab inactivity
            const clampedDelta = Math.min(deltaTime, 100);
            
            this.updateParticles(clampedDelta);
            this.animationFrameId = requestAnimationFrame(animate);
        };

        this.lastFrameTime = performance.now();
        this.animationFrameId = requestAnimationFrame(animate);
    }

    private updateParticles(deltaTime: number): void {
        const deltaSeconds = deltaTime / 1000;

        for (const particle of this.particles) {
            particle.update(deltaSeconds, this.canvasWidth, this.canvasHeight);
            if (particle.shouldReset) {
                particle.reset(this.canvasWidth, this.canvasHeight);
            }
        }
    }
    
    /**
     * Resize the animation area
     * @param width - New width
     * @param height - New height
     */
    public resize(width: number, height: number): void {
        this.canvasWidth = width;
        this.canvasHeight = height;
        
        // Reposition particles that would be out of bounds
        for (const particle of this.particles) {
            if (particle.x > width || particle.y > height) {
                particle.reset(width, height);
            }
        }
    }

    public getParticles(): ReadonlyArray<SnowParticle> {
        return this.particles;
    }
    
    public getWidth(): number {
        return this.canvasWidth;
    }
    
    public getHeight(): number {
        return this.canvasHeight;
    }

    public stop(): void {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
}

export class SnowParticle {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    baseX: number;
    shouldReset = false;
    
    // For SVG/Image rotation
    rotation: number = 0;
    rotationSpeed: number = 0;

    constructor(
        private readonly config: SnowflakeConfig,
        width: number,
        height: number
    ) {
        // Initialize all fields explicitly to avoid any undefined state
        this.x = 0;
        this.y = 0;
        this.size = 0;
        this.speed = 0;
        this.opacity = 0;
        this.baseX = 0;
        
        // Call reset to set all values properly
        this.reset(width, height);
    }

    reset(width: number, height: number): void {
        // Safety checks to prevent division by zero or invalid values
        if (width <= 0 || height <= 0) {
            width = Math.max(1, width);
            height = Math.max(1, height);
            console.warn('Invalid dimensions provided to SnowParticle.reset()');
        }
        
        this.x = Math.random() * width;
        this.y = -Math.random() * height * 0.5; // Start above the screen
        
        // Apply size range with bounds checking
        const sizeRange = this.config.SIZE_RANGE;
        this.size = Math.random() * 
            (sizeRange[1] - sizeRange[0]) + 
            sizeRange[0];
            
        // Apply fall speed range with bounds checking
        const speedRange = this.config.FALL_SPEED_RANGE;
        this.speed = Math.random() * 
            (speedRange[1] - speedRange[0]) + 
            speedRange[0];
        
        // Apply opacity range    
        const opacityRange = this.config.OPACITY_RANGE;
        this.opacity = Math.random() * 
            (opacityRange[1] - opacityRange[0]) + 
            opacityRange[0];
            
        this.baseX = this.x;
        this.shouldReset = false;
        
        // Set rotation properties for SVG/Image rendering
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2; // -1 to 1
    }

    update(deltaTime: number, width: number, height: number): void {
        // NASA guideline: Fixed upper bounds on iterations
        if (deltaTime > 0.1) {
            // Limit large time steps to prevent large jumps
            deltaTime = 0.1;
        }
        
        // Update position
        this.y += this.speed * deltaTime * 60;
        this.x = this.baseX + Math.sin(this.y * 0.01) * this.config.DRIFT_AMPLITUDE * 50;
        
        // Update rotation for SVG/Image rendering
        this.rotation += this.rotationSpeed * deltaTime * 60;
        
        // Check if particle needs to be reset
        if (this.y > height + this.config.RECYCLE_OFFSET) {
            this.shouldReset = true;
        }
        
        // Handle out-of-bounds on x-axis
        if (this.x < -this.size || this.x > width + this.size) {
            this.x = this.baseX; // Reset x position if drifted too far
        }
    }
}
export interface SVGOptions {
    paths?: string[];           // Array of SVG file paths
    inlineSVGs?: string[];      // Array of inline SVG strings
    color?: string;             // Color to apply to SVGs
    randomizeSelection?: boolean; // Whether to randomly select SVGs for particles
}