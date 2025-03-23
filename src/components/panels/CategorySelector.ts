/**
 * CategorySelector component for the Overlay Panel
 * Responsible for rendering and managing category selection
 */

import { EffectCategory, OverlayPanelHandlers } from "../../types/overlayPanelTypes";

/**
 * Configuration for the category selector
 */
interface CategorySelectorConfig {
  containerId: string;
  categories: EffectCategory[];
  initialActiveCategory: string;
  handlers: Pick<OverlayPanelHandlers, "onCategoryChange">;
}

/**
 * Initialize the category selector component
 * @param config - Configuration for the category selector
 * @returns Function to update the active category
 * @throws Error if container element is not found
 */
export function initializeCategorySelector(
  config: CategorySelectorConfig
): (categoryId: string) => void {
  // Validate parameters
  if (!config.containerId) {
    throw new Error("Container ID must be provided");
  }
  
  const container = document.getElementById(config.containerId);
  if (!container) {
    throw new Error(`Category selector container ${config.containerId} not found`);
  }
  
  // Define upper bound for iteration to prevent infinite loops
  const MAX_CATEGORIES = 50;
  const categoryCount = Math.min(config.categories.length, MAX_CATEGORIES);
  
  // Build HTML content with proper error checking
  let htmlContent = '';
  for (let i = 0; i < categoryCount; i++) {
    const category = config.categories[i];
    // Validate category object
    if (!category || !category.id || !category.name) {
      console.warn(`Invalid category at index ${i}`, category);
      continue;
    }
    
    htmlContent += `
      <button class="category-tab" 
        data-category="${category.id}"
        aria-selected="${category.id === config.initialActiveCategory}"
        title="${category.name}">
        ${category.name}
      </button>
    `;
  }
  
  // Ensure we have content to display
  if (htmlContent.length === 0) {
    container.innerHTML = '<div class="error-message">No categories available</div>';
    return () => {}; // Return empty function
  }
  
  // Set the container content
  container.innerHTML = htmlContent;
  
  // Track active category 
  let activeCategory = config.initialActiveCategory;
  
  /**
   * Sets the active category
   * @param categoryId - ID of the category to set as active
   */
  function setActiveCategory(categoryId: string): void {
    // Check if category exists
    const categoryExists = config.categories.some(c => c.id === categoryId);
    if (!categoryExists) {
      console.warn(`Category ${categoryId} does not exist`);
      return;
    }
    
    // Update state
    activeCategory = categoryId;
    
    // Update UI
    const tabs = container.querySelectorAll<HTMLElement>(".category-tab");
    // Add explicit bounds check
    const MAX_TABS = 100;
    const tabCount = Math.min(tabs.length, MAX_TABS);
    
    for (let i = 0; i < tabCount; i++) {
      const tab = tabs[i];
      const tabCategory = tab.getAttribute("data-category");
      const isActive = tabCategory === activeCategory;
      
      // Update aria attribute for accessibility
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      
      // Update class
      if (isActive) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    }
    
    // Call handler
    config.handlers.onCategoryChange(categoryId);
  }
  
  // Add click event listeners to tabs
  const tabs = container.querySelectorAll<HTMLElement>(".category-tab");
  // Add explicit bounds check
  const MAX_TABS = 100;
  const tabCount = Math.min(tabs.length, MAX_TABS);
  
  for (let i = 0; i < tabCount; i++) {
    const tab = tabs[i];
    
    tab.addEventListener("click", () => {
      const categoryId = tab.getAttribute("data-category");
      if (categoryId) {
        setActiveCategory(categoryId);
      }
    });
    
    // Add keyboard accessibility
    tab.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const categoryId = tab.getAttribute("data-category");
        if (categoryId) {
          setActiveCategory(categoryId);
        }
      }
    });
  }
  
  // Set initial active category
  setActiveCategory(config.initialActiveCategory);
  
  // Return function to update active category
  return setActiveCategory;
}
