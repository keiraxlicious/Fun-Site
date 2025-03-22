/**
 * Initialize a rain overlay animation using SVG files
 * @param container - The container element ID
 */
export function initRainAnimation(container: string): void {
    const containerElement = document.getElementById(container);
    if (!containerElement) return;
    
    // Clear previous animations
    containerElement.innerHTML = '';
    
    // SVG files to use (multiple versions for variety)
    const rainSvgs = [
        'assets/svgs/overlays/raindrop1.svg',
        'assets/svgs/overlays/raindrop2.svg'
    ];
    
    // Create raindrops with a limited count
    const MAX_RAINDROPS = 50; // Reduced count for performance
    const BATCHES = 5; // Create in batches for smoother load
    const DROPS_PER_BATCH = MAX_RAINDROPS / BATCHES;
    
    // Track created raindrops for cleanup
    const raindrops: HTMLElement[] = [];
    
    /**
     * Create a single raindrop element
     */
    function createRaindrop(): HTMLElement {
        // Create image element for the raindrop
        const raindrop = document.createElement('img');
        
        // Choose random SVG from the array
        const randomSvgIndex = Math.floor(Math.random() * rainSvgs.length);
        raindrop.src = rainSvgs[randomSvgIndex];
        
        // Set class and styles
        raindrop.className = 'overlay-particle raindrop';
        
        // Adjust size for raindrops
        const width = Math.random() * 4 + 1; // Smaller size
        raindrop.style.width = `${width}px`;
        
        // IMPORTANT: Fixed opacity issue - reduced opacity
        raindrop.style.opacity = `${Math.random() * 0.4 + 0.1}`; // Much lower opacity
        
        // Random initial position
        raindrop.style.left = `${Math.random() * 100}vw`;
        raindrop.style.top = `${Math.random() * -20}px`; // Start closer to top
        
        // Animation speed adjustment
        const animDuration = Math.random() * 0.8 + 0.7; // Faster for raindrops
        
        // Wait for image to load before applying animation
        raindrop.onload = () => {
            raindrop.style.animation = `rainFall ${animDuration}s linear forwards`;
        };
        
        // Set up cleanup on animation end
        raindrop.addEventListener('animationend', () => {
            // Remove element
            raindrop.remove();
            
            // Remove from tracking array
            const index = raindrops.indexOf(raindrop);
            if (index > -1) {
                raindrops.splice(index, 1);
            }
            
            // Create a new raindrop to replace it
            if (containerElement.childElementCount < MAX_RAINDROPS) {
                const newDrop = createRaindrop();
                containerElement.appendChild(newDrop);
                raindrops.push(newDrop);
            }
        });
        
        return raindrop;
    }
    
    /**
     * Create a batch of raindrops
     */
    function createRaindropBatch(batchIndex: number): void {
        // If we've created all batches, stop
        if (batchIndex >= BATCHES) return;
        
        // Create this batch
        for (let i = 0; i < DROPS_PER_BATCH; i++) {
            const raindrop = createRaindrop();
            containerElement.appendChild(raindrop);
            raindrops.push(raindrop);
        }
        
        // Schedule next batch
        setTimeout(() => {
            createRaindropBatch(batchIndex + 1);
        }, 300); // 300ms between batches for smoother loading
    }
    
    // Start creating raindrops in batches
    createRaindropBatch(0);
    
    // Add cleanup function to the container element
    containerElement.onBeforeRemove = () => {
        // Clear all raindrops when switching animations
        raindrops.forEach(drop => drop.remove());
        raindrops.length = 0;
    };
}
