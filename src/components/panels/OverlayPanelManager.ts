/**
 * OverlayPanelManager
 * Main controller for the overlay panel component system
 */

import { 
    DEFAULT_CATEGORIES,
    DEFAULT_PANEL_CONFIG,
    DEFAULT_PANEL_STATE,
    OverlayPanelConfig,
    OverlayPanelState
  } from "../../types/overlayPanelTypes";
  
  import { initializeCategorySelector } from "./CategorySelector";
  import { initializeEffectSelector } from "./EffectSelector";
  import { initializeRenderModeSelector } from "./RenderModeSelector";
  import { AnimationRenderMode, OVERLAY_OPTIONS, applyOverlayEffect, disableOverlays } from "../overlays";
  
  /**
   * Maximum number of DOM queries to perform for safety
   */
  const MAX_DOM_QUERIES = 10;
  
  /**
   * Options for initializing the overlay panel
   */
  interface OverlayPanelOptions {
    containerId: string;
    config?: Partial<OverlayPanelConfig>;
    initialState?: Partial<OverlayPanelState>;
  }
  
  /**
   * OverlayPanelManager class
   * Manages the overlay panel components and state
   */
  export class OverlayPanelManager {
    private config: OverlayPanelConfig;
    private state: OverlayPanelState;
    private container: HTMLElement | null = null;
    private updateCategory: ((categoryId: string) => void) | null = null;
    private effectSelector: {
      updateEffectList: (categoryId: string) => void;
      setActiveEffect: (effectId: string | null) => void;
    } | null = null;
    private updateRenderMode: ((mode: AnimationRenderMode) => void) | null = null;
    
    /**
     * Creates a new OverlayPanelManager
     * @param options - Configuration options
     */
    constructor(options: OverlayPanelOptions) {
      // Merge provided options with defaults
      this.config = { 
        ...DEFAULT_PANEL_CONFIG,
        ...options.config
      };
      
      this.state = {
        ...DEFAULT_PANEL_STATE,
        ...options.initialState
      };
      
      // Find container element
      this.container = document.getElementById(options.containerId);
      if (!this.container) {
        throw new Error(`Overlay panel container ${options.containerId} not found`);
      }
    }
    
    /**
     * Initializes the overlay panel
     * @throws Error if initialization fails
     */
    public initialize(): void {
      // Create panel structure
      this.createPanelStructure();
      
      // Initialize handlers object
      const handlers = {
        onCategoryChange: this.handleCategoryChange.bind(this),
        onOverlaySelect: this.handleOverlaySelect.bind(this),
        onRenderModeChange: this.handleRenderModeChange.bind(this),
        onDisableEffects: this.handleDisableEffects.bind(this)
      };
      
      // Initialize components
      this.updateCategory = initializeCategorySelector({
        containerId: this.config.categoriesId,
        categories: DEFAULT_CATEGORIES,
        initialActiveCategory: this.state.activeCategory,
        handlers: {
          onCategoryChange: handlers.onCategoryChange
        }
      });
      
      this.effectSelector = initializeEffectSelector({
        containerId: this.config.selectorId,
        allEffects: OVERLAY_OPTIONS,
        initialActiveEffect: this.state.activeOverlayId,
        handlers: {
          onOverlaySelect: handlers.onOverlaySelect,
          onDisableEffects: handlers.onDisableEffects
        }
      });
      
      this.updateRenderMode = initializeRenderModeSelector({
        containerId: this.config.renderModeId,
        initialMode: this.state.activeRenderMode,
        handlers: {
          onRenderModeChange: handlers.onRenderModeChange
        }
      });
      
      // Initialize effect list
      this.effectSelector.updateEffectList(this.state.activeCategory);
      
      // Check URL for initial effect
      this.checkUrlForInitialEffect();
    }
    
    /**
     * Creates the panel HTML structure
     * @throws Error if container is not available
     */
    private createPanelStructure(): void {
      if (!this.container) {
        throw new Error("Container element not available");
      }
      
      this.container.innerHTML = `
        <div class="panel-header">
          <h3 class="panel-title">Particle Effects</h3>
        </div>
        <div class="panel-section">
          <div class="category-selector" id="${this.config.categoriesId}"></div>
        </div>
        <div class="panel-section">
          <div class="effect-selector" id="${this.config.selectorId}"></div>
        </div>
        <div class="panel-section">
          <div class="render-mode-selector" id="${this.config.renderModeId}"></div>
        </div>
      `;
    }
    
    /**
     * Checks URL for initial effect
     */
    private checkUrlForInitialEffect(): void {
      const urlParams = new URLSearchParams(window.location.search);
      const overlayParam = urlParams.get("overlay");
      
      if (overlayParam && this.effectSelector) {
        const overlay = OVERLAY_OPTIONS.find(o => o.id === overlayParam);
        if (overlay) {
          this.state.activeOverlayId = overlay.id;
          this.state.activeCategory = overlay.category;
          
          // Update UI
          if (this.updateCategory) {
            this.updateCategory(this.state.activeCategory);
          }
          this.effectSelector.updateEffectList(this.state.activeCategory);
          this.effectSelector.setActiveEffect(this.state.activeOverlayId);
          
          // Apply the effect
          applyOverlayEffect(overlay.id);
        }
      }
    }
    
    /**
     * Handles category change events
     * @param categoryId - ID of the selected category
     */
    private handleCategoryChange(categoryId: string): void {
      this.state.activeCategory = categoryId;
      
      if (this.effectSelector) {
        this.effectSelector.updateEffectList(categoryId);
      }
    }
    
    /**
     * Handles overlay selection events
     * @param overlayId - ID of the selected overlay
     */
    private handleOverlaySelect(overlayId: string): void {
      this.state.activeOverlayId = overlayId;
      
      // Apply the effect with current render mode
      const overlay = OVERLAY_OPTIONS.find(o => o.id === overlayId);
      if (overlay) {
        overlay.config.renderMode = this.state.activeRenderMode;
        applyOverlayEffect(overlayId);
      }
    }
    
    /**
     * Handles render mode change events
     * @param renderMode - Selected render mode
     */
    private handleRenderModeChange(renderMode: AnimationRenderMode): void {
      this.state.activeRenderMode = renderMode;
      
      // Re-apply current effect with new render mode if one is active
      if (this.state.activeOverlayId) {
        const overlay = OVERLAY_OPTIONS.find(o => o.id === this.state.activeOverlayId);
        if (overlay) {
          overlay.config.renderMode = renderMode;
          applyOverlayEffect(this.state.activeOverlayId);
        }
      }
    }
    
    /**
     * Handles disable effects events
     */
    private handleDisableEffects(): void {
      this.state.activeOverlayId = null;
      disableOverlays();
    }
  }
  
  /**
   * Initialize the overlay panel
   * @param containerId - ID of container element
   */
  export function initializeOverlayPanel(containerId: string): void {
    try {
      const panelManager = new OverlayPanelManager({ containerId });
      panelManager.initialize();
      console.log("Overlay panel initialized successfully");
    } catch (error) {
      console.error("Failed to initialize overlay panel:", error);
    }
  }
  