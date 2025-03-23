/**
 * Type definitions for the Overlay Panel system.
 * This module centralizes all type definitions used across panel components.
 */

import { ParticleCategory } from "../types/particleTypes";
import { OverlayOption, AnimationRenderMode } from "../components/overlays";

/**
 * Represents a category of particle effects
 */
export interface EffectCategory {
  id: string;
  name: string;
}

/**
 * Configuration for initializing the overlay panel
 */
export interface OverlayPanelConfig {
  containerId: string;
  categoriesId: string;
  selectorId: string;
  renderModeId: string;
  maxCategoryItems: number;
}

/**
 * State of the overlay panel
 */
export interface OverlayPanelState {
  activeCategory: string;
  activeOverlayId: string | null;
  activeRenderMode: AnimationRenderMode;
}

/**
 * Event handlers for the overlay panel
 */
export interface OverlayPanelHandlers {
  onCategoryChange: (categoryId: string) => void;
  onOverlaySelect: (overlayId: string) => void;
  onRenderModeChange: (renderMode: AnimationRenderMode) => void;
  onDisableEffects: () => void;
}

/**
 * Predefined categories for the overlay panel
 */
export const DEFAULT_CATEGORIES: EffectCategory[] = [
  { id: "all", name: "All Effects" },
  { id: ParticleCategory.FALLING, name: "Falling Effects" },
  { id: ParticleCategory.FLOATING, name: "Floating Effects" },
  { id: ParticleCategory.ROTATING, name: "Rotating Effects" },
  { id: ParticleCategory.INTERACTIVE, name: "Interactive Effects" }
];

/**
 * Default configuration for the overlay panel
 */
export const DEFAULT_PANEL_CONFIG: OverlayPanelConfig = {
  containerId: "overlay-panel",
  categoriesId: "overlay-categories",
  selectorId: "overlay-selector",
  renderModeId: "render-mode-selector",
  maxCategoryItems: 50
};

/**
 * Default state for the overlay panel
 */
export const DEFAULT_PANEL_STATE: OverlayPanelState = {
  activeCategory: "all",
  activeOverlayId: null,
  activeRenderMode: "CANVAS"
};
