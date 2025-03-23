/**
 * Responsive Design Manager for cross-device compatibility
 */
class ResponsiveDesignManager {
    private sidebarElement: HTMLElement | null;
    private sidebarToggle: HTMLElement | null;
    private socialGrid: HTMLElement | null;
    private lastWindowWidth: number;
    private resizeTimeout: number | null = null;
    
    constructor() {
      this.sidebarElement = document.querySelector(".sidebar");
      this.sidebarToggle = document.querySelector(".sidebar-toggle");
      this.socialGrid = document.querySelector(".social-grid-structure");
      this.lastWindowWidth = window.innerWidth;
      
      this.init();
    }
    
    private init(): void {
      // Create toggle button if it doesn't exist
      if (!this.sidebarToggle && this.sidebarElement) {
        this.createSidebarToggle();
      }
      
      this.setupEventListeners();
      this.handleResize();
    }
    
    private createSidebarToggle(): void {
      const toggle = document.createElement("button");
      toggle.className = "sidebar-toggle";
      toggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6H20M4 12H20M4 18H20" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>`;
      document.body.appendChild(toggle);
      this.sidebarToggle = toggle;
    }
    
    private setupEventListeners(): void {
      // Toggle sidebar
      if (this.sidebarToggle) {
        this.sidebarToggle.addEventListener("click", () => {
          this.sidebarElement?.classList.toggle("open");
        });
      }
      
      // Close sidebar when clicking outside on mobile
      document.addEventListener("click", (e) => {
        if (window.innerWidth <= 768 && 
            this.sidebarElement?.classList.contains("open") && 
            !this.sidebarElement.contains(e.target as Node) && 
            e.target !== this.sidebarToggle) {
          this.sidebarElement.classList.remove("open");
        }
      });
      
      // Handle window resize
      window.addEventListener("resize", () => {
        if (this.resizeTimeout) {
          window.clearTimeout(this.resizeTimeout);
        }
        
        this.resizeTimeout = window.setTimeout(() => {
          this.handleResize();
        }, 100);
      });
    }
    
    private handleResize(): void {
      const currentWidth = window.innerWidth;
      
      // Adjust social grid layout based on screen size
      this.updateSocialGridLayout();
      
      // Close sidebar on mobile when orientation changes
      if (Math.abs(currentWidth - this.lastWindowWidth) > 100) {
        if (currentWidth <= 768) {
          this.sidebarElement?.classList.remove("open");
        }
        this.lastWindowWidth = currentWidth;
      }
    }
    
    private updateSocialGridLayout(): void {
      // Additional custom logic for social grid layout if needed
      // This is mostly handled by CSS, but you could add JavaScript adjustments here
    }
  }
  
  /**
   * Overlay Panel Manager to handle panel interactions
   */
  class OverlayPanelManager {
    private overlayPanel: HTMLElement | null;
    private overlayOptions: NodeListOf<HTMLElement>;
    private categoryOptions: NodeListOf<HTMLElement>;
    private renderModeOptions: NodeListOf<HTMLElement>;
    
    constructor() {
      this.overlayPanel = document.getElementById("overlays-panel");
      this.overlayOptions = document.querySelectorAll(".overlay-option");
      this.categoryOptions = document.querySelectorAll(".category-option");
      this.renderModeOptions = document.querySelectorAll(".render-mode-option");
      
      this.init();
    }
    
    private init(): void {
      this.setupCategorySelectors();
      this.setupOverlayOptions();
      this.setupRenderModeOptions();
      this.enableScrollability();
    }
    
    private setupCategorySelectors(): void {
      this.categoryOptions.forEach(option => {
        option.addEventListener("click", () => {
          // Remove active class from all options
          this.categoryOptions.forEach(opt => opt.classList.remove("active"));
          
          // Add active class to clicked option
          option.classList.add("active");
          
          // Filter overlays based on category
          const category = option.getAttribute("data-category");
          this.filterOverlaysByCategory(category);
        });
      });
    }
    
    private filterOverlaysByCategory(category: string | null): void {
      if (!category || category === "all") {
        // Show all overlays
        this.overlayOptions.forEach(opt => {
          opt.style.display = "flex";
        });
        return;
      }
      
      // Show only overlays matching the category
      this.overlayOptions.forEach(opt => {
        const optCategory = opt.getAttribute("data-category");
        opt.style.display = optCategory === category ? "flex" : "none";
      });
    }
    
    private setupOverlayOptions(): void {
      this.overlayOptions.forEach(option => {
        option.addEventListener("click", () => {
          const isMultiSelect = option.getAttribute("data-multi-select") === "true";
          
          if (!isMultiSelect) {
            // Single select mode
            this.overlayOptions.forEach(opt => {
              if (opt.getAttribute("data-category") === option.getAttribute("data-category")) {
                opt.classList.remove("active");
              }
            });
          }
          
          option.classList.toggle("active");
        });
      });
    }
    
    private setupRenderModeOptions(): void {
      this.renderModeOptions.forEach(option => {
        option.addEventListener("click", () => {
          // Remove active class from all render mode options
          this.renderModeOptions.forEach(opt => opt.classList.remove("active"));
          
          // Add active class to clicked option
          option.classList.add("active");
        });
      });
    }
    
    private enableScrollability(): void {
      if (this.overlayPanel) {
        // Ensure the panel is scrollable
        this.overlayPanel.style.overflowY = "auto";
        this.overlayPanel.style.maxHeight = "calc(100vh - 100px)";
      }
    }
  }
  
  // Initialize managers when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    new ResponsiveDesignManager();
    new OverlayPanelManager();
  });
  