// src/utils/animations/core/svg-drawer.ts
import { Drawer } from './drawer-interface';
import { ParticleBase } from './particle-base';

import { AssetLoader } from './asset-loader';

export class SVGDrawer<T extends ParticleBase & { size?: number; rotation?: number; }> implements Drawer<T> {
  private svgContainer: HTMLDivElement;
  private svgElements: SVGElement[] = [];
  private svgTemplates: SVGElement[] = [];
  private readonly containerWidth: number;
  private readonly containerHeight: number;
  
  /**
   * Creates an SVG drawer for rendering SVG-based particles
   * @param containerId - ID of the container element
   * @param svgPaths - Array of paths to SVG files
   */
  constructor(
    private readonly containerId: string,
    private readonly svgPaths: string[]
  ) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with ID '${containerId}' not found`);
    }
    
    this.svgContainer = document.createElement('div');
    this.svgContainer.style.position = 'absolute';
    this.svgContainer.style.top = '0';
    this.svgContainer.style.left = '0';
    this.svgContainer.style.width = '100%';
    this.svgContainer.style.height = '100%';
    this.svgContainer.style.pointerEvents = 'none';
    this.svgContainer.style.overflow = 'hidden';
    container.appendChild(this.svgContainer);
    
    // Get dimensions of the container
    const rect = container.getBoundingClientRect();
    this.containerWidth = rect.width;
    this.containerHeight = rect.height;
  }

/**
 * Initialize by loading all SVG templates
 */
async initialize(): Promise<void> {
  try {
    let filesToLoad: string[] = [];
    
    // Check if we have a directory
    if (this.svgPaths.length === 1 && this.svgPaths[0].endsWith('/')) {
      // Load from directory
      filesToLoad = await AssetLoader.loadFromDirectory(this.svgPaths[0], '.svg');
      console.log(`Found ${filesToLoad.length} SVGs in directory ${this.svgPaths[0]}`);
    } else {
      // Use provided paths
      filesToLoad = this.svgPaths;
    }
    
    // If no files found, generate placeholders
    if (filesToLoad.length === 0) {
      console.warn('No SVG files found. Generating placeholders...');
      this.createFallbackSVG();
      return;
    }
    
    // Try to load each SVG file
    let successCount = 0;
    for (const path of filesToLoad) {
      try {
        const svgText = await AssetLoader.loadSVGFile(path);
        if (!svgText) continue;
        
        // Process the SVG content
        const svgElement = this.parseSVG(svgText);
        if (svgElement) {
          this.svgTemplates.push(svgElement);
          successCount++;
        }
      } catch (error) {
        console.warn(`Error loading SVG: ${path}`, error);
      }
    }
    
    console.log(`Successfully loaded ${successCount} of ${filesToLoad.length} SVG templates`);
    
    if (this.svgTemplates.length === 0) {
      console.warn('No valid SVG templates were loaded. Creating fallback shapes.');
      this.createFallbackSVG();
    }
  } catch (error) {
    console.error('SVG initialization error:', error);
    this.createFallbackSVG();
  }
}

/**
 * Parse an SVG string into an SVG element
 */
private parseSVG(svgText: string): SVGElement | null {
  try {
    // Clean up the SVG content
    let cleanedSvg = svgText.trim();
    
    // Remove XML declaration if present
    cleanedSvg = cleanedSvg.replace(/<\?xml[^>]*>\s*/i, '');
    
    // Remove DOCTYPE if present
    cleanedSvg = cleanedSvg.replace(/<!DOCTYPE[^>]*>\s*/i, '');
    
    // Make sure we have an SVG tag
    if (!cleanedSvg.includes('<svg')) {
      return null;
    }
    
    // Parse the SVG
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(cleanedSvg, 'image/svg+xml');
    
    // Check for parsing errors
    const parserError = svgDoc.querySelector('parsererror');
    if (parserError) {
      console.warn('SVG parsing error:', parserError.textContent);
      return null;
    }
    
    const svgElement = svgDoc.documentElement;
    if (!(svgElement instanceof SVGElement)) {
      return null;
    }
    
    // Ensure the SVG has proper viewBox
    if (!svgElement.getAttribute('viewBox')) {
      // Try to get width and height
      const width = svgElement.getAttribute('width') || '100';
      const height = svgElement.getAttribute('height') || '100';
      svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }
    
    // Assign a unique ID to prevent conflicts
    svgElement.id = `svg-${Math.random().toString(36).substring(2, 10)}`;
    
    return svgElement;
  } catch (error) {
    console.warn('Error parsing SVG:', error);
    return null;
  }
}



  /**
   * Draw a particle using SVG
   * @param particle - Particle to draw
   * @param index - Index of the particle in the collection
   */
  drawParticle(particle: T, index: number): void {
    // Ensure we have SVG templates
    if (this.svgTemplates.length === 0) {
      return;
    }
    
    // Get particle state
    const state = particle.getState();
    
    // Create or update SVG element
    if (!this.svgElements[index]) {
      // Select random template
      const templateIndex = Math.floor(Math.random() * this.svgTemplates.length);
      const template = this.svgTemplates[templateIndex];
      
      // Clone the template
      const newElement = template.cloneNode(true) as SVGElement;
      
      // Configure element
      newElement.style.position = 'absolute';
      newElement.style.pointerEvents = 'none';
      
      // Append to container
      this.svgContainer.appendChild(newElement);
      this.svgElements[index] = newElement;
    }
    
    // Update element position and properties
    const element = this.svgElements[index];
    element.style.transform = `translate(${state.position.x}px, ${state.position.y}px) rotate(${state.rotation || 0}deg)`;
    element.style.width = `${state.size}px`;
    element.style.height = `${state.size}px`;
    element.style.opacity = state.opacity.toString();
    
    // Update color if applicable
    if (state.color) {
      element.style.fill = state.color;
    }
  }
  
  /**
   * Clear all SVG elements
   */
  clear(): void {
    this.svgElements.forEach(element => {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
    this.svgElements = [];
  }
  
  /**
   * Release resources
   */
  dispose(): void {
    this.clear();
    if (this.svgContainer.parentNode) {
      this.svgContainer.parentNode.removeChild(this.svgContainer);
    }
  }
  private createFallbackSVG(): void {
    // Create a basic snowflake SVG as fallback
    const fallbackSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    fallbackSvg.setAttribute('viewBox', '0 0 100 100');
    fallbackSvg.setAttribute('width', '100');
    fallbackSvg.setAttribute('height', '100');
    
    // Create a simple snowflake shape (six-pointed star)
    for (let i = 0; i < 6; i++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      const angle = (Math.PI / 3) * i;
      
      line.setAttribute('x1', '50');
      line.setAttribute('y1', '50');
      line.setAttribute('x2', (50 + 40 * Math.cos(angle)).toString());
      line.setAttribute('y2', (50 + 40 * Math.sin(angle)).toString());
      line.setAttribute('stroke', 'white');
      line.setAttribute('stroke-width', '4');
      
      fallbackSvg.appendChild(line);
      
      // Add smaller lines (branches)
      const branch1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      const branch2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      
      const branchPoint = {
        x: 50 + 25 * Math.cos(angle),
        y: 50 + 25 * Math.sin(angle)
      };
      
      branch1.setAttribute('x1', branchPoint.x.toString());
      branch1.setAttribute('y1', branchPoint.y.toString());
      branch1.setAttribute('x2', (branchPoint.x + 15 * Math.cos(angle + Math.PI/4)).toString());
      branch1.setAttribute('y2', (branchPoint.y + 15 * Math.sin(angle + Math.PI/4)).toString());
      
      branch2.setAttribute('x1', branchPoint.x.toString());
      branch2.setAttribute('y1', branchPoint.y.toString());
      branch2.setAttribute('x2', (branchPoint.x + 15 * Math.cos(angle - Math.PI/4)).toString());
      branch2.setAttribute('y2', (branchPoint.y + 15 * Math.sin(angle - Math.PI/4)).toString());
      
      branch1.setAttribute('stroke', 'white');
      branch1.setAttribute('stroke-width', '2');
      branch2.setAttribute('stroke', 'white');
      branch2.setAttribute('stroke-width', '2');
      
      fallbackSvg.appendChild(branch1);
      fallbackSvg.appendChild(branch2);
    }
    
    this.svgTemplates.push(fallbackSvg);
  }
}
