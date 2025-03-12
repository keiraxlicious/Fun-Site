/**
 * Handles navigation between different sections of the site
 */
export class NavigationService {
    private currentSection: string = '';
    private sections: Map<string, HTMLElement> = new Map();
    
    /**
     * Initialize the navigation service
     * @param defaultSection - The default section to show
     */
    constructor(defaultSection: string = '') {
        this.currentSection = defaultSection;
        
        // Register click handlers for sidebar menu items
        this.registerMenuHandlers();
    }
    
    /**
     * Register a section to be managed by the navigation service
     * @param id - The section ID
     * @param element - The section DOM element
     */
    public registerSection(id: string, element: HTMLElement): void {
        if (!element) {
            console.error(`Element for section ${id} is null`);
            return;
        }
        
        this.sections.set(id, element);
        
        // Hide all sections by default
        element.style.display = 'none';
        
        console.log(`Registered section: ${id}`);
    }
    
    /**
     * Navigate to a specific section
     * @param sectionId - The ID of the section to navigate to
     */
    public navigateTo(sectionId: string): void {
        // Hide current section if any
        if (this.currentSection && this.sections.has(this.currentSection)) {
            const currentElement = this.sections.get(this.currentSection);
            if (currentElement) {
                currentElement.style.display = 'none';
            }
        }
        
        // Show new section
        if (this.sections.has(sectionId)) {
            const newElement = this.sections.get(sectionId);
            if (newElement) {
                newElement.style.display = 'block';
                this.currentSection = sectionId;
                
                console.log(`Navigated to section: ${sectionId}`);
            }
        } else {
            console.error(`Section ${sectionId} not found`);
        }
    }

    /**
     * Register click handlers for sidebar menu items
     */
    private registerMenuHandlers(): void {
        // Analytics menu item
        const analyticsItem = document.getElementById('analytics');
        if (analyticsItem) {
            analyticsItem.addEventListener('click', () => {
                this.navigateTo('analytics-panel');
            });
        }
        
        // Business inquiries menu item
        const businessItem = document.getElementById('business');
        if (businessItem) {
            businessItem.addEventListener('click', () => {
                window.location.href = 'mailto:your.email@example.com';
            });
        }
        
        // Donate menu item
        const donateItem = document.getElementById('donate');
        if (donateItem) {
            donateItem.addEventListener('click', () => {
                window.open('https://streamelements.com/your-page', '_blank');
            });
        }
        
        // Overlays menu item
        const overlaysItem = document.getElementById('overlays');
        if (overlaysItem) {
            overlaysItem.addEventListener('click', () => {
                this.navigateTo('overlays-panel');
            });
        }
    }
}

