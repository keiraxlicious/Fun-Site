/**
 * Find the index of the first different character between two strings
 * @param str1 - First string
 * @param str2 - Second string
 * @returns The index of the first different character, or -1 if none found
 */
export function findFirstDifferentCharIndex(str1: string, str2: string): number {
    const minLength = Math.min(str1.length, str2.length);
    
    // Check for differences in overlapping part
    for (let i = 0; i < minLength; i++) {
        if (str1.charAt(i) !== str2.charAt(i)) {
            return i;
        }
    }
    
    // If no differences in overlapping part, check if one string is longer
    if (str1.length !== str2.length) {
        return minLength;
    }
    
    // Strings are identical
    return -1;
}
/**
 * Creates a floating character element with dynamic animation
 * @param character - The character to animate
 * @param sourceElement - The element from which the character originates
 */
export function createFloatingCharacter(
    character: string,
    sourceElement: HTMLElement
): void {
    // Create a span for the character
    const charElement = document.createElement('span');
    charElement.textContent = character;
    charElement.className = 'floating-character';
    
    // Get the position and dimensions of the search box
    const rect = sourceElement.getBoundingClientRect();
    
    // Randomize the starting position within the search box
    // Use 70% of the box width/height for a more natural typing feel
    const padding = {
        horizontal: rect.width * 0.15,  // 15% padding from edges
        vertical: rect.height * 0.15    // 15% padding from edges
    };
    
    const startX = rect.left + padding.horizontal + Math.random() * (rect.width - padding.horizontal * 2);
    const startY = rect.top + padding.vertical + Math.random() * (rect.height - padding.vertical * 2);
    
    // Set initial position
    charElement.style.left = `${startX}px`;
    charElement.style.top = `${startY}px`;
    
    // Initial styling
    charElement.style.opacity = '1';
    charElement.style.transform = 'scale(1)';
    charElement.style.fontSize = '24px';
    
    // Random color from theme
    const colors = [
        'var(--color-pink)',
        'var(--color-gold)',
        'var(--color-turquoise)',
        'var(--color-teal)'
    ];
    charElement.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    // Add to the body
    document.body.appendChild(charElement);
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate maximum distance based on viewport size
    // Use larger percentages to expand the area
    const maxDistanceX = Math.min(viewportWidth * 0.9, 600);
    const maxDistanceY = Math.min(viewportHeight * 0.9, 600);
    
    // Generate random direction vector for initial outward motion
    const angle = Math.random() * Math.PI * 2; // Full 360° random direction
    
    // Scale distance by viewport size for more expansive movement
    const distanceScale = Math.min(
        viewportWidth / 2560,  // Scale based on a reference width of 1200px
        viewportHeight / 1440   // Scale based on a reference height of 800px
    );
    
    // Calculate longer distances for wider distribution
    const distance = (150 + Math.random() * 250) * Math.max(distanceScale, 0.8);
    
    // Calculate position after flying outward
    const midX = startX + Math.cos(angle) * distance;
    const midY = startY + Math.sin(angle) * distance;
    
    // Final destination (more dramatic vertical movement)
    // If flying upward, go higher; if flying downward, keep going down
    let finalY;
    if (midY < startY) {
        // Going up - fly higher
        finalY = midY - (150 + Math.random() * 250) * distanceScale;
    } else {
        // Going down - continue downward then curve up at the end
        const downwardDistance = (100 + Math.random() * 100) * distanceScale;
        finalY = midY + downwardDistance - (downwardDistance * 2); // Go down then back up
    }
    
    // Add some horizontal drift in the final position
    const finalX = midX + (Math.random() * 100 - 50) * distanceScale;
    
    // Animation timing - longer durations for larger screens
    const outwardDuration = 200 + Math.random() * 600; // ms
    const upwardDuration = 500 + Math.random() * 1000; // ms
    
    // Set animation properties
    charElement.style.transition = `none`;
    
    // Force a reflow to ensure the initial state is rendered
    void charElement.offsetWidth;
    
    // First phase: Fly outward with rotation
    charElement.style.transition = `
        left ${outwardDuration}ms cubic-bezier(0.22, 0.68, 0.43, 0.99),
        top ${outwardDuration}ms cubic-bezier(0.22, 0.68, 0.43, 0.99),
        transform ${outwardDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)
    `;
    
    charElement.style.left = `${midX}px`;
    charElement.style.top = `${midY}px`;
    charElement.style.transform = `
        scale(${1 + Math.random() * 0.7})
        rotate(${-60 + Math.random() * 120}deg)
    `;
    
    // Second phase: Float upward/outward and fade out
    setTimeout(() => {
        charElement.style.transition = `
            left ${upwardDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
            top ${upwardDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
            opacity ${upwardDuration}ms ease-out,
            transform ${upwardDuration}ms ease-out
        `;
        
        charElement.style.left = `${finalX}px`;
        charElement.style.top = `${finalY}px`;
        charElement.style.opacity = '0';
        charElement.style.transform = `
            scale(${0.6 + Math.random() * 0.5})
            rotate(${-120 + Math.random() * 240}deg)
        `;
    }, outwardDuration);
    
    // Remove element after animation completes
    setTimeout(() => {
        createExplosion(charElement);
        charElement.remove();
    }, outwardDuration + upwardDuration + 100);
}

/**
 * Creates an explosion effect when a floating character disappears.
 * @param {HTMLElement} charElement - The original floating character element.
 */
export function createExplosion(charElement: { getBoundingClientRect: () => any; textContent: string | null; style: { color: string; }; }) {
    const numFragments = 6 + Math.floor(Math.random() * 6); // 6-12 fragments
    const rect = charElement.getBoundingClientRect();

    for (let i = 0; i < numFragments; i++) {
        const fragment = document.createElement('span');
        fragment.textContent = charElement.textContent;
        fragment.className = 'floating-character';
        document.body.appendChild(fragment);

        // Randomize initial position near the character
        fragment.style.left = `${rect.left + Math.random() * 10 - 5}px`;
        fragment.style.top = `${rect.top + Math.random() * 10 - 5}px`;
        fragment.style.opacity = '1';
        fragment.style.transform = `scale(${0.7 + Math.random() * 0.3})`;
        fragment.style.color = charElement.style.color;

        // Explosion trajectory
        const angle = Math.random() * Math.PI * 2; // Full 360-degree explosion
        const distance = 50 + Math.random() * 100; // 50-150px distance
        const finalX = rect.left + Math.cos(angle) * distance;
        const finalY = rect.top + Math.sin(angle) * distance;

        // Animation
        fragment.style.transition = `all 500ms ease-out`;
        setTimeout(() => {
            fragment.style.left = `${finalX}px`;
            fragment.style.top = `${finalY}px`;
            fragment.style.opacity = '0';
            fragment.style.transform = `scale(${0.3 + Math.random() * 0.2}) rotate(${Math.random() * 360}deg)`;
        }, 10);

        // Remove fragment after animation
        setTimeout(() => {
            fragment.remove();
        }, 600);
    }
}