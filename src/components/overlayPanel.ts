// // src/components/overlayPanel.ts
// // import { OVERLAY_OPTIONS, applyOverlayEffect, disableOverlays } from './overlays';

// const MAX_OVERLAY_OPTIONS = 50;

// function createPanelStructure(container: HTMLElement): HTMLElement | null {
//     // Pre-allocated template with bounds check
//     const template = /*HTML*/`
//         <h3 class="sidebar-panel-title">Overlay Effects</h3>
//         <p class="sidebar-panel-desc">Choose an overlay effect:</p>
//         <div class="overlay-selector" id="overlay-selector"></div>
//     `;
    
//     container.innerHTML = template;
//     return document.getElementById('overlay-selector');
// }

// function createOverlayButton(overlay: typeof OVERLAY_OPTIONS[0]): HTMLElement {
//     // Static type validation
//     if (!overlay?.id || !overlay?.name) {
//         throw new Error("Invalid overlay configuration");
//     }

//     const button = document.createElement('div');
//     button.className = 'overlay-option';
//     button.innerHTML = `
//         <span class="overlay-name">${overlay.name}</span>
//         <div class="overlay-controls">
//             <button class="apply-btn">Apply</button>
//             ${overlay.path ? '<button class="view-btn">View</button>' : ''}
//         </div>
//     `;
//     button.dataset.overlayId = overlay.id;
//     return button;
// }

// function handleApplyClick(button: HTMLElement, overlayId: string) {
//     document.querySelectorAll('.overlay-option').forEach(el => {
//         el.classList.remove('active');
//     });
//     button.classList.add('active');
//     applyOverlayEffect(overlayId);
// }

// export function initializeOverlayPanel(containerId: string): void {
//     const container = document.getElementById(containerId);
//     if (!container) {
//         console.error(`Container ${containerId} not found`);
//         return;
//     }

//     const selector = createPanelStructure(container);
//     if (!selector) return;

//     // Fixed bound loop with assertion
//     for (let i = 0; i < Math.min(OVERLAY_OPTIONS.length, MAX_OVERLAY_OPTIONS); i++) {
//         const overlay = OVERLAY_OPTIONS[i];
//         const button = createOverlayButton(overlay);
        
//         const applyBtn = button.querySelector('.apply-btn');
//         applyBtn?.addEventListener('click', (e) => {
//             e.stopPropagation();
//             handleApplyClick(button, overlay.id);
//         });

//         selector.appendChild(button);
//     }

//     // Additional components created with similar patterns
// }
