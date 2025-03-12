/**
 * Initializes the floating search box functionality
 * @param searchBoxId - The ID of the search input element
 */
export function initializeSearchBox(searchBoxId) {
    const searchBox = document.getElementById(searchBoxId);
    if (!searchBox) {
        console.error(`Search box element ${searchBoxId} not found`);
        return;
    }
    console.log("Initializing search box");
    searchBox.addEventListener('input', (event) => {
        const target = event.target;
        const value = target.value;
        // Get last character if there is one
        if (value.length > 0) {
            const lastChar = value.charAt(value.length - 1);
            createFloatingCharacter(lastChar, searchBox);
            // Clear the input to give the illusion that characters float away
            target.value = '';
        }
    });
}
/**
 * Creates a floating character element
 * @param character - The character to animate
 * @param sourceElement - The element from which the character originates
 */
function createFloatingCharacter(character, sourceElement) {
    // Create a span for the character
    const charElement = document.createElement('span');
    charElement.textContent = character;
    charElement.className = 'floating-character';
    // Get the position of the search box
    const rect = sourceElement.getBoundingClientRect();
    // Random starting position within the search box
    const startX = rect.left + Math.random() * rect.width;
    const startY = rect.top + Math.random() * rect.height;
    // Set initial position
    charElement.style.left = `${startX}px`;
    charElement.style.top = `${startY}px`;
    // Random color from theme colors
    const colors = [
        'var(--color-pink)',
        'var(--color-gold)',
        'var(--color-turquoise)',
        'var(--color-teal)'
    ];
    charElement.style.color = colors[Math.floor(Math.random() * colors.length)];
    // Add to the body
    document.body.appendChild(charElement);
    // Apply animation
    animateFloatingCharacter(charElement);
}
/**
 * Animates a floating character element
 * @param element - The element to animate
 */
function animateFloatingCharacter(element) {
    // Random angle for movement direction
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 150;
    // Get starting position
    const startX = parseFloat(element.style.left);
    const startY = parseFloat(element.style.top);
    // Calculate target position (mostly upward)
    const targetX = startX + Math.cos(angle) * distance;
    const targetY = startY - Math.abs(Math.sin(angle) * distance); // Force upward
    // Set transform with transition
    setTimeout(() => {
        element.style.transform = `
            translate(${targetX - startX}px, ${targetY - startY}px)
            rotate(${Math.random() * 360}deg)
        `;
        element.style.opacity = '0';
    }, 10);
    // Remove element after animation completes
    setTimeout(() => {
        element.remove();
    }, 3000);
}
//# sourceMappingURL=searchBox.js.map