/**
 * Find the index of the first different character between two strings
 * @param str1 - First string
 * @param str2 - Second string
 * @returns The index of the first different character, or -1 if none found
 */
export function findFirstDifferentCharIndex(str1, str2) {
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
 * Creates a floating character element
 * @param character - The character to animate
 * @param sourceElement - The element from which the character originates
 */
export function createFloatingCharacter(character, sourceElement) {
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
    // Apply floating animation
    const angle = Math.random() * Math.PI * 2; // Random direction
    const distance = 100 + Math.random() * 150; // Random distance
    const targetX = startX + Math.cos(angle) * distance;
    const targetY = startY - distance; // Always float upward
    // Set final position with animation
    setTimeout(() => {
        charElement.style.transform = `translate(${targetX - startX}px, ${targetY - startY}px) rotate(${Math.random() * 360}deg)`;
        charElement.style.opacity = '0';
    }, 10);
    // Remove element after animation completes
    setTimeout(() => {
        charElement.remove();
    }, 3000);
}
//# sourceMappingURL=searchBox.helper.js.map