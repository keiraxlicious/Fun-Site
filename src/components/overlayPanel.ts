/**
 * Main entry point for the overlay panel
 * This file is kept for backward compatibility but delegates to the new modular system
 */

import { initializeOverlayPanel } from "./panels/OverlayPanelManager";

/**
 * Initialize the overlay selection panel
 * @param containerId - ID of container element
 */
export function initializeOverlayPanel(containerId: string): void {
  // Delegate to new implementation
  import("./panels/OverlayPanelManager").then(module => {
    module.initializeOverlayPanel(containerId);
  }).catch(error => {
    console.error("Failed to initialize overlay panel:", error);
  });
}
