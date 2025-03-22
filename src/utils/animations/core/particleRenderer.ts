// src/utils/animations/core/particleRenderer.ts

import { 
    ParticleConfig, 
    AnimationRenderMode, 
    ParticleType 
  } from '../../../types/animations';
  
  /**
   * Maximum batch size for DOM operations
   */
  const MAX_BATCH_SIZE = 50;
  
  /**
   * Interface for renderer configuration
   */
  interface RendererConfig {
    container: HTMLElement;
    canvas?: HTMLCanvasElement;
    svgContainer?: SVGElement;
    imageContainer?: HTMLDivElement;
    assets?: (SVGElement | HTMLImageElement)[];
  }
  
  /**
   * Class responsible for rendering particles using different methods
   */
  export class ParticleRenderer {
    private container: HTMLElement;
    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private svgContainer: SVGElement | null = null;
    private imageContainer: HTMLDivElement | null = null;
    private assets: (SVGElement | HTMLImageElement)[] = [];
    private renderedElements: Map<number, HTMLElement | SVGElement> = new Map();
    private renderMode: AnimationRenderMode = AnimationRenderMode.CANVAS;
    private particleType: ParticleType;
  
    /**
     * Creates a new ParticleRenderer instance
     * 
     * @param config - Renderer configuration
     * @param particleType - Type of particles to render
     */
    constructor(config: RendererConfig, particleType: ParticleType) {
      // Validate inputs
      if (!config.container) {
        throw new Error("Container element required for renderer");
      }
  
      this.container = config.container;
      this.particleType = particleType;
      
      // Set up rendering elements based on provided config
      if (config.canvas) {
        this.canvas = config.canvas;
        const context = this.canvas.getContext('2d');
        if (!context) {
          throw new Error("Failed to get canvas 2D context");
        }
        this.ctx = context;
      }
      
      if (config.svgContainer) {
        this.svgContainer = config.svgContainer;
      }
      
      if (config.imageContainer) {
        this.imageContainer = config.imageContainer;
      }
      
      if (config.assets) {
        this.assets = [...config.assets];
      }
    }
  
    /**
     * Initializes the renderer for a specific rendering mode
     * 
     * @param mode - Rendering mode to initialize
     * @returns Boolean indicating success
     */
    public initialize(mode: AnimationRenderMode): boolean {
      // Clean up previous mode if different
      if (this.renderMode !== mode) {
        this.cleanup();
      }
      
      this.renderMode = mode;
      
      try {
        switch (mode) {
          case AnimationRenderMode.CANVAS:
            return this.initializeCanvas();
          case AnimationRenderMode.SVG:
            return this.initializeSvg();
          case AnimationRenderMode.IMAGE:
            return this.initializeImage();
          default:
            console.error(`Unsupported render mode: ${mode}`);
            return false;
        }
      } catch (error) {
        console.error(`Failed to initialize renderer: ${error}`);
        return false;
      }
    }
  
    /**
     * Initializes canvas renderer
     * 
     * @returns Boolean indicating success
     */
    private initializeCanvas(): boolean {
      if (!this.canvas) {
        // Create canvas if it doesn't exist
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particle-canvas';
        this.canvas.width = this.container.clientWidth || window.innerWidth;
        this.canvas.height = this.container.clientHeight || window.innerHeight;
        this.container.appendChild(this.canvas);
        
        const context = this.canvas.getContext('2d');
        if (!context) {
          console.error("Failed to get canvas 2D context");
          return false;
        }
        this.ctx = context;
      }
      
      return !!this.ctx;
    }
  
    /**
     * Initializes SVG renderer
     * 
     * @returns Boolean indicating success
     */
    private initializeSvg(): boolean {
      if (!this.svgContainer) {
        // Create SVG container if it doesn't exist
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'particle-svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.pointerEvents = 'none';
        this.container.appendChild(svg);
        this.svgContainer = svg;
      }
      
      return !!this.svgContainer;
    }
  
    /**
     * Initializes image renderer
     * 
     * @returns Boolean indicating success
     */
    private initializeImage(): boolean {
      if (!this.imageContainer) {
        // Create image container if it doesn't exist
        const div = document.createElement('div');
        div.className = 'particle-image-container';
        div.style.position = 'absolute';
        div.style.top = '0';
        div.style.left = '0';
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.pointerEvents = 'none';
        div.style.overflow = 'hidden';
        this.container.appendChild(div);
        this.imageContainer = div;
      }
      
      return !!this.imageContainer;
    }
  
    /**
     * Renders particles using the current render mode
     * 
     * @param particles - Array of particle configurations to render
     * @returns Boolean indicating successful rendering
     */
    public render(particles: ParticleConfig[]): boolean {
      if (!particles || particles.length === 0) {
        return true; // Nothing to render is still successful
      }
      
      // Enforce upper bound on particles length
      const maxParticles = 5000;
      if (particles.length > maxParticles) {
        console.warn(`Too many particles (${particles.length}), limiting to ${maxParticles}`);
        particles = particles.slice(0, maxParticles);
      }
      
      try {
        switch (this.renderMode) {
          case AnimationRenderMode.CANVAS:
            return this.renderCanvas(particles);
          case AnimationRenderMode.SVG:
            return this.renderSvg(particles);
          case AnimationRenderMode.IMAGE:
            return this.renderImages(particles);
          default:
            console.error(`Unsupported render mode: ${this.renderMode}`);
            return false;
        }
      } catch (error) {
        console.error(`Render error: ${error}`);
        return false;
      }
    }
  
    /**
     * Renders particles on canvas
     * 
     * @param particles - Array of particle configurations to render
     * @returns Boolean indicating successful rendering
     */
    private renderCanvas(particles: ParticleConfig[]): boolean {
      if (!this.ctx || !this.canvas) {
        return false;
      }
      
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Create a bounded loop with explicit limit check
      for (let i = 0; i < particles.length; i++) {
        const maxParticles = 5000;
        if (i >= maxParticles) {
          console.error("Particle index exceeded maximum bound");
          break;
        }
        
        const particle = particles[i];
        
        // Draw particle based on type
        this.ctx.globalAlpha = particle.opacity;
        this.ctx.fillStyle = particle.color || '#FFFFFF';
        
        // Apply any rotation
        if (particle.rotation) {
          this.ctx.save();
          this.ctx.translate(particle.position.x, particle.position.y);
          this.ctx.rotate((particle.rotation * Math.PI) / 180);
          
          this.drawParticleShape(this.ctx, 0, 0, particle);
          
          this.ctx.restore();
        } else {
          this.drawParticleShape(
            this.ctx, 
            particle.position.x, 
            particle.position.y, 
            particle
          );
        }
      }
      
      return true;
    }
  
    /**
     * Draws a particle shape based on particle type
     * 
     * @param ctx - Canvas rendering context
     * @param x - X position
     * @param y - Y position
     * @param particle - Particle configuration
     */
    private drawParticleShape(
      ctx: CanvasRenderingContext2D, 
      x: number, 
      y: number, 
      particle: ParticleConfig
    ): void {
      const size = particle.size;
      const halfSize = size / 2;
      
      switch (this.particleType) {
        case ParticleType.SNOW:
          this.drawSnowflake(ctx, x, y, size);
          break;
          
        case ParticleType.RAIN:
          this.drawRaindrop(ctx, x, y, size);
          break;
          
        case ParticleType.SAKURA:
          this.drawSakura(ctx, x, y, size);
          break;
          
        case ParticleType.LEAF:
          this.drawLeaf(ctx, x, y, size);
          break;
          
        case ParticleType.HEART:
          this.drawHeart(ctx, x, y, size);
          break;
          
        case ParticleType.STAR:
          this.drawStar(ctx, x, y, size);
          break;
          
        default:
          // Default to circle if unknown type
          ctx.beginPath();
          ctx.arc(x, y, halfSize, 0, Math.PI * 2);
          ctx.fill();
          break;
      }
    }
  
    /**
     * Draws a snowflake shape
     */
    private drawSnowflake(
      ctx: CanvasRenderingContext2D, 
      x: number, 
      y: number, 
      size: number
    ): void {
      const halfSize = size / 2;
      
      // Draw a simple snowflake
      ctx.beginPath();
      
      // Draw the main cross
      ctx.moveTo(x - halfSize, y);
      ctx.lineTo(x + halfSize, y);
      ctx.moveTo(x, y - halfSize);
      ctx.lineTo(x, y + halfSize);
      
      // Draw the diagonal cross
      ctx.moveTo(x - halfSize * 0.7, y - halfSize * 0.7);
      ctx.lineTo(x + halfSize * 0.7, y + halfSize * 0.7);
      ctx.moveTo(x + halfSize * 0.7, y - halfSize * 0.7);
      ctx.lineTo(x - halfSize * 0.7, y + halfSize * 0.7);
      
      ctx.stroke();
      
      // Add center circle
      ctx.beginPath();
      ctx.arc(x, y, halfSize * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
  
    /**
     * Draws a raindrop shape
     */
    private drawRaindrop(
      ctx: CanvasRenderingContext2D, 
      x: number, 
      y: number, 
      size: number
    ): void {
      const length = size * 2;
      
      // Draw a simple raindrop line
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + length);
      ctx.stroke();
    }
  
    /**
     * Draws a sakura petal shape
     */
    private drawSakura(
      ctx: CanvasRenderingContext2D, 
      x: number, 
      y: number, 
      size: number
    ): void {
      const halfSize = size / 2;
      
      // Draw a simple 5-petal flower
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        const pX = x + Math.cos(angle) * halfSize;
        const pY = y + Math.sin(angle) * halfSize;
        
        if (i === 0) {
          ctx.moveTo(pX, pY);
        } else {
          ctx.lineTo(pX, pY);
        }
      }
      ctx.closePath();
      ctx.fill();
      
      // Add center circle
      ctx.beginPath();
      ctx.arc(x, y, halfSize * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = particle.color || "#FFF8F9";
      ctx.fill();
    }
  
    /**
     * Draws a leaf shape
     */
    private drawLeaf(
      ctx: CanvasRenderingContext2D, 
      x: number, 
      y: number, 
      size: number
    ): void {
      const halfSize = size / 2;
      
      // Simple leaf shape
      ctx.beginPath();
      ctx.ellipse(x, y, halfSize, size, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw stem/vein
      ctx.beginPath();
      ctx.moveTo(x, y - halfSize);
      ctx.lineTo(x, y + halfSize);
      ctx.strokeStyle = "#5D4037";
      ctx.stroke();
    }
  
    /**
     * Draws a heart shape
     */
    private drawHeart(
      ctx: CanvasRenderingContext2D, 
      x: number, 
      y: number, 
      size: number
    ): void {
      const halfSize = size / 2;
      
      // Draw a heart shape
      ctx.beginPath();
      ctx.moveTo(x, y + halfSize * 0.7);
      ctx.bezierCurveTo(
        x, y + halfSize * 0.3,
        x - halfSize, y - halfSize * 0.5,
        x - halfSize, y - halfSize * 0.5
      );
      ctx.bezierCurveTo(
        x - halfSize, y - halfSize,
        x, y - halfSize,
        x, y - halfSize * 0.7
      );
      ctx.bezierCurveTo(
        x, y - halfSize,
        x + halfSize, y - halfSize,
        x + halfSize, y - halfSize * 0.5
      );
      ctx.bezierCurveTo(
        x + halfSize, y - halfSize * 0.5,
        x, y + halfSize * 0.3,
        x, y + halfSize * 0.7
      );
      ctx.closePath();
      ctx.fill();
    }
  
    /**
     * Draws a star shape
     */
    private drawStar(
      ctx: CanvasRenderingContext2D, 
      x: number, 
      y: number, 
      size: number
    ): void {
      const halfSize = size / 2;
      const spikes = 5;
      const outerRadius = halfSize;
      const innerRadius = halfSize * 0.4;
      
      let rot = (Math.PI / 2) * 3;
      let step = Math.PI / spikes;
      
      ctx.beginPath();
      ctx.moveTo(x, y - outerRadius);
      
      for (let i = 0; i < spikes; i++) {
        const maxSpikes = 12;
        if (i >= maxSpikes) {
          console.error("Spike index exceeded maximum bound");
          break;
        }
        
        let x1 = x + Math.cos(rot) * outerRadius;
        let y1 = y + Math.sin(rot) * outerRadius;
        ctx.lineTo(x1, y1);
        rot += step;
        
        x1 = x + Math.cos(rot) * innerRadius;
        y1 = y + Math.sin(rot) * innerRadius;
        ctx.lineTo(x1, y1);
        rot += step;
      }
      
      ctx.lineTo(x, y - outerRadius);
      ctx.closePath();
      ctx.fill();
    }
  
    /**
     * Renders particles using SVG elements
     * 
     * @param particles - Array of particle configurations to render
     * @returns Boolean indicating successful rendering
     */
    private renderSvg(particles: ParticleConfig[]): boolean {
      if (!this.svgContainer) {
        return false;
      }
      
      // Track which particles still exist
      const currentIds = new Set<number>();
      
      // Process particles in batches to prevent layout thrashing
      for (let i = 0; i < particles.length; i += MAX_BATCH_SIZE) {
        const maxIndex = Math.min(i + MAX_BATCH_SIZE, particles.length);
        
        for (let j = i; j < maxIndex; j++) {
          const particle = particles[j];
          currentIds.add(particle.id);
          
          // Get existing element or create new one
          let element = this.renderedElements.get(particle.id) as SVGElement;
          
          if (!element) {
            element = this.createSvgElement(particle);
            if (!element) {
              continue;
            }
            
            this.svgContainer.appendChild(element);
            this.renderedElements.set(particle.id, element);
          }
          
          // Update element properties
          this.updateSvgElement(element, particle);
        }
      }
      
      // Remove elements for particles that no longer exist
      const elementsToRemove: number[] = [];
      this.renderedElements.forEach((element, id) => {
        if (!currentIds.has(id)) {
          elementsToRemove.push(id);
        }
      });
      
      // Process removals in batches
      for (let i = 0; i < elementsToRemove.length; i += MAX_BATCH_SIZE) {
        const maxIndex = Math.min(i + MAX_BATCH_SIZE, elementsToRemove.length);
        
        for (let j = i; j < maxIndex; j++) {
          const id = elementsToRemove[j];
          const element = this.renderedElements.get(id);
          
          if (element && element.parentNode) {
            element.parentNode.removeChild(element);
          }
          
          this.renderedElements.delete(id);
        }
      }
      
      return true;
    }
  
    /**
     * Creates an SVG element for a particle
     * 
     * @param particle - Particle configuration
     * @returns SVG element for the particle
     */
    private createSvgElement(particle: ParticleConfig): SVGElement | null {
      const assetIndex = this.getAssetIndex(particle);
      
      // Use an asset if available
      if (assetIndex !== -1 && this.assets[assetIndex] instanceof SVGElement) {
        const assetClone = this.assets[assetIndex].cloneNode(true) as SVGElement;
        assetClone.id = `particle-${particle.id}`;
        return assetClone;
      }
      
      // Otherwise create a basic shape based on particle type
      const svgNS = "http://www.w3.org/2000/svg";
      let element: SVGElement;
      
      switch (this.particleType) {
        case ParticleType.SNOW:
          element = document.createElementNS(svgNS, "circle");
          element.setAttribute("r", (particle.size / 2).toString());
          break;
          
        case ParticleType.RAIN:
          element = document.createElementNS(svgNS, "line");
          element.setAttribute("y2", particle.size.toString());
          element.setAttribute("stroke-width", "1");
          break;
          
        case ParticleType.HEART:
          element = document.createElementNS(svgNS, "path");
          const halfSize = particle.size / 2;
          element.setAttribute(
            "d", 
            `M ${halfSize},0 A ${halfSize/2},${halfSize/2} 0 0,1 ${particle.size},${halfSize/2} A ${halfSize/2},${halfSize/2} 0 0,1 ${halfSize},${particle.size} A ${halfSize/2},${halfSize/2} 0 0,1 0,${halfSize/2} A ${halfSize/2},${halfSize/2} 0 0,1 ${halfSize},0 Z`
          );
          break;
          
        default:
          // Default to circle
          element = document.createElementNS(svgNS, "circle");
          element.setAttribute("r", (particle.size / 2).toString());
          break;
      }
      
      element.id = `particle-${particle.id}`;
      element.setAttribute("fill", particle.color || "#FFFFFF");
      element.setAttribute("opacity", particle.opacity.toString());
      
      return element;
    }
  
    /**
     * Updates SVG element properties based on particle configuration
     * 
     * @param element - SVG element to update
     * @param particle - Particle configuration
     */
    private updateSvgElement(element: SVGElement, particle: ParticleConfig): void {
      // Apply position and transformation
      if (element.tagName === "circle") {
        element.setAttribute("cx", particle.position.x.toString());
        element.setAttribute("cy", particle.position.y.toString());
      } else if (element.tagName === "line") {
        element.setAttribute("x1", particle.position.x.toString());
        element.setAttribute("y1", particle.position.y.toString());
        element.setAttribute("x2", particle.position.x.toString());
        element.setAttribute("y2", (particle.position.y + particle.size).toString());
      } else {
        // For other elements, use a transform
        element.setAttribute(
          "transform", 
          `translate(${particle.position.x - particle.size/2}, ${particle.position.y - particle.size/2})`
        );
      }
      
      // Apply rotation if specified
      if (particle.rotation) {
        const currentTransform = element.getAttribute("transform") || "";
        element.setAttribute(
          "transform",
          `${currentTransform} rotate(${particle.rotation}, ${particle.position.x}, ${particle.position.y})`
        );
      }
      
      // Update opacity
      element.setAttribute("opacity", particle.opacity.toString());
    }
  
    /**
     * Renders particles using HTML images
     * 
     * @param particles - Array of particle configurations to render
     * @returns Boolean indicating successful rendering
     */
    private renderImages(particles: ParticleConfig[]): boolean {
      if (!this.imageContainer) {
        return false;
      }
      
      // Track which particles still exist
      const currentIds = new Set<number>();
      
      // Process particles in batches to prevent layout thrashing
      for (let i = 0; i < particles.length; i += MAX_BATCH_SIZE) {
        const maxIndex = Math.min(i + MAX_BATCH_SIZE, particles.length);
        
        for (let j = i; j < maxIndex; j++) {
          const particle = particles[j];
          currentIds.add(particle.id);
          
          // Get existing element or create new one
          let element = this.renderedElements.get(particle.id) as HTMLElement;
          
          if (!element) {
            element = this.createImageElement(particle);
            if (!element) {
              continue;
            }
            
            this.imageContainer.appendChild(element);
            this.renderedElements.set(particle.id, element);
          }
          
          // Update element properties
          this.updateImageElement(element, particle);
        }
      }
      
      // Remove elements for particles that no longer exist
      const elementsToRemove: number[] = [];
      this.renderedElements.forEach((element, id) => {
        if (!currentIds.has(id)) {
          elementsToRemove.push(id);
        }
      });
      
      // Process removals in batches
      for (let i = 0; i < elementsToRemove.length; i += MAX_BATCH_SIZE) {
        const maxIndex = Math.min(i + MAX_BATCH_SIZE, elementsToRemove.length);
        
        for (let j = i; j < maxIndex; j++) {
          const id = elementsToRemove[j];
          const element = this.renderedElements.get(id);
          
          if (element && element.parentNode) {
            element.parentNode.removeChild(element);
          }
          
          this.renderedElements.delete(id);
        }
      }
      
      return true;
    }
  
    /**
     * Creates an HTML element for an image particle
     * 
     * @param particle - Particle configuration
     * @returns HTML element for the particle
     */
    private createImageElement(particle: ParticleConfig): HTMLElement | null {
      const assetIndex = this.getAssetIndex(particle);
      
      // Create image element
      const element = document.createElement('div');
      element.id = `particle-${particle.id}`;
      element.className = 'particle-image';
      element.style.position = 'absolute';
      element.style.width = `${particle.size}px`;
      element.style.height = `${particle.size}px`;
      element.style.backgroundSize = 'contain';
      element.style.backgroundRepeat = 'no-repeat';
      element.style.backgroundPosition = 'center';
      
      // Use an asset if available
      if (assetIndex !== -1 && this.assets[assetIndex] instanceof HTMLImageElement) {
        element.style.backgroundImage = `url(${(this.assets[assetIndex] as HTMLImageElement).src})`;
      } else {
        // Otherwise use a colored div based on particle type
        element.style.backgroundColor = particle.color || '#FFFFFF';
        element.style.borderRadius = '50%';
      }
      
      return element;
    }
  
    /**
     * Updates HTML element properties based on particle configuration
     * 
     * @param element - HTML element to update
     * @param particle - Particle configuration
     */
    private updateImageElement(element: HTMLElement, particle: ParticleConfig): void {
      // Apply position
      element.style.left = `${particle.position.x - particle.size/2}px`;
      element.style.top = `${particle.position.y - particle.size/2}px`;
      
      // Apply opacity
      element.style.opacity = particle.opacity.toString();
      
      // Apply rotation if specified
      if (particle.rotation !== undefined) {
        element.style.transform = `rotate(${particle.rotation}deg)`;
      }
    }
  
    /**
     * Gets the index of an asset to use for a particle
     * 
     * @param particle - Particle configuration
     * @returns Index of asset to use, or -1 if none
     */
    private getAssetIndex(particle: ParticleConfig): number {
      if (!this.assets.length) {
        return -1;
      }
      
      // Use provided asset index if available
      if (particle.assetIndex !== undefined) {
        return Math.min(particle.assetIndex, this.assets.length - 1);
      }
      
      // Otherwise use ID as a pseudo-random selector
      return particle.id % this.assets.length;
    }
  
    /**
     * Resizes the renderer to match container dimensions
     */
    public resize(): void {
      const width = this.container.clientWidth || window.innerWidth;
      const height = this.container.clientHeight || window.innerHeight;
      
      // Resize canvas if it exists
      if (this.canvas) {
        this.canvas.width = width;
        this.canvas.height = height;
      }
      
      // Update SVG container if it exists
      if (this.svgContainer) {
        this.svgContainer.setAttribute('viewBox', `0 0 ${width} ${height}`);
      }
    }
  
    /**
     * Cleans up all rendering resources
     */
    public cleanup(): void {
      // Remove all rendered elements
      this.renderedElements.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
      this.renderedElements.clear();
      
      // Remove canvas if it exists
      if (this.canvas && this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
        this.canvas = null;
        this.ctx = null;
      }
      
      // Remove SVG container if it exists
      if (this.svgContainer && this.svgContainer.parentNode) {
        this.svgContainer.parentNode.removeChild(this.svgContainer);
        this.svgContainer = null;
      }
      
      // Remove image container if it exists
      if (this.imageContainer && this.imageContainer.parentNode) {
        this.imageContainer.parentNode.removeChild(this.imageContainer);
        this.imageContainer = null;
      }
    }
  }
  