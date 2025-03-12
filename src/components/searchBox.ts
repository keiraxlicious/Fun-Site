import { createFloatingCharacter } from './searchBox.helper';

/**
 * Initializes the floating search box functionality
 * @param searchBoxId - The ID of the search input element
 */
export function initializeSearchBox(searchBoxId: string): void {
    const searchBox = document.getElementById(searchBoxId) as HTMLInputElement;
    
    if (!searchBox) {
        console.error(`Search box element ${searchBoxId} not found`);
        return;
    }
    
    console.log("Initializing search box");
    
    searchBox.addEventListener('input', (event) => {
        const target = event.target as HTMLInputElement;
        const {value} = target;
        
        // Get last character if there is one
        if (value.length > 0) {
            const lastChar = value.charAt(value.length - 1);
            
            target.value = '';
            createFloatingCharacter(lastChar, searchBox);
            
            // Clear the input to give the illusion that characters float away
            // Add delay before clearing the value
            }
    });
}

