// src/utils/animations/core/canvas-drawer.ts
import { Drawer } from './drawer-interface';
import { ParticleBase } from './particle-base';
import { ParticleType } from './types';

export class CanvasDrawer<T extends ParticleBase> implements Drawer<T> {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private images: HTMLImageElement[] = [];
    private particleType: ParticleType;
    
    /**
     * Creates a canvas-based drawer for particle rendering
     * @param containerId - ID of the container element
     * @param particleType - Type of particles to draw
     * @param imagePaths - Optional array of image paths for image-based particles
     */
    constructor(
        private readonly containerId: string,
        particleType: ParticleType,
        private readonly imagePaths: string[] = []
    ) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container with ID '${containerId}' not found`);
        }
        
        this.particleType = particleType;
        
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        container.appendChild(this.canvas);
        
        // Get context
        const context = this.canvas.getContext('2d');
        if (!context) {
            throw new Error('Failed to get 2D context from canvas');
        }
        this.ctx = context;
        
        // Configure canvas size
        this.resizeCanvas();
        
        // Add resize listener with debounce
        let resizeTimeout: number | null = null;
        window.addEventListener('resize', () => {
            if (resizeTimeout !== null) {
                window.clearTimeout(resizeTimeout);
            }
            resizeTimeout = window.setTimeout(() => {
                this.resizeCanvas();
            }, 200);
        });
    }
    
    /**
     * Resize canvas to match container dimensions
     */
    private resizeCanvas(): void {
        const container = document.getElementById(this.containerId);
        if (container) {
            const rect = container.getBoundingClientRect();
            // Set actual dimensions in pixels
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;
        }
    }
    
    /**
     * Initialize by loading necessary images
     */
    async initialize(): Promise<void> {
        if (this.imagePaths.length === 0) {
            return;
        }
        
        try {
            // Load all images concurrently
            const loadPromises = this.imagePaths.map(async (path) => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.onerror = () => {
                        console.warn(`Failed to load image: ${path}, creating fallback`);
                        // Create a fallback canvas-based image
                        const canvas = document.createElement('canvas');
                        canvas.width = 50;
                        canvas.height = 50;
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                            // Draw a simple shape as fallback
                            ctx.fillStyle = '#FFB7C5';  // Pink for sakura
                            ctx.beginPath();
                            ctx.arc(25, 25, 20, 0, Math.PI * 2);
                            ctx.fill();
                        }
                        const fallbackImg = new Image();
                        fallbackImg.src = canvas.toDataURL();
                        fallbackImg.onload = () => resolve(fallbackImg);
                    };
                    img.src = path;
                });
            });
            
            this.images = await Promise.all(loadPromises);
        } catch (error) {
            console.error('Image loading error:', error);
            throw error;
        }
    }
    
    /**
     * Draw a particle to the canvas
     * @param particle - Particle to draw
     */
    drawParticle(particle: T): void {
        const state = particle.getState();
        
        this.ctx.save();
        
        // Position at particle center
        this.ctx.translate(state.position.x, state.position.y);
        
        // Apply rotation if specified
        if (state.rotation) {
            this.ctx.rotate((state.rotation * Math.PI) / 180);
        }
        
        // Apply opacity
        this.ctx.globalAlpha = state.opacity;
        
        // Choose appropriate drawing method based on particle type and available resources
        if (this.images.length > 0) {
            // Image-based particle
            const imgIndex = Math.floor(Math.random() * this.images.length) % this.images.length;
            const img = this.images[imgIndex];
            
            // For sakura petals specifically, scale down to avoid pixelation
            let drawSize = state.size;
            if (this.particleType === ParticleType.SAKURA) {
              // Limit size to prevent pixelation
              drawSize = Math.min(30, state.size);
            }
            
            this.ctx.drawImage(
              img,
              -drawSize / 2,
              -drawSize / 2,
              drawSize,
              drawSize
            );
          } else {
            // Use specialized drawing functions based on particle type
            switch (this.particleType) {
                case ParticleType.HEART:
                    this.drawHeart(0, 0, state.size, state.color || '#FF4081');
                    break;
                    
                case ParticleType.LEAF:
                    this.drawLeaf(0, 0, state.size, state.color || '#795548');
                    break;
                    
                case ParticleType.SAKURA:
                    this.drawSakuraPetal(0, 0, state.size, state.color || '#FFB7C5');
                    break;
                    
                case ParticleType.RAIN:
                    this.drawRaindrop(0, 0, state.size, state.color || '#A3D5FF', state);
                    break;
                    
                case ParticleType.STAR:
                    this.drawStar(0, 0, state.size, state.color || '#FFFFFF');
                    break;
                    
                default:
                    // Simple circle as fallback
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, state.size / 2, 0, Math.PI * 2);
                    this.ctx.fillStyle = state.color || 'white';
                    this.ctx.fill();
                    break;
            }
        }
        
        this.ctx.restore();
    }
    
    /**
     * Draw a heart shape
     */
    private drawHeart(x: number, y: number, size: number, color: string): void {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + size / 4);
        
        // Left bump
        this.ctx.bezierCurveTo(
            x - size / 2, y - size / 2,
            x - size, y,
            x, y + size
        );
        
        // Right bump
        this.ctx.bezierCurveTo(
            x + size, y,
            x + size / 2, y - size / 2,
            x, y + size / 4
        );
        
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }
    
    /**
     * Draw a leaf shape
     */
    private drawLeaf(x: number, y: number, size: number, color: string): void {
        // Main leaf shape
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - size / 2);
        
        // Draw leaf outline
        this.ctx.bezierCurveTo(
            x + size / 3, y - size / 3,
            x + size / 2, y,
            x, y + size / 2
        );
        
        this.ctx.bezierCurveTo(
            x - size / 2, y,
            x - size / 3, y - size / 3,
            x, y - size / 2
        );
        
        // Fill leaf
        this.ctx.fillStyle = color;
        this.ctx.fill();
        
        // Draw leaf vein
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - size / 2);
        this.ctx.lineTo(x, y + size / 2);
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.lineWidth = size / 15;
        this.ctx.stroke();
        
        // Draw secondary veins
        const veins = 3;
        const maxVeins = 10; // Upper bound
        const safeVeins = Math.min(veins, maxVeins);
        
        for (let i = 1; i <= safeVeins; i++) {
            const yPos = y - size / 2 + (size * i) / (safeVeins + 1);
            
            this.ctx.beginPath();
            this.ctx.moveTo(x, yPos);
            this.ctx.lineTo(x + size / 3, yPos - size / 10);
            this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
            this.ctx.lineWidth = size / 25;
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(x, yPos);
            this.ctx.lineTo(x - size / 3, yPos - size / 10);
            this.ctx.stroke();
        }
    }
    
    /**
     * Draw a raindrop
     */
    private drawRaindrop(x: number, y: number, size: number, color: string, state: any): void {
        // Draw raindrop line (get length from state if available)
        const length = state.length || size * 4;
        
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - length / 2);
        this.ctx.lineTo(x, y + length / 2);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = size;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();
    }
    
    /**
     * Draw a sakura petal
     */
    private drawSakuraPetal(x: number, y: number, size: number, color: string): void {
        // Draw petal (simple oval shape)
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, size, size / 2, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        
        // Add detail line in the middle for more realism
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - size / 3);
        this.ctx.lineTo(x, y + size / 3);
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.lineWidth = size / 10;
        this.ctx.stroke();
    }
    
    /**
     * Draw a star shape
     */
    private drawStar(x: number, y: number, size: number, color: string): void {
        const spikes = 5;
        const outerRadius = size / 2;
        const innerRadius = size / 5;
        
        this.ctx.beginPath();
        
        for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI * i) / spikes;
            const pointX = x + radius * Math.sin(angle);
            const pointY = y + radius * Math.cos(angle);
            
            if (i === 0) {
                this.ctx.moveTo(pointX, pointY);
            } else {
                this.ctx.lineTo(pointX, pointY);
            }
        }
        
        this.ctx.closePath();
        this.ctx.fillStyle = color;
        this.ctx.fill();
        
        // Add a glow effect
        this.ctx.shadowBlur = size / 2;
        this.ctx.shadowColor = color;
    }
    
    /**
     * Clear the canvas
     */
    clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    /**
     * Release canvas resources
     */
    dispose(): void {
        if (this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}
