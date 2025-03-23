/**
 * EffectSelector component for the Overlay Panel
 * Responsible for rendering and managing effect selection
 */

import { OverlayOption } from "../overlays";
import { OverlayPanelHandlers } from "../../types/overlayPanelTypes";

/**
 * Configuration for the effect selector
 */
interface EffectSelectorConfig {
  containerId: string;
  allEffects: OverlayOption[];
  initialActiveEffect: string | null;
  handlers: Pick<OverlayPanelHandlers, "onOverlaySelect" | "onDisableEffects">;
}

/**
 * Initialize the effect selector component
 * @param config - Configuration for the effect selector
 * @returns Object with methods to update the component
 * @throws Error if container element is not found
 */
export function initializeEffectSelector(
  config: EffectSelectorConfig
): {
  updateEffectList: (categoryId: string) => void;
  setActiveEffect: (effectId: string | null) => void;
} {
  // Validate parameters
  if (!config.containerId) {
    throw new Error("Container ID must be provided");
  }
  
  const container: HTMLElement | null = document.getElementById(config.containerId);
  if (!container) {
    throw new Error(`Effect selector container ${config.containerId} not found`);
  }
  
  let activeEffect: string | null = config.initialActiveEffect;
  
  /**
   * Updates the list of effects based on selected category
   * @param categoryId - ID of the selected category
   */
  function updateEffectList(categoryId: string): void {
    // Clear container
    container.innerHTML = "";
    
    // Filter effects by category
    const filteredEffects = categoryId === "all" 
      ? config.allEffects 
      : config.allEffects.filter(effect => effect.category === categoryId);
    
    // Ensure we don't exceed reasonable limits
    const MAX_EFFECTS = 100;
    const effectCount = Math.min(filteredEffects.length, MAX_EFFECTS);
    
    // Create effect list
    for (let i = 0; i < effectCount; i++) {
      const effect = filteredEffects[i];
      
      // Create effect element
      const effectElement = document.createElement("div");
      effectElement.className = "effect-option";
      effectElement.setAttribute("data-effect-id", effect.id);
      
      if (effect.id === activeEffect) {
        effectElement.classList.add("active");
      }
      
      // Add icon based on effect type if available
      const iconClass = getEffectIconClass(effect.particleType);
      
      // Create inner content
      effectElement.innerHTML = `
        <div class="effect-info">
          <span class="effect-icon ${iconClass}"></span>
          <span class="effect-name">${effect.name}</span>
        </div>
        <div class="effect-actions">
          <button class="apply-btn" title="Apply this effect">
            <span class="btn-icon">✓</span>
            <span class="btn-text">Apply</span>
          </button>
          ${effect.path ? 
            `<button class="view-btn" title="View detailed settings">
              <span class="btn-icon">⚙</span>
              <span class="btn-text">Overlay Page</span>
            </button>` : 
            ''}
        </div>
      `;
      
      // Add event listeners
      const applyBtn = effectElement.querySelector(".apply-btn");
      if (applyBtn) {
        applyBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          setActiveEffect(effect.id);
          config.handlers.onOverlaySelect(effect.id);
        });
      }
      
      const viewBtn = effectElement.querySelector(".view-btn");
      if (viewBtn && effect.path) {
        viewBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          window.location.href = effect.path;
        });
      }
      
      container.appendChild(effectElement);
    }
    
    // Add "Disable All" option
    const disableElement = document.createElement("div");
    disableElement.className = "effect-option disable-effect";
    disableElement.innerHTML = `
      <div class="effect-info">
        <span class="effect-icon icon-disable"></span>
        <span class="effect-name">Disable All Effects</span>
      </div>
      <div class="effect-actions">
        <button class="disable-btn" title="Disable all effects">
          <span class="btn-icon">✕</span>
          <span class="btn-text">Disable</span>
        </button>
      </div>
    `;
    
    const disableBtn = disableElement.querySelector(".disable-btn");
    if (disableBtn) {
      disableBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        setActiveEffect(null);
        config.handlers.onDisableEffects();
      });
    }
    
    container.appendChild(disableElement);
    
    // Inform user if no effects are available
    if (effectCount === 0) {
      const emptyMessage = document.createElement("div");
      emptyMessage.className = "no-effects-message";
      emptyMessage.textContent = "No effects available in this category";
      container.appendChild(emptyMessage);
    }
  }
  
  /**
   * Sets the active effect
   * @param effectId - ID of the effect to set as active, or null to clear
   */
  function setActiveEffect(effectId: string | null): void {
    activeEffect = effectId;
    
    // Update UI
    const effectElements = container.querySelectorAll(".effect-option");
    // Add explicit bounds check
    const MAX_ELEMENTS = 100;
    const elementCount = Math.min(effectElements.length, MAX_ELEMENTS);
    
    for (let i = 0; i < elementCount; i++) {
      const element = effectElements[i];
      const elementEffectId = element.getAttribute("data-effect-id");
      
      if (elementEffectId === effectId) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    }
  }
  
  // Return public API
  return {
    updateEffectList,
    setActiveEffect
  };
}

/**
 * Get CSS class for effect icon based on particle type
 * @param particleType - Type of particle
 * @returns CSS class for the icon
 */
function getEffectIconClass(particleType: string): string {
  // Map particle types to icon classes
  const iconMap: Record<string, string> = {
    "snow": "icon-snow",
    "rain": "icon-rain",
    "leaf": "icon-leaf",
    "sakura": "icon-sakura",
    "money": "icon-money",
    "star": "icon-star",
    "heart": "icon-heart",
    "bubble": "icon-bubble",
    "firefly": "icon-firefly",
    "cloud": "icon-cloud",
    // Add more mappings as needed
  };
  
  return iconMap[particleType] || "icon-default";
}
