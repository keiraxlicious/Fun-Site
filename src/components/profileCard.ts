/**
 * Initializes the profile card with interactive elements
 */
export function initializeProfileCard(): void {
    // Add floating animation to profile picture
    const profilePic = document.querySelector('.profile-picture') as HTMLElement;
    if (profilePic) {
        addFloatingEffect(profilePic);
        renameProfileElements('Keira', 'Code Sorceress', 'Artistic Alchemist');
    }
    
    // Add text animation to headings
    const headings = document.querySelectorAll('.profile-card h1, .profile-card h2');
    headings.forEach((heading, index) => {
        const element = heading as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `all 0.5s ease ${0.2 + index * 0.1}s`;
        
        // Trigger animations after a short delay
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    });
}

/**
 * Adds a custom floating effect to an element
 * @param element - The element to animate
 */
function addFloatingEffect(element: HTMLElement): void {
    // Add subtle random movement
    let startTime = Date.now();
    
    function updatePosition() {
        const elapsed = (Date.now() - startTime) / 1000;
        
        // Calculate offsets using sine waves with different frequencies
        const offsetX = Math.sin(elapsed * 0.5) * 5;
        const offsetY = Math.sin(elapsed * 0.7) * 7;
        
        // Apply the transformation
        element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        
        // Continue animation
        requestAnimationFrame(updatePosition);
    }
    
    updatePosition();
}

export function renameProfileElements(name: string | null, title: string | null, subtitle: string | null) {
    const nameElement = document.querySelector('.profile-name');
    const titleElement = document.querySelector('.profile-title');
    const subtitleElement = document.querySelector('.profile-subtitle');

    if (nameElement) {
      nameElement.textContent = name;
    }
    if (titleElement) {
      titleElement.textContent = title;
    }
    if (subtitleElement) {
      subtitleElement.textContent = subtitle;
    }
}

