/**
 * RenderModeSelector component for the Overlay Panel
 * Responsible for rendering and managing render mode selection
 */

import { AnimationRenderMode } from "../overlays";
import { OverlayPanelHandlers } from "../../types/overlayPanelTypes";

/**
 * Configuration for the render mode selector
 */
interface RenderModeSelectorConfig {
  containerId: string;
  initialMode: AnimationRenderMode;
  handlers: Pick<OverlayPanelHandlers, "onRenderModeChange">;
}

/**
 * Information about render modes
 */
interface RenderModeInfo {
  id: AnimationRenderMode;
  name: string;
  description: string;
  icon: string;
}

/**
 * Available render modes with descriptions
 */
const RENDER_MODES: RenderModeInfo[] = [
  {
    id: "CANVAS",
    name: "Canvas",
    description: "High performance drawn graphics",
    icon: "🎨"
  },
  {
    id: "SVG",
    name: "SVG",
    description: "Scalable vector graphics",
    icon: "⚙️"
  },
  {
    id: "DOM",
    name: "Image",
    description: "Standard image elements",
    icon: "🖼️"
  }
];

/**
 * Initialize the render mode selector component
 * @param config - Configuration for the render mode selector
 * @returns Function to update the active render mode
 * @throws Error if container element is not found
 */
export function initializeRenderModeSelector(
  config: RenderModeSelectorConfig
): (mode: AnimationRenderMode) => void {
  // Validate parameters
  if (!config.containerId) {
    throw new Error("Container ID must be provided");
  }
  
  const container = document.getElementById(config.containerId);
  if (!container) {
    throw new Error(`Render mode selector container ${config.containerId} not found`);
  }
  
  // Build HTML content
  let htmlContent = `
    <h4 class="render-mode-title">Rendering Technology</h4>
    <div class="render-mode-options">
  `;
  
  // Add each mode with description
  for (let i = 0; i < RENDER_MODES.length; i++) {
    const mode = RENDER_MODES[i];
    htmlContent += `
      <button class="render-mode-option ${mode.id === config.initialMode ? 'active' : ''}" 
        data-mode="${mode.id}" 
        aria-selected="${mode.id === config.initialMode}"
        title="${mode.description}">
        <span class="mode-icon">${mode.icon}</span>
        <span class="mode-name">${mode.name}</span>
        <span class="mode-description">${mode.description}</span>
      </button>
    `;
  }
  
  htmlContent += `</div>`;
  
  // Set the container content
  container.innerHTML = htmlContent;
  
  // Track active mode
  let activeMode = config.initialMode;
  
  /**
   * Sets the active render mode
   * @param mode - Render mode to set as active
   */
  function setActiveMode(mode: AnimationRenderMode): void {
    // Validate mode is valid
    const modeExists = RENDER_MODES.some(m => m.id === mode);
    if (!modeExists) {
      console.warn(`Render mode ${mode} does not exist`);
      return;
    }
    
    // Update state
    activeMode = mode;
    
    // Update UI
    const modeElements = container.querySelectorAll<HTMLElement>(".render-mode-option");
    // Add explicit bounds check
    const MAX_ELEMENTS = 10;
    const elementCount = Math.min(modeElements.length, MAX_ELEMENTS);
    
    for (let i = 0; i < elementCount; i++) {
      const element = modeElements[i];
      const elementMode = element.getAttribute("data-mode") as AnimationRenderMode;
      const isActive = elementMode === activeMode;
      
      // Update aria attribute for accessibility
      element.setAttribute("aria-selected", isActive ? "true" : "false");
      
      // Update class
      if (isActive) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    }
    
    // Call handler
    config.handlers.onRenderModeChange(mode);
  }
  
  // Add click event listeners
  const modeElements = container.querySelectorAll<HTMLElement>(".render-mode-option");
  // Add explicit bounds check
  const MAX_ELEMENTS = 10;
  const elementCount = Math.min(modeElements.length, MAX_ELEMENTS);
  
  for (let i = 0; i < elementCount; i++) {
    const element = modeElements[i];
    
    element.addEventListener("click", () => {
      const mode = element.getAttribute("data-mode") as AnimationRenderMode;
      if (mode) {
        setActiveMode(mode);
      }
    });
    
    // Add keyboard accessibility
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const mode = element.getAttribute("data-mode") as AnimationRenderMode;
        if (mode) {
          setActiveMode(mode);
        }
      }
    });
  }
  
  // Return function to update active mode
  return setActiveMode;
}
