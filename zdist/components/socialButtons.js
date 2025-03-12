/**
 * Social media button configurations
 */
export const SOCIAL_BUTTONS = [
    {
        id: 'twitch',
        name: 'Twitch',
        icon: 'twitch.svg',
        url: 'https://twitch.tv/your-handle',
        color: '#6441a5'
    },
    {
        id: 'discord',
        name: 'Discord',
        icon: 'discord.svg',
        url: 'https://discord.gg/your-invite',
        color: '#5865F2'
    },
    {
        id: 'youtube',
        name: 'YouTube',
        icon: 'youtube.svg',
        url: 'https://youtube.com/c/your-channel',
        color: '#FF0000'
    },
    {
        id: 'instagram',
        name: 'Instagram',
        icon: 'instagram.svg',
        url: 'https://instagram.com/your-handle',
        color: '#E1306C'
    },
    {
        id: 'tiktok',
        name: 'TikTok',
        icon: 'tiktok.svg',
        url: 'https://tiktok.com/@your-handle',
        color: '#000000'
    },
    {
        id: 'twitter',
        name: 'Twitter',
        icon: 'twitter.svg',
        url: 'https://twitter.com/your-handle',
        color: '#1DA1F2'
    },
    {
        id: 'github',
        name: 'GitHub',
        icon: 'github.svg',
        url: 'https://github.com/your-handle',
        color: '#333333'
    },
    {
        id: 'kofi',
        name: 'Ko-fi',
        icon: 'kofi.svg',
        url: 'https://ko-fi.com/your-handle',
        color: '#FF5E5B'
    },
    {
        id: 'reddit',
        name: 'Reddit',
        icon: 'reddit.svg',
        url: 'https://reddit.com/u/your-handle',
        color: '#FF4500'
    }
];
/**
 * Creates and initializes the social media buttons grid
 * @param containerId - The selector of the container element
 */
export function initializeSocialButtons(containerId) {
    const container = document.querySelector(containerId);
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
function createSocialButton(button) {
    const buttonElement = document.createElement('div');
    buttonElement.className = 'social-button';
    buttonElement.id = button.id;
    // Create button content
    buttonElement.innerHTML = `
        <img src="assets/svgs/social/${button.icon}" alt="${button.name}">
    `;
    // Set background color from the button config
    buttonElement.style.backgroundColor = button.color;
    // Add click event to redirect to the URL
    buttonElement.addEventListener('click', () => {
        window.open(button.url, '_blank');
    });
    // Add button pop animation on click
    buttonElement.addEventListener('click', () => {
        buttonElement.classList.add('button-pop');
        // Remove the class after animation completes
        setTimeout(() => {
            buttonElement.classList.remove('button-pop');
        }, 300);
    });
    return buttonElement;
}
//# sourceMappingURL=socialButtons.js.map