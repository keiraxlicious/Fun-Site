// src/components/overlayPanel.ts

import { 
  OVERLAY_OPTIONS, 
  applyOverlayEffect, 
  disableOverlays 
} from "./overlays";
import { ParticleCategory } from "../types/particleTypes";

/**
 * Initialize the overlay selection panel
 * @param containerId - ID of container element
 */
export function initializeOverlayPanel(containerId: string): void {
  // Find container element
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Overlay panel container ${containerId} not found`);
    return;
  }
  
  // Create panel content
  container.innerHTML = `
    <h3 class="sidebar-panel-title">Particle Effects</h3>
    <div class="overlay-categories" id="overlay-categories"></div>
    <div class="overlay-selector" id="overlay-selector"></div>
    <div class="render-mode-selector" id="render-mode-selector"></div>
  `;
  
  // Get elements
  const categoriesElement = document.getElementById("overlay-categories");
  const selectorElement = document.getElementById("overlay-selector");
  const renderModeElement = document.getElementById("render-mode-selector");
  
  if (!categoriesElement || !selectorElement || !renderModeElement) {
    console.error("Failed to find overlay panel elements");
    return;
  }
  
  // Define categories
  const categories = [
    { id: "all", name: "All Effects" },
    { id: ParticleCategory.FALLING, name: "Falling Effects" },
    { id: ParticleCategory.FLOATING, name: "Floating Effects" },
    { id: ParticleCategory.ROTATING, name: "Rotating Effects" },
    { id: ParticleCategory.INTERACTIVE, name: "Interactive Effects" }
  ];
  
  // Build category tabs
  categoriesElement.innerHTML = categories.map(category => `
    <div class="category-tab" data-category="${category.id}">
      ${category.name}
    </div>
  `).join("");
  
  // Set default category
  let activeCategory = "all";
  
  // Add category click handlers
  categoriesElement.querySelectorAll(".category-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      // Update active class
      categoriesElement.querySelectorAll(".category-tab").forEach(t => 
        t.classList.remove("active")
      );
      tab.classList.add("active");
      
      // Update overlay list
      activeCategory = tab.getAttribute("data-category") || "all";
      updateOverlayList(selectorElement, activeCategory);
    });
  });
  
  // Build render mode selector
  renderModeElement.innerHTML = `
    <h4 class="render-mode-title">Render Mode</h4>
    <div class="render-mode-options">
      <button class="render-mode-option" data-mode="CANVAS">Canvas</button>
      <button class="render-mode-option" data-mode="SVG">SVG</button>
      <button class="render-mode-option" data-mode="DOM">Image</button>
    </div>
  `;
  
  // Set default render mode
  let activeRenderMode = "CANVAS";
  
  // Add render mode click handlers
  renderModeElement.querySelectorAll(".render-mode-option").forEach(option => {
    option.addEventListener("click", () => {
      // Update active class
      renderModeElement.querySelectorAll(".render-mode-option").forEach(o => 
        o.classList.remove("active")
      );
      option.classList.add("active");
      
      // Update render mode
      activeRenderMode = option.getAttribute("data-mode") || "CANVAS";
      
      // Apply to current overlay if one is active
      const activeOverlay = selectorElement.querySelector(".overlay-option.active");
      if (activeOverlay) {
        const overlayId = activeOverlay.getAttribute("data-overlay-id");
        if (overlayId) {
          const overlay = OVERLAY_OPTIONS.find(o => o.id === overlayId);
          if (overlay) {
            // Update render mode
            overlay.config.renderMode = activeRenderMode as any;
            
            // Re-apply overlay
            applyOverlayEffect(overlayId);
          }
        }
      }
    });
  });
  
  // Set Canvas as default active
  renderModeElement.querySelector('[data-mode="CANVAS"]')?.classList.add("active");
  
  // Set All as default active category
  categoriesElement.querySelector('[data-category="all"]')?.classList.add("active");
  
  // Initial overlay list
  updateOverlayList(selectorElement, activeCategory);
  
  // Get current overlay from URL
  const urlParams = new URLSearchParams(window.location.search);
  const currentOverlay = urlParams.get("overlay");
  
  // Set active overlay if specified
  if (currentOverlay) {
    const overlayElement = selectorElement.querySelector(`[data-overlay-id="${currentOverlay}"]`);
    if (overlayElement) {
      overlayElement.classList.add("active");
    }
  }
}

/**
 * Update the overlay list based on selected category
 * @param container - Container element
 * @param category - Selected category
 */
function updateOverlayList(container: HTMLElement, category: string): void {
  // Filter overlays by category
  const filteredOverlays = category === "all" 
    ? OVERLAY_OPTIONS 
    : OVERLAY_OPTIONS.filter(option => option.category === category);
  
  // Clear container
  container.innerHTML = "";
  
  // Add overlay options
  filteredOverlays.forEach(overlay => {
    const element = document.createElement("div");
    element.className = "overlay-option";
    element.setAttribute("data-overlay-id", overlay.id);
    element.innerHTML = `
      <span class="overlay-name">${overlay.name}</span>
      <div class="overlay-controls">
        <button class="apply-btn" title="Apply effect">Apply</button>
        ${overlay.path ? `<button class="view-btn" title="View dedicated page">View</button>` : ''}
      </div>
    `;
    
    // Add apply handler
    const applyBtn = element.querySelector(".apply-btn");
    if (applyBtn) {
      applyBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        
        // Update active class
        container.querySelectorAll(".overlay-option").forEach(el => 
          el.classList.remove("active")
        );
        element.classList.add("active");
        
        // Apply overlay
        applyOverlayEffect(overlay.id);
      });
    }
    
    // Add view handler
    const viewBtn = element.querySelector(".view-btn");
    if (viewBtn && overlay.path) {
      viewBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.location.href = overlay.path;
      });
    }
    
    container.appendChild(element);
  });
  
  // Add disable button
  const disableElement = document.createElement("div");
  disableElement.className = "overlay-option disable-overlay";
  disableElement.innerHTML = `
    <span class="overlay-name">Disable All Effects</span>
    <div class="overlay-controls">
      <button class="disable-btn" title="Disable all effects">Disable</button>
    </div>
  `;
  
  // Add disable handler
  const disableBtn = disableElement.querySelector(".disable-btn");
  if (disableBtn) {
    disableBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      
      // Clear active class
      container.querySelectorAll(".overlay-option").forEach(el => 
        el.classList.remove("active")
      );
      
      // Disable overlays
      disableOverlays();
    });
  }
  
  container.appendChild(disableElement);
}
