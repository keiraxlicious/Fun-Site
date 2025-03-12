/**
 * Initializes the sidebar functionality
 * @param toggleSelector - The selector for the toggle button
 * @param sidebarSelector - The selector for the sidebar element
 */
export function initializeSidebar(
    toggleSelector: string,
    sidebarSelector: string
): void {
    console.log(`Finding elements: ${toggleSelector}, ${sidebarSelector}`);
    
    const toggleButton = document.querySelector(toggleSelector);
    const sidebar = document.querySelector(sidebarSelector);
    
    // Add explicit type checks and logging
    if (!toggleButton) {
        console.error(`Toggle button not found: ${toggleSelector}`);
        return;
    }
    
    if (!sidebar) {
        console.error(`Sidebar not found: ${sidebarSelector}`);
        return;
    }
    
    console.log('Elements found, setting up click handler');
    
    // Add click handler for the toggle button with debugging
    toggleButton.addEventListener('click', (event) => {
        toggleButton.classList.toggle("spin");
        console.log('Toggle button clicked');
        event.preventDefault();
        
        // Toggle the active class to show/hide sidebar
        sidebar.classList.toggle('active');
        console.log(`Sidebar active: ${sidebar.classList.contains('active')}`);
    });
    
    toggleButton.addEventListener('dblclick', (event) => {
        sidebar.classList.add('hidden');
        console.log('Sidebar hidden via double-click');
    });
    // Set up panel navigation
    setupPanels();
    
    console.log('Sidebar initialization complete');
}

/**
 * Sets up the sidebar panels
 */
function setupPanels(): void {
    const analyticsItem = document.getElementById('analytics');
    const overlaysItem = document.getElementById('overlays');
    
    if (analyticsItem) {
        analyticsItem.addEventListener('click', () => {
            showPanel('analytics-panel');
        });
    }
    
    if (overlaysItem) {
        overlaysItem.addEventListener('click', () => {
            showPanel('overlays-panel');
        });
    }
}

/**
 * Shows a specific panel and hides others
 * @param panelId - ID of the panel to show
 */
function showPanel(panelId: string): void {
    // Hide all panels
    const panels = document.querySelectorAll('.sidebar-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Show the requested panel
    const panel = document.getElementById(panelId);
    if (panel) {
        panel.classList.add('active');
        console.log(`Showing panel: ${panelId}`);
    } else {
        console.error(`Panel not found: ${panelId}`);
    }
}
