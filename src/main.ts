import { initializeSidebar } from '@/components/sidebar';
import { initializeSocialButtons } from '@/components/socialButtons';
import { initializeSearchBox } from '@/components/searchBox';
import { initializeOverlays } from '@/components/overlays';
import { initializeProfileCard } from '@/components/profileCard';
import { initializeOverlayPanel } from '@/components/overlayPanel';
import { initializeParticles } from '@/utils/particles';
import { NavigationService } from '@/services/navigationServices';
import { AnalyticsService } from '@/services/analyticServices';
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
        
        // Initialize components with debugging
        console.log('Initializing sidebar...');
        initializeSidebar('.sidebar-toggle', '.sidebar');
        
        console.log('Initializing social buttons...');
        initializeSocialButtons('.social-grid');
        
        console.log('Initializing search box...');
        initializeSearchBox('search-box');
        
        console.log('Initializing overlays...');
        initializeOverlays();
        console.log('Initializing Profile Card...');
        initializeProfileCard();
        console.log('Initializing Overlay Panels...');
        initializeOverlayPanel('overlays-panel');
        
        // Initialize analytics
        const analyticsService = new AnalyticsService('analytics-chart');
        analyticsService.loadData('mock-data').then(() => {
            analyticsService.renderChart();
        });
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Failed to initialize application:', error);
    }
});


/**
 * Handle window resize events
 */
window.addEventListener('resize', () => {
    // Debounce resize handler
    if ((window as any).resizeTimeout) {
      window.clearTimeout((window as any).resizeTimeout);
    }
  
    (window as any).resizeTimeout = window.setTimeout(() => {
      // Resize the particles canvas
      const canvas = document.querySelector('#particles-js canvas') as HTMLCanvasElement;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
  
      // Resize the magic canvas
      const magicCanvas = document.getElementById('magic-canvas') as HTMLCanvasElement;
      if (magicCanvas) {
        magicCanvas.width = window.innerWidth;
        magicCanvas.height = window.innerHeight;
      }
    }, 200);
  });