import { SocialButton } from '../types/interfaces';
import { SOCIAL_BUTTONS } from './socialButtons.config';


/**
 * Creates and initializes the social media buttons grid
 * @param containerId - The selector of the container element
 */
export function initializeSocialButtons(containerId: string): void {
    const container = document.querySelector(containerId) as HTMLElement;
    
    if (!container) {
        console.error(`Container element ${containerId} not found`);
        return;
    }
    
    console.log("Initializing social buttons");
    
    // Clear any existing content
    container.innerHTML = '';
    
    // Create and append each button
    SOCIAL_BUTTONS.forEach((button) => {
        const buttonElement = createSocialButton(button);
        container.appendChild(buttonElement);
    });
}

/**
 * Creates a single social media button element
 * @param button - The button configuration object
 * @returns HTMLElement - The created button element
 */
function createSocialButton(button: SocialButton): HTMLElement {
    // Create button container
    const buttonElement = document.createElement('div');
    buttonElement.className = 'social-button-structure social-button-theme bubble-effect potion-glow';
    buttonElement.id = button.id;

    // Add the liquid-fill layer
    const liquidFillElement = document.createElement('div');
    liquidFillElement.className = 'liquid-fill';
    
    // Create button content with explicit link
    buttonElement.innerHTML = /*HTML*/`
    <div class="icon-container">
    ${button.svg}
    </div>
`;
    // buttonElement.innerHTML = /*HTML*/`
    // <div class="icon-container">
    //     <object data="/assets/svgs/social/${button.icon}.svg" type="image/svg+xml">
    //         <img src="/assets/images/social/${button.icon}.png" alt="${button.name}">
    //     </object>
    // </div>
    // `;
    
    // Set background color from the button config
    buttonElement.style.backgroundColor = button.color;
    
    // Add explicit click handler to the buttonElement
    buttonElement.addEventListener('click', (event) => {
        // Stop the event from bubbling up to parent elements
        event.stopPropagation();
        
        // Add pop animation
        buttonElement.classList.add('button-pop');
        
        // Remove the class after animation completes
        setTimeout(() => {
            buttonElement.classList.remove('button-pop');
        }, 300);
        
        // Open the URL in a new tab
        window.open(button.url, '_blank');
        
        console.log(`Clicked on ${button.name} button`); // Debug logging
    });
    
    // Append the liquid-fill element to the button
    buttonElement.appendChild(liquidFillElement);

    return buttonElement;
}


