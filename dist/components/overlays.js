/*
    initRainAnimation,
    */
import { initSnowAnimation, } from '../utils/animations.snow';
import { initHeartsAnimation } from '../utils/animations.hearts';
import { initLeavesAnimation } from '../utils/animations.leaves';
import { initSakuraAnimation } from '../utils/animations.sakura';
import { initRainAnimation } from '../utils/animations.rain';
/**
 * Available overlay animation types
 */
export const OVERLAY_OPTIONS = [
    {
        id: 'snow',
        name: 'Snow Falling',
        particleType: 'snow',
        config: {}
    },
    {
        id: 'rain',
        name: 'Realistic Rain',
        particleType: 'rain',
        config: {}
    },
    {
        id: 'leaves',
        name: 'Falling Leaves',
        particleType: 'leaves',
        config: {}
    },
    {
        id: 'sakura',
        name: 'Sakura Petals',
        particleType: 'sakura',
        config: {}
    },
    {
        id: 'hearts',
        name: 'Hearts Falling',
        particleType: 'hearts',
        config: {}
    }
];
/**
 * Initialize the foreground overlay animations
 */
export function initializeOverlays() {
    // Create the magic canvas for overlays if it doesn't exist
    let magicCanvas = document.getElementById('magic-canvas');
    if (!magicCanvas) {
        console.error("Magic canvas not found in the DOM");
        return;
    }
    // Set canvas size to match window
    magicCanvas.width = window.innerWidth;
    magicCanvas.height = window.innerHeight;
    // Select a random overlay effect on load
    const randomIndex = Math.floor(Math.random() * OVERLAY_OPTIONS.length);
    const selectedOverlay = OVERLAY_OPTIONS[randomIndex];
    // Initialize the selected overlay
    applyOverlayEffect(selectedOverlay.id);
    console.log(`Initialized overlay: ${selectedOverlay.name}`);
    // Initialize overlay selector panel
    initializeOverlaySelector();
}
/**
 * Apply a specific overlay effect
 * @param overlayId - ID of the overlay to apply
 */
export function applyOverlayEffect(overlayId) {
    const overlay = OVERLAY_OPTIONS.find(opt => opt.id === overlayId);
    if (!overlay) {
        console.error(`Overlay with ID ${overlayId} not found`);
        return;
    }
    const canvas = document.getElementById('magic-canvas');
    if (!canvas) {
        console.error('Magic canvas element not found');
        return;
    }
    // Get canvas context
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Failed to get canvas context');
        return;
    }
    // Clear any existing animations
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Initialize the specific overlay animation
    switch (overlayId) {
        case 'snow':
            initSnowAnimation(canvas, ctx);
            break;
        case 'rain':
            initRainAnimation(canvas, ctx);
            break;
        case 'leaves':
            initLeavesAnimation(canvas, ctx);
            break;
        case 'sakura':
            initSakuraAnimation(canvas, ctx);
            break;
        case 'hearts':
            initHeartsAnimation(canvas, ctx);
            break;
        default:
            initSnowAnimation(canvas, ctx); // Default fallback
    }
}
/**
 * Initialize the overlay selector in the sidebar
 */
function initializeOverlaySelector() {
    const selector = document.getElementById('overlay-selector');
    if (!selector) {
        console.error('Overlay selector element not found');
        return;
    }
    // Clear existing content
    selector.innerHTML = '';
    // Add each overlay as a button
    OVERLAY_OPTIONS.forEach(overlay => {
        const button = document.createElement('div');
        button.className = 'overlay-option';
        button.textContent = overlay.name;
        button.dataset.id = overlay.id;
        // Add click handler
        button.addEventListener('click', () => {
            // Apply this overlay
            applyOverlayEffect(overlay.id);
            // Update active state
            document.querySelectorAll('.overlay-option').forEach(el => {
                el.classList.remove('active');
            });
            button.classList.add('active');
        });
        selector.appendChild(button);
    });
}
//# sourceMappingURL=overlays.js.map