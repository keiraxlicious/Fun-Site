import { OVERLAY_OPTIONS } from './overlays';
import { applyOverlayEffect } from './overlays';
/**
 * Initialize the overlay selection panel
 * @param containerId - ID of the container element
 */
export function initializeOverlayPanel(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Overlay panel container ${containerId} not found`);
        return;
    }
    // Create panel content
    container.innerHTML = /*HTML*/ `
        <h3 class="sidebar-panel-title">Overlay Effects</h3>
        <p class="sidebar-panel-desc">Choose an overlay effect for your page:</p>
        <div class="overlay-selector" id="overlay-selector"></div>
    `;
    // Create overlay options
    const selector = document.getElementById('overlay-selector');
    if (!selector)
        return;
    // Add each overlay option as a button
    OVERLAY_OPTIONS.forEach(overlay => {
        const button = document.createElement('div');
        button.className = 'overlay-option';
        button.textContent = overlay.name;
        button.dataset.overlayId = overlay.id;
        // Add click handler
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.overlay-option').forEach(el => {
                el.classList.remove('active');
            });
            // Add active class to clicked button
            button.classList.add('active');
            // Apply the selected overlay
            applyOverlayEffect(overlay.id);
        });
        selector.appendChild(button);
    });
}
//# sourceMappingURL=overlayPanel.js.map