/**
 * Initializes the sidebar functionality
 * @param toggleSelector - The selector for the toggle button
 * @param sidebarSelector - The selector for the sidebar element
 */
export function initializeSidebar(toggleSelector, sidebarSelector) {
    const toggleButton = document.querySelector(toggleSelector);
    const sidebar = document.querySelector(sidebarSelector);
    if (!toggleButton || !sidebar) {
        console.error("Sidebar elements not found");
        return;
    }
    console.log("Setting up sidebar toggle");
    // Add click event listener
    toggleButton.addEventListener('click', () => {
        console.log("Toggle button clicked");
        // Toggle the active class on sidebar
        sidebar.classList.toggle('active');
        // Toggle the active class on the button itself
        toggleButton.classList.toggle('active');
    });
    // Setup sidebar item clicks
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.id;
            console.log(`Sidebar item clicked: ${id}`);
            // Handle different sidebar items
            switch (id) {
                case 'analytics':
                    showPanel('analytics-panel');
                    break;
                case 'overlays':
                    showPanel('overlays-panel');
                    break;
                case 'business':
                    window.location.href = 'mailto:your.email@example.com';
                    break;
                case 'donate':
                    window.open('https://streamelements.com/your-page', '_blank');
                    break;
                case 'support':
                    window.open('https://patreon.com/your-page', '_blank');
                    break;
            }
        });
    });
    /**
     * Shows a specific panel in the sidebar
     * @param panelId - ID of the panel to show
     */
    function showPanel(panelId) {
        // Hide all panels
        const panels = document.querySelectorAll('.sidebar-panel');
        panels.forEach(panel => {
            panel.classList.remove('active');
        });
        // Show the selected panel
        const targetPanel = document.getElementById(panelId);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    }
}
//# sourceMappingURL=sidebar.js.map