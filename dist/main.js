import { initializeSidebar } from './components/sidebar';
import { initializeSocialButtons } from './components/socialButtons';
import { initializeSearchBox } from './components/searchBox';
import { initializeParticles } from './utils/particles';
import { initializeOverlays } from './components/overlays';
import { initializeProfileCard } from './components/profileCard';
import { initializeOverlayPanel } from './components/overlayPanel';
import { NavigationService } from './services/navigationServices';
import { AnalyticsService } from './services/analyticServices';
/**
 * Main entry point for the application
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize particle background
        initializeParticles('particles-js');
        // Initialize the navigation service
        const navigationService = new NavigationService();
        // Register sidebar panels with navigation service
        const analyticsPanelElement = document.getElementById('analytics-panel');
        if (analyticsPanelElement) {
            navigationService.registerSection('analytics-panel', analyticsPanelElement);
        }
        // Create and register overlay panel if it doesn't exist
        let overlaysPanelElement = document.getElementById('overlays-panel');
        if (!overlaysPanelElement) {
            overlaysPanelElement = document.createElement('div');
            overlaysPanelElement.id = 'overlays-panel';
            overlaysPanelElement.className = 'sidebar-panel';
            // Add to sidebar
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.appendChild(overlaysPanelElement);
            }
        }
        navigationService.registerSection('overlays-panel', overlaysPanelElement);
        // Initialize components
        initializeSidebar('.sidebar-toggle', '.sidebar');
        initializeSocialButtons('.social-grid');
        initializeSearchBox('search-box');
        initializeOverlays();
        initializeProfileCard();
        initializeOverlayPanel('overlays-panel');
        // Initialize analytics
        const analyticsService = new AnalyticsService('analytics-chart');
        analyticsService.loadData('mock-data').then(() => {
            analyticsService.renderChart();
        });
        console.log('Application initialized successfully');
    }
    catch (error) {
        console.error('Failed to initialize application:', error);
    }
});
/**
 * Handle window resize events
 */
window.addEventListener('resize', () => {
    // Debounce resize handler
    if (window.resizeTimeout) {
        window.clearTimeout(window.resizeTimeout);
    }
    window.resizeTimeout = window.setTimeout(() => {
        // Resize the particles canvas
        const canvas = document.querySelector('#particles-js canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        // Resize the magic canvas
        const magicCanvas = document.getElementById('magic-canvas');
        if (magicCanvas) {
            magicCanvas.width = window.innerWidth;
            magicCanvas.height = window.innerHeight;
        }
    }, 200);
});
// /**
//  * Main entry point for the application
//  * Initializes all components and sets up the page
//  */
// document.addEventListener('DOMContentLoaded', () => {
//     try {
//         // Initialize particle background
//         initializeParticles('particles-js');
//         // Initialize the sidebar
//         initializeSidebar('.sidebar-toggle', '.sidebar');
//         // Initialize social media buttons
//         initializeSocialButtons('.social-grid');
//         // Initialize search box
//         initializeSearchBox('search-box');
//         // Initialize overlay effects
//         initializeOverlays();
//         // Log success for tracking
//         console.log('Application initialized successfully');
//     } catch (error) {
//         // Log any initialization errors
//         console.error('Failed to initialize application:', error);
//     }
// });
// /**
//  * Handles window resize events to maintain layout
//  */
// window.addEventListener('resize', () => {
//     const MAX_RESIZE_WAIT = 100; // ms
//     let resizeTimeout: number | null = null;
//     // Debounce resize handler
//     if (resizeTimeout !== null) {
//         window.clearTimeout(resizeTimeout);
//     }
//     resizeTimeout = window.setTimeout(() => {
//         // Adjust layout for new window size
//         adjustLayout();
//     }, MAX_RESIZE_WAIT);
// });
//# sourceMappingURL=main.js.map