// src/components/overlayPanel.ts
import { OVERLAY_OPTIONS, applyOverlayEffect, disableOverlays } from './overlays';

/**
 * Initialize the overlay selection panel
 * @param containerId - ID of the container element
 */
export function initializeOverlayPanel(containerId: string): void {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Overlay panel container ${containerId} not found`);
        return;
    }
    
    // Create panel content
    container.innerHTML = /*HTML*/`
        <h3 class="sidebar-panel-title">Overlay Effects</h3>
        <p class="sidebar-panel-desc">Choose an overlay effect for your page:</p>
        <div class="overlay-selector" id="overlay-selector"></div>
    `;
    
    // Create overlay options
    const selector = document.getElementById('overlay-selector');
    if (!selector) {
        return;
    }
    
    // Add each overlay option as a button
    OVERLAY_OPTIONS.forEach(overlay => {
        const button = document.createElement('div');
        button.className = 'overlay-option';
        button.innerHTML = `
            <span class="overlay-name">${overlay.name}</span>
            <div class="overlay-controls">
                <button class="apply-btn" title="Apply effect">Apply</button>
                <button class="view-btn" title="View dedicated page">View</button>
            </div>
        `;
        button.dataset.overlayId = overlay.id;
        
        // Add click handlers
        const applyBtn = button.querySelector('.apply-btn');
        if (applyBtn) {
            applyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Remove active class from all buttons
                document.querySelectorAll('.overlay-option').forEach(el => {
                    el.classList.remove('active');
                });
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Apply the selected overlay
                applyOverlayEffect(overlay.id);
            });
        }
        
        // Add view dedicated page handler
        const viewBtn = button.querySelector('.view-btn');
        if (viewBtn && overlay.path) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                window.location.href = overlay.path;
            });
        }
        
        selector.appendChild(button);
    });
    
    // Add disable button
    const disableButton = document.createElement('div');
    disableButton.className = 'overlay-option disable-overlay';
    disableButton.innerHTML = `
        <span class="overlay-name">Disable All Effects</span>
        <div class="overlay-controls">
            <button class="disable-btn" title="Disable all effects">Disable</button>
        </div>
    `;
    
    const disableBtn = disableButton.querySelector('.disable-btn');
    if (disableBtn) {
        disableBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Remove active class from all buttons
            document.querySelectorAll('.overlay-option').forEach(el => {
                el.classList.remove('active');
            });
            
            // Disable overlays
            disableOverlays();
        });
    }
    
    selector.appendChild(disableButton);
    
    // Set active button based on current overlay
    const urlParams = new URLSearchParams(window.location.search);
    const currentOverlay = urlParams.get('overlay');
    
    if (currentOverlay) {
        const activeButton = selector.querySelector(`[data-overlay-id="${currentOverlay}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }
}
